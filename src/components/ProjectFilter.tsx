import { useState } from 'react';

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  lang: string;
}

interface ProjectFilterProps {
  projects: ProjectData[];
  filterAllLabel: string;
  emptyLabel: string;
  clearFilterLabel: string;
  lang: string;
}

export default function ProjectFilter({
  projects,
  filterAllLabel,
  emptyLabel,
  clearFilterLabel,
  lang,
}: ProjectFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tech))).sort();

  const filtered = activeTag
    ? projects.filter((p) => p.tech.includes(activeTag))
    : projects;

  const accentColor = 'var(--color-accent)';
  const navyLight = 'var(--color-navy-light)';
  const navyDark = 'var(--color-navy-dark)';
  const border = 'var(--color-border)';
  const textPrimary = 'var(--color-text-primary)';
  const textSecondary = 'var(--color-text-secondary)';

  return (
    <div>
      {/* Filter buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '32px',
        }}
        role="group"
        aria-label="Filter projects by technology"
      >
        <button
          onClick={() => setActiveTag(null)}
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontFamily: 'monospace',
            border: `1px solid ${activeTag === null ? accentColor : border}`,
            backgroundColor: activeTag === null ? `color-mix(in srgb, var(--color-accent) 10%, transparent)` : 'transparent',
            color: activeTag === null ? accentColor : textSecondary,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          aria-pressed={activeTag === null}
        >
          {filterAllLabel}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontFamily: 'monospace',
              border: `1px solid ${activeTag === tag ? accentColor : border}`,
              backgroundColor: activeTag === tag ? `color-mix(in srgb, var(--color-accent) 10%, transparent)` : 'transparent',
              color: activeTag === tag ? accentColor : textSecondary,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Active filter badge */}
      {activeTag && (
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: textSecondary }}>
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &quot;{activeTag}&quot;
          </span>
          <button
            onClick={() => setActiveTag(null)}
            style={{
              fontSize: '12px',
              color: accentColor,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {clearFilterLabel}
          </button>
        </div>
      )}

      {/* Projects grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: textSecondary }}>
          <p style={{ fontSize: '16px' }}>{emptyLabel}</p>
          <button
            onClick={() => setActiveTag(null)}
            style={{
              marginTop: '16px',
              padding: '8px 20px',
              border: `1px solid ${accentColor}`,
              color: accentColor,
              borderRadius: '8px',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {clearFilterLabel}
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {filtered.map((project) => {
            const href = lang === 'pt' ? `/projects/${project.slug}` : `/${lang}/projects/${project.slug}`;
            return (
              <a
                key={project.slug}
                href={href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: navyLight,
                  border: `1px solid ${border}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.borderColor = `color-mix(in srgb, var(--color-accent) 40%, transparent)`;
                  el.style.boxShadow = `0 8px 30px color-mix(in srgb, var(--color-accent) 5%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = border;
                  el.style.boxShadow = 'none';
                }}
                aria-label={project.title}
              >
                {/* Image area */}
                <div
                  style={{
                    height: '176px',
                    backgroundColor: navyDark,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ) : (
                    <span style={{ fontSize: '48px', opacity: 0.2 }}>{'</>'}</span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <h3 style={{ color: textPrimary, fontWeight: 600, fontSize: '17px', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>
                  <p style={{ color: textSecondary, fontSize: '14px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {project.tech.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          color: accentColor,
                          backgroundColor: `color-mix(in srgb, var(--color-accent) 10%, transparent)`,
                          borderRadius: '4px',
                          border: `1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span
                        style={{
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          color: textSecondary,
                          backgroundColor: `color-mix(in srgb, var(--color-navy-dark) 60%, transparent)`,
                          borderRadius: '4px',
                          border: `1px solid ${border}`,
                        }}
                      >
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
