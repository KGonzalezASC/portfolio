// src/Components/CardCode.tsx
"use client"; //since the markdown is still computed on server we still save cost
//test is still served immmedietely

import { Card } from '@/Components/Card';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useColorEffect } from '@/app/notes/Components/ColorEffectProvider';
import {generateGradientStyle} from "@/app/notes/Config/languagePalette";

interface CardCodeProps {
    children: string;
    language?: string;
}

export function CardCode({ children, language }: CardCodeProps) {
    const { hideColorEffect } = useColorEffect();

    // If effect is hidden, use default palette static gradient
    const borderStyle = hideColorEffect
        ? generateGradientStyle('default', false)
        : generateGradientStyle(language, true); // animate only if effect not hidden

    return (
        <Card
            title={language || 'Code'}
            dynamicWidth={false}
            className="w-full max-w-screen-xl mx-auto"
            hoverClassName="md:hover:scale-[1.01]"
            borderStyle={borderStyle} // uses static or animated gradient
            titleClassName="text-2xl pt-0 text-gray-200 font-bold"
        >
            <div
                className="elegant-scroll transition-transform duration-300 hover:scale-[1.02]"
                style={{ overflowX: 'auto', overflowY: 'auto', width: '100%' }}
            >
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        padding: 'clamp(0.5rem, 2vw, 1rem)',
                        fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                        minWidth: 'max-content',
                        display: 'block',
                    }}
                    wrapLines
                    lineProps={() => ({
                        className: 'transition-colors duration-200 hover:bg-white/10 p-1 rounded-md',
                    })}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            </div>
        </Card>
    );
}
