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

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        close();
        buttonRef.current?.focus();
      }
      // Focus trap
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

  // Focus first link when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    }
  }, [open]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const accentColor = 'var(--color-accent)';
  const navyDark = 'var(--color-navy-dark)';
  const navyLight = 'var(--color-navy-light)';
  const textPrimary = 'var(--color-text-primary)';
  const textSecondary = 'var(--color-text-secondary)';
  const border = 'var(--color-border)';

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '5px',
          padding: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: textPrimary,
        }}
      >
        <span
          style={{
            display: 'block',
            width: '24px',
            height: '2px',
            backgroundColor: open ? accentColor : textPrimary,
            transition: 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease',
            transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
          }}
        />
        <span
          style={{
            display: 'block',
            width: '24px',
            height: '2px',
            backgroundColor: open ? accentColor : textPrimary,
            transition: 'opacity 0.3s ease',
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: 'block',
            width: '24px',
            height: '2px',
            backgroundColor: open ? accentColor : textPrimary,
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Full-screen overlay */}
      <div
        id="mobile-nav-overlay"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: navyDark,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Close button at top-right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
          <button
            onClick={close}
            aria-label="Close menu"
            style={{
              background: 'transparent',
              border: `1px solid ${border}`,
              color: textPrimary,
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  ref={i === 0 ? firstFocusRef : undefined}
                  href={link.href}
                  onClick={close}
                  style={{
                    display: 'block',
                    padding: '16px 0',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: textPrimary,
                    textDecoration: 'none',
                    borderBottom: `1px solid ${border}`,
                    transition: 'color 0.2s ease, padding-left 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = accentColor;
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = textPrimary;
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0';
                  }}
                >
                  <span style={{ color: accentColor, fontFamily: 'monospace', fontSize: '14px', marginRight: '12px' }}>
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
          style={{
            display: 'block',
            marginTop: '32px',
            padding: '16px',
            textAlign: 'center',
            border: `2px solid ${accentColor}`,
            color: accentColor,
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '16px',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `color-mix(in srgb, var(--color-accent) 10%, transparent)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </>
  );
}
