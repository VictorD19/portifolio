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
    icon: 'globe',
    translations: {
      pt: {
        title: 'Desenvolvimento Web',
        description: 'Criação e arquitetura de sistemas do zero, sob medida para o seu negócio.',
        features: [
          'Sua ideia ainda não saiu do papel? Transformo em sistema real',
          'Precisa de um SaaS, painel ou plataforma? Construo do zero com arquitetura escalável',
          'Quer uma landing page que converte? Crio páginas rápidas e otimizadas para SEO',
          'Precisa de área de login, dashboard ou gestão? Desenvolvo painéis completos',
          'Quer vender online? Desenvolvo e-commerce ou plataforma de pagamentos integrada',
        ],
      },
      en: {
        title: 'Web Development',
        description: 'System creation and architecture from scratch, tailored to your business.',
        features: [
          'Idea still on paper? I turn it into a real system',
          'Need a SaaS, dashboard or platform? I build from scratch with scalable architecture',
          'Want a landing page that converts? I create fast pages optimized for SEO',
          'Need login areas, dashboards or management panels? I build complete admin panels',
          'Want to sell online? I develop e-commerce or integrated payment platforms',
        ],
      },
      es: {
        title: 'Desarrollo Web',
        description: 'Creación y arquitectura de sistemas desde cero, a medida para tu negocio.',
        features: [
          '¿Tu idea sigue en papel? La transformo en un sistema real',
          '¿Necesitas un SaaS, panel o plataforma? Lo construyo desde cero con arquitectura escalable',
          '¿Quieres una landing page que convierta? Creo páginas rápidas y optimizadas para SEO',
          '¿Necesitas área de login, dashboard o gestión? Desarrollo paneles completos',
          '¿Quieres vender online? Desarrollo e-commerce o plataforma de pagos integrada',
        ],
      },
    },
  },
  {
    slug: 'mobile-development',
    icon: 'smartphone',
    translations: {
      pt: {
        title: 'Desenvolvimento Mobile',
        description: 'Apps que resolvem problemas reais, disponíveis na palma da mão do seu cliente.',
        features: [
          'Seus clientes precisam de acesso rápido pelo celular? Crio o app ideal',
          'Quer estar na Play Store e App Store? Publico nas duas lojas',
          'Precisa funcionar sem internet? Implemento modo offline com sincronização',
          'Quer manter seus usuários engajados? Configuro notificações push inteligentes',
          'Precisa de um app mas não quer custo nativo? Desenvolvo PWA/TWA acessível',
        ],
      },
      en: {
        title: 'Mobile Development',
        description: 'Apps that solve real problems, available in your customer\'s hands.',
        features: [
          'Customers need quick mobile access? I build the ideal app',
          'Want to be on Play Store and App Store? I publish on both',
          'Need it to work offline? I implement offline mode with sync',
          'Want to keep your users engaged? I set up smart push notifications',
          'Need an app but want to avoid native costs? I develop affordable PWA/TWA',
        ],
      },
      es: {
        title: 'Desarrollo Móvil',
        description: 'Apps que resuelven problemas reales, disponibles en la palma de la mano de tu cliente.',
        features: [
          '¿Tus clientes necesitan acceso rápido por el celular? Creo la app ideal',
          '¿Quieres estar en Play Store y App Store? Publico en ambas tiendas',
          '¿Necesita funcionar sin internet? Implemento modo offline con sincronización',
          '¿Quieres mantener a tus usuarios enganchados? Configuro notificaciones push inteligentes',
          '¿Necesitas un app pero sin costo nativo? Desarrollo PWA/TWA accesible',
        ],
      },
    },
  },
  {
    slug: 'consulting',
    icon: 'lightbulb',
    translations: {
      pt: {
        title: 'Consultoria Técnica',
        description: 'Identifico gargalos, elimino desperdícios e coloco seu time no caminho certo.',
        features: [
          'Sistema caindo e ninguém sabe por quê? Faço diagnóstico e encontro a raiz do problema',
          'Gastando demais com infraestrutura? Analiso e reduzo custos sem perder performance',
          'Projeto parado por decisão técnica? Avalio cenários e defino o melhor caminho',
          'Equipe júnior sem direção? Mentoro e acelero o crescimento técnico do time',
          'Entregando com atraso e retrabalho? Reviso processos e organizo o fluxo de desenvolvimento',
        ],
      },
      en: {
        title: 'Technical Consulting',
        description: 'I identify bottlenecks, eliminate waste, and put your team on the right track.',
        features: [
          'System crashing and no one knows why? I diagnose and find the root cause',
          'Spending too much on infrastructure? I analyze and cut costs without losing performance',
          'Project stalled by a technical decision? I evaluate scenarios and define the best path',
          'Junior team without direction? I mentor and accelerate the team\'s technical growth',
          'Delivering late with rework? I review processes and organize the development workflow',
        ],
      },
      es: {
        title: 'Consultoría Técnica',
        description: 'Identifico cuellos de botella, elimino desperdicios y pongo a tu equipo en el camino correcto.',
        features: [
          '¿Sistema cayendo y nadie sabe por qué? Hago diagnóstico y encuentro la raíz del problema',
          '¿Gastando demasiado en infraestructura? Analizo y reduzco costos sin perder rendimiento',
          '¿Proyecto parado por decisión técnica? Evalúo escenarios y defino el mejor camino',
          '¿Equipo junior sin dirección? Mentoreo y acelero el crecimiento técnico del equipo',
          '¿Entregando tarde y con retrabajo? Reviso procesos y organizo el flujo de desarrollo',
        ],
      },
    },
  },
  {
    slug: 'automations',
    icon: 'bot',
    translations: {
      pt: {
        title: 'Automações & Integrações',
        description: 'Elimino tarefas repetitivas e conecto seus sistemas para sua equipe focar no que importa.',
        features: [
          'Equipe perdendo horas em tarefas manuais? Automatizo de ponta a ponta',
          'Sistemas que não conversam entre si? Conecto tudo em um fluxo único',
          'Atendimento lento no WhatsApp? Crio bots inteligentes com IA',
          'Processos que dependem de planilha? Substituo por automações confiáveis',
          'Precisa de relatórios mas ninguém tem tempo? Gero dashboards automáticos em tempo real',
        ],
      },
      en: {
        title: 'Automations & Integrations',
        description: 'I eliminate repetitive tasks and connect your systems so your team can focus on what matters.',
        features: [
          'Team losing hours on manual tasks? I automate end to end',
          'Systems that don\'t talk to each other? I connect everything into a single flow',
          'Slow WhatsApp support? I build smart bots with AI',
          'Processes that depend on spreadsheets? I replace them with reliable automations',
          'Need reports but no one has time? I generate real-time automated dashboards',
        ],
      },
      es: {
        title: 'Automatizaciones e Integraciones',
        description: 'Elimino tareas repetitivas y conecto tus sistemas para que tu equipo se enfoque en lo que importa.',
        features: [
          '¿Equipo perdiendo horas en tareas manuales? Automatizo de punta a punta',
          '¿Sistemas que no se comunican entre sí? Conecto todo en un flujo único',
          '¿Atención lenta en WhatsApp? Creo bots inteligentes con IA',
          '¿Procesos que dependen de planillas? Los sustituyo por automatizaciones confiables',
          '¿Necesitas reportes pero nadie tiene tiempo? Genero dashboards automáticos en tiempo real',
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
