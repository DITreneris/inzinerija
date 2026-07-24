/**
 * M10 10.45 – depth/roles hybrid lab (mini schema + ChoiceControl, no scenario).
 * Pattern interactive-control-lab; Shell = Ne; static mini SVG OK (§2.2c exception).
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import ChoiceControl from '../../ui/ChoiceControl';
import CopyButton from './CopyButton';
import M10DepthRolesMiniDiagram from './M10DepthRolesMiniDiagram';
import {
  formatDepthRolesArtefact,
  getDepthOptions,
  getDepthRolesUiLabels,
} from './m10DepthRolesContent';
import { LAB_SHELL_CLASS, ROUTER_TOGGLE_CLASS } from './m10DepthRolesLabTokens';
import {
  buildDepthRolesArtefactParts,
  isTeamDepth,
  type DepthId,
} from './m10DepthRolesModel';

export default function M10DepthRolesLabBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const ui = getDepthRolesUiLabels(loc);
  const depths = getDepthOptions(loc);

  const [depth, setDepth] = useState<DepthId | null>(null);
  const [includeRouter, setIncludeRouter] = useState(false);

  useEffect(() => {
    if (!isTeamDepth(depth)) {
      setIncludeRouter(false);
    }
  }, [depth]);

  const artefact = useMemo(() => {
    if (depth == null) return '';
    return formatDepthRolesArtefact(
      loc,
      buildDepthRolesArtefactParts(depth, includeRouter)
    );
  }, [loc, depth, includeRouter]);

  const choiceOptions = depths.map((d) => ({
    id: d.id,
    label: `${d.label} (${d.code})`,
    description: d.description,
  }));

  return (
    <div
      className={`${LAB_SHELL_CLASS} space-y-4`}
      role="region"
      aria-label={ui.regionAria}
    >
      <M10DepthRolesMiniDiagram
        locale={loc}
        depth={depth}
        includeRouter={includeRouter}
        onDepthSelect={setDepth}
      />

      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {ui.hint}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {ui.examples}
        </p>
      </div>

      <ChoiceControl
        legend={ui.depthLegend}
        options={choiceOptions}
        value={depth}
        onChange={setDepth}
        columns={2}
        size="compact"
      />

      {isTeamDepth(depth) && (
        <div className="space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {ui.teamRolesNote}
          </p>
          <label className={ROUTER_TOGGLE_CLASS}>
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              checked={includeRouter}
              onChange={(e) => setIncludeRouter(e.target.checked)}
            />
            <span>{ui.routerToggle}</span>
          </label>
        </div>
      )}

      <div className="space-y-2 rounded-xl border border-gray-200 bg-white/80 p-3 dark:border-gray-600 dark:bg-gray-900/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {ui.artefactHeading}
          </h4>
          {depth != null ? (
            <CopyButton
              text={artefact}
              variant="accent"
              size="sm"
              title={ui.copyLabel}
              ariaLabel={ui.copyLabel}
              copiedLabel={ui.copiedLabel}
            />
          ) : null}
        </div>
        {depth == null ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {ui.chooseDepthFirst}
          </p>
        ) : (
          <>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {ui.artefactHint}
            </p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-800 dark:bg-gray-950/50 dark:text-gray-200">
              {artefact}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
