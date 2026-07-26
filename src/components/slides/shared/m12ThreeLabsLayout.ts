/** M12 three labs comparison geometry (chip-flow rows; Shell = Ne). */
export const M12_THREE_LABS_LAYOUT = {
  width: 680,
  height: 268,
  titleY: 22,
  rowY0: 40,
  rowH: 68,
  gap: 10,
  padX: 16,
  labelW: 118,
  chipH: 28,
  chipGap: 8,
  chipMinW: 72,
  chipMaxW: 96,
  accentBarW: 4,
} as const;

export const M12_THREE_LABS_INNER_W =
  M12_THREE_LABS_LAYOUT.width - M12_THREE_LABS_LAYOUT.padX * 2;
