# Victor Bertram — Portfolio Design Spec

## Overview

Portfolio pessoal para Victor Bertram, Senior Full Stack Developer. Serve 3 propósitos: posicionamento profissional (emprego), venda de serviços (freelance) e compartilhamento de conteúdo técnico (blog).

## Stack Técnico

- **Framework:** Astro (SSG)
- **UI interativa:** React (Astro Islands)
- **Estilização:** Tailwind CSS
- **Blog:** MDX (arquivos no repositório)
- **i18n:** PT (padrão) / EN / ES — usando Astro i18n routing nativo (`src/pages/[lang]/...`)
- **Busca blog:** Pagefind (indexação estática no build, zero backend)
- **Hosting:** Cloudflare Pages
- **Animações:** Intersection Observer para scroll triggers (fade-in, slide-up, scale-in)

## Design Visual

- **Estilo:** Dark elegante — inspirado em Brittany Chiang, com toque pessoal
- **Fundo:** Navy escuro (#0a192f)
- **Accent:** Teal (#64ffda)
- **Texto principal:** #ccd6f6
- **Texto secundário:** #8892b0
- **Cards/Superfícies:** #112240
- **Bordas:** #1e3a5f
- **Background profundo (footer):** #020c1b
- **Tipografia:** Inter (web font via Fontsource, com system font stack como fallback)
- **Micro-interações:** Hover effects sutis, transições suaves, scroll triggers em todas as seções

## Estrutura de Rotas

Todas as rotas em inglês. Conteúdo traduzido por idioma.

| Rota | Descrição |
|---|---|
| `/` | Home (PT padrão) |
| `/en/` | Home (EN) |
| `/es/` | Home (ES) |
| `/projects` | Lista de projetos com filtro por tech |
| `/projects/[slug]` | Case study individual |
| `/blog` | Lista de artigos com tags e busca |
| `/blog/[slug]` | Artigo MDX completo |
| `/services` | Serviços oferecidos |
| `/contact` | Formulário → WhatsApp |
| `/en/projects` | Projects (EN) |
| `/en/blog` | Blog (EN) |
| `/en/services` | Services (EN) |
| `/en/contact` | Contact (EN) |
| `/es/projects` | Proyectos (ES) |
| `/es/blog` | Blog (ES) |
| `/es/services` | Servicios (ES) |
| `/es/contact` | Contacto (ES) |

Prefixo de idioma: PT sem prefixo (padrão), `/en/...`, `/es/...`. Todas as sub-rotas recebem o prefixo de idioma. Nomes das rotas sempre em inglês (intencional — URLs consistentes independente do idioma).

## Páginas

### Home (`/`)

Single page com seções resumidas que linkam para páginas dedicadas.

**Navbar (fixa, 2 níveis):**
- Top bar: email, localização, ícones sociais (GitHub, LinkedIn, WhatsApp), seletor de idioma
- Nav principal: logo "Victor.Bertram", links (Home, Projects, Services, Blog), botão CTA "Contact"

**Seção 1 — Hero:**
- Saudação ("Olá, meu nome é")
- Nome em destaque grande
- Headline: "Construo sistemas que escalam."
- Bio curta (1-2 linhas)
- 2 CTAs: "Ver projetos" (outline) e "Fale comigo" (filled)
- Links sociais (GitHub, LinkedIn)
- Viewport inteira

**Seção 2 — Sobre:**
- Numeração "01. Sobre mim"
- Bio focada em resultados (métricas: -60% latência, -70% queries, -40% incidentes)
- Foto pessoal
- Lista de tech stack principal
- Animação: fade-in no scroll

**Seção 3 — Projetos (carrossel):**
- Numeração "02. Projetos"
- Carrossel horizontal: 5 cards visíveis (desktop), 3 (tablet), 1.5 (mobile)
- Setas de navegação (← →) no desktop, swipe touch no mobile, drag para scroll
- Não faz loop — para nas bordas. Sem autoplay.
- Link "Ver todos →" para `/projects`
- Cada card: imagem/ícone de capa, título, descrição curta, tags de tecnologia
- Animação: slide-up no scroll

**Seção 4 — Blog (carrossel):**
- Numeração "03. Blog"
- Mesmo formato de carrossel (5 desktop, 3 tablet, 1.5 mobile, sem loop, sem autoplay)
- Setas no desktop, swipe touch no mobile
- Link "Todos os artigos →" para `/blog`
- Cada card: cor de categoria, ícone, título, categoria + tempo de leitura, tags
- Animação: fade-in no scroll

**Seção 5 — CTA Contato:**
- Numeração "04. E aí?"
- Título: "Vamos trabalhar juntos?"
- Texto sobre disponibilidade
- Botão "Entrar em contato" → `/contact`
- Animação: scale-in no scroll

**Footer (4 colunas):**
- Coluna 1: Logo "Victor.Bertram", bio curta, ícones sociais SVG (GitHub, LinkedIn, WhatsApp)
  - WhatsApp com destaque verde, direciona para `wa.me/5549998218294?text=Olá Victor, vi seu portfólio e gostaria de conversar sobre um projeto.`
- Coluna 2: Navegação (Home, Projects, Services, Blog, Contact)
- Coluna 3: Serviços (Web Dev, Mobile Apps, API & Backend, Tech Consulting, Automations)
- Coluna 4: Contato (email com ícone, localização com ícone, WhatsApp com ícone, botão Download CV)
- Badge: "Disponível para novos projetos" com indicador verde
- Barra inferior: copyright + seletor de idioma
- Divisor gradiente teal sutil no topo

### Projects (`/projects`)

- Grid de cards (mesmo estilo visual do carrossel da home)
- Filtro por tecnologia no topo (tags clicáveis)
- Cada card linka para o case study individual

### Project Detail (`/projects/[slug]`)

- Banner com screenshot/imagem do projeto
- Formato case study: Problema → Solução → Resultado
- Tech stack usada
- Métricas de impacto quantificadas
- Links para código (GitHub) e demo (se disponível)

### Blog (`/blog`)

- Lista de artigos (cards no estilo do carrossel)
- Filtro por tags/categorias
- Busca por texto (Pagefind — indexação estática no build, UI integrada)
- Cada card: imagem de capa, título, resumo, data, tempo de leitura, tags

### Blog Post (`/blog/[slug]`)

- Artigo completo renderizado de MDX
- Table of contents lateral (sticky)
- Metadata: data, tempo de leitura, tags, autor
- Botões de compartilhar
- Artigos relacionados no final
- Componentes MDX custom disponíveis: CodeBlock, ImageGallery, Table, Alert, etc.

### Services (`/services`)

- Cards de serviço com ícone, título, descrição
- Serviços: Web Development, Mobile Apps, API & Backend, Tech Consulting, Automations
- CTA em cada card → WhatsApp ou formulário de contato

### Contact (`/contact`)

- Formulário: nome, email, assunto, mensagem
- Validação client-side: nome e mensagem obrigatórios, email com formato válido
- Ao clicar "Enviar", monta mensagem formatada e URL-encoded, redireciona para WhatsApp:
  ```
  https://wa.me/5549998218294?text={encodeURIComponent(mensagem_formatada)}

  Mensagem formatada:
  Olá Victor!

  Nome: {nome}
  Email: {email}
  Assunto: {assunto}
  Mensagem: {mensagem}
  ```
- Sem backend — tudo client-side
- Links diretos: WhatsApp, email, LinkedIn
- Localização: Chapecó, SC - Brasil

## Internacionalização (i18n)

- 3 idiomas: Português (padrão), English, Español
- PT sem prefixo na URL, EN com `/en/`, ES com `/es/`
- Implementação: Astro i18n routing nativo (`src/pages/[lang]/...`)
- Seletor de idioma na navbar (top bar) e no footer
- Arquivos de tradução para textos estáticos em `src/i18n/`: `pt.json`, `en.json`, `es.json`
- Conteúdo MDX do blog: um arquivo por idioma (`post-slug.pt.mdx`, `post-slug.en.mdx`, `post-slug.es.mdx`)
  - **Fallback:** se tradução não existir, exibe versão PT com aviso "Artigo disponível apenas em português"
  - Conteúdo EN/ES será gerado via IA (Victor tem inglês básico e espanhol fluente)
- Projetos: arquivo `src/data/projects.ts` com schema tipado:
  ```ts
  {
    slug: string
    image: string
    tech: string[]
    links: { github?: string, demo?: string }
    translations: {
      pt: { title, description, problem, solution, result }
      en: { title, description, problem, solution, result }
      es: { title, description, problem, solution, result }
    }
  }
  ```

## Componentes Compartilhados

- `Navbar` — fixa, 2 níveis, responsiva (hamburger no mobile)
- `Footer` — 4 colunas, responsivo
- `CarouselSection` — carrossel horizontal reutilizável (projetos e blog)
- `ProjectCard` — card de projeto
- `BlogCard` — card de artigo
- `ScrollAnimation` — wrapper Intersection Observer para animações de entrada
- `LanguageSwitcher` — seletor PT/EN/ES
- `ContactForm` — formulário que monta URL do WhatsApp
- `SEOHead` — meta tags, Open Graph, structured data

## SEO

- `generateMetadata` equivalente no Astro para cada página
- Sitemap automático
- Open Graph tags para compartilhamento social
- Structured data (JSON-LD) para Person e BlogPosting
- URLs canônicas com hreflang para i18n
- Imagens otimizadas (Astro Image)

## Responsividade

Breakpoints (Tailwind defaults):
- **Mobile:** < 640px — 1 coluna, navbar com hamburger, carrossel 1.5 cards, footer empilhado
- **Tablet:** 640px–1024px — 2 colunas, carrossel 3 cards, footer 2x2
- **Desktop:** > 1024px — layout completo, carrossel 5 cards, footer 4 colunas

## Acessibilidade

- Navegação por teclado em todos os elementos interativos
- ARIA labels em ícones e botões sem texto
- Foco visível (outline) em elementos interativos
- Alt text em todas as imagens
- Contraste: #64ffda sobre #0a192f = 8.5:1 (passa AA e AAA). Textos pequenos em #8892b0 sobre #0a192f = 4.6:1 (passa AA)
- Skip to content link
- Carrossel acessível via teclado (setas)

## Estados Vazios

- **Blog sem posts:** Mensagem "Em breve novos artigos" + CTA para seguir no LinkedIn
- **Projetos sem match no filtro:** "Nenhum projeto com essa tecnologia" + botão limpar filtro
- **Carrossel com < 5 itens:** Cards se expandem para preencher, setas desabilitadas

## Performance

- SSG (Static Site Generation) — todas as páginas pré-renderizadas
- Zero JS por padrão (Astro), React islands apenas onde necessário
- Lazy loading de imagens abaixo do fold
- Font display swap
- Cloudflare CDN global

## Dados do Victor (referência)

- **Nome:** Victor Bertram
- **Cargo:** Senior Full Stack Developer
- **Experiência:** 5+ anos
- **Stack:** Node.js, TypeScript, React, Next.js, NestJS, .NET/C#
- **Infra:** Kafka, Redis, WebSockets, BullMQ, Docker, Kubernetes
- **Empresas:** IXC Soft (atual), Multisoftware/nstech, So Tem Tec
- **Formação:** ADS Anhanguera (cursando), Full-Stack SENAI
- **Idiomas:** Português (nativo), Espanhol (fluente), Inglês (básico)
- **Destaques:** Entrevista SCC/SBT, DevTalks, App mobile em desenvolvimento
- **WhatsApp:** +55 49 99821-8294
- **Localização:** Chapecó, SC, Brasil
