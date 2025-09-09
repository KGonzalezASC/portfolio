// src/app/notes/Components/ColorEffectProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ColorEffectContextType {
    hideColorEffect: boolean;
    setHideColorEffect: (hide: boolean) => void;
}

const ColorEffectContext = createContext<ColorEffectContextType | undefined>(undefined);

export function useColorEffect() {
    const context = useContext(ColorEffectContext);
    if (context === undefined) {
        throw new Error('useColorEffect must be used within a ColorEffectProvider');
    }
    return context;
}

interface ColorEffectProviderProps {
    children: ReactNode;
}

export function ColorEffectProvider({ children }: ColorEffectProviderProps) {
    const [hideColorEffect, setHideColorEffect] = useState(false);

    return (
        <ColorEffectContext.Provider value={{ hideColorEffect, setHideColorEffect }}>
            <div className="w-full">
                <div className="mb-6 flex items-center justify-end max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hideColorEffect}
                            onChange={(e) => setHideColorEffect(e.target.checked)}
                            className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        Hide color effects
                    </label>
                </div>
                {children}
            </div>
        </ColorEffectContext.Provider>
    );
}