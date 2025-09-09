// tailwind.config.ts
import tailwindScrollbar from "tailwind-scrollbar";
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        typography,
        tailwindScrollbar({ nocompatible: true }),
    ],
};
