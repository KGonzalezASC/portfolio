import type { ReactNode } from "react";

type Hover =
    | `hover:${string}`
    | `transition${string}`
    | `duration-${string}`
    | `ease-${string}`
    | `animate-${string}`;

interface CardProps {
    title?: string;
    description?: string;
    children?: ReactNode;
    dynamicWidth?: boolean;
    icon?: ReactNode;
    className?: string;         // Outer wrapper
    innerClassName?: string;    // Inner glass container
    titleClassName?: string;    // Title styling
    borderClassName?: string;   // Tailwind classes for border/gradient
    borderStyle?: React.CSSProperties; // Inline style override
    hoverClassName?: Hover;     // Hover effect styling
}

export function Card({
                         title,
                         description,
                         children,
                         icon,
                         dynamicWidth = false,
                         className,
                         innerClassName,
                         titleClassName,
                         borderClassName,
                         borderStyle,
                         hoverClassName,
                     }: CardProps) {
    return (
        <div
            className={`
                rounded-2xl p-0.5
                shadow-lg transition-all duration-300 ease-in-out
                ${dynamicWidth ? "inline-block w-auto max-w-full" : "w-full max-w-md"}
                ${hoverClassName ?? "hover:scale-[1.03]"}
                ${className ?? ""}
                ${borderClassName ?? "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"}
            `}
            style={borderStyle} // ✅ inline gradient overrides Tailwind
        >
            <div
                className={`
                    h-full w-full rounded-xl p-6
                    bg-white/80 dark:bg-neutral-900/80
                    backdrop-blur-lg
                    ${innerClassName ?? ""}
                `}
            >
                {(title || icon) && (
                    <div className="flex items-center gap-4 mb-4">
                        {icon && (
                            <div className="text-2xl text-blue-500 dark:text-cyan-400">
                                {icon}
                            </div>
                        )}
                        {title && (
                            <h2
                                className={`
                                    text-xl font-semibold text-gray-900 dark:text-gray-100
                                    ${titleClassName ?? ""}
                                `}
                            >
                                {title}
                            </h2>
                        )}
                    </div>
                )}

                {description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 break-words">
                        {description}
                    </p>
                )}

                {children && <div>{children}</div>}
            </div>
        </div>
    );
}
