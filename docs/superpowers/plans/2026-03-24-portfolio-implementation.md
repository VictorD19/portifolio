# Portfolio Victor Bertram — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Victor Bertram's portfolio website — dark elegant theme, 3 languages (PT/EN/ES), blog with MDX, contact via WhatsApp, deployed on Cloudflare Pages.

**Architecture:** Astro SSG with React islands for interactive components (carousel, contact form, mobile nav). Tailwind CSS v4 (CSS-first config) for styling. MDX for blog content. Astro native i18n routing with PT as default (no prefix), EN at `/en/`, ES at `/es/`. Static search via Pagefind.

**Tech Stack:** Astro 5, React 19, Tailwind CSS 4, MDX, Pagefind, TypeScript, Cloudflare Pages

**Spec:** `docs/superpowers/specs/2026-03-24-portfolio-design.md`

---

## File Structure

```
src/
├── components/
│   ├── Navbar.astro              # Fixed navbar with top bar + main nav
│   ├── MobileNav.tsx             # React island: hamburger menu
│   ├── Footer.astro              # 4-column footer
│   ├── LanguageSwitcher.astro    # PT/EN/ES selector
│   ├── ScrollAnimation.astro     # Intersection Observer wrapper
│   ├── Carousel.tsx              # React island: horizontal carousel
│   ├── ProjectCard.astro         # Project card for grid/carousel
│   ├── BlogCard.astro            # Blog card for grid/carousel
│   ├── ContactForm.tsx           # React island: form → WhatsApp
│   ├── ProjectFilter.tsx         # React island: tech filter for projects
│   ├── SEOHead.astro             # Meta tags, OG, JSON-LD, hreflang
│   ├── ShareButtons.astro        # Social share buttons for blog posts
│   └── mdx/                      # Custom MDX components
│       ├── CodeBlock.astro
│       ├── Alert.astro
│       └── ImageGallery.astro
├── layouts/
│   ├── BaseLayout.astro          # HTML shell, font loading, skip-to-content
│   ├── BlogPostLayout.astro      # MDX post layout with TOC
│   └── ProjectLayout.astro       # Project detail layout
├── i18n/
│   ├── config.ts                 # Supported locales, default locale, helper functions
│   ├── pt.json                   # Portuguese translations
│   ├── en.json                   # English translations
│   └── es.json                   # Spanish translations
├── data/
│   ├── projects.ts               # Project data with translations
│   └── services.ts               # Services data with translations
├── content/
│   └── blog/
│       ├── exemplo-post.pt.mdx   # Sample blog post PT
│       ├── exemplo-post.en.mdx   # Sample blog post EN
│       └── exemplo-post.es.mdx   # Sample blog post ES
├── styles/
│   └── global.css                # Tailwind v4 CSS-first config, custom animations
├── pages/
│   ├── index.astro               # Home PT (default)
│   ├── projects/
│   │   ├── index.astro           # Projects list PT
│   │   └── [slug].astro          # Project detail PT
│   ├── blog/
│   │   ├── index.astro           # Blog list PT
│   │   └── [slug].astro          # Blog post PT
│   ├── services.astro            # Services PT
│   ├── contact.astro             # Contact PT
│   ├── en/                       # EN locale (same structure)
│   └── es/                       # ES locale (same structure)
├── lib/
│   └── utils.ts                  # getLocalizedPath, getReadingTime, formatDate, buildWhatsAppUrl
└── assets/
    └── icons/                    # SVG icons (github, linkedin, whatsapp, mail, map-pin)
public/
├── images/
│   └── projects/                 # Project screenshots/placeholders
├── og-default.png                # Default OG image (1200x630)
└── robots.txt
```

---

## Task 1: Project Scaffold & Tailwind v4 Config

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `.gitignore`

- [ ] **Step 1: Create Astro project**

```bash
cd /home/ixcsoft/Documentos/victord-portifolio
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

- [ ] **Step 2: Install dependencies**

```bash
npm install @astrojs/react @astrojs/mdx @astrojs/sitemap react react-dom @fontsource/inter tailwindcss @tailwindcss/vite @tailwindcss/typography
npm install -D @types/react @types/react-dom
```

Note: Using `@tailwindcss/vite` (not `@astrojs/tailwind`) for Tailwind v4.

- [ ] **Step 3: Configure astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://victorbertram.dev',
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

- [ ] **Step 4: Create global.css with Tailwind v4 CSS-first config**

```css
/* src/styles/global.css */
@import 'tailwindcss';
@import '@tailwindcss/typography';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/inter/800.css';

