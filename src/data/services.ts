import type { Lang } from '../i18n/config';

export interface Service {
  slug: string;
  icon: string;
  translations: Record<Lang, {
    title: string;
    description: string;
    features: string[];
  }>;
}

export const services: Service[] = [
  {
    slug: 'web-development',
    icon: '🌐',
    translations: {
      pt: {
        title: 'Desenvolvimento Web',
        description: 'Aplicações web modernas, performáticas e escaláveis usando as melhores tecnologias do mercado.',
        features: [
          'Frontend com React, Next.js ou Astro',
          'Backend com Node.js e NestJS',
          'Integração com APIs e serviços terceiros',
          'Otimização de performance e SEO',
          'Deploy e CI/CD automatizado',
        ],
      },
      en: {
        title: 'Web Development',
        description: 'Modern, high-performance and scalable web applications using best-in-class technologies.',
        features: [
          'Frontend with React, Next.js or Astro',
          'Backend with Node.js and NestJS',
          'Third-party API and service integration',
          'Performance and SEO optimization',
          'Automated deploy and CI/CD',
        ],
      },
      es: {
        title: 'Desarrollo Web',
        description: 'Aplicaciones web modernas, de alto rendimiento y escalables usando las mejores tecnologías del mercado.',
        features: [
          'Frontend con React, Next.js o Astro',
          'Backend con Node.js y NestJS',
          'Integración con APIs y servicios de terceros',
          'Optimización de rendimiento y SEO',
          'Deploy y CI/CD automatizado',
        ],
      },
    },
  },
  {
    slug: 'mobile-development',
    icon: '📱',
    translations: {
      pt: {
        title: 'Desenvolvimento Mobile',
        description: 'Apps nativos e multiplataforma para iOS e Android com experiência de usuário excepcional.',
        features: [
          'React Native para iOS e Android',
          'Suporte a notificações push',
          'Integração com câmera, GPS e sensores',
          'Funcionamento offline com sincronização',
          'Publicação nas lojas Apple e Google',
        ],
      },
      en: {
        title: 'Mobile Development',
        description: 'Native and cross-platform apps for iOS and Android with exceptional user experience.',
        features: [
          'React Native for iOS and Android',
          'Push notification support',
          'Camera, GPS and sensor integration',
          'Offline functionality with synchronization',
          'Publishing on Apple and Google stores',
        ],
      },
      es: {
        title: 'Desarrollo Móvil',
        description: 'Apps nativas y multiplataforma para iOS y Android con experiencia de usuario excepcional.',
        features: [
          'React Native para iOS y Android',
          'Soporte de notificaciones push',
          'Integración con cámara, GPS y sensores',
          'Funcionamiento sin conexión con sincronización',
          'Publicación en tiendas Apple y Google',
        ],
      },
    },
  },
  {
    slug: 'api-backend',
    icon: '⚙️',
    translations: {
      pt: {
        title: 'API & Backend',
        description: 'Arquiteturas robustas, escaláveis e seguras para suportar produtos digitais de qualquer tamanho.',
        features: [
          'APIs RESTful e GraphQL',
          'Microsserviços e arquitetura distribuída',
          'Bancos de dados SQL e NoSQL',
          'Filas de mensagens e eventos assíncronos',
          'Monitoramento e observabilidade',
        ],
      },
      en: {
        title: 'API & Backend',
        description: 'Robust, scalable and secure architectures to support digital products of any size.',
        features: [
          'RESTful and GraphQL APIs',
          'Microservices and distributed architecture',
          'SQL and NoSQL databases',
          'Message queues and async events',
          'Monitoring and observability',
        ],
      },
      es: {
        title: 'API & Backend',
        description: 'Arquitecturas robustas, escalables y seguras para soportar productos digitales de cualquier tamaño.',
        features: [
          'APIs RESTful y GraphQL',
          'Microservicios y arquitectura distribuida',
          'Bases de datos SQL y NoSQL',
          'Colas de mensajes y eventos asíncronos',
          'Monitoreo y observabilidad',
        ],
      },
    },
  },
  {
    slug: 'consulting',
    icon: '💡',
    translations: {
      pt: {
        title: 'Consultoria Técnica',
        description: 'Análise e revisão de arquitetura, code review e mentoria técnica para times de desenvolvimento.',
        features: [
          'Auditoria de código e arquitetura',
          'Definição de stack tecnológica',
          'Planejamento de migrações',
          'Mentoria para desenvolvedores',
          'Revisão de segurança e performance',
        ],
      },
      en: {
        title: 'Technical Consulting',
        description: 'Architecture analysis and review, code review and technical mentoring for development teams.',
        features: [
          'Code and architecture audit',
          'Technology stack definition',
          'Migration planning',
          'Developer mentoring',
          'Security and performance review',
        ],
      },
      es: {
        title: 'Consultoría Técnica',
        description: 'Análisis y revisión de arquitectura, revisión de código y mentoría técnica para equipos de desarrollo.',
        features: [
          'Auditoría de código y arquitectura',
          'Definición de stack tecnológico',
          'Planificación de migraciones',
          'Mentoría para desarrolladores',
          'Revisión de seguridad y rendimiento',
        ],
      },
    },
  },
  {
    slug: 'automations',
    icon: '🤖',
    translations: {
      pt: {
        title: 'Automações & Integrações',
        description: 'Automação de processos repetitivos e integrações entre sistemas para aumentar a produtividade.',
        features: [
          'Bots para WhatsApp, Telegram e Slack',
          'Integrações via webhooks e APIs',
          'Automação com n8n e Make',
          'Processamento de dados com IA',
          'Relatórios e dashboards automáticos',
        ],
      },
      en: {
        title: 'Automations & Integrations',
        description: 'Automation of repetitive processes and system integrations to increase productivity.',
        features: [
          'Bots for WhatsApp, Telegram and Slack',
          'Webhook and API integrations',
          'Automation with n8n and Make',
          'AI-powered data processing',
          'Automated reports and dashboards',
        ],
      },
      es: {
        title: 'Automatizaciones e Integraciones',
        description: 'Automatización de procesos repetitivos e integraciones entre sistemas para aumentar la productividad.',
        features: [
          'Bots para WhatsApp, Telegram y Slack',
          'Integraciones vía webhooks y APIs',
          'Automatización con n8n y Make',
          'Procesamiento de datos con IA',
          'Informes y dashboards automáticos',
        ],
      },
    },
  },
];

export function getServicesByLang(lang: Lang) {
  return services.map((s) => ({
    ...s,
    ...s.translations[lang],
  }));
}

export function getServiceBySlug(slug: string, lang: Lang) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  return { ...service, ...service.translations[lang] };
}
