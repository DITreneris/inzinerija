/** Minimal React-like element factory for Satori (no React dependency). */
export function h(type, props = {}, ...children) {
  const flat = children.flat(Infinity).filter((c) => c != null && c !== false);
  const child = flat.length <= 1 ? flat[0] : flat;
  if (props && 'children' in props) {
    const { children: _ignored, ...rest } = props;
    return { type, props: { ...rest, children: child } };
  }
  return { type, props: { ...props, children: child } };
}
