/**
 * Tools loader by locale (LT / EN).
 * UI and data: use getTools(locale) for ToolsPage.
 */
import type { ModulesLocale } from './modulesLoader';
import type { ToolItem } from '../types/modules';
import toolsLt from '@tools-data';
import toolsEn from '@tools-en-data';

const ltData = toolsLt as { tools: ToolItem[] };
const enData = toolsEn as { tools: ToolItem[] };

export function getTools(locale: ModulesLocale): ToolItem[] {
  return locale === 'en' ? enData.tools : ltData.tools;
}
