/** M12 three labs comparison geometry constants (thin layout SOT). */
export const M12_THREE_LABS_LAYOUT = {
  width: 640,
  height: 220,
  rowH: 52,
  gap: 14,
  x0: 24,
} as const;

export const M12_THREE_LABS_INNER_W = M12_THREE_LABS_LAYOUT.width - 48;
