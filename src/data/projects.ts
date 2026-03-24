import type { Lang } from '../i18n/config';

export interface Project {
  slug: string;
  featured: boolean;
  image?: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
  translations: Record<Lang, {
    title: string;
    description: string;
    problem: string;
    solution: string;
    result: string;
  }>;
}

export const projects: Project[] = [
  {
    slug: 'app-mobile',
    featured: true,
    image: '/images/projects/app-mobile.png',
    tech: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    links: {
      github: 'https://github.com/victorbertram/app-mobile',
    },
    translations: {
      pt: {
        title: 'App Mobile SaaS',
        description: 'Aplicativo mobile multiplataforma para gestão de equipes e tarefas em tempo real.',
        problem: 'Empresa precisava de uma solução mobile para coordenar equipes remotas com sincronização em tempo real e funcionamento offline.',
        solution: 'Desenvolvi um app React Native com sincronização via WebSocket, cache local com SQLite e arquitetura offline-first para garantir disponibilidade mesmo sem conexão.',
        result: 'Redução de 45% no tempo de comunicação entre equipes e 98% de uptime mesmo em áreas com conectividade limitada.',
      },
      en: {
        title: 'SaaS Mobile App',
        description: 'Cross-platform mobile application for real-time team and task management.',
        problem: 'The company needed a mobile solution to coordinate remote teams with real-time synchronization and offline functionality.',
        solution: 'Built a React Native app with WebSocket synchronization, local SQLite cache and offline-first architecture to ensure availability even without connectivity.',
        result: '45% reduction in team communication time and 98% uptime even in areas with limited connectivity.',
      },
      es: {
        title: 'App Móvil SaaS',
        description: 'Aplicación móvil multiplataforma para gestión de equipos y tareas en tiempo real.',
        problem: 'La empresa necesitaba una solución móvil para coordinar equipos remotos con sincronización en tiempo real y funcionamiento sin conexión.',
        solution: 'Desarrollé una app React Native con sincronización por WebSocket, caché local con SQLite y arquitectura offline-first para garantizar disponibilidad incluso sin conexión.',
        result: 'Reducción del 45% en el tiempo de comunicación entre equipos y 98% de disponibilidad incluso en zonas con conectividad limitada.',
      },
    },
  },
  {
    slug: 'discador-voip',
    featured: true,
    image: '/images/projects/discador-voip.png',
    tech: ['Node.js', 'Asterisk', 'WebRTC', 'React', 'PostgreSQL', 'Docker'],
    links: {
      live: 'https://discador.victorbertram.dev',
    },
    translations: {
      pt: {
        title: 'Discador VoIP',
        description: 'Sistema de discagem automática VoIP com painel em tempo real e relatórios avançados.',
        problem: 'Call center precisava automatizar discagem com controle de campanhas, filas de agentes e relatórios em tempo real.',
        solution: 'Construí integração com Asterisk via AMI/AGI, painel React com WebSocket para acompanhamento em tempo real e módulo de relatórios com exportação CSV/PDF.',
        result: 'Aumento de 60% na produtividade dos agentes e redução de 70% no tempo de configuração de campanhas.',
      },
      en: {
        title: 'VoIP Auto Dialer',
        description: 'Automatic VoIP dialing system with real-time dashboard and advanced reporting.',
        problem: 'Call center needed to automate dialing with campaign control, agent queues and real-time reporting.',
        solution: 'Built Asterisk integration via AMI/AGI, React dashboard with WebSocket for real-time monitoring and reporting module with CSV/PDF export.',
        result: '60% increase in agent productivity and 70% reduction in campaign configuration time.',
      },
      es: {
        title: 'Marcador VoIP',
        description: 'Sistema de marcación automática VoIP con panel en tiempo real e informes avanzados.',
        problem: 'El call center necesitaba automatizar la marcación con control de campañas, colas de agentes e informes en tiempo real.',
        solution: 'Construí integración con Asterisk vía AMI/AGI, panel React con WebSocket para seguimiento en tiempo real y módulo de informes con exportación CSV/PDF.',
        result: 'Aumento del 60% en la productividad de los agentes y reducción del 70% en el tiempo de configuración de campañas.',
      },
    },
  },
  {
    slug: 'whatsapp-bots',
    featured: true,
    image: '/images/projects/whatsapp-bots.png',
    tech: ['Node.js', 'TypeScript', 'OpenAI', 'Redis', 'MongoDB', 'Baileys'],
    links: {
      github: 'https://github.com/victorbertram/whatsapp-bots',
    },
    translations: {
      pt: {
        title: 'Plataforma de Bots WhatsApp',
        description: 'Plataforma multi-tenant para criação e gestão de bots de atendimento no WhatsApp com IA.',
        problem: 'Empresas precisavam de atendimento automatizado no WhatsApp com respostas inteligentes e integração com sistemas internos.',
        solution: 'Desenvolvi plataforma multi-tenant com integração via Baileys, processamento de linguagem natural com OpenAI GPT-4 e painel administrativo para configuração dos fluxos.',
        result: 'Automação de 80% dos atendimentos, redução de 65% no custo operacional e tempo médio de resposta de 3 segundos.',
      },
      en: {
        title: 'WhatsApp Bots Platform',
        description: 'Multi-tenant platform for creating and managing WhatsApp customer service bots with AI.',
        problem: 'Businesses needed automated WhatsApp support with intelligent responses and integration with internal systems.',
        solution: 'Built multi-tenant platform with Baileys integration, natural language processing with OpenAI GPT-4 and admin panel for flow configuration.',
        result: '80% automation of support interactions, 65% reduction in operational costs and average response time of 3 seconds.',
      },
      es: {
        title: 'Plataforma de Bots WhatsApp',
        description: 'Plataforma multi-tenant para creación y gestión de bots de atención al cliente en WhatsApp con IA.',
        problem: 'Las empresas necesitaban atención automatizada en WhatsApp con respuestas inteligentes e integración con sistemas internos.',
        solution: 'Desarrollé plataforma multi-tenant con integración vía Baileys, procesamiento de lenguaje natural con OpenAI GPT-4 y panel administrativo para configuración de flujos.',
        result: 'Automatización del 80% de las atenciones, reducción del 65% en costos operativos y tiempo promedio de respuesta de 3 segundos.',
      },
    },
  },
  {
    slug: 'api-migration',
    featured: false,
    image: '/images/projects/api-migration.png',
    tech: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    translations: {
      pt: {
        title: 'Migração de API Monolítica',
        description: 'Migração de sistema monolítico legado para arquitetura de microsserviços sem downtime.',
        problem: 'Sistema monolítico em PHP com 8 anos não conseguia escalar para atender crescimento de 300% em requisições.',
        solution: 'Implementei migração gradual usando strangler fig pattern, reescrevendo módulos em NestJS/TypeScript com filas de mensagens RabbitMQ e cache Redis distribuído.',
        result: 'Redução de 60% no tempo de resposta, escalabilidade horizontal automática e zero downtime durante toda a migração.',
      },
      en: {
        title: 'Monolithic API Migration',
        description: 'Migration of legacy monolithic system to microservices architecture with zero downtime.',
        problem: 'An 8-year-old PHP monolith could not scale to handle 300% request growth.',
        solution: 'Implemented gradual migration using strangler fig pattern, rewriting modules in NestJS/TypeScript with RabbitMQ message queues and distributed Redis cache.',
        result: '60% reduction in response time, automatic horizontal scaling and zero downtime throughout the migration.',
      },
      es: {
        title: 'Migración de API Monolítica',
        description: 'Migración de sistema monolítico legado a arquitectura de microservicios sin tiempo de inactividad.',
        problem: 'Un monolito PHP de 8 años no podía escalar para manejar un crecimiento del 300% en solicitudes.',
        solution: 'Implementé migración gradual usando el patrón strangler fig, reescribiendo módulos en NestJS/TypeScript con colas de mensajes RabbitMQ y caché Redis distribuido.',
        result: 'Reducción del 60% en el tiempo de respuesta, escalabilidad horizontal automática y cero tiempo de inactividad durante toda la migración.',
      },
    },
  },
  {
    slug: 'feedback-hub',
    featured: false,
    image: '/images/projects/feedback-hub.png',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'OpenAI', 'Vercel'],
    links: {
      github: 'https://github.com/victorbertram/feedback-hub',
      live: 'https://feedback-hub.victorbertram.dev',
    },
    translations: {
      pt: {
        title: 'Feedback Hub',
        description: 'Plataforma SaaS de coleta e análise de feedbacks com categorização automática por IA.',
        problem: 'Empresas recebiam centenas de feedbacks por dia e não conseguiam processar e categorizar manualmente de forma eficiente.',
        solution: 'Criei plataforma com widget embedável, análise de sentimento com OpenAI, dashboard com métricas em tempo real e alertas automáticos para feedbacks críticos.',
        result: 'Processamento de 100% dos feedbacks em tempo real, identificação automática de problemas críticos e redução de 70% no tempo de análise.',
      },
      en: {
        title: 'Feedback Hub',
        description: 'SaaS platform for collecting and analyzing feedback with automatic AI categorization.',
        problem: 'Companies received hundreds of feedbacks daily and could not process and categorize them manually in an efficient way.',
        solution: 'Built platform with embeddable widget, sentiment analysis with OpenAI, real-time metrics dashboard and automatic alerts for critical feedback.',
        result: '100% of feedbacks processed in real time, automatic identification of critical issues and 70% reduction in analysis time.',
      },
      es: {
        title: 'Feedback Hub',
        description: 'Plataforma SaaS de recopilación y análisis de comentarios con categorización automática por IA.',
        problem: 'Las empresas recibían cientos de comentarios al día y no podían procesarlos y categorizarlos manualmente de manera eficiente.',
        solution: 'Creé plataforma con widget integrable, análisis de sentimiento con OpenAI, panel de métricas en tiempo real y alertas automáticas para comentarios críticos.',
        result: 'Procesamiento del 100% de los comentarios en tiempo real, identificación automática de problemas críticos y reducción del 70% en el tiempo de análisis.',
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
