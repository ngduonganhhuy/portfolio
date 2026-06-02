export const THEMES = [
  {
    id: "spring",
    name: "Spring",
    mode: "light",
    swatches: ["#F7F3E8", "#2F3A2F", "#E85D75", "#4FB477"],
  },
  {
    id: "kungfu",
    name: "Kungfu",
    mode: "dark",
    swatches: ["#17110D", "#F8E7C8", "#D7392F", "#D9A441"],
  },
  {
    id: "tet",
    name: "Tet",
    mode: "light",
    swatches: ["#FFF2D2", "#7D1B16", "#D91F26", "#F3C13A"],
  },
  {
    id: "farmer",
    name: "Farmer",
    mode: "light",
    swatches: ["#F4E8C1", "#3F3A24", "#6FAE3F", "#8B5A2B"],
  },
  {
    id: "noel",
    name: "Noel",
    mode: "dark",
    swatches: ["#0B2B26", "#F7F1E3", "#C62828", "#2FA36B"],
  },
  {
    id: "ocean",
    name: "Ocean",
    mode: "dark",
    swatches: ["#0B1F2A", "#E6F7FF", "#19A7CE", "#8BE8E5"],
  },
  {
    id: "classic",
    name: "Classic",
    mode: "light",
    swatches: ["#F2E7D5", "#333333", "#B63E96", "#58E6D9"],
  },
];

export const DEFAULT_THEME = "tet";

export function getThemeById(themeId) {
  return THEMES.find((theme) => theme.id === themeId) || THEMES.find((theme) => theme.id === DEFAULT_THEME);
}

export function normalizeThemeId(themeId) {
  if (themeId === "dark") return "kungfu";
  if (themeId === "light") return DEFAULT_THEME;
  return getThemeById(themeId)?.id || DEFAULT_THEME;
}