@theme {
  --color-navy: #0a192f;
  --color-navy-light: #112240;
  --color-navy-dark: #020c1b;
  --color-accent: #64ffda;
  --color-text-primary: #ccd6f6;
  --color-text-secondary: #8892b0;
  --color-border: #1e3a5f;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

@layer base {
  body {
    background-color: var(--color-navy);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@utility animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}
@utility animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}
@utility animate-scale-in {
  animation: scale-in 0.5s ease-out forwards;
  opacity: 0;
  transform: scale(0.95);
}
```

- [ ] **Step 5: Update .gitignore**

Add `.superpowers/` to `.gitignore`.

- [ ] **Step 6: Create placeholder directories and assets**

```bash
mkdir -p public/images/projects src/assets/icons
```

Create SVG icon files in `src/assets/icons/`: `github.svg`, `linkedin.svg`, `whatsapp.svg`, `mail.svg`, `map-pin.svg`, `external-link.svg`, `menu.svg`, `x.svg`, `chevron-left.svg`, `chevron-right.svg`. Use Lucide icon SVGs (24x24, stroke-based).

Create a simple placeholder PNG for `public/og-default.png` (1200x630, navy background with "Victor Bertram - Senior Full Stack Developer" in white text).

Create placeholder images in `public/images/projects/` for each project.

- [ ] **Step 7: Verify build**

```bash
npm run dev
```

Expected: Astro dev server starts on localhost:4321, page renders with dark navy background, Inter font loads.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with React, Tailwind v4, MDX, sitemap"
```

---

## Task 2: i18n System & Utilities

**Files:**
- Create: `src/i18n/config.ts`, `src/i18n/pt.json`, `src/i18n/en.json`, `src/i18n/es.json`, `src/lib/utils.ts`

- [ ] **Step 1: Create i18n config with helper functions**

```ts
// src/i18n/config.ts
import pt from './pt.json';
import en from './en.json';
import es from './es.json';

export const languages = { pt: 'Português', en: 'English', es: 'Español' } as const;
export const defaultLang = 'pt';
export type Lang = keyof typeof languages;

const translations = { pt, en, es } as const;

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let result: any = translations[lang];
  for (const k of keys) {
    result = result?.[k];
  }
  return result ?? key;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}
```

- [ ] **Step 2: Create Portuguese translation file**

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "services": "Services",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Olá, meu nome é",
    "headline": "Construo sistemas que escalam.",
    "bio": "Senior Full Stack Developer com 5+ anos criando SaaS, APIs e arquiteturas distribuídas.",
    "cta_projects": "Ver projetos",
    "cta_contact": "Fale comigo"
  },
  "about": {
    "title": "Sobre mim",
    "bio": "Desenvolvedor Full Stack Senior com experiência em sistemas de alta concorrência, migrações críticas e otimizações que fizeram diferença real. Reduzi tempos de resposta em 60%, otimizei queries em 70% e cortei tempo de resolução de incidentes em 40%."
  },
  "sections": {
    "projects": "Projetos",
    "blog": "Blog",
    "cta_title": "Vamos trabalhar juntos?",
    "cta_text": "Estou disponível para projetos freelance, consultoria técnica ou oportunidades full-time.",
    "cta_button": "Entrar em contato",
    "view_all_projects": "Ver todos",
    "view_all_posts": "Todos os artigos"
  },
  "footer": {
    "bio": "Senior Full Stack Developer construindo sistemas escaláveis e experiências digitais que fazem diferença.",
    "navigation": "Navegação",
    "services": "Serviços",
    "contact": "Contato",
    "available": "Disponível para novos projetos",
    "rights": "Todos os direitos reservados.",
    "download_cv": "Download CV"
  },
  "contact": {
    "title": "Contato",
    "name": "Nome",
    "email": "Email",
    "subject": "Assunto",
    "message": "Mensagem",
    "send": "Enviar via WhatsApp",
    "name_required": "Nome é obrigatório",
    "email_invalid": "Email inválido",
    "message_required": "Mensagem é obrigatória"
  },
  "services_page": {
    "title": "Serviços",
    "cta": "Solicitar orçamento"
  },
  "blog_page": {
    "title": "Blog",
    "search": "Buscar artigos...",
    "empty": "Em breve novos artigos",
    "read_more": "Ler mais",
    "min_read": "min de leitura",
    "fallback": "Artigo disponível apenas em português"
  },
  "projects_page": {
    "title": "Projetos",
    "filter_all": "Todos",
    "empty": "Nenhum projeto com essa tecnologia",
    "clear_filter": "Limpar filtro",
    "problem": "Problema",
    "solution": "Solução",
    "result": "Resultado"
  }
}
```

- [ ] **Step 3: Create English translation file**

Full `src/i18n/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "services": "Services",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, my name is",
    "headline": "I build systems that scale.",
    "bio": "Senior Full Stack Developer with 5+ years building SaaS, APIs and distributed architectures.",
    "cta_projects": "View projects",
    "cta_contact": "Get in touch"
  },
  "about": {
    "title": "About me",
    "bio": "Senior Full Stack Developer experienced in high-concurrency systems, critical migrations and optimizations that made a real difference. Reduced response times by 60%, optimized queries by 70% and cut incident resolution time by 40%."
  },
  "sections": {
    "projects": "Projects",
    "blog": "Blog",
    "cta_title": "Let's work together?",
    "cta_text": "I'm available for freelance projects, technical consulting or full-time opportunities.",
    "cta_button": "Get in touch",
    "view_all_projects": "View all",
    "view_all_posts": "All articles"
  },
  "footer": {
    "bio": "Senior Full Stack Developer building scalable systems and digital experiences that make a difference.",
    "navigation": "Navigation",
    "services": "Services",
    "contact": "Contact",
    "available": "Available for new projects",
    "rights": "All rights reserved.",
    "download_cv": "Download CV"
  },
  "contact": {
    "title": "Contact",
    "name": "Name",
    "email": "Email",
    "subject": "Subject",
    "message": "Message",
    "send": "Send via WhatsApp",
    "name_required": "Name is required",
    "email_invalid": "Invalid email",
    "message_required": "Message is required"
  },
  "services_page": {
    "title": "Services",
    "cta": "Request a quote"
  },
  "blog_page": {
    "title": "Blog",
    "search": "Search articles...",
    "empty": "New articles coming soon",
    "read_more": "Read more",
    "min_read": "min read",
    "fallback": "Article available only in Portuguese"
  },
  "projects_page": {
    "title": "Projects",
    "filter_all": "All",
    "empty": "No projects with this technology",
    "clear_filter": "Clear filter",
    "problem": "Problem",
    "solution": "Solution",
    "result": "Result"
  }
}
```

- [ ] **Step 4: Create Spanish translation file**

Full `src/i18n/es.json` with same structure, all values translated to Spanish. (Victor is fluent in Spanish so translations should be natural.)

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "services": "Services",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hola, mi nombre es",
    "headline": "Construyo sistemas que escalan.",
    "bio": "Senior Full Stack Developer con 5+ años creando SaaS, APIs y arquitecturas distribuidas.",
    "cta_projects": "Ver proyectos",
    "cta_contact": "Hablemos"
  },
  "about": {
    "title": "Sobre mí",
    "bio": "Desarrollador Full Stack Senior con experiencia en sistemas de alta concurrencia, migraciones críticas y optimizaciones que hicieron una diferencia real. Reduje tiempos de respuesta en 60%, optimicé queries en 70% y corté tiempo de resolución de incidentes en 40%."
  },
  "sections": {
    "projects": "Proyectos",
    "blog": "Blog",
    "cta_title": "¿Trabajamos juntos?",
    "cta_text": "Estoy disponible para proyectos freelance, consultoría técnica u oportunidades full-time.",
    "cta_button": "Contactar",
    "view_all_projects": "Ver todos",
    "view_all_posts": "Todos los artículos"
  },
  "footer": {
    "bio": "Senior Full Stack Developer construyendo sistemas escalables y experiencias digitales que hacen la diferencia.",
    "navigation": "Navegación",
    "services": "Servicios",
    "contact": "Contacto",
    "available": "Disponible para nuevos proyectos",
    "rights": "Todos los derechos reservados.",
    "download_cv": "Descargar CV"
  },
  "contact": {
    "title": "Contacto",
    "name": "Nombre",
    "email": "Email",
    "subject": "Asunto",
    "message": "Mensaje",
    "send": "Enviar por WhatsApp",
    "name_required": "El nombre es obligatorio",
    "email_invalid": "Email inválido",
    "message_required": "El mensaje es obligatorio"
  },
  "services_page": {
    "title": "Servicios",
    "cta": "Solicitar presupuesto"
  },
  "blog_page": {
    "title": "Blog",
    "search": "Buscar artículos...",
    "empty": "Próximamente nuevos artículos",
    "read_more": "Leer más",
    "min_read": "min de lectura",
    "fallback": "Artículo disponible solo en portugués"
  },
  "projects_page": {
    "title": "Proyectos",
    "filter_all": "Todos",
    "empty": "Ningún proyecto con esta tecnología",
    "clear_filter": "Limpiar filtro",
    "problem": "Problema",
    "solution": "Solución",
    "result": "Resultado"
  }
}
```

