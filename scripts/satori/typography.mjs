export const typography = {
  eyebrow: 14,
  headline: 36,
  stat: 56,
  statSm: 40,
  label: 16,
  caption: 14,
  stepTitle: 18,
  stepSub: 13,
};

export function px(n) {
  return `${n}px`;
}

export function titleStyle(text, baseSize) {
  const len = (text || '').length;
  return {
    fontSize: px(len > 42 ? baseSize - 4 : baseSize),
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    maxLines: 2,
  };
}
