import type { ModuleAccent, ModuleIcon, ModuleLevel } from '../types/modules';

export interface ComingSoonModule {
  id: number;
  title: {
    lt: string;
    en: string;
  };
  subtitle: {
    lt: string;
    en: string;
  };
  description: {
    lt: string;
    en: string;
  };
  icon: ModuleIcon;
  level: ModuleLevel;
  accent: ModuleAccent;
}

export const COMING_SOON_MODULES: ComingSoonModule[] = [
  {
    id: 10,
    title: {
      lt: 'Agentų inžinerija su DI',
      en: 'AI Agent Engineering',
    },
    subtitle: {
      lt: 'DI agentai, rolės ir workflow',
      en: 'AI agents, roles, and workflows',
    },
    description: {
      lt: 'Sužinosi, kaip projektuoti DI agentus, roles, įrankius ir automatizavimo srautus.',
      en: 'Learn how to design AI agents, roles, tools, and automation workflows.',
    },
    icon: 'Cpu',
    level: 'learn',
    accent: 'fuchsia',
  },
  {
    id: 11,
    title: {
      lt: 'Žinių patikrinimas (Agentų kelias)',
      en: 'Knowledge Check (Agent Path)',
    },
    subtitle: {
      lt: 'Testas prieš agentų projektą',
      en: 'Quiz before the agent project',
    },
    description: {
      lt: 'Pasitikrinsi agentų ciklą, taksonomiją, workflow šablonus ir 3A strategiją.',
      en: 'Check agent cycles, taxonomy, workflow patterns, and the 3A strategy.',
    },
    icon: 'ClipboardCheck',
    level: 'test',
    accent: 'fuchsia',
  },
  {
    id: 12,
    title: {
      lt: 'Finalinis projektas (Agentų kelias)',
      en: 'Final Project (Agent Path)',
    },
    subtitle: {
      lt: 'Trys praktikos su artefaktais',
      en: 'Three labs with deliverables',
    },
    description: {
      lt: 'Sukursi vieną agentų arba automatizacijos scenarijų su schema, testais ir ribomis.',
      en: 'Build an agent or automation scenario with a workflow map, tests, and guardrails.',
    },
    icon: 'Rocket',
    level: 'practice',
    accent: 'fuchsia',
  },
];
