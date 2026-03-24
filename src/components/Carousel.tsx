import { useRef, useState, useEffect, useCallback, type ReactNode, type KeyboardEvent } from 'react';

interface CarouselProps {
  children: ReactNode[];
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

  // Mouse drag for desktop
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

  // Keyboard navigation
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollBy('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollBy('right');
    }
  };

  const buttonBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `1px solid var(--color-border)`,
    backgroundColor: 'var(--color-navy-light)',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s, background-color 0.2s',
    fontSize: '18px',
    lineHeight: 1,
  };

  return (
    <div
      style={{ position: 'relative' }}
      className={className}
      role="region"
      aria-label={label}
    >
      {/* Left arrow – desktop only via CSS */}
      <button
        onClick={() => scrollBy('left')}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        style={{
          ...buttonBase,
          left: '-20px',
          opacity: canScrollLeft ? 1 : 0,
          pointerEvents: canScrollLeft ? 'auto' : 'none',
        }}
        className="hidden md:flex"
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
        style={{
          display: 'flex',
          gap: `${gap}px`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          cursor: isDragging ? 'grabbing' : 'grab',
          paddingBottom: '8px',
          outline: 'none',
          // Hide scrollbar cross-browser
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        // webkit scrollbar hidden via className + global CSS
        className="carousel-track"
      >
        {children.map((child, i) => (
          <div
            key={i}
            role="listitem"
            style={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Right arrow – desktop only */}
      <button
        onClick={() => scrollBy('right')}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        style={{
          ...buttonBase,
          right: '-20px',
          opacity: canScrollRight ? 1 : 0,
          pointerEvents: canScrollRight ? 'auto' : 'none',
        }}
        className="hidden md:flex"
      >
        ›
      </button>

      <style>{`.carousel-track::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