- [ ] **Step 5: Create utility functions**

```ts
// src/lib/utils.ts
export function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function formatDate(date: Date, lang: string): string {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function buildWhatsAppUrl(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const text = `Olá Victor!\n\nNome: ${data.name}\nEmail: ${data.email}\nAssunto: ${data.subject}\nMensagem: ${data.message}`;
  return `https://wa.me/5549998218294?text=${encodeURIComponent(text)}`;
}
```

- [ ] **Step 6: Verify imports work**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/ src/lib/
git commit -m "feat: add i18n system with PT/EN/ES translations and utility functions"
```

---

## Task 3: Base Layout & SEO Head

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/SEOHead.astro`

- [ ] **Step 1: Create SEOHead component**

```astro
---
// src/components/SEOHead.astro
interface Props {
  title: string;
  description: string;
  lang: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
}

const { title, description, lang, canonical, ogImage, type = 'website', publishedDate } = Astro.props;
const siteUrl = 'https://victorbertram.dev';
const fullTitle = `${title} | Victor Bertram`;
const ogImageUrl = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/og-default.png`;
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical || Astro.url.href} />

<!-- Open Graph -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type} />
<meta property="og:url" content={Astro.url.href} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:locale" content={lang} />

<!-- hreflang -->
<link rel="alternate" hreflang="pt" href={`${siteUrl}${Astro.url.pathname.replace(/^\/(en|es)/, '')}`} />
<link rel="alternate" hreflang="en" href={`${siteUrl}/en${Astro.url.pathname.replace(/^\/(en|es)/, '')}`} />
<link rel="alternate" hreflang="es" href={`${siteUrl}/es${Astro.url.pathname.replace(/^\/(en|es)/, '')}`} />
<link rel="alternate" hreflang="x-default" href={`${siteUrl}${Astro.url.pathname.replace(/^\/(en|es)/, '')}`} />

{type === 'article' && publishedDate && (
  <meta property="article:published_time" content={publishedDate} />
)}

<!-- JSON-LD Person (all pages) -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Victor Bertram",
  "jobTitle": "Senior Full Stack Developer",
  "url": siteUrl,
  "sameAs": [
    "https://github.com/victorbertram",
    "https://linkedin.com/in/victorbertram"
  ]
})} />
```

- [ ] **Step 2: Create BaseLayout**

```astro
---
// src/layouts/BaseLayout.astro
import SEOHead from '../components/SEOHead.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  lang?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
}

const { title, description, lang = 'pt', ogImage, type, publishedDate } = Astro.props;
---

<!DOCTYPE html>
<html lang={lang}>
<head>
  <SEOHead title={title} description={description} lang={lang} ogImage={ogImage} type={type} publishedDate={publishedDate} />
</head>
<body class="bg-navy text-text-primary font-sans min-h-screen flex flex-col">
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-accent focus:text-navy focus:px-4 focus:py-2 focus:rounded focus:z-50">
    Skip to content
  </a>
  <Navbar lang={lang} />
  <main id="main-content" class="flex-1">
    <slot />
  </main>
  <Footer lang={lang} />
</body>
</html>
```

- [ ] **Step 3: Verify layout renders**

Create temporary `src/pages/index.astro` that uses BaseLayout with `<h1>Hello</h1>`. Run `npm run dev`. Verify: dark background, Inter font, skip-to-content link visible on Tab press.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/ src/components/SEOHead.astro
git commit -m "feat: add BaseLayout with SEO head, skip-to-content, font loading"
```

---

## Task 4: Navbar & Footer Components

**Files:**
- Create: `src/components/Navbar.astro`, `src/components/MobileNav.tsx`, `src/components/Footer.astro`, `src/components/LanguageSwitcher.astro`

- [ ] **Step 1: Create LanguageSwitcher**

```astro
---
// src/components/LanguageSwitcher.astro
import { languages, type Lang } from '../i18n/config';

interface Props {
  currentLang: Lang;
  currentPath: string;
}

const { currentLang, currentPath } = Astro.props;

function getPathForLang(lang: Lang): string {
  const cleanPath = currentPath.replace(/^\/(en|es)/, '') || '/';
  if (lang === 'pt') return cleanPath;
  return `/${lang}${cleanPath}`;
}
---

<div class="flex gap-1 items-center">
  {Object.entries(languages).map(([code, label]) => (
    <a
      href={getPathForLang(code as Lang)}
      class:list={[
        'text-xs px-2 py-0.5 rounded transition-colors',
        code === currentLang
          ? 'text-accent border border-accent font-semibold'
          : 'text-text-secondary hover:text-text-primary'
      ]}
      aria-label={`Switch to ${label}`}
      aria-current={code === currentLang ? 'true' : undefined}
    >
      {code.toUpperCase()}
    </a>
  ))}
</div>
```

- [ ] **Step 2: Create Navbar**

```astro
---
// src/components/Navbar.astro
import LanguageSwitcher from './LanguageSwitcher.astro';
import MobileNav from './MobileNav.tsx';
import { t, getLocalizedPath, type Lang } from '../i18n/config';

interface Props { lang: Lang; }
const { lang } = Astro.props;
const currentPath = Astro.url.pathname;

const navLinks = [
  { label: t(lang, 'nav.home'), href: getLocalizedPath('/', lang) },
  { label: t(lang, 'nav.projects'), href: getLocalizedPath('/projects', lang) },
  { label: t(lang, 'nav.services'), href: getLocalizedPath('/services', lang) },
  { label: t(lang, 'nav.blog'), href: getLocalizedPath('/blog', lang) },
];
const contactHref = getLocalizedPath('/contact', lang);
---

