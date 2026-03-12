/**
 * Core production profile: when VITE_MVP_MODE=1, build/runtime use only modules 1–6.
 */
export const getIsMvpMode = (): boolean =>
  import.meta.env.VITE_MVP_MODE === '1';
