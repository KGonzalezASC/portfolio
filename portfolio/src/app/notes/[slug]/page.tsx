// portfolio/app/notes/[slug]/page.tsx (Local Test Version)

import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

//tells next-js to render on server for request
export const dynamic = 'force-dynamic';

//temp function
async function getNoteFromLocalFile(slug: string): Promise<string | null> {
    try {
        const filePath = path.join(process.cwd(), '../_notes/Babble', `${slug}.md`);
        const markdownContent = await fs.readFile(filePath, 'utf8');
        return markdownContent;
    } catch (error) {
        console.error("Error reading local file:", error);
        return null;
    }
}


//params is an async object (server component) and support streaming
//can not be destructured synchronously
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const markdownContent = await getNoteFromLocalFile(slug);

    if (!markdownContent) {
        return <div>Note not found.</div>;
    }

    return (
        <article className="prose dark:prose-invert">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {markdownContent}
            </ReactMarkdown>
        </article>
    );
}
