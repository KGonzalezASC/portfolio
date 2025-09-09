// tailwind.Config.ts
import plugin from "@tailwindcss/typography";

import tailwind_scrollbar from "tailwind-scrollbar";

const config: {
    content: string[];
    theme: {
        extend: {
            keyframes: {
                "spin-slow": { "0%": { "--angle": string }; "100%": { "--angle": string } },
                "color-change": {
                    "0%, 100%": { "background-position": "0% 50%" },
                    "50%": { "background-position": "100% 50%" },
                },
            };
            animation: {
                "spin-slow": string;
                "color-change": string;
            }
        }
    };
    plugins: (plugin | ((options?: Partial<{ className: string; target: "modern" | "legacy" }>) => {
        handler: () => void
    }))[]
} = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        './app/**/*.{js,ts,jsx,tsx,mdx}', // This path was missing
    ],
    theme: {
        extend: {
            keyframes: {
                "spin-slow": {
                    "0%": { "--angle": "0deg" },
                    "100%": { "--angle": "360deg" },
                },
                "color-change": {
                    "0%, 100%": { "background-position": "0% 50%" },
                    "50%": { "background-position": "100% 50%" },
                },
            },
            animation: {
                "spin-slow": "spin-slow 6s linear infinite",
                "color-change": "color-change 15s ease infinite",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        tailwind_scrollbar({ nocompatible: true }),    ],
};

export default config;