import { useState, useEffect, useRef, useCallback } from 'react';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
  lang: string;
}

export default function MobileNav({ links, ctaHref, ctaLabel, lang }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        close();
        buttonRef.current?.focus();
      }
      if (e.key === 'Tab' && open && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        className="flex flex-col justify-center gap-[5px] p-2 bg-transparent border-none cursor-pointer text-text-primary"
      >
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${open ? 'bg-accent translate-y-[7px] rotate-45' : 'bg-text-primary'}`}
        />
        <span
          className={`block w-6 h-0.5 transition-opacity duration-300 ease-in-out ${open ? 'bg-accent opacity-0' : 'bg-text-primary opacity-100'}`}
        />
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${open ? 'bg-accent -translate-y-[7px] -rotate-45' : 'bg-text-primary'}`}
        />
      </button>

      {/* Full-screen overlay */}
      <div
        id="mobile-nav-overlay"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[9999] bg-navy-light flex flex-col p-6 transition-opacity duration-300 ease-in-out ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Close button */}
        <div className="flex justify-end mb-12">
          <button
            onClick={close}
            aria-label="Close menu"
            className="bg-transparent border border-border text-text-primary rounded-lg px-4 py-2 cursor-pointer text-sm hover:border-accent hover:text-accent transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1">
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  ref={i === 0 ? firstFocusRef : undefined}
                  href={link.href}
                  onClick={close}
                  className="block py-4 text-2xl font-bold text-text-primary no-underline border-b border-border transition-all duration-200 hover:text-accent hover:pl-2"
                >
                  <span className="text-accent font-mono text-sm mr-3">
                    0{i + 1}.
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA button */}
        <a
          href={ctaHref}
          onClick={close}
          className="block mt-8 py-4 text-center border-2 border-accent text-accent rounded-lg font-semibold text-base no-underline transition-colors duration-200 hover:bg-accent/10"
        >
          {ctaLabel}
        </a>
      </div>
    </>
  );
}
