import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

// Function to get all available post slugs
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));

  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Read the file from the filesystem
  const markdownFile = fs.readFileSync(
    path.join(process.cwd(), "content/blog", `${slug}.mdx`),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownFile);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 font-[var(--font-inconsolata)]">
      <main className="container mx-auto my-8 px-4 w-full max-w-4xl">
        <Link
          href="/blog"
          className="block mb-4 text-amber-800 hover:text-amber-600 font-bold underline underline-offset-2"
        >
          ← Back to all posts
        </Link>

        <article className="prose prose-amber max-w-none bg-white p-6 rounded-md shadow-sm border border-amber-200">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-amber-900 tracking-wide">
              {frontmatter.title}
            </h1>
            <div className="flex flex-col space-y-2 mt-3">
              <time className="text-xs text-amber-700">
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {frontmatter.tags && (
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-amber-100 text-amber-800 text-xs px-2 py-1 border border-amber-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="markdown-content prose-headings:text-amber-900 prose-p:text-amber-900 prose-a:text-amber-800 prose-a:underline prose-li:text-amber-900">
            <MDXRemote source={content} />
          </div>
        </article>
      </main>
    </div>
  );
}