<header class="fixed top-0 left-0 right-0 z-50">
  <!-- Top bar (desktop only) -->
  <div class="hidden lg:flex bg-navy-dark px-8 py-1.5 justify-between items-center text-xs">
    <div class="flex gap-3 items-center text-text-secondary">
      <span>victor@email.com</span>
      <span class="text-border">|</span>
      <span>Chapecó, SC - Brasil</span>
    </div>
    <div class="flex gap-3 items-center">
      <div class="flex gap-2">
        <a href="https://github.com/victorbertram" target="_blank" rel="noopener" aria-label="GitHub" class="text-text-secondary hover:text-accent transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
        <a href="https://linkedin.com/in/victorbertram" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-text-secondary hover:text-accent transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://wa.me/5549998218294?text=Ol%C3%A1%20Victor%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto." target="_blank" rel="noopener" aria-label="WhatsApp" class="text-accent hover:text-accent/80 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
      <span class="text-border">|</span>
      <LanguageSwitcher currentLang={lang} currentPath={currentPath} />
    </div>
  </div>

  <!-- Main nav -->
  <nav class="bg-navy/95 backdrop-blur-md border-b border-navy-light px-6 lg:px-8 py-3 flex justify-between items-center">
    <a href={getLocalizedPath('/', lang)} class="text-text-primary font-extrabold text-lg tracking-tight">
      Victor<span class="text-accent">.</span>Bertram
    </a>

    <!-- Desktop links -->
    <div class="hidden md:flex gap-6 items-center">
      {navLinks.map(link => (
        <a href={link.href} class="text-text-secondary text-sm font-medium hover:text-accent transition-colors">
          {link.label}
        </a>
      ))}
      <a href={contactHref} class="border border-accent text-accent px-4 py-1.5 rounded text-sm font-semibold hover:bg-accent/10 transition-colors">
        {t(lang, 'nav.contact')}
      </a>
    </div>

    <!-- Mobile hamburger -->
    <MobileNav client:load navLinks={navLinks} contactHref={contactHref} contactLabel={t(lang, 'nav.contact')} lang={lang} currentPath={currentPath} />
  </nav>
</header>

<!-- Spacer for fixed navbar -->
<div class="h-[52px] lg:h-[84px]"></div>
```

- [ ] **Step 3: Create MobileNav React island**

```tsx
// src/components/MobileNav.tsx
import { useState, useEffect, useRef } from 'react';

interface Props {
  navLinks: { label: string; href: string }[];
  contactHref: string;
  contactLabel: string;
  lang: string;
  currentPath: string;
}

export default function MobileNav({ navLinks, contactHref, contactLabel }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>('a, button');
    focusable[0]?.focus();
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="text-text-secondary hover:text-accent transition-colors p-1"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></svg>
        )}
      </button>

      {open && (
        <div ref={menuRef} className="fixed inset-0 top-[52px] bg-navy/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 animate-[fade-in_0.2s_ease-out]">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-text-primary text-2xl font-semibold hover:text-accent transition-colors">
              {link.label}
            </a>
          ))}
          <a href={contactHref} onClick={() => setOpen(false)} className="border border-accent text-accent px-8 py-3 rounded text-lg font-semibold hover:bg-accent/10 transition-colors">
            {contactLabel}
          </a>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create Footer**

```astro
---
// src/components/Footer.astro
import LanguageSwitcher from './LanguageSwitcher.astro';
import { t, getLocalizedPath, type Lang } from '../i18n/config';

interface Props { lang: Lang; }
const { lang } = Astro.props;
const currentPath = Astro.url.pathname;
const whatsappUrl = 'https://wa.me/5549998218294?text=Ol%C3%A1%20Victor%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.';
---

<footer class="bg-navy-dark">
  <!-- Gradient divider -->
  <div class="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

  <div class="max-w-6xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <!-- Col 1: Brand -->
    <div>
      <a href={getLocalizedPath('/', lang)} class="text-text-primary font-extrabold text-lg">
        Victor<span class="text-accent">.</span>Bertram
      </a>
      <p class="text-text-secondary text-xs leading-relaxed mt-3 max-w-[220px]">
        {t(lang, 'footer.bio')}
      </p>
      <div class="flex gap-2 mt-4">
        <a href="https://github.com/victorbertram" target="_blank" rel="noopener" aria-label="GitHub" class="w-8 h-8 border border-border rounded-md flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
        <a href="https://linkedin.com/in/victorbertram" target="_blank" rel="noopener" aria-label="LinkedIn" class="w-8 h-8 border border-border rounded-md flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener" aria-label="WhatsApp" class="w-8 h-8 border border-accent/30 bg-accent/10 rounded-md flex items-center justify-center text-accent hover:bg-accent/20 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>

    <!-- Col 2: Navigation -->
    <div>
      <h4 class="text-text-primary text-[10px] font-semibold uppercase tracking-[1.5px] mb-3">{t(lang, 'footer.navigation')}</h4>
      <nav class="flex flex-col gap-2" aria-label="Footer navigation">
        <a href={getLocalizedPath('/', lang)} class="text-text-secondary text-xs hover:text-accent transition-colors">{t(lang, 'nav.home')}</a>
        <a href={getLocalizedPath('/projects', lang)} class="text-text-secondary text-xs hover:text-accent transition-colors">{t(lang, 'nav.projects')}</a>
        <a href={getLocalizedPath('/services', lang)} class="text-text-secondary text-xs hover:text-accent transition-colors">{t(lang, 'nav.services')}</a>
        <a href={getLocalizedPath('/blog', lang)} class="text-text-secondary text-xs hover:text-accent transition-colors">{t(lang, 'nav.blog')}</a>
        <a href={getLocalizedPath('/contact', lang)} class="text-text-secondary text-xs hover:text-accent transition-colors">{t(lang, 'nav.contact')}</a>
      </nav>
    </div>

    <!-- Col 3: Services -->
    <div>
      <h4 class="text-text-primary text-[10px] font-semibold uppercase tracking-[1.5px] mb-3">{t(lang, 'footer.services')}</h4>
      <div class="flex flex-col gap-2">
        <span class="text-text-secondary text-xs">Web Development</span>
        <span class="text-text-secondary text-xs">Mobile Apps</span>
        <span class="text-text-secondary text-xs">API & Backend</span>
        <span class="text-text-secondary text-xs">Tech Consulting</span>
        <span class="text-text-secondary text-xs">Automations</span>
      </div>
    </div>

    <!-- Col 4: Contact -->
    <div>
      <h4 class="text-text-primary text-[10px] font-semibold uppercase tracking-[1.5px] mb-3">{t(lang, 'footer.contact')}</h4>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64ffda" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span class="text-text-secondary text-xs">victor@email.com</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64ffda" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span class="text-text-secondary text-xs">Chapecó, SC - Brasil</span>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener" class="flex items-center gap-2 text-accent text-xs font-medium hover:text-accent/80 transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
        <div class="mt-2">
          <a href="/cv-victor-bertram.pdf" download class="inline-flex border border-accent text-accent px-3 py-1 rounded text-[10px] font-semibold hover:bg-accent/10 transition-colors">
            {t(lang, 'footer.download_cv')} ↓
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Availability badge -->
  <div class="border-t border-navy-light py-2.5 text-center">
    <div class="inline-flex items-center gap-1.5 bg-accent/5 border border-accent/20 px-4 py-1 rounded-full">
      <div class="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
      <span class="text-accent text-[10px] font-medium">{t(lang, 'footer.available')}</span>
    </div>
  </div>

  <!-- Copyright bar -->
  <div class="border-t border-navy-light px-6 lg:px-8 py-3 flex justify-between items-center max-w-6xl mx-auto">
    <span class="text-text-secondary text-[10px]">© 2026 Victor Bertram. {t(lang, 'footer.rights')}</span>
    <LanguageSwitcher currentLang={lang} currentPath={currentPath} />
  </div>
</footer>
```

