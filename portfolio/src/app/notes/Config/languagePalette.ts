import React from "react";

export interface LanguagePalette {
    primary: string;   // hex color
    secondary: string; // hex color
    opacity: {
        primary: number;   // 0–100
        secondary: number; // 0–100
    };
}

// Tailwind v3 hex values
const tsPalette: LanguagePalette = {
    primary: '#14b8a6', // teal-500
    secondary: '#818cf8', // indigo-400
    opacity: { primary: 40, secondary: 45 },
};

const csharpPalette: LanguagePalette = {
    primary: '#a855f7', // purple-500
    secondary: '#a78bfa', // violet-400
    opacity: { primary: 40, secondary: 45 },
};

const cppPalette: LanguagePalette = {
    primary: '#10b981', // emerald-500
    secondary: '#4ade80', // green-400
    opacity: { primary: 40, secondary: 45 },
};

const yamlPalette: LanguagePalette = {
    primary: '#f59e0b', // amber-500
    secondary: '#fb923c', // orange-400
    opacity: { primary: 40, secondary: 45 },
};

const defaultPalette: LanguagePalette = {
    primary: '#64748b', // slate-500
    secondary: '#9ca3af', // gray-400
    opacity: { primary: 35, secondary: 40 },
};

export const languagePalettes: Record<string, LanguagePalette> = {
    javascript: tsPalette, js: tsPalette, typescript: tsPalette, ts: tsPalette,
    csharp: csharpPalette, cs: csharpPalette, 'c#': csharpPalette,
    cpp: cppPalette, c: cppPalette, 'c++': cppPalette,
    yaml: yamlPalette, yml: yamlPalette,
    default: defaultPalette,
};

export function getLanguagePalette(language?: string): LanguagePalette {
    if (!language) return languagePalettes.default;
    const normalizedLanguage = language.toLowerCase().trim();
    return languagePalettes[normalizedLanguage] || languagePalettes.default;
}

// helper: add alpha to hex (#RRGGBB -> #RRGGBBAA)
function withOpacity(hex: string, opacityPercent: number): string {
    const alpha = Math.round((opacityPercent / 100) * 255)
        .toString(16)
        .padStart(2, "0");
    return `${hex}${alpha}`;
}

export function generateGradientStyle(
    language?: string,
    animate = true
): React.CSSProperties {
    const palette = getLanguagePalette(language);

    const primary = withOpacity(palette.primary, palette.opacity.primary);
    const secondary = withOpacity(palette.secondary, palette.opacity.secondary);

    const style: React.CSSProperties = {
        backgroundImage: `conic-gradient(
            from var(--angle) at 50% 50%,
            transparent 0%,
            ${primary} 20%,
            ${secondary} 35%,
            transparent 50%
        )`,
    };

    if (animate) {
        style.animation = "spin-slow 6s linear infinite";
    }

    return style;
}

