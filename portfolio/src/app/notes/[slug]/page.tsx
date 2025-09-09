// src/app/notes/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { CardCode } from "@/app/notes/Components/CodeCard";
import { ColorEffectProvider } from "@/app/notes/Components/ColorEffectProvider";

export const dynamic = 'force-dynamic';

async function getNoteFromLocalFile(slug: string): Promise<string | null> {
    try {
        const filePath = path.join(
            process.cwd(),
            '../_notes/Babble',
            `${slug}.md`
        );
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading local file:', error);
        return null;
    }
}

export default async function NotePage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const markdownContent = await getNoteFromLocalFile(slug);

    if (!markdownContent) {
        return <div>Note not found.</div>;
    }

    // Use Partial<Components> and type code function as unknown first, then cast
    const CustomComponents: Partial<Components> = {
        code: (({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            return !inline ? (
                <CardCode language={match ? match[1] : undefined}>
                    {codeString}
                </CardCode>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }) as unknown as Components['code'],
    };

    return (
        <ColorEffectProvider>
            <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert w-full max-w-3xl">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={CustomComponents}
                    >
                        {markdownContent}
                    </ReactMarkdown>
                </article>
            </div>
        </ColorEffectProvider>
    );
}
