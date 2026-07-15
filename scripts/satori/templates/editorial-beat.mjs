import { h } from '../jsx.mjs';
import { brand, accentByKey } from '../brand.mjs';
import { typography, titleStyle, px } from '../typography.mjs';

const t = typography;

function shell(children, accentKey = 'accent') {
  const accent = accentByKey[accentKey] || accentByKey.accent;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: brand.colors.pageBg,
        fontFamily: 'Inter',
        position: 'relative',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          height: '6px',
          width: '100%',
          backgroundColor: accent.main,
        },
      }
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1,
          width: '100%',
          padding: '40px 48px',
        },
      },
      children
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 48px 20px',
          borderTop: `1px solid ${brand.colors.border}`,
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.inkSubtle,
            fontSize: px(12),
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          },
        },
        brand.portalBrand
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.inkSubtle,
            fontSize: px(11),
          },
        },
        brand.name
      )
    )
  );
}

function eyebrowPill(text, accentKey) {
  const accent = accentByKey[accentKey] || accentByKey.accent;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: '6px 14px',
        borderRadius: '9999px',
        backgroundColor: accent.light,
        color: accent.main,
        fontSize: px(t.eyebrow),
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: '16px',
      },
    },
    text
  );
}

function panel(children, extra = {}) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: brand.colors.cardBg,
        border: `1.5px solid ${brand.colors.border}`,
        borderRadius: '16px',
        padding: '24px 28px',
        flex: 1,
        ...extra,
      },
    },
    children
  );
}

function buildSplitCompare(props) {
  const accentKey = props.accentKey || 'accent';
  const accent = accentByKey[accentKey] || accentByKey.accent;

  const diagram = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '20px',
        marginTop: '28px',
      },
    },
    panel(
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.brand,
              fontSize: px(t.label),
              fontWeight: 700,
              marginBottom: '12px',
            },
          },
          props.leftTitle || 'Naudoja DI'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.brand,
              fontSize: px(t.stat),
              fontWeight: 800,
              lineHeight: 1,
            },
          },
          props.leftStat || '86%'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '10px',
              color: brand.colors.inkMuted,
              fontSize: px(t.caption),
              lineHeight: 1.4,
            },
          },
          props.leftCaption || ''
        )
      ),
      { borderTop: `4px solid ${brand.colors.brand}` }
    ),
    panel(
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: accent.main,
              fontSize: px(t.label),
              fontWeight: 700,
              marginBottom: '12px',
            },
          },
          props.rightTitle || 'Suvokia kaip DI'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: accent.main,
              fontSize: px(t.stat),
              fontWeight: 800,
              lineHeight: 1,
            },
          },
          props.rightStat || '38%'
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: '10px',
              color: brand.colors.inkMuted,
              fontSize: px(t.caption),
              lineHeight: 1.4,
            },
          },
          props.rightCaption || ''
        )
      ),
      { borderTop: `4px solid ${accent.main}` }
    )
  );

  const gap = props.gapLabel
    ? h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '20px',
            padding: '14px 20px',
            borderRadius: '12px',
            backgroundColor: accent.light,
            color: brand.colors.ink,
            fontSize: px(t.label),
            fontWeight: 600,
            textAlign: 'center',
            justifyContent: 'center',
          },
        },
        props.gapLabel
      )
    : null;

  return shell(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        },
      },
      eyebrowPill(props.eyebrow || 'Redakcinė pauzė', accentKey),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.ink,
            ...titleStyle(props.headline, t.headline),
          },
        },
        props.headline || ''
      ),
      diagram,
      gap
    ),
    accentKey
  );
}

function buildStatRibbon(props) {
  const accentKey = props.accentKey || 'brand';
  const accent = accentByKey[accentKey] || accentByKey.brand;

  return shell(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '32px',
          alignItems: 'center',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1.2,
          },
        },
        eyebrowPill(props.eyebrow || 'Kontekstas', accentKey),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.ink,
              ...titleStyle(props.headline, t.headline),
            },
          },
          props.headline || ''
        )
      ),
      panel(
        h(
          'div',
          { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
          h(
            'div',
            {
              style: {
                display: 'flex',
                color: accent.main,
                fontSize: px(t.stat),
                fontWeight: 800,
                lineHeight: 1,
              },
            },
            props.heroStat || '69%'
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '12px',
                color: brand.colors.inkMuted,
                fontSize: px(t.caption),
                textAlign: 'center',
                lineHeight: 1.4,
                maxWidth: '220px',
              },
            },
            props.heroLabel || ''
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: `1px solid ${brand.colors.border}`,
                flexDirection: 'column',
                alignItems: 'center',
              },
            },
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  color: brand.colors.inkSubtle,
                  fontSize: px(t.caption),
                  marginBottom: '6px',
                },
              },
              'ES palyginimas'
            ),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  color: brand.colors.brand,
                  fontSize: px(t.statSm),
                  fontWeight: 800,
                },
              },
              props.compareStat || '32,7%'
            ),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  marginTop: '6px',
                  color: brand.colors.inkMuted,
                  fontSize: px(12),
                },
              },
              props.compareLabel || ''
            )
          )
        ),
        { minWidth: '320px', borderTop: `4px solid ${accent.main}` }
      )
    ),
    accentKey
  );
}

function flowArrow() {
  return h(
    'svg',
    { width: 32, height: 32, viewBox: '0 0 24 24' },
    h('path', {
      d: 'M5 12h12M13 7l5 5-5 5',
      fill: 'none',
      stroke: brand.colors.brand,
      strokeWidth: 2.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    })
  );
}

function buildPromptFlow(props) {
  const accentKey = props.accentKey || 'violet';
  const accent = accentByKey[accentKey] || accentByKey.violet;
  const steps = props.steps || [];

  const stepNodes = steps.flatMap((step, i) => {
    const node = panel(
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        h(
          'div',
          {
            style: {
              display: 'flex',
              width: '36px',
              height: '36px',
              borderRadius: '9999px',
              backgroundColor: accent.light,
              color: accent.main,
              fontSize: px(16),
              fontWeight: 800,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            },
          },
          String(i + 1)
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.ink,
              fontSize: px(t.stepTitle),
              fontWeight: 700,
              marginBottom: '6px',
            },
          },
          step.label || ''
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              color: brand.colors.inkMuted,
              fontSize: px(t.stepSub),
              textAlign: 'center',
              lineHeight: 1.35,
            },
          },
          step.sub || ''
        )
      ),
      { alignItems: 'center', textAlign: 'center' }
    );
    if (i === steps.length - 1) return [node];
    return [
      node,
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8px',
          },
        },
        flowArrow()
      ),
    ];
  });

  return shell(
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        },
      },
      eyebrowPill(props.eyebrow || 'Tiltas į praktiką', accentKey),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: brand.colors.ink,
            ...titleStyle(props.headline, t.headline),
            marginBottom: '32px',
          },
        },
        props.headline || ''
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            width: '100%',
          },
        },
        ...stepNodes
      )
    ),
    accentKey
  );
}

const VARIANTS = {
  'split-compare': buildSplitCompare,
  'stat-ribbon': buildStatRibbon,
  'prompt-flow': buildPromptFlow,
};

export function buildEditorialBeat(props) {
  const variant = props.variant || 'split-compare';
  const build = VARIANTS[variant];
  if (!build) {
    throw new Error(`Unknown editorial-beat variant: ${variant}`);
  }
  return build(props);
}
