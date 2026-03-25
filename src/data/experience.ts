import type { Lang } from '../i18n/config';

export interface Experience {
  id: string;
  type: 'work' | 'education';
  tech?: string[];
  translations: Record<Lang, {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
  }>;
}

export const experiences: Experience[] = [
  {
    id: 'ixcsoft',
    type: 'work',
    tech: ['Node.js', 'React', 'TypeScript', 'Asterisk', 'PostgreSQL', 'Docker'],
    translations: {
      pt: {
        title: 'Desenvolvedor Full Stack Senior',
        company: 'IXC Soft',
        period: 'ago/2025 – presente',
        location: 'Chapecó, SC — Presencial',
        description: [
          'Acompanho desenvolvedores de perto, trabalhando evolução técnica, performance, qualidade de código e cumprimento de prazos.',
          'Fiz a refatoração completa do discador do sistema — melhorei design visual, organização, manutenibilidade e modernizei código legado.',
          'Configuro e administro servidores Asterisk: ramais, regras de transferência e gestão de usuários.',
          'Defino e aplico padrões de código, crio testes unitários e end-to-end, e faço revisão de código com o time.',
        ],
      },
      en: {
        title: 'Senior Full Stack Developer',
        company: 'IXC Soft',
        period: 'Aug/2025 – present',
        location: 'Chapecó, SC — On-site',
        description: [
          'I closely mentor developers, working on technical growth, performance, code quality, and meeting deadlines.',
          'Led the complete refactoring of the system\'s dialer — improved visual design, organization, maintainability, and modernized legacy code.',
          'Configure and manage Asterisk servers: extensions, transfer rules, and user management.',
          'Define and enforce code standards, create unit and end-to-end tests, and conduct code reviews with the team.',
        ],
      },
      es: {
        title: 'Desarrollador Full Stack Senior',
        company: 'IXC Soft',
        period: 'ago/2025 – presente',
        location: 'Chapecó, SC — Presencial',
        description: [
          'Acompaño desarrolladores de cerca, trabajando en evolución técnica, performance, calidad de código y cumplimiento de plazos.',
          'Hice la refactorización completa del discador del sistema — mejoré diseño visual, organización, mantenibilidad y modernicé código legado.',
          'Configuro y administro servidores Asterisk: internos, reglas de transferencia y gestión de usuarios.',
          'Defino y aplico estándares de código, creo tests unitarios y end-to-end, y hago revisión de código con el equipo.',
        ],
      },
    },
  },
  {
    id: 'multisoftware',
    type: 'work',
    tech: ['.NET', 'C#', 'JavaScript', 'SQL Server', 'PostgreSQL', 'jQuery'],
    translations: {
      pt: {
        title: 'Desenvolvedor Full Stack',
        company: 'Multisoftware by nstech',
        period: 'jul/2022 – ago/2025',
        location: 'Chapecó, SC — Presencial',
        description: [
          'Correção de falhas críticas em produção (nível N3), reduzindo tempo de resolução em 40%.',
          'Migrei 30% dos principais WebServices legados para APIs REST com .NET Core, reduzindo tempo de resposta em até 60%.',
          'Otimizei consultas SQL críticas para relatórios — redução de 70% no tempo de resposta via análise de planos de execução e índices estratégicos.',
          'Implementei fluxo assíncrono de geração de carga e pedidos com Pub/Sub.',
        ],
      },
      en: {
        title: 'Full Stack Developer',
        company: 'Multisoftware by nstech',
        period: 'Jul/2022 – Aug/2025',
        location: 'Chapecó, SC — On-site',
        description: [
          'Fixed critical production issues (N3 level), reducing resolution time by 40%.',
          'Migrated 30% of core legacy WebServices to REST APIs with .NET Core, cutting response time by up to 60%.',
          'Optimized critical SQL queries for reports — 70% reduction in response time through execution plan analysis and strategic indexing.',
          'Implemented async flow for load and order generation with Pub/Sub.',
        ],
      },
      es: {
        title: 'Desarrollador Full Stack',
        company: 'Multisoftware by nstech',
        period: 'jul/2022 – ago/2025',
        location: 'Chapecó, SC — Presencial',
        description: [
          'Corrección de fallas críticas en producción (nivel N3), reduciendo tiempo de resolución en 40%.',
          'Migré 30% de los principales WebServices legados a APIs REST con .NET Core, reduciendo tiempo de respuesta en hasta 60%.',
          'Optimicé consultas SQL críticas para reportes — reducción del 70% en tiempo de respuesta vía análisis de planes de ejecución e índices estratégicos.',
          'Implementé flujo asíncrono de generación de carga y pedidos con Pub/Sub.',
        ],
      },
    },
  },
  {
    id: 'sotemtec',
    type: 'work',
    tech: ['React', 'Next.js', 'Node.js', 'TailwindCSS', 'WhatsApp API', 'n8n'],
    translations: {
      pt: {
        title: 'Desenvolvedor Full Stack',
        company: 'So Tem Tec',
        period: 'jan/2021 – jun/2022',
        location: 'Chapecó, SC — Remoto',
        description: [
          'Desenvolvimento e modernização de sistemas e sites para clientes de estética, e-commerce e delivery.',
          'Implementação com React.js, Next.js e TailwindCSS — redução de 40% no tempo de carregamento.',
          'Automações via WhatsApp (Make, n8n, Evolution API, WhatsApp Web JS) — redução de 40% no tempo de atendimento.',
          'Integrações de pagamento com Mercado Pago, Efi e Asaas usando Node.js e Express.',
        ],
      },
      en: {
        title: 'Full Stack Developer',
        company: 'So Tem Tec',
        period: 'Jan/2021 – Jun/2022',
        location: 'Chapecó, SC — Remote',
        description: [
          'Built and modernized systems and websites for beauty, e-commerce and delivery clients.',
          'Implementation with React.js, Next.js and TailwindCSS — 40% reduction in load time.',
          'WhatsApp automations (Make, n8n, Evolution API, WhatsApp Web JS) — cut service time by 40%.',
          'Payment integrations with Mercado Pago, Efi and Asaas using Node.js and Express.',
        ],
      },
      es: {
        title: 'Desarrollador Full Stack',
        company: 'So Tem Tec',
        period: 'ene/2021 – jun/2022',
        location: 'Chapecó, SC — Remoto',
        description: [
          'Desarrollo y modernización de sistemas y sitios para clientes de estética, e-commerce y delivery.',
          'Implementación con React.js, Next.js y TailwindCSS — reducción del 40% en tiempo de carga.',
          'Automatizaciones vía WhatsApp (Make, n8n, Evolution API, WhatsApp Web JS) — reducción del 40% en tiempo de atención.',
          'Integraciones de pago con Mercado Pago, Efi y Asaas usando Node.js y Express.',
        ],
      },
    },
  },
  {
    id: 'anhanguera',
    type: 'education',
    translations: {
      pt: {
        title: 'Análise e Desenvolvimento de Sistemas',
        company: 'Anhanguera Educacional',
        period: 'ago/2025 – dez/2027',
        location: 'Cursando',
        description: [
          'Graduação em tecnologia focada em desenvolvimento de software, banco de dados, engenharia de software e arquitetura de sistemas.',
        ],
      },
      en: {
        title: 'Systems Analysis and Development',
        company: 'Anhanguera Educacional',
        period: 'Aug/2025 – Dec/2027',
        location: 'In progress',
        description: [
          'Technology degree focused on software development, databases, software engineering and systems architecture.',
        ],
      },
      es: {
        title: 'Análisis y Desarrollo de Sistemas',
        company: 'Anhanguera Educacional',
        period: 'ago/2025 – dic/2027',
        location: 'Cursando',
        description: [
          'Carrera en tecnología enfocada en desarrollo de software, bases de datos, ingeniería de software y arquitectura de sistemas.',
        ],
      },
    },
  },
  {
    id: 'senai',
    type: 'education',
    tech: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Express'],
    translations: {
      pt: {
        title: 'Desenvolvedor Full Stack React.js / Node.js',
        company: 'SENAI/SC',
        period: 'ago/2021 – jun/2022',
        location: 'Chapecó, SC',
        description: [
          'Formação intensiva em desenvolvimento Full Stack: React (componentes, hooks, Redux, TDD), Node.js, Express, SQL, NoSQL, DevOps (Docker, Kubernetes, CI/CD) e metodologias ágeis.',
          'De dezenas de alunos que começaram, apenas poucos terminaram. Eu estava entre eles.',
        ],
      },
      en: {
        title: 'Full Stack Developer React.js / Node.js',
        company: 'SENAI/SC',
        period: 'Aug/2021 – Jun/2022',
        location: 'Chapecó, SC',
        description: [
          'Intensive Full Stack training: React (components, hooks, Redux, TDD), Node.js, Express, SQL, NoSQL, DevOps (Docker, Kubernetes, CI/CD) and agile methodologies.',
          'Out of dozens of students who started, only a few finished. I was one of them.',
        ],
      },
      es: {
        title: 'Desarrollador Full Stack React.js / Node.js',
        company: 'SENAI/SC',
        period: 'ago/2021 – jun/2022',
        location: 'Chapecó, SC',
        description: [
          'Formación intensiva en desarrollo Full Stack: React (componentes, hooks, Redux, TDD), Node.js, Express, SQL, NoSQL, DevOps (Docker, Kubernetes, CI/CD) y metodologías ágiles.',
          'De decenas de alumnos que empezaron, solo unos pocos terminaron. Yo estaba entre ellos.',
        ],
      },
    },
  },
];

export function getExperiencesByLang(lang: Lang) {
  return experiences.map((exp) => ({
    id: exp.id,
    type: exp.type,
    tech: exp.tech,
    ...exp.translations[lang],
  }));
}
