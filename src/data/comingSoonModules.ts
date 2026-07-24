import type { ModuleAccent, ModuleIcon, ModuleLevel } from '../types/modules';

export type ComingSoonTrack = 'agents' | 'content';

export interface ComingSoonModule {
  id: number;
  track: ComingSoonTrack;
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
    track: 'agents',
    title: {
      lt: 'Agentų inžinerija su DI',
      en: 'AI Agent Engineering',
    },
    subtitle: {
      lt: 'Agentai, įrankiai ir automatizacija',
      en: 'Agents, tools, and automation',
    },
    description: {
      lt: 'Išmoksi projektuoti DI agentus: ką jie daro, kokius įrankius naudoja ir kaip juos sujungti.',
      en: 'Learn to design AI agents: what they do, which tools they use, and how to connect them.',
    },
    icon: 'Cpu',
    level: 'learn',
    accent: 'fuchsia',
  },
  {
    id: 11,
    track: 'agents',
    title: {
      lt: 'Žinių patikrinimas (Agentų kelias)',
      en: 'Knowledge Check (Agent Path)',
    },
    subtitle: {
      lt: 'Testas prieš agentų projektą',
      en: 'Quiz before the agent project',
    },
    description: {
      lt: 'Patikrink agentų eigą ir įrankius. ≥70% rekomenduojama prieš Modulį 12.',
      en: 'Check the agent flow and tools. ≥70% recommended before Module 12.',
    },
    icon: 'ClipboardCheck',
    level: 'test',
    accent: 'fuchsia',
  },
  {
    id: 12,
    track: 'agents',
    title: {
      lt: 'Finalinis projektas (Agentų kelias)',
      en: 'Final Project (Agent Path)',
    },
    subtitle: {
      lt: 'Trys praktikos su rezultatais',
      en: 'Three labs with deliverables',
    },
    description: {
      lt: 'Greitas startas su promptais arba 3 praktikos: darbo eiga, patikros ir pakartotinai naudojamas šablonas.',
      en: 'Quick start with prompts, or 3 labs: a work process, checks, and a reusable template.',
    },
    icon: 'Rocket',
    level: 'practice',
    accent: 'fuchsia',
  },
  {
    id: 13,
    track: 'content',
    title: {
      lt: 'Turinio inžinerija su DI',
      en: 'Content engineering with AI',
    },
    subtitle: {
      lt: 'Vaizdai, video ir garsas',
      en: 'Images, video, and audio',
    },
    description: {
      lt: 'Išmoksi kurti vaizdus, trumpus video ir garsą su DI – nuo užduoties aprašo iki patikros prieš publikaciją.',
      en: 'Learn to create images, short videos, and audio with AI – from brief to quality checks before publishing.',
    },
    icon: 'Image',
    level: 'learn',
    accent: 'rose',
  },
  {
    id: 14,
    track: 'content',
    title: {
      lt: 'Žinių patikrinimas (Turinio kelias)',
      en: 'Knowledge check: Content path',
    },
    subtitle: {
      lt: 'Testas prieš turinio projektą',
      en: 'Quiz before the content project',
    },
    description: {
      lt: 'Patikrink vaizdų, video ir garso principus. ≥70% rekomenduojama prieš Modulį 15.',
      en: 'Check image, video, and audio principles. ≥70% recommended before Module 15.',
    },
    icon: 'ClipboardCheck',
    level: 'test',
    accent: 'rose',
  },
  {
    id: 15,
    track: 'content',
    title: {
      lt: 'Finalinis projektas (Turinio kelias)',
      en: 'Final project: Content path',
    },
    subtitle: {
      lt: 'Greitas startas arba mini kampanija',
      en: 'Quick start or mini campaign',
    },
    description: {
      lt: 'Privaloma: pagrindinis vaizdas su promptu. Jei nori – video, garsas ir montažas.',
      en: 'Required: a main hero image with your prompt. Optionally add video, audio, and edit.',
    },
    icon: 'Rocket',
    level: 'practice',
    accent: 'rose',
  },
];
