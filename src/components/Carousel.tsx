import { Children, useRef, useState, useEffect, useCallback, type ReactNode, type KeyboardEvent } from 'react';

interface CarouselProps {
  children: ReactNode | ReactNode[];
  gap?: number;
  className?: string;
  label?: string;
}

export default function Carousel({
  children,
  gap = 24,
  className = '',
  label = 'Carousel',
}: CarouselProps) {
  const childArray = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const itemWidth = el.firstElementChild?.clientWidth ?? 320;
    el.scrollBy({ left: direction === 'left' ? -(itemWidth + gap) : itemWidth + gap, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.pageX;
    dragStartScrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const delta = e.pageX - dragStartX.current;
    trackRef.current.scrollLeft = dragStartScrollLeft.current - delta;
  };

  const onMouseUp = () => setIsDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollBy('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollBy('right');
    }
  };

  return (
    <div className={`relative ${className}`} role="region" aria-label={label}>
      {/* Left arrow */}
      <button
        onClick={() => scrollBy('left')}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -left-5 z-10 w-10 h-10 rounded-full border border-border bg-navy-light text-text-primary items-center justify-center text-lg leading-none cursor-pointer transition-opacity duration-200 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        ‹
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        role="list"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 outline-none carousel-track ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {childArray.map((child, i) => (
          <div key={i} role="listitem" className="snap-start shrink-0 w-72 md:w-80">
            {child}
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scrollBy('right')}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -right-5 z-10 w-10 h-10 rounded-full border border-border bg-navy-light text-text-primary items-center justify-center text-lg leading-none cursor-pointer transition-opacity duration-200 ${
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        ›
      </button>

      <style>{`.carousel-track::-webkit-scrollbar { display: none; } .carousel-track { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}
