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
    tech: ['Node.js', 'TypeScript', 'OpenAI', 'Redis', 'MongoDB', 'Baileys'],
    year: 2024,
    duration: '4 meses',
    category: 'SaaS',
    links: {
      live: 'https://sistemaZapChat.com',
    },
    highlights: [
      { value: '80%', label: 'automação' },
      { value: '-65%', label: 'custo operacional' },
      { value: '3s', label: 'tempo resposta' },
    ],
    translations: {
      pt: {
        title: 'SistemaZapChat',
        description: 'Plataforma multi-tenant para criação e gestão de bots de atendimento no WhatsApp com IA.',
        problem: 'Empresas precisavam de atendimento automatizado no WhatsApp com respostas inteligentes e integração com sistemas internos.',
        solution: 'Desenvolvi plataforma multi-tenant com integração via Baileys, processamento de linguagem natural com OpenAI GPT-4 e painel administrativo para configuração dos fluxos.',
        result: 'Automação de 80% dos atendimentos, redução de 65% no custo operacional e tempo médio de resposta de 3 segundos.',
        role: 'Full Stack Developer & Tech Lead',
      },
      en: {
        title: 'SistemaZapChat',
        description: 'Multi-tenant platform for creating and managing WhatsApp customer service bots with AI.',
        problem: 'Businesses needed automated WhatsApp support with intelligent responses and integration with internal systems.',
        solution: 'Built multi-tenant platform with Baileys integration, natural language processing with OpenAI GPT-4 and admin panel for flow configuration.',
        result: '80% automation of support interactions, 65% reduction in operational costs and average response time of 3 seconds.',
        role: 'Full Stack Developer & Tech Lead',
      },
      es: {
        title: 'SistemaZapChat',
        description: 'Plataforma multi-tenant para creación y gestión de bots de atención al cliente en WhatsApp con IA.',
        problem: 'Las empresas necesitaban atención automatizada en WhatsApp con respuestas inteligentes e integración con sistemas internos.',
        solution: 'Desarrollé plataforma multi-tenant con integración vía Baileys, procesamiento de lenguaje natural con OpenAI GPT-4 y panel administrativo para configuración de flujos.',
        result: 'Automatización del 80% de las atenciones, reducción del 65% en costos operativos y tiempo promedio de respuesta de 3 segundos.',
        role: 'Full Stack Developer & Tech Lead',
      },
    },
  },
  {
    slug: 'desafios-biblicos',
    featured: true,
    badge: 'App',
    image: '/images/projects/desafios-biblicos.png',
    imageMobile: '/images/projects/desafios-biblicos-mobile.png',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel'],
    year: 2024,
    duration: '3 meses',
    category: 'Web App',
    links: {
      live: 'https://desafiosbiblicos.com.br',
    },
    highlights: [
      { value: '1k+', label: 'usuários ativos' },
      { value: '100%', label: 'orgânico' },
      { value: '4.8★', label: 'avaliação' },
    ],
    translations: {
      pt: {
        title: 'Desafios Bíblicos',
        description: 'Plataforma de quiz bíblico com perguntas interativas, ranking e desafios diários.',
        problem: 'Comunidades religiosas buscavam uma forma dinâmica e interativa de estudar e testar conhecimentos bíblicos.',
        solution: 'Desenvolvi uma plataforma gamificada com perguntas por categorias, sistema de ranking, desafios diários e interface responsiva para uso em dispositivos móveis.',
        result: 'Plataforma em produção com engajamento diário dos usuários e crescimento orgânico constante.',
        role: 'Full Stack Developer',
      },
      en: {
        title: 'Bible Challenges',
        description: 'Bible quiz platform with interactive questions, rankings and daily challenges.',
        problem: 'Religious communities were looking for a dynamic and interactive way to study and test Bible knowledge.',
        solution: 'Built a gamified platform with categorized questions, ranking system, daily challenges and responsive interface for mobile devices.',
        result: 'Platform in production with daily user engagement and consistent organic growth.',
        role: 'Full Stack Developer',
      },
      es: {
        title: 'Desafíos Bíblicos',
        description: 'Plataforma de quiz bíblico con preguntas interactivas, rankings y desafíos diarios.',
        problem: 'Las comunidades religiosas buscaban una forma dinámica e interactiva de estudiar y evaluar conocimientos bíblicos.',
        solution: 'Desarrollé una plataforma gamificada con preguntas por categorías, sistema de ranking, desafíos diarios e interfaz responsiva para dispositivos móviles.',
        result: 'Plataforma en producción con engagement diario de usuarios y crecimiento orgánico constante.',
        role: 'Full Stack Developer',
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