- [ ] **Step 5: Verify navbar and footer**

Run `npm run dev`. Check:
- Top bar visible on desktop (>1024px), hidden on mobile
- Hamburger appears on mobile, opens overlay, closes on ESC
- Footer 4 columns on desktop, 2x2 on tablet, stacked on mobile
- Language switcher changes URL prefix correctly
- WhatsApp link opens correct URL with pre-filled message
- Tab key shows skip-to-content, all icon buttons have ARIA labels
- Focus outline visible on interactive elements

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.astro src/components/MobileNav.tsx src/components/Footer.astro src/components/LanguageSwitcher.astro
git commit -m "feat: add Navbar with top bar, MobileNav, Footer, LanguageSwitcher"
```

---

## Task 5: ScrollAnimation & Carousel Components

**Files:**
- Create: `src/components/ScrollAnimation.astro`, `src/components/Carousel.tsx`

- [ ] **Step 1: Create ScrollAnimation**

```astro
---
// src/components/ScrollAnimation.astro
interface Props {
  animation?: 'fade-in' | 'slide-up' | 'scale-in';
  class?: string;
}

const { animation = 'fade-in', class: className = '' } = Astro.props;
---

<div data-animate={animation} class={className}>
  <slot />
</div>

<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const anim = el.dataset.animate;
          if (anim === 'fade-in') el.classList.add('animate-fade-in');
          else if (anim === 'slide-up') el.classList.add('animate-slide-up');
          else if (anim === 'scale-in') el.classList.add('animate-scale-in');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
</script>
```

- [ ] **Step 2: Create Carousel React island**

```tsx
// src/components/Carousel.tsx
import { useRef, useState, useEffect, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Carousel({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, []);

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(':scope > *')?.clientWidth ?? 300;
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') scroll('left');
    if (e.key === 'ArrowRight') scroll('right');
  }

  return (
    <div className="relative group" role="region" aria-label="Carousel" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Arrows (desktop only) */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Previous"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 border border-accent rounded-full items-center justify-center text-accent disabled:opacity-20 disabled:cursor-not-allowed hover:bg-accent/10 transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Next"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-accent rounded-full items-center justify-center text-navy disabled:opacity-20 disabled:cursor-not-allowed hover:bg-accent/90 transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>
    </div>
  );
}
```

Card widths are controlled via CSS classes on the children: `min-w-[calc((100%-16px)/1.5)]` on mobile, `min-w-[calc((100%-48px)/3)]` on tablet (sm), `min-w-[calc((100%-64px)/5)]` on desktop (lg). Each child should have `snap-start flex-shrink-0`.

When fewer items than visible slots, the `canScrollRight` stays false and arrows stay disabled — cards naturally fill the space.

- [ ] **Step 3: Verify both components**

Add test content to index.astro. Verify:
- ScrollAnimation triggers on scroll entry
- Carousel scrolls with arrows and touch/drag
- Arrows disable at edges
- Keyboard left/right works when carousel is focused
- Responsive: 5 cards desktop, 3 tablet, 1.5 mobile

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollAnimation.astro src/components/Carousel.tsx
git commit -m "feat: add ScrollAnimation (Intersection Observer) and Carousel components"
```

---

## Task 6: Data Layer — Projects & Services

**Files:**
- Create: `src/data/projects.ts`, `src/data/services.ts`

- [ ] **Step 1: Create projects data**

Full `src/data/projects.ts` with 5 projects: app-mobile, discador-voip, whatsapp-bots, api-migration, feedback-hub. Each with `slug`, `image`, `tech[]`, `links`, `featured: boolean`, `translations` (pt/en/es with title, description, problem, solution, result). Full Portuguese text from spec. English and Spanish translations complete.

The `featured` field controls which projects appear in the Home carousel.

- [ ] **Step 2: Create services data**

Full `src/data/services.ts` with 5 services: Web Development, Mobile Apps, API & Backend, Tech Consulting, Automations. Each with `icon` (SVG name), `translations` (pt/en/es with title, description).

- [ ] **Step 3: Verify TypeScript and data imports**

```bash
npm run build
```

Expected: No type errors. Import projects/services in a test page and render one item to confirm data structure.

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add projects and services data with i18n translations"
```

---

## Task 7: Card Components

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/BlogCard.astro`

- [ ] **Step 1: Create ProjectCard**

```astro
---
// src/components/ProjectCard.astro
import { getLocalizedPath, type Lang } from '../i18n/config';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  lang: Lang;
}

const { project, lang } = Astro.props;
const tr = project.translations[lang] ?? project.translations.pt;
---

<a
  href={getLocalizedPath(`/projects/${project.slug}`, lang)}
  class="snap-start flex-shrink-0 min-w-[calc((100%-16px)/1.5)] sm:min-w-[calc((100%-32px)/3)] lg:min-w-[calc((100%-64px)/5)] bg-navy-light rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 group"
>
  <div class="h-24 bg-gradient-to-br from-navy-light to-navy flex items-center justify-center">
    <img src={project.image} alt={tr.title} class="w-full h-full object-cover" loading="lazy" />
  </div>
  <div class="p-3">
    <h3 class="text-text-primary text-sm font-bold group-hover:text-accent transition-colors">{tr.title}</h3>
    <p class="text-text-secondary text-xs mt-1 line-clamp-2 leading-relaxed">{tr.description}</p>
    <div class="flex gap-1.5 mt-2 flex-wrap">
      {project.tech.slice(0, 3).map(t => (
        <span class="bg-navy text-accent px-2 py-0.5 rounded-full text-[10px]">{t}</span>
      ))}
    </div>
  </div>
</a>
```

- [ ] **Step 2: Create BlogCard**

