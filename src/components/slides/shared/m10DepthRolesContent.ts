/**
 * M10 10.45 depth/roles lab – LT/EN labels and generated artefact copy.
 */

import type { M10Locale } from './m10DiagramContent';
import {
  DEPTH_ORDER,
  type DepthId,
  type DepthRolesArtefactParts,
} from './m10DepthRolesModel';

export interface DepthOptionCopy {
  id: DepthId;
  label: string;
  description: string;
  code: string;
  /** First-teaching line: Lygis 0 / Level 0 */
  levelLabel: string;
}

export function getDepthRolesUiLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      regionAria:
        'Agent depth and roles: choose depth for your process, then roles if Team',
      diagramTitle: 'Process levels',
      rolesStripTitle: 'Team roles',
      hint: 'Think of one real work process.',
      examples: 'e.g. email · research · RFP · form → CRM',
      decisionRule:
        'Rule: start from Agent – pick Team or Flow only when one agent is not enough or you need a trigger.',
      depthLegend: 'Choose the process level',
      teamRolesNote:
        'Team needs three roles: coordinator, specialist, evaluator. Router only if you need sorting by request type before the coordinator.',
      routerToggle: 'Add router (sorts requests by type before coordinator)',
      artefactHeading: 'Prompt for your process',
      artefactHint:
        'Copy and fill [X] with your process. Detail inputs/outputs on the next checkpoint.',
      copyLabel: 'Copy prompt',
      copiedLabel: 'Copied',
      chooseDepthFirst: 'Choose a process level first – then you can copy.',
      edgeDelegates: 'delegates',
      edgeDelivers: 'delivers',
      edgeReturns: 'returns',
      roleCoordinator: 'Coordinator',
      roleSpecialist: 'Specialist',
      roleEvaluator: 'Evaluator',
      roleRouter: 'Router',
    };
  }
  return {
    regionAria:
      'Agentų gylis ir rolės: pasirink gylį savo procesui, tada roles jei Komanda',
    diagramTitle: 'Proceso lygiai',
    rolesStripTitle: 'Komandos rolės',
    hint: 'Pagalvok apie vieną realų savo procesą.',
    examples: 'pvz. laiškas · tyrimas · sutartis · forma → klientų sistema',
    decisionRule:
      'Pradėk nuo Agento. Komandą rinkis, kai reikia kelių rolių, o Srautą – kai veiksmus automatiškai paleidžia įvykis.',
    depthLegend: 'Pasirink proceso lygį',
    teamRolesNote:
      'Komandai reikia trijų rolių: koordinatoriaus, specialisto ir vertintojo. Maršrutizatorių pridėk tik kai užklausas pirmiausia reikia išskirstyti pagal tipą.',
    routerToggle: 'Pridėti maršrutizatorių (išskirsto pagal tipą)',
    artefactHeading: 'Promptas tavo procesui',
    artefactHint:
      'Nukopijuok ir užpildyk [X] savo procesu. Įvestis / išvestis – kitame kontroliniame taške.',
    copyLabel: 'Kopijuoti promptą',
    copiedLabel: 'Nukopijuota',
    chooseDepthFirst:
      'Pirmiausia pasirink proceso lygį – tada galėsi kopijuoti.',
    edgeDelegates: 'deleguoja',
    edgeDelivers: 'pateikia',
    edgeReturns: 'grąžina',
    roleCoordinator: 'Koordinatorius',
    roleSpecialist: 'Specialistas',
    roleEvaluator: 'Vertintojas',
    roleRouter: 'Maršrutizatorius',
  };
}

export function getDepthOptions(locale: M10Locale): DepthOptionCopy[] {
  if (locale === 'en') {
    return [
      {
        id: 'chat',
        label: 'Chat',
        description: 'One question-and-answer exchange is enough',
        code: 'L0',
        levelLabel: 'Level 0',
      },
      {
        id: 'agent',
        label: 'Agent',
        description: 'Several steps + tools, one agent',
        code: 'L1',
        levelLabel: 'Level 1',
      },
      {
        id: 'team',
        label: 'Team',
        description: 'Several roles and handoffs',
        code: 'L2',
        levelLabel: 'Level 2',
      },
      {
        id: 'flow',
        label: 'Flow',
        description: 'Trigger → actions (automation)',
        code: 'L3',
        levelLabel: 'Level 3',
      },
    ];
  }
  return [
    {
      id: 'chat',
      label: 'Pokalbis',
      description: 'Užtenka vieno klausimo–atsakymo',
      code: 'L0',
      levelLabel: 'Lygis 0',
    },
    {
      id: 'agent',
      label: 'Agentas',
      description: 'Keli žingsniai + įrankiai, vienas agentas',
      code: 'L1',
      levelLabel: 'Lygis 1',
    },
    {
      id: 'team',
      label: 'Komanda',
      description: 'Kelios rolės ir perdavimai',
      code: 'L2',
      levelLabel: 'Lygis 2',
    },
    {
      id: 'flow',
      label: 'Srautas',
      description: 'Įvykis automatiškai paleidžia veiksmus',
      code: 'L3',
      levelLabel: 'Lygis 3',
    },
  ];
}

export function depthLabel(locale: M10Locale, depth: DepthId): DepthOptionCopy {
  const found = getDepthOptions(locale).find((d) => d.id === depth);
  if (!found) throw new Error(`Unknown depth: ${depth}`);
  return found;
}

export function formatDepthRolesArtefact(
  locale: M10Locale,
  parts: DepthRolesArtefactParts
): string {
  const d = depthLabel(locale, parts.depth);
  const levelLine =
    locale === 'en'
      ? `Depth level: ${d.label} (${parts.code})`
      : `Gylio lygis: ${d.label} (${parts.code})`;

  if (parts.depth !== 'team') {
    if (locale === 'en') {
      return `Process: [X]\n${levelLine}\nOne sentence: why this depth fits.`;
    }
    return `Procesas: [X]\n${levelLine}\nVienas sakinys: kodėl tinka šis gylis.`;
  }

  const ui = getDepthRolesUiLabels(locale);
  if (locale === 'en') {
    const lines = [
      'Process: [X]',
      levelLine,
      'Roles:',
      `1) ${ui.roleCoordinator} – what they plan and whom they delegate to (+ input / output)`,
      `2) ${ui.roleSpecialist} – what they do specifically (+ input / output)`,
      `3) ${ui.roleEvaluator} – what they check before the result (+ input / output)`,
    ];
    if (parts.includeRouter) {
      lines.push(
        `4) ${ui.roleRouter} – how they sort requests by type before the coordinator (+ input / output)`
      );
    }
    lines.push('For each role – one sentence.');
    return lines.join('\n');
  }

  const lines = [
    'Procesas: [X]',
    levelLine,
    'Rolės:',
    `1) ${ui.roleCoordinator} – ką planuoja ir kam deleguoja (+ įvestis / išvestis)`,
    `2) ${ui.roleSpecialist} – ką konkrečiai daro (+ įvestis / išvestis)`,
    `3) ${ui.roleEvaluator} – ką tikrina prieš rezultatą (+ įvestis / išvestis)`,
  ];
  if (parts.includeRouter) {
    lines.push(
      `4) ${ui.roleRouter} – kaip išskirsto užklausas pagal tipą prieš koordinatorių (+ įvestis / išvestis)`
    );
  }
  lines.push('Kiekvienai rolei – vienas sakinys.');
  return lines.join('\n');
}

/** Stable order helper for tests / layout. */
export function orderedDepthIds(): readonly DepthId[] {
  return DEPTH_ORDER;
}
