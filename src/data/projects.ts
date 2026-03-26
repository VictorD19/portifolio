import type { Lang } from '../i18n/config';

export interface ProjectHighlight {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  featured: boolean;
  image?: string;
  imageMobile?: string;
  badge?: string;
  tech: string[];
  year: number;
  duration: string;
  category: string;
  links?: {
    github?: string;
    live?: string;
  };
  screenshots?: string[];
  highlights: ProjectHighlight[];
  translations: Record<Lang, {
    title: string;
    description: string;
    problem: string;
    solution: string;
    result: string;
    role: string;
  }>;
}

export const projects: Project[] = [
  {
    slug: 'smartvoz',
    featured: true,
    image: '/images/projects/discador-voip.png',
    imageMobile: '/images/projects/discador-voip-mobile.png',
    screenshots: [
      '/images/projects/smartvoz001.png',
      '/images/projects/smartvoz002.png',
      '/images/projects/smartvoz003.png',
      '/images/projects/smartvoz004.png',
      '/images/projects/smartvoz005.png',
      '/images/projects/smartvoz006.png',
    ],
    tech: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Sequelize', 'Redis', 'BullMQ', 'Asaas API', 'AWS', 'Docker', 'GitHub CI/CD', 'Tailwind CSS'],
    year: 2024,
    duration: '1.5 anos',
    category: 'MobileTech / SaaS',
    links: {
      live: 'https://smartvoz.com.br',
    },
    highlights: [
      { value: '2k+', label: 'usuários ativos' },
      { value: 'R$ 568k+', label: 'transacionados' },
      { value: '24k+', label: 'linhas ativas' },
      { value: 'R$ 47k+', label: 'comissões pagas' },
    ],
    translations: {
      pt: {
        title: 'SmartVoz',
        description: 'Plataforma MobileTech para venda de planos telefônicos com marketing multinível de até 5 níveis, pagamento automático de comissões, dashboards interativos e cadastro com biometria facial.',
        problem: 'Clientes de planos telefônicos tinham altas taxas de inadimplência. Não existia um incentivo real para que pagassem em dia — muito menos para indicarem novas pessoas.\nA operação dependia de processos manuais: controle de comissões em planilhas, cadastros sem nenhuma verificação de identidade e zero visibilidade sobre quem indicava quem.\nRevendedores não tinham como acompanhar seus ganhos, visualizar sua rede ou projetar receita futura. O resultado era churn alto e crescimento estagnado.',
        solution: 'Arquitetei e desenvolvi do zero uma plataforma SaaS completa que transformou o modelo de negócio.\nMotor de comissões automáticas com distribuição em até 5 níveis de profundidade na rede MLM — o incentivo financeiro direto reduziu inadimplência e acelerou indicações.\nCadastro com verificação por biometria facial via AWS Rekognition, eliminando fraudes e contas duplicadas.\nDashboards interativos com visualização da rede em árvore, projeção de ganhos em tempo real e histórico completo de rendimentos.\nMódulo financeiro com transferências entre usuários da rede, gestão de créditos e integração com Asaas para cobrança recorrente automática.\nPainel administrativo com métricas em tempo real: MRR, churn, crescimento da base e performance por nível.',
        result: 'Mais de 2.000 usuários ativos na plataforma, com crescimento orgânico impulsionado pelo próprio programa de indicações.\nR$ 568k+ em volume total transacionado e R$ 47k+ em comissões distribuídas automaticamente pela rede multinível.\nMais de 24.000 linhas telefônicas ativas gerenciadas pela plataforma.\n47% da base indica ativamente outras pessoas — prova de que o modelo de incentivo funciona na prática.',
        role: 'Full Stack Developer & Arquiteto de Software',
      },
      en: {
        title: 'SmartVoz',
        description: 'MobileTech platform for selling phone plans with multi-level marketing up to 5 levels deep, automatic commission payments, interactive dashboards, and facial biometry registration.',
        problem: 'Phone plan customers had high delinquency rates. There was no real incentive to pay on time — let alone refer new people.\nOperations relied on manual processes: commission tracking in spreadsheets, registrations with no identity verification, and zero visibility into who referred whom.\nResellers had no way to track their earnings, visualize their network, or project future revenue. The result was high churn and stagnant growth.',
        solution: 'I architected and developed a complete SaaS platform from scratch that transformed the business model.\nAutomatic commission engine with distribution across up to 5 MLM network depth levels — the direct financial incentive reduced delinquency and accelerated referrals.\nRegistration with facial biometry verification via AWS Rekognition, eliminating fraud and duplicate accounts.\nInteractive dashboards with tree network visualization, real-time earnings projection, and complete income history.\nFinancial module with transfers between network users, credit management, and Asaas integration for automatic recurring billing.\nAdmin panel with real-time metrics: MRR, churn, base growth, and performance by network level.',
        result: 'Over 2,000 active users on the platform, with organic growth driven by the referral program itself.\nR$ 568k+ in total transaction volume and R$ 47k+ in commissions automatically distributed through the multi-level network.\nMore than 24,000 active phone lines managed by the platform.\n47% of the user base actively refers others — proof that the incentive model works in practice.',
        role: 'Full Stack Developer & Software Architect',
      },
      es: {
        title: 'SmartVoz',
        description: 'Plataforma MobileTech para venta de planes telefónicos con marketing multinivel de hasta 5 niveles, pago automático de comisiones, dashboards interactivos y registro con biometría facial.',
        problem: 'Los clientes de planes telefónicos tenían altas tasas de morosidad. No existía un incentivo real para que pagaran a tiempo — mucho menos para que refirieran nuevas personas.\nLa operación dependía de procesos manuales: control de comisiones en hojas de cálculo, registros sin verificación de identidad y cero visibilidad sobre quién refería a quién.\nLos revendedores no podían acompañar sus ganancias, visualizar su red ni proyectar ingresos futuros. El resultado era churn alto y crecimiento estancado.',
        solution: 'Diseñé y desarrollé desde cero una plataforma SaaS completa que transformó el modelo de negocio.\nMotor de comisiones automáticas con distribución en hasta 5 niveles de profundidad en la red MLM — el incentivo financiero directo redujo la morosidad y aceleró las referencias.\nRegistro con verificación por biometría facial vía AWS Rekognition, eliminando fraudes y cuentas duplicadas.\nDashboards interactivos con visualización de la red en árbol, proyección de ganancias en tiempo real e historial completo de rendimientos.\nMódulo financiero con transferencias entre usuarios de la red, gestión de créditos e integración con Asaas para cobro recurrente automático.\nPanel administrativo con métricas en tiempo real: MRR, churn, crecimiento de la base y rendimiento por nivel.',
        result: 'Más de 2.000 usuarios activos en la plataforma, con crecimiento orgánico impulsado por el propio programa de referidos.\nR$ 568k+ en volumen total transaccionado y R$ 47k+ en comisiones distribuidas automáticamente por la red multinivel.\nMás de 24.000 líneas telefónicas activas gestionadas por la plataforma.\n47% de la base indica activamente a otras personas — prueba de que el modelo de incentivo funciona en la práctica.',
        role: 'Full Stack Developer & Arquitecto de Software',
      },
    },
  },
  {
    slug: 'sistema-zapchat',
    featured: true,
    image: '/images/projects/whatsapp-bots.png',
    imageMobile: '/images/projects/whatsapp-bots-mobile.png',
    screenshots: [
      '/images/projects/sistemazachat001.png',
      '/images/projects/sistemazachat002.png',
      '/images/projects/sistemazachat003.png',
      '/images/projects/sistemazachat004.png',
      '/images/projects/sistemazachat005.png',
    ],
    tech: ['Node.js', 'FastAPI', 'TypeScript', 'Next.js', 'React', 'TailwindCSS', 'Zustand', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'WebSocket', 'JWT', 'Zod', 'OpenAI', 'Evolution API', 'Docker', 'Nginx', 'MinIO', 'Cloudflare R2', 'Digital Ocean', 'GitHub Actions', 'Sentry'],
    year: 2026,
    duration: '2.5 meses',
    category: 'SaaS',
    links: {
      live: 'https://sistemaZapChat.com',
    },
    highlights: [
      { value: '80%', label: 'fechamentos e agendamentos' },
      { value: '500k+', label: 'mensagens trocadas' },
      { value: '3x', label: 'mais leads coletados' },
    ],
    translations: {
      pt: {
        title: 'SistemaZapChat',
        description: 'Plataforma SaaS multi-tenant focada em vendas pelo WhatsApp. Conta com CRM integrado, assistentes virtuais com IA, bases de conhecimento, funil de vendas, disparos em massa, extração de contatos, listas de contatos, menção em grupos, tageamento, gestão de usuários e empresas — tudo em uma única solução.',
        problem: 'Profissionais de marketing digital (lançamentos, infoprodutos), empresas locais, consultórios e clínicas perdiam vendas e agendamentos por não conseguirem responder leads rápido o suficiente pelo WhatsApp.\nDurante lançamentos digitais, o volume de mensagens explodia e a equipe não dava conta — leads esfriavam em minutos. Empresas locais e consultórios perdiam clientes por demora no atendimento, falta de follow-up e zero controle sobre o funil de conversão.\nTudo era manual: sem CRM, sem automação, sem visibilidade de quem estava sendo atendido ou ignorado.',
        solution: 'Desenvolvi um SaaS multi-tenant com funcionalidades que atacam diretamente a dor do cliente — sem reinventar a roda.\nIntegração com WhatsApp via Evolution API, CRM nativo com funil de vendas em tempo real, assistentes virtuais com IA (GPT-4) e bases de conhecimento para resposta instantânea, disparos em massa, extração de contatos, listas de contatos, menção em grupos e tageamento para campanhas e lançamentos, e painel de gestão de usuários e empresas com permissões granulares.\nCada funcionalidade foi pensada para resolver um problema real: atender rápido, não perder lead, escalar sem aumentar equipe.',
        result: 'Clientes passaram a responder leads em segundos ao invés de horas, recuperando vendas e agendamentos que antes se perdiam.\nEquipes de lançamento digital conseguiram escalar o atendimento durante picos sem contratar.\nConsultórios e empresas locais reduziram no-shows com follow-up automatizado e aumentaram a taxa de conversão em até 3x.',
        role: 'Full Stack Developer & Product Owner',
      },
      en: {
        title: 'SistemaZapChat',
        description: 'Multi-tenant SaaS platform focused on WhatsApp sales. Features integrated CRM, AI virtual assistants, knowledge bases, sales funnel tracking, mass messaging, contact extraction, contact lists, group mentions, tagging, and user & company management — all in one solution.',
        problem: 'Digital marketers (product launches, infoproducts), local businesses, clinics, and offices were losing sales and appointments because they couldn\'t respond to WhatsApp leads fast enough.\nDuring digital launches, message volume spiked and teams couldn\'t keep up — leads went cold within minutes. Local businesses and clinics lost clients due to slow responses, no follow-up, and zero visibility into their conversion funnel.\nEverything was manual: no CRM, no automation, no way to see who was being served or ignored.',
        solution: 'Built a multi-tenant SaaS with features that directly address customer pain points — no reinventing the wheel.\nWhatsApp integration via Evolution API, native CRM with real-time sales funnel, AI virtual assistants (GPT-4) with knowledge bases for instant responses, mass messaging, contact extraction, contact lists, group mentions and tagging for campaigns and launches, and user & company management panel with granular permissions.\nEvery feature was designed to solve a real problem: respond fast, never lose a lead, scale without growing the team.',
        result: 'Clients went from responding to leads in hours to seconds, recovering sales and appointments that were previously lost.\nDigital launch teams were able to scale support during peak demand without hiring.\nClinics and local businesses reduced no-shows with automated follow-ups and increased conversion rates by up to 3x.',
        role: 'Full Stack Developer & Product Owner',
      },
      es: {
        title: 'SistemaZapChat',
        description: 'Plataforma SaaS multi-tenant enfocada en ventas por WhatsApp. Incluye CRM integrado, asistentes virtuales con IA, bases de conocimiento, embudo de ventas, envíos masivos, extracción de contactos, listas de contactos, mención en grupos, etiquetado y gestión de usuarios y empresas — todo en una sola solución.',
        problem: 'Profesionales de marketing digital (lanzamientos, infoproductos), negocios locales, consultorios y clínicas perdían ventas y citas por no poder responder a los leads de WhatsApp lo suficientemente rápido.\nDurante lanzamientos digitales, el volumen de mensajes se disparaba y el equipo no daba abasto — los leads se enfriaban en minutos. Negocios locales y consultorios perdían clientes por demora en la atención, falta de seguimiento y cero control sobre el embudo de conversión.\nTodo era manual: sin CRM, sin automatización, sin visibilidad de quién estaba siendo atendido o ignorado.',
        solution: 'Desarrollé un SaaS multi-tenant con funcionalidades que atacan directamente el dolor del cliente — sin reinventar la rueda.\nIntegración con WhatsApp vía Evolution API, CRM nativo con embudo de ventas en tiempo real, asistentes virtuales con IA (GPT-4) y bases de conocimiento para respuesta instantánea, envíos masivos, extracción de contactos, listas de contactos, mención en grupos y etiquetado para campañas y lanzamientos, y panel de gestión de usuarios y empresas con permisos granulares.\nCada funcionalidad fue pensada para resolver un problema real: atender rápido, no perder leads, escalar sin aumentar el equipo.',
        result: 'Los clientes pasaron de responder leads en horas a hacerlo en segundos, recuperando ventas y citas que antes se perdían.\nEquipos de lanzamiento digital lograron escalar la atención durante picos de demanda sin contratar.\nConsultorios y negocios locales redujeron ausencias con seguimiento automatizado y aumentaron la tasa de conversión hasta 3x.',
        role: 'Full Stack Developer & Product Owner',
      },
    },
  },
  {
    slug: 'desafios-biblicos',
    featured: true,
    badge: 'App',
    image: '/images/projects/desafios-biblicos.png',
    imageMobile: '/images/projects/desafios-biblicos-mobile.png',
    screenshots: [
      '/images/projects/app001.png',
      '/images/projects/app002.png',
      '/images/projects/app003.png',
      '/images/projects/app004.png',
      '/images/projects/app005.png',
    ],
    tech: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Vercel'],
    year: 2026,
    duration: '1 mês',
    category: 'Web App / PWA / TWA / APK',
    links: {
      live: 'https://desafiosbiblicos.com.br',
    },
    highlights: [
      { value: '55+', label: 'usuários' },
      { value: '100%', label: 'orgânico' },
      { value: 'PWA', label: 'TWA / App' },
    ],
    translations: {
      pt: {
        title: 'Desafios Bíblicos',
        description: 'App PWA/TWA com desafios bíblicos em diversos formatos para fortalecer o conhecimento da Bíblia de forma interativa e gamificada.',
        problem: 'Como líder de jovens e adolescentes na igreja, percebi que o estudo bíblico tradicional não engajava o suficiente.\nQueria uma ferramenta acessível, leve e com variedade de formatos de desafio que tornasse o aprendizado bíblico algo dinâmico e divertido para essa geração.',
        solution: 'Estou desenvolvendo uma plataforma PWA/TWA com diversos formatos de desafios bíblicos — quizzes, perguntas por categoria, desafios diários e mais.\nA experiência é gamificada com ranking e progressão, e por ser um PWA pode ser instalado como app direto do navegador.\nO app está em processo de aprovação pelo Google Play para ser disponibilizado na Play Store.',
        result: 'Plataforma em desenvolvimento ativo com 55+ usuários orgânicos, sem nenhum investimento em marketing.\nCrescimento 100% orgânico e engajamento recorrente dos usuários.',
        role: 'Full Stack Developer & Product Owner',
      },
      en: {
        title: 'Bible Challenges',
        description: 'PWA/TWA app with Bible challenges in multiple formats to strengthen Bible knowledge in an interactive and gamified way.',
        problem: 'As a youth and teen leader at church, I noticed that traditional Bible study wasn\'t engaging enough.\nI wanted an accessible, lightweight tool with a variety of challenge formats that would make Bible learning dynamic and fun for this generation.',
        solution: 'Building a PWA/TWA platform with multiple Bible challenge formats — quizzes, categorized questions, daily challenges and more.\nThe experience is gamified with rankings and progression, and as a PWA it can be installed as an app directly from the browser.\nThe app is currently under review for Google Play Store approval.',
        result: 'Platform in active development with 55+ organic users, with zero marketing investment.\n100% organic growth and recurring user engagement.',
        role: 'Full Stack Developer & Product Owner',
      },
      es: {
        title: 'Desafíos Bíblicos',
        description: 'App PWA/TWA con desafíos bíblicos en diversos formatos para fortalecer el conocimiento de la Biblia de forma interactiva y gamificada.',
        problem: 'Como líder de jóvenes y adolescentes en la iglesia, noté que el estudio bíblico tradicional no enganchaba lo suficiente.\nQuería una herramienta accesible, liviana y con variedad de formatos de desafío que hiciera del aprendizaje bíblico algo dinámico y divertido para esta generación.',
        solution: 'Estoy desarrollando una plataforma PWA/TWA con diversos formatos de desafíos bíblicos — quizzes, preguntas por categoría, desafíos diarios y más.\nLa experiencia es gamificada con ranking y progresión, y al ser un PWA puede instalarse como app directo desde el navegador.\nLa app está en proceso de aprobación en Google Play para estar disponible en la Play Store.',
        result: 'Plataforma en desarrollo activo con 55+ usuarios orgánicos, sin ninguna inversión en marketing.\nCrecimiento 100% orgánico y engagement recurrente de los usuarios.',
        role: 'Full Stack Developer & Product Owner',
      },
    },
  },
];

export function getProjectsByLang(lang: Lang) {
  return projects.map((p) => ({
    ...p,
    ...p.translations[lang],
  }));
}

export function getFeaturedProjects(lang: Lang) {
  return getProjectsByLang(lang).filter((p) => p.featured);
}

export function getProjectBySlug(slug: string, lang: Lang) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  return { ...project, ...project.translations[lang] };
}

export function getAdjacentProjects(slug: string, lang: Lang) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;
  return {
    prev: prev ? { slug: prev.slug, title: prev.translations[lang].title } : null,
    next: next ? { slug: next.slug, title: next.translations[lang].title } : null,
  };
}
