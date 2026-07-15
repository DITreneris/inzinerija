import type { NewsPortalToolsAndYouth } from '../../../types/modules';
import PortalBlockShell from './PortalBlockShell';
import PortalCardHeader from './PortalCardHeader';
import PortalHorizontalBarRow from './PortalHorizontalBarRow';
import { portalKpiIconRole, resolvePortalToolIcon } from './portalKpiIcons';
import { PORTAL_DEPTH_CARD_VARIANT } from './portalSurfaces';

interface PortalRankingBlockProps {
  toolsAndYouth: NewsPortalToolsAndYouth;
}

export default function PortalRankingBlock({ toolsAndYouth }: PortalRankingBlockProps) {
  const tools = toolsAndYouth.tools ?? [];

  return (
    <PortalBlockShell variant={PORTAL_DEPTH_CARD_VARIANT} footerInsight={toolsAndYouth.toolsInsight}>
      <PortalCardHeader
        label={toolsAndYouth.toolsLabel}
        title={toolsAndYouth.toolsTitle}
      />
      <ol className="space-y-3 max-w-2xl list-none m-0 p-0" aria-label={toolsAndYouth.toolsTitle}>
        {tools.map((tool, i) => (
          <li key={i}>
            <PortalHorizontalBarRow
              label={tool.name}
              pct={tool.pct}
              icon={resolvePortalToolIcon(tool.iconKey)}
              iconRole={portalKpiIconRole('brand')}
              variant="ranking"
              rank={i + 1}
              emphasis={i === 0}
            />
          </li>
        ))}
      </ol>
    </PortalBlockShell>
  );
}