```astro
---
// src/components/BlogCard.astro
import { getLocalizedPath, type Lang } from '../i18n/config';
import { t as translate } from '../i18n/config';

interface Props {
  title: string;
  description: string;
  date: Date;
  readingTime: number;
  tags: string[];
  slug: string;
  category: string;
  lang: Lang;
}

const { title, description, readingTime, tags, slug, category, lang } = Astro.props;

const categoryColors: Record<string, string> = {
  'Segurança': '#ff6b6b',
  'Security': '#ff6b6b',
  'IA': '#a78bfa',
  'AI': '#a78bfa',
  'Ferramentas': '#60a5fa',
  'Tools': '#60a5fa',
  'DevOps': '#34d399',
  'Backend': '#f59e0b',
};
const color = categoryColors[category] ?? '#64ffda';
---

<a
  href={getLocalizedPath(`/blog/${slug}`, lang)}
  class="snap-start flex-shrink-0 min-w-[calc((100%-16px)/1.5)] sm:min-w-[calc((100%-32px)/3)] lg:min-w-[calc((100%-64px)/5)] bg-navy-light rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 group"
>
  <div class="h-20" style={`background: linear-gradient(135deg, ${color}22, #112240)`}>
  </div>
  <div class="p-3">
    <h3 class="text-text-primary text-xs font-bold leading-snug group-hover:text-accent transition-colors line-clamp-2">{title}</h3>
    <p class="text-text-secondary text-[10px] mt-1">{category} · {readingTime} {translate(lang, 'blog_page.min_read')}</p>
    <div class="flex gap-1 mt-2 flex-wrap">
      {tags.slice(0, 2).map(tag => (
        <span class="bg-navy text-text-secondary px-1.5 py-0.5 rounded-full text-[9px]">{tag}</span>
      ))}
    </div>
  </div>
</a>
```

- [ ] **Step 3: Verify cards render with real data**

Import ProjectCard/BlogCard in test page, pass real project data. Check: hover effects, link generation, responsive sizing, image lazy loading.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro src/components/BlogCard.astro
git commit -m "feat: add ProjectCard and BlogCard components"
```

---

## Task 8: Home Page — All Sections

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Build complete Home page**

Assemble all sections in `src/pages/index.astro` using BaseLayout:

1. **Hero** — full viewport, greeting, name, headline, bio, CTAs, social links
2. **About** — numbered "01.", bio with metrics, photo placeholder, tech list, ScrollAnimation fade-in
3. **Projects carousel** — numbered "02.", Carousel with ProjectCard children (featured only), "Ver todos →" link, ScrollAnimation slide-up
4. **Blog carousel** — numbered "03.", Carousel with BlogCard children (latest posts from content collection), "Todos os artigos →" link, ScrollAnimation fade-in. Show placeholder if no posts yet.
5. **CTA** — numbered "04.", centered, ScrollAnimation scale-in

All text pulled from `t(lang, ...)`. Lang defaults to `'pt'` on this page.

- [ ] **Step 2: Verify full Home page**

Run `npm run dev`. Check all sections render, scroll animations trigger, carousels work, responsive layout correct at 375px/768px/1280px widths.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build Home page with hero, about, projects carousel, blog carousel, CTA"
```

---

## Task 9: Localized Home Pages (EN/ES)

**Files:**
- Create: `src/pages/en/index.astro`, `src/pages/es/index.astro`

- [ ] **Step 1: Extract shared Home sections**

If index.astro is large, extract sections into `src/components/home/HeroSection.astro`, `AboutSection.astro`, `ProjectsSection.astro`, `BlogSection.astro`, `CTASection.astro` — each accepting a `lang` prop. Then each locale page simply imports and composes these sections.

- [ ] **Step 2: Create EN and ES pages**

Each passes `lang="en"` / `lang="es"` to BaseLayout and section components.

- [ ] **Step 3: Verify language switching and content correctness**

Navigate `/`, `/en/`, `/es/`. Verify:
- All text changes to correct language (no PT leaking into EN/ES)
- Links point to correct locale
- LanguageSwitcher highlights current
- SEO head has correct `lang` and `hreflang`

- [ ] **Step 4: Commit**

```bash
git add src/pages/en/ src/pages/es/ src/components/home/
git commit -m "feat: add EN and ES home pages with shared section components"
```

---

## Task 10: Projects Pages

**Files:**
- Create: `src/components/ProjectFilter.tsx`, `src/layouts/ProjectLayout.astro`
- Create: `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`
- Create: `src/pages/en/projects/index.astro`, `src/pages/en/projects/[slug].astro`
- Create: `src/pages/es/projects/index.astro`, `src/pages/es/projects/[slug].astro`

- [ ] **Step 1: Create ProjectFilter React island**

```tsx
// src/components/ProjectFilter.tsx
import { useState } from 'react';

interface Props {
  allTechs: string[];
  allLabel: string;
  children: React.ReactNode;
  projectTechs: Record<string, string[]>; // slug -> tech[]
}

export default function ProjectFilter({ allTechs, allLabel, children, projectTechs }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const filteredSlugs = active
    ? Object.entries(projectTechs).filter(([, techs]) => techs.includes(active)).map(([slug]) => slug)
    : null;

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!active ? 'bg-accent text-navy' : 'border border-border text-text-secondary hover:text-accent hover:border-accent/40'}`}
        >
          {allLabel}
        </button>
        {allTechs.map(tech => (
          <button
            key={tech}
            onClick={() => setActive(tech)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${active === tech ? 'bg-accent text-navy' : 'border border-border text-text-secondary hover:text-accent hover:border-accent/40'}`}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-filtered-slugs={filteredSlugs ? JSON.stringify(filteredSlugs) : undefined}>
        {children}
      </div>
    </div>
  );
}
```

Note: Since Astro children are server-rendered, the filter will need to use CSS visibility or data attributes to show/hide cards based on `filteredSlugs`. Alternative: render all cards as React children directly. Choose the approach that keeps code simplest.

- [ ] **Step 2: Create ProjectLayout for detail pages**

```astro
---
// src/layouts/ProjectLayout.astro
import BaseLayout from './BaseLayout.astro';
import { t, type Lang } from '../i18n/config';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  lang: Lang;
}

const { project, lang } = Astro.props;
const tr = project.translations[lang] ?? project.translations.pt;
---

<BaseLayout title={tr.title} description={tr.description} lang={lang}>
  <article class="max-w-4xl mx-auto px-6 py-16">
    <!-- Banner -->
    <div class="rounded-xl overflow-hidden mb-8">
      <img src={project.image} alt={tr.title} class="w-full h-64 object-cover" />
    </div>

    <h1 class="text-3xl font-extrabold text-text-primary mb-4">{tr.title}</h1>

    <!-- Tech stack -->
    <div class="flex gap-2 flex-wrap mb-8">
      {project.tech.map(t => (
        <span class="bg-navy-light text-accent px-3 py-1 rounded-full text-xs border border-border">{t}</span>
      ))}
    </div>

    <!-- Case study sections -->
    <section class="mb-8">
      <h2 class="text-accent font-mono text-sm mb-2">{t(lang, 'projects_page.problem')}</h2>
      <p class="text-text-secondary leading-relaxed">{tr.problem}</p>
    </section>
    <section class="mb-8">
      <h2 class="text-accent font-mono text-sm mb-2">{t(lang, 'projects_page.solution')}</h2>
      <p class="text-text-secondary leading-relaxed">{tr.solution}</p>
    </section>
    <section class="mb-8">
      <h2 class="text-accent font-mono text-sm mb-2">{t(lang, 'projects_page.result')}</h2>
      <p class="text-text-secondary leading-relaxed">{tr.result}</p>
    </section>

    <!-- Links -->
    <div class="flex gap-4">
      {project.links.github && (
        <a href={project.links.github} target="_blank" rel="noopener" class="border border-accent text-accent px-4 py-2 rounded text-sm hover:bg-accent/10 transition-colors">
          GitHub
        </a>
      )}
      {project.links.demo && (
        <a href={project.links.demo} target="_blank" rel="noopener" class="bg-accent text-navy px-4 py-2 rounded text-sm font-semibold hover:bg-accent/90 transition-colors">
          Demo
        </a>
      )}
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Create projects list and detail pages for all locales**

