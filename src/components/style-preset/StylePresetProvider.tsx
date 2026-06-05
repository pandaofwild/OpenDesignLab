"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  defaultDesignStyleSlug,
  designStyles,
  getDesignStyleBySlug,
  type DesignStyle,
  type DesignStylePalette,
  type StyleTokens,
} from "@/data/designStyles";
import { createPromptStylePreset } from "@/lib/paletteGenerator";
import { styleTokenVars } from "./styleTokenVars";

type StylePresetContextValue = {
  activePreset: DesignStyle;
  customPreset: DesignStyle | null;
  generateCustomPreset: () => void;
  palette: DesignStylePalette;
  prompt: string;
  resetCustomPreset: () => void;
  selectedSlug: string;
  setPrompt: (prompt: string) => void;
  setSelectedSlug: (slug: string) => void;
  tokens: StyleTokens;
};

type StyleVariables = CSSProperties & Record<`--style-${string}`, string>;

const StylePresetContext = createContext<StylePresetContextValue | null>(null);
const legacyStorageKey = "openlayout-style-preset-v1";
const storageKey = "opendesignlab-style-preset-v1";

const defaultPrompt =
  "브랜드, 웹, 그래픽, UI 디자인에 활용할 수 있는 디자인 풍 사전. 대표 이미지는 카드 썸네일처럼 명확하고 색감이 강해야 한다.";

type StoredStyleState = {
  customPreset: DesignStyle | null;
  prompt: string;
  selectedSlug: string;
};

type StyleState = StoredStyleState & {
  storageReady: boolean;
};

const defaultStyleState: StoredStyleState = {
  customPreset: null,
  prompt: defaultPrompt,
  selectedSlug: defaultDesignStyleSlug,
};

const defaultClientStyleState: StyleState = {
  ...defaultStyleState,
  storageReady: false,
};

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const fallback = normalized.length === 3
    ? normalized
        .split("")
        .map((value) => value + value)
        .join("")
    : normalized;
  const value = Number.parseInt(fallback, 16);

  if (Number.isNaN(value)) return "30 30 30";

  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
}

function styleVariablesFor(palette: DesignStylePalette): StyleVariables {
  return {
    "--style-base": palette.base,
    "--style-surface": palette.surface,
    "--style-text": palette.text,
    "--style-muted": palette.mutedText,
    "--style-primary": palette.primary,
    "--style-accent": palette.accent,
    "--style-accent-2": palette.accent2,
    "--style-accent-3": palette.accent3,
    "--style-border": palette.border,
    "--style-base-rgb": hexToRgb(palette.base),
    "--style-surface-rgb": hexToRgb(palette.surface),
    "--style-text-rgb": hexToRgb(palette.text),
    "--style-primary-rgb": hexToRgb(palette.primary),
    "--style-accent-rgb": hexToRgb(palette.accent),
    "--style-accent-2-rgb": hexToRgb(palette.accent2),
    "--style-accent-3-rgb": hexToRgb(palette.accent3),
    "--style-border-rgb": hexToRgb(palette.border),
  };
}

function readStoredStyleState(): StoredStyleState {
  if (typeof window === "undefined") return defaultStyleState;

  const saved = window.localStorage.getItem(storageKey) ?? window.localStorage.getItem(legacyStorageKey);
  if (!saved) return defaultStyleState;

  try {
    const parsed = JSON.parse(saved) as Partial<StoredStyleState>;

    return {
      customPreset: parsed.customPreset ?? null,
      prompt: parsed.prompt ?? defaultPrompt,
      selectedSlug: parsed.selectedSlug ?? defaultDesignStyleSlug,
    };
  } catch {
    window.localStorage.removeItem(storageKey);
    window.localStorage.removeItem(legacyStorageKey);
    return defaultStyleState;
  }
}

function findStylePreset(slug: string): DesignStyle {
  const style = getDesignStyleBySlug(slug) ?? designStyles[0];

  if (!style) {
    throw new Error("designStyles must include at least one style");
  }

  return style;
}

export function StylePresetProvider({ children }: { children: ReactNode }) {
  const [styleState, setStyleState] = useState(defaultClientStyleState);
  const userChangedBeforeStorageReady = useRef(false);
  const { customPreset, prompt, selectedSlug, storageReady } = styleState;

  const selectedPreset = findStylePreset(selectedSlug);
  const activePreset = customPreset ?? selectedPreset;

  useEffect(() => {
    // localStorage is browser-only, so persisted style must hydrate after mount.
    setStyleState((current) =>
      userChangedBeforeStorageReady.current
        ? { ...current, storageReady: true }
        : { ...readStoredStyleState(), storageReady: true },
    );
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        customPreset,
        prompt,
        selectedSlug,
      }),
    );
  }, [customPreset, prompt, selectedSlug, storageReady]);

  const value = useMemo<StylePresetContextValue>(
    () => ({
      activePreset,
      customPreset,
      generateCustomPreset: () => {
        userChangedBeforeStorageReady.current = true;
        setStyleState((current) => ({
          ...current,
          customPreset: createPromptStylePreset(current.prompt, selectedPreset),
        }));
      },
      palette: activePreset.palette,
      prompt,
      tokens: activePreset.tokens,
      resetCustomPreset: () => {
        userChangedBeforeStorageReady.current = true;
        setStyleState((current) => ({
          ...current,
          customPreset: null,
        }));
      },
      selectedSlug,
      setPrompt: (nextPrompt: string) => {
        userChangedBeforeStorageReady.current = true;
        setStyleState((current) => ({ ...current, prompt: nextPrompt }));
      },
      setSelectedSlug: (slug: string) => {
        userChangedBeforeStorageReady.current = true;
        setStyleState((current) => ({
          ...current,
          customPreset: null,
          selectedSlug: slug,
        }));
      },
    }),
    [activePreset, customPreset, prompt, selectedPreset, selectedSlug],
  );

  return (
    <StylePresetContext.Provider value={value}>
      <div
        className="style-preset-root flex min-h-full flex-1 flex-col"
        data-st-density={activePreset.tokens.space.density}
        data-st-effect={activePreset.tokens.decoration.effect}
        data-style-preset={activePreset.slug}
        style={{ ...styleVariablesFor(activePreset.palette), ...styleTokenVars(activePreset) }}
      >
        {children}
      </div>
    </StylePresetContext.Provider>
  );
}

export function useStylePreset() {
  const value = useContext(StylePresetContext);

  if (!value) {
    throw new Error("useStylePreset must be used inside StylePresetProvider");
  }

  return value;
}

export function useStyleTokens() {
  return useStylePreset().activePreset.tokens;
}

export { designStyles as stylePresets };
