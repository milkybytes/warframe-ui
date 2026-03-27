import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/* ── Types ─────────────────────────────────────────────────────── */

export interface WfuiThemeVars {
  '--wfui-bg': string;
  '--wfui-text': string;
  '--wfui-surface': string;
  '--wfui-primary': string;
  '--wfui-secondary': string;
  '--wfui-secondary-hover': string;
  '--wfui-text-secondary': string;
  '--wfui-disabled-bg'?: string;
  '--wfui-disabled-text'?: string;
  '--wfui-shadow'?: string;
}

export const THEME_VAR_KEYS = [
  '--wfui-bg',
  '--wfui-text',
  '--wfui-surface',
  '--wfui-primary',
  '--wfui-secondary',
  '--wfui-secondary-hover',
  '--wfui-text-secondary',
  '--wfui-disabled-bg',
  '--wfui-disabled-text',
  '--wfui-shadow',
] as const;

export const BUILTIN_THEMES = [
  'default',
  'harrier',
  'light',
  'vitruvian',
  'nidus',
  'darklotus',
  'lunar',
] as const;

export type BuiltinTheme = (typeof BUILTIN_THEMES)[number];

/* ── Runtime custom theme registration ─────────────────────────── */

let styleEl: HTMLStyleElement | null = null;
const customThemes = new Map<string, WfuiThemeVars>();

function ensureStyleElement(): HTMLStyleElement {
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.setAttribute('data-wfui-custom-themes', '');
    document.head.appendChild(styleEl);
  }
  return styleEl;
}

function rebuildCustomCSS() {
  const el = ensureStyleElement();
  const rules = Array.from(customThemes.entries())
    .map(([name, vars]) => {
      const props = Object.entries(vars)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n');
      return `[data-theme='${name}'] {\n${props}\n}`;
    })
    .join('\n\n');
  el.textContent = rules;
}

/**
 * Register a custom theme that can be activated via `data-theme="name"` or `setTheme(name)`.
 * If a theme with the same name already exists it will be overwritten.
 */
export function registerTheme(name: string, vars: WfuiThemeVars): void {
  customThemes.set(name, vars);
  rebuildCustomCSS();
}

/**
 * Remove a previously registered custom theme.
 */
export function unregisterTheme(name: string): void {
  customThemes.delete(name);
  rebuildCustomCSS();
}

/* ── Resolve helper (no React needed) ──────────────────────────── */

/**
 * Read the resolved CSS variable values from a DOM element.
 * Defaults to `document.documentElement` if no element is provided.
 */
export function resolveThemeVars(el?: HTMLElement): Record<string, string> {
  const target = el ?? document.documentElement;
  const computed = getComputedStyle(target);
  const result: Record<string, string> = {};
  for (const key of THEME_VAR_KEYS) {
    result[key] = computed.getPropertyValue(key).trim();
  }
  return result;
}

/* ── Context ───────────────────────────────────────────────────── */

interface WfuiContextValue {
  theme: string;
  setTheme: (theme: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const WfuiContext = createContext<WfuiContextValue | null>(null);

/* ── Provider ──────────────────────────────────────────────────── */

export interface WfuiProviderProps {
  /** Initial / controlled theme name. Defaults to `'default'`. */
  theme?: string;
  /** Called when the theme changes (for controlled usage). */
  onThemeChange?: (theme: string) => void;
  children: ReactNode;
}

/**
 * Provides theme context to child components.
 * Renders a wrapper `<div data-theme="…">` with `display: contents`.
 *
 * Can be used controlled (pass `theme` + `onThemeChange`) or uncontrolled
 * (just pass an initial `theme` or omit for `'default'`).
 */
export function WfuiProvider({ theme: controlledTheme, onThemeChange, children }: WfuiProviderProps) {
  const [internalTheme, setInternalTheme] = useState(controlledTheme ?? 'default');
  const theme = controlledTheme ?? internalTheme;
  const containerRef = useRef<HTMLDivElement>(null);

  const setTheme = useCallback(
    (t: string) => {
      if (onThemeChange) onThemeChange(t);
      else setInternalTheme(t);
    },
    [onThemeChange],
  );

  useEffect(() => {
    if (controlledTheme !== undefined) setInternalTheme(controlledTheme);
  }, [controlledTheme]);

  const value = useMemo(() => ({ theme, setTheme, containerRef }), [theme, setTheme]);

  return (
    <WfuiContext.Provider value={value}>
      <div ref={containerRef} data-theme={theme} style={{ display: 'contents' }}>
        {children}
      </div>
    </WfuiContext.Provider>
  );
}

/* ── Hooks ─────────────────────────────────────────────────────── */

/**
 * Read and change the active theme.
 * Must be used inside a `<WfuiProvider>`.
 */
export function useWfuiTheme() {
  const ctx = useContext(WfuiContext);
  if (!ctx) throw new Error('useWfuiTheme must be used within a <WfuiProvider>');
  return { theme: ctx.theme, setTheme: ctx.setTheme };
}

/**
 * Read the resolved CSS variable values for the current theme.
 *
 * When used inside a `<WfuiProvider>`, automatically reads from the
 * provider's themed container and updates when the theme changes.
 *
 * Can also be used standalone by passing an explicit element ref.
 */
export function useWfuiThemeVars(ref?: React.RefObject<HTMLElement | null>): Record<string, string> {
  const ctx = useContext(WfuiContext);
  const [vars, setVars] = useState<Record<string, string>>({});

  // Determine which element to read from:
  // 1. Explicit ref from caller
  // 2. Provider's container ref
  // 3. document.documentElement
  const theme = ctx?.theme;

  useEffect(() => {
    // Defer to next frame so the browser has applied CSS after data-theme change
    const id = requestAnimationFrame(() => {
      const el = ref?.current ?? ctx?.containerRef.current ?? document.documentElement;
      setVars(resolveThemeVars(el));
    });
    return () => cancelAnimationFrame(id);
  }, [theme, ref, ctx?.containerRef]);

  return vars;
}
