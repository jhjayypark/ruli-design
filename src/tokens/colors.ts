// Color tokens — JavaScript reference values
// CSS source of truth: src/styles/tokens.css (@theme block)
// These TS values mirror the light-mode (warm light) palette for JS usage
// (e.g., inline styles, canvas, charts, non-Tailwind contexts).
// Keep in sync with tokens.css when Figma delivers updates.

// ── Parent scales ──────────────────────────────────────────────────────────
export const gray = {
  "25":  "#fcfcfb", "50":  "#f7f7f6", "75":  "#f0f0ef", "100": "#e6e4e1",
  "150": "#d6d4d2", "200": "#ccc8c3", "300": "#aaa69e", "350": "#9c9891",
  "400": "#888379", "500": "#6d6a5f", "600": "#56534b", "700": "#47443e",
  "800": "#3b3934", "900": "#33322e", "950": "#24231f", "00":  "#ffffff",
} as const;

export const purple = {
  "25": "#f4efff", "50": "#eee5ff", "100": "#e6dbff", "200": "#ddceff",
  "300": "#d0bdff", "400": "#bea4ff", "500": "#966eee", "600": "#8a5fe2",
  "700": "#6645a9", "800": "#412f6b",
} as const;

export const red = {
  "25": "#ffeaeb", "50": "#ffe0e1", "100": "#ffd5d6", "200": "#ffc7c9",
  "300": "#ffb5b8", "400": "#ff9ca2", "500": "#e55767", "600": "#dc455a",
  "700": "#a62e3f", "800": "#6a232b",
} as const;

export const amber = {
  "25": "#fff2d0", "50": "#ffebb8", "100": "#ffe39d", "200": "#ffd87f",
  "300": "#ffca56", "400": "#ffb500", "500": "#ed9100", "600": "#d78100",
  "700": "#9b5d00", "800": "#603c00",
} as const;

export const green = {
  "25": "#e0f9e0", "50": "#cff4cf", "100": "#bdeebe", "200": "#a9e6aa",
  "300": "#90db92", "400": "#6dcb72", "500": "#27a139", "600": "#0a9429",
  "700": "#066c1c", "800": "#104617",
} as const;

export const blue = {
  "25": "#e1f3ff", "50": "#d1edff", "100": "#c0e6ff", "200": "#acdcff",
  "300": "#93ceff", "400": "#6db9ff", "500": "#048af5", "600": "#007ce9",
  "700": "#005bae", "800": "#033c6f",
} as const;

// alpha = gray with opacity (light mode)
// beta = white with opacity (light mode)

// ── Semantic tokens ────────────────────────────────────────────────────────
export const text = {
  primary:          gray["950"],
  secondary:        gray["600"],
  pale:             gray["350"],
  inverse:          gray["00"],
  "danger-primary": red["800"],
  "danger-secondary": red["600"],
  "brand-primary":  purple["800"],
  "brand-secondary": purple["600"],
  static:           gray["00"],
  "blue-primary":   blue["800"],
  "blue-secondary": blue["600"],
  "success-primary": green["800"],
  "success-secondary": green["600"],
  "amber-secondary": amber["600"],
  "amber-primary":  amber["800"],
  muted:            gray["200"],
  long:             gray["800"],
  toast:            gray["600"],
} as const;

export const border = {
  light:          gray["100"],
  medium:         gray["150"],
  high:           gray["200"],
  "focus-brand":  purple["600"],
  "focus-neutral": gray["950"],
  "focus-error":  red["600"],
  highlight:      gray["350"],
} as const;

// Grouped export for convenience
export const colors = { gray, purple, red, amber, green, blue, text, border } as const;