List page: imports projects data, extracts all techs for filter, renders grid. Detail page: `getStaticPaths` generates one page per project slug.

- [ ] **Step 4: Verify all project pages**

Check: list page renders grid, filter works (shows/hides cards), detail pages load with correct content, EN/ES translations show correctly, empty state when filter has no match ("Nenhum projeto..." + clear button).

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectFilter.tsx src/layouts/ProjectLayout.astro src/pages/projects/ src/pages/en/projects/ src/pages/es/projects/
git commit -m "feat: add projects list and detail pages with tech filter and i18n"
```

---

## Task 11: Blog System

**Files:**
- Create: `src/content/config.ts`, `src/content/blog/*.mdx`, `src/layouts/BlogPostLayout.astro`, `src/components/ShareButtons.astro`, `src/components/mdx/CodeBlock.astro`, `src/components/mdx/Alert.astro`, `src/components/mdx/ImageGallery.astro`
- Create: blog pages for all 3 locales

- [ ] **Step 1: Configure content collection**

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    category: z.string(),
    image: z.string().optional(),
    lang: z.enum(['pt', 'en', 'es']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create custom MDX components**

`src/components/mdx/CodeBlock.astro` — styled code block with syntax highlighting (use Astro's built-in Shiki). Wraps `<pre>` with copy button and language label.

`src/components/mdx/Alert.astro` — info/warning/error alert box. Props: `type`, `title`. Colored border/icon.

`src/components/mdx/ImageGallery.astro` — responsive grid of images with alt text. Props: `images: {src, alt}[]`.

- [ ] **Step 3: Create ShareButtons**

```astro
---
// src/components/ShareButtons.astro
interface Props {
  title: string;
  url: string;
}
const { title, url } = Astro.props;
const encodedTitle = encodeURIComponent(title);
const encodedUrl = encodeURIComponent(url);
---

<div class="flex gap-3 items-center">
  <span class="text-text-secondary text-xs">Compartilhar:</span>
  <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener" aria-label="Share on X/Twitter" class="text-text-secondary hover:text-accent transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  </a>
  <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn" class="text-text-secondary hover:text-accent transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  </a>
  <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener" aria-label="Share on WhatsApp" class="text-text-secondary hover:text-accent transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
</div>
```

- [ ] **Step 4: Create BlogPostLayout with TOC and JSON-LD**

```astro
---
// src/layouts/BlogPostLayout.astro
import BaseLayout from './BaseLayout.astro';
import ShareButtons from '../components/ShareButtons.astro';
import { t, type Lang } from '../i18n/config';
import { formatDate, getReadingTime } from '../lib/utils';

interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  category: string;
  lang: Lang;
  headings: { depth: number; slug: string; text: string }[];
  content: string;
}

const { title, description, date, tags, category, lang, headings } = Astro.props;
const siteUrl = 'https://victorbertram.dev';
---

<BaseLayout title={title} description={description} lang={lang} type="article" publishedDate={date.toISOString()}>
  <!-- BlogPosting JSON-LD -->
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": date.toISOString(),
    "author": { "@type": "Person", "name": "Victor Bertram" },
    "url": `${siteUrl}${Astro.url.pathname}`
  })} />

  <div class="max-w-6xl mx-auto px-6 py-16 lg:flex gap-12">
    <!-- TOC (sticky sidebar on desktop, top on mobile) -->
    <aside class="lg:w-56 flex-shrink-0 mb-8 lg:mb-0">
      <nav class="lg:sticky lg:top-24" aria-label="Table of contents">
        <h2 class="text-text-primary text-xs font-semibold uppercase tracking-wider mb-3">Conteúdo</h2>
        <ul class="flex flex-col gap-1.5">
          {headings.filter(h => h.depth <= 3).map(h => (
            <li style={`padding-left: ${(h.depth - 2) * 12}px`}>
              <a href={`#${h.slug}`} class="text-text-secondary text-xs hover:text-accent transition-colors">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>

    <!-- Article -->
    <article class="flex-1 min-w-0">
      <header class="mb-8">
        <p class="text-accent font-mono text-xs mb-2">{category}</p>
        <h1 class="text-3xl font-extrabold text-text-primary mb-3">{title}</h1>
        <div class="flex gap-3 items-center text-text-secondary text-xs">
          <time datetime={date.toISOString()}>{fmtDate(date, lang)}</time>
          <span>·</span>
          <span>{getReadingTime(Astro.props.content ?? '')} {t(lang, 'blog_page.min_read')}</span>
        </div>
        <div class="flex gap-2 mt-3">
          {tags.map(tag => (
            <span class="bg-navy-light text-text-secondary px-2 py-0.5 rounded-full text-[10px] border border-border">{tag}</span>
          ))}
        </div>
      </header>

      <div class="prose prose-invert prose-sm max-w-none prose-headings:text-text-primary prose-a:text-accent prose-code:text-accent">
        <slot />
      </div>

      <footer class="mt-12 pt-8 border-t border-border">
        <ShareButtons title={title} url={`${siteUrl}${Astro.url.pathname}`} />

        <!-- Related posts: show 2-3 posts with matching tags, excluding current -->
        <!-- Implementation: query content collection for posts with overlapping tags, same lang, limit 3 -->
      </footer>
    </article>
  </div>
</BaseLayout>
```

Related posts logic: query content collection for posts sharing at least one tag with the current post, same `lang`, exclude current slug, limit 3. Render as BlogCard components.

- [ ] **Step 5: Create sample blog posts (PT, EN, ES)**

Create `src/content/blog/exemplo-post.pt.mdx`, `exemplo-post.en.mdx`, `exemplo-post.es.mdx` with frontmatter and sample content to test the full pipeline.

- [ ] **Step 6: Create blog list and post pages for all locales**

Blog list page: query content collection filtered by `lang`, render BlogCards in grid, tag filter. Post page: `getStaticPaths` generates pages, renders MDX via BlogPostLayout. Fallback: if translation doesn't exist for requested lang, render PT version with a warning banner using `t(lang, 'blog_page.fallback')`.

- [ ] **Step 7: Verify blog end-to-end**

Check: list page renders cards, post detail renders MDX with TOC, share buttons work, tag filter works, reading time correct, related posts show, fallback works when EN/ES post missing.

- [ ] **Step 8: Commit**

```bash
git add src/content/ src/layouts/BlogPostLayout.astro src/components/ShareButtons.astro src/components/mdx/ src/pages/blog/ src/pages/en/blog/ src/pages/es/blog/
git commit -m "feat: add blog system with MDX, TOC, share buttons, custom components, i18n fallback"
```

---

## Task 12: Services Page

**Files:**
- Create: `src/pages/services.astro`, `src/pages/en/services.astro`, `src/pages/es/services.astro`

- [ ] **Step 1: Create services page**

Grid of service cards from `src/data/services.ts`. Each card: SVG icon, title, description, CTA button → `/contact` (localized). Responsive: 1 col mobile, 2 tablet, 3 desktop. ScrollAnimation on each card.

- [ ] **Step 2: Create EN/ES variants**

Same structure, `lang="en"` / `lang="es"`.

- [ ] **Step 3: Verify all locales render**

Check: all 5 services appear with correct translations, CTA links point to correct locale contact page, responsive grid works, scroll animations trigger.

- [ ] **Step 4: Commit**

```bash
git add src/pages/services.astro src/pages/en/services.astro src/pages/es/services.astro
git commit -m "feat: add services page with i18n"
```

---

## Task 13: Contact Page with WhatsApp Form

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/pages/contact.astro`, `src/pages/en/contact.astro`, `src/pages/es/contact.astro`

- [ ] **Step 1: Create ContactForm React island**

```tsx
// src/components/ContactForm.tsx
import { useState } from 'react';
import { buildWhatsAppUrl } from '../lib/utils';

interface Props {
  labels: {
    name: string; email: string; subject: string; message: string; send: string;
    name_required: string; email_invalid: string; message_required: string;
  };
}

export default function ContactForm({ labels }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = labels.name_required;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = labels.email_invalid;
    if (!form.message.trim()) errs.message = labels.message_required;
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    window.open(buildWhatsAppUrl(form), '_blank');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <label htmlFor="name" className="text-text-secondary text-xs mb-1 block">{labels.name} *</label>
        <input id="name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full bg-navy-light border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
        {errors.name && <p className="text-red-400 text-xs mt-1" role="alert" aria-live="polite">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="text-text-secondary text-xs mb-1 block">{labels.email}</label>
        <input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full bg-navy-light border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
        {errors.email && <p className="text-red-400 text-xs mt-1" role="alert" aria-live="polite">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="text-text-secondary text-xs mb-1 block">{labels.subject}</label>
        <input id="subject" type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className="w-full bg-navy-light border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
      </div>
      <div>
        <label htmlFor="message" className="text-text-secondary text-xs mb-1 block">{labels.message} *</label>
        <textarea id="message" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full bg-navy-light border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none" />
        {errors.message && <p className="text-red-400 text-xs mt-1" role="alert" aria-live="polite">{errors.message}</p>}
      </div>
      <button type="submit" className="bg-accent text-navy font-semibold px-6 py-3 rounded hover:bg-accent/90 transition-colors flex items-center gap-2 justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        {labels.send}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create contact page**

Two columns on desktop: ContactForm (left), side panel with direct links (right). WhatsApp icon + link, email, LinkedIn, location. Single column on mobile.

- [ ] **Step 3: Create EN/ES variants**

- [ ] **Step 4: Test form validation and WhatsApp redirect**

Fill form, submit. Verify:
- Empty name → error shown, form not submitted
- Invalid email → error shown
- Empty message → error shown
- Valid submission → opens WhatsApp in new tab with correctly URL-encoded message containing all fields
- All 3 locales show translated labels and error messages

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactForm.tsx src/pages/contact.astro src/pages/en/contact.astro src/pages/es/contact.astro
git commit -m "feat: add contact page with WhatsApp form, validation, and i18n"
```

---

## Task 14: SEO Final Pass — Sitemap, Robots, OG, Astro Image

**Files:**
- Create: `public/robots.txt`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Configure sitemap with i18n**

Update `astro.config.mjs` sitemap integration to include all localized routes.

- [ ] **Step 2: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://victorbertram.dev/sitemap-index.xml
```

- [ ] **Step 3: Use Astro Image component**

Replace `<img>` tags in ProjectCard, BlogCard, project detail pages, and blog posts with Astro's `<Image>` component from `astro:assets` for automatic optimization (WebP, srcset, lazy loading).

- [ ] **Step 4: Verify font-display swap**

Check that Fontsource imports use `font-display: swap` (it's the default in Fontsource v5+). If not, add explicit `font-display: swap` in global.css `@font-face`.

- [ ] **Step 5: Verify build output**

```bash
npm run build
ls dist/
```

Check: sitemap-index.xml generated with all locales and hreflang, robots.txt present, images optimized, no build errors.

- [ ] **Step 6: Commit**

```bash
git add public/robots.txt astro.config.mjs src/
git commit -m "feat: add sitemap with i18n, robots.txt, Astro Image optimization"
```

---

## Task 15: Pagefind Integration

**Files:**
- Modify: `package.json`, blog list pages

- [ ] **Step 1: Install Pagefind**

```bash
npm install -D pagefind
```

- [ ] **Step 2: Add post-build indexing**

```json
"scripts": {
  "build": "astro build && npx pagefind --site dist"
}
```

- [ ] **Step 3: Integrate Pagefind UI into blog list pages**

Add Pagefind's default UI script and CSS. Style the search input with dark theme overrides to match navy/accent colors.

- [ ] **Step 4: Verify search works**

```bash
npm run build && npx serve dist
```

Test: search finds blog posts by title and content. Results link correctly.

- [ ] **Step 5: Commit**

```bash
git add package.json src/pages/blog/ src/pages/en/blog/ src/pages/es/blog/
git commit -m "feat: integrate Pagefind for static blog search"
```

---

## Task 16: Cloudflare Pages Deploy

**Files:**
- Optional: `wrangler.toml`

- [ ] **Step 1: Verify build output**

```bash
npm run build && ls dist/
```

All pages generated as static HTML.

- [ ] **Step 2: Connect to Cloudflare Pages**

Via dashboard or CLI:
- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20

- [ ] **Step 3: Configure custom domain (when ready)**

- [ ] **Step 4: Verify live deploy**

Check all pages, i18n, WhatsApp redirect, search, responsive layout on live URL.

- [ ] **Step 5: Commit any deploy config**

```bash
git add -A
git commit -m "feat: add Cloudflare Pages deploy configuration"
```
