import { useState, useEffect, useRef } from 'react';

interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  tech?: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
  workLabel: string;
  educationLabel: string;
  lang: string;
}

export default function ExperienceTimeline({
  experiences,
  workLabel,
  educationLabel,
  lang,
}: ExperienceTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [experiences.length]);

  const workExperiences = experiences.filter((e) => e.type === 'work');
  const eduExperiences = experiences.filter((e) => e.type === 'education');
  const active = experiences[activeIndex];

  return (
    <div className="relative">
      {/* Desktop: sticky scroll layout */}
      <div className="hidden lg:flex lg:gap-0">
        {/* Left: sticky card */}
        <div className="relative flex-1">
          <div className="sticky top-32 pr-12">
            <div
              className="transition-all duration-500 ease-out"
              key={active?.id}
            >
              <span
                className={`inline-block px-3 py-1 text-xs font-mono rounded-full mb-4 ${
                  active?.type === 'work'
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {active?.type === 'work' ? workLabel : educationLabel}
              </span>

              <h3 className="text-2xl font-bold text-text-primary mb-1 animate-fade-slide">
                {active?.title}
              </h3>
              <p className="text-accent font-semibold text-lg mb-2 animate-fade-slide">
                {active?.company}
              </p>
              <div className="flex items-center gap-3 text-sm text-text-secondary mb-6">
                <span className="font-mono">{active?.period}</span>
                <span className="w-1 h-1 bg-border rounded-full"></span>
                <span>{active?.location}</span>
              </div>

              <div className="space-y-3 mb-6">
                {active?.description.map((item, i) => (
                  <p
                    key={i}
                    className="text-text-secondary text-sm leading-relaxed animate-fade-slide"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {item}
                  </p>
                ))}
              </div>

              {active?.tech && active.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 animate-fade-slide" style={{ animationDelay: '300ms' }}>
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono text-accent bg-accent/10 rounded border border-accent/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: timeline line + dots + cards (all together) */}
        <div className="relative flex-1 pl-10">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-border rounded-full"></div>
          {/* Progress line */}
          <div
            className="absolute left-0 top-0 w-[3px] bg-accent rounded-full transition-all duration-500 ease-out"
            style={{
              height: `${((activeIndex + 1) / experiences.length) * 100}%`,
            }}
          ></div>

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className="min-h-[60vh] flex items-center relative"
            >
              {/* Timeline dot — aligned to the line */}
              <div
                className={`absolute -left-10 top-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full transition-all duration-300 ${
                  index <= activeIndex
                    ? 'bg-accent scale-125'
                    : 'bg-border'
                }`}
                style={{ marginLeft: '-5.5px' }}
              ></div>

              {/* Compact card */}
              <button
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-transparent ${
                  index === activeIndex
                    ? 'border-accent/40 bg-accent/5 shadow-lg shadow-accent/5'
                    : 'border-border hover:border-accent/20'
                }`}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full mb-3 ${
                    exp.type === 'work' ? 'bg-accent' : 'bg-emerald-400'
                  }`}
                ></span>
                <h4
                  className={`font-semibold text-base mb-1 transition-colors ${
                    index === activeIndex ? 'text-accent' : 'text-text-primary'
                  }`}
                >
                  {exp.company}
                </h4>
                <p className="text-sm text-text-secondary">{exp.title}</p>
                <p className="text-xs font-mono text-text-secondary/60 mt-2">
                  {exp.period}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="lg:hidden space-y-8">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 border-l-[3px] border-border">
            {/* Dot */}
            <div
              className={`absolute -left-[9px] top-0 w-[15px] h-[15px] rounded-full border-[3px] ${
                exp.type === 'work'
                  ? 'border-accent bg-accent/20'
                  : 'border-emerald-400 bg-emerald-400/20'
              }`}
            ></div>

            <span
              className={`inline-block px-2.5 py-0.5 text-[11px] font-mono rounded-full mb-3 ${
                exp.type === 'work'
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}
            >
              {exp.type === 'work' ? workLabel : educationLabel}
            </span>

            <h3 className="text-lg font-bold text-text-primary mb-1">
              {exp.title}
            </h3>
            <p className="text-accent font-semibold mb-1">{exp.company}</p>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
              <span className="font-mono">{exp.period}</span>
              <span className="w-1 h-1 bg-border rounded-full"></span>
              <span>{exp.location}</span>
            </div>

            <div className="space-y-2 mb-4">
              {exp.description.map((item, i) => (
                <p key={i} className="text-text-secondary text-sm leading-relaxed">
                  {item}
                </p>
              ))}
            </div>

            {exp.tech && exp.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] font-mono text-accent bg-accent/10 rounded border border-accent/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
