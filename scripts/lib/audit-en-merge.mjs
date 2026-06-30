/**
 * Shared deep-merge + string collection for EN overlay audits (M7–M9, M10–12).
 */

export const LT_DIACRITICS = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/;

export function deepMerge(base, overlay) {
  if (overlay == null) return base;
  if (Array.isArray(overlay)) {
    if (!Array.isArray(base)) return overlay;
    const result = base.map((item, i) => {
      const o = overlay.find?.((x) => x?.id != null && item?.id != null && x.id === item.id);
      if (o) return deepMerge(item, o);
      return overlay[i] != null ? deepMerge(item, overlay[i]) : item;
    });
    overlay.forEach((o) => {
      if (o?.id != null && !result.some((r) => r?.id === o.id)) result.push(o);
    });
    return result;
  }
  if (typeof overlay !== 'object' || typeof base !== 'object') return overlay ?? base;
  const out = { ...base };
  for (const k of Object.keys(overlay)) {
    out[k] = deepMerge(base[k], overlay[k]);
  }
  return out;
}

export function mergeModulesData(lt, enPartial) {
  const modules = lt.modules.map((m) => {
    const enMod = enPartial.modules?.find((x) => x.id === m.id);
    return enMod ? deepMerge(m, enMod) : m;
  });
  return { modules };
}

export function collectStrings(obj, path = '', out = []) {
  if (typeof obj === 'string') {
    out.push({ path, value: obj });
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => collectStrings(v, `${path}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      collectStrings(v, path ? `${path}.${k}` : k, out);
    }
  }
  return out;
}

/** Simulate loadModules('en') merge for selected module ids. */
export function simulateEnLocale(ltModulesData, enPartial, moduleIds) {
  const filtered = {
    modules: ltModulesData.modules.filter((m) => moduleIds.includes(m.id)),
  };
  return mergeModulesData(filtered, enPartial);
}
