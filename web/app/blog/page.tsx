"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center bg-amber-50 font-[var(--font-inconsolata)] min-h-screen pt-8">
      <main className="container mx-auto px-4 w-full max-w-2xl pb-24">
        <header className="w-full py-4 text-amber-900">
          <Link
            href="/"
            className="block mb-4 text-amber-800 hover:text-amber-600 font-bold underline underline-offset-2"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold tracking-wide">Writing</h1>
          <p className="text-amber-900 mt-2 retro-text">
            Thoughts on technology, building, and the future.
          </p>
        </header>

        <section className="retro-panel">
          {isLoading ? (
            <p className="text-amber-800 retro-text">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-amber-800 retro-text">No posts available yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="border border-black bg-amber-50 p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] mb-4"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-bold text-amber-900 hover:text-amber-600">
                      {post.title}
                    </h2>
                  </Link>
                  <time className="text-xs text-amber-700 block mt-1 retro-text">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <p className="text-sm text-amber-900 mt-2 retro-text">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs bg-amber-700 text-amber-100 px-2 py-1 mt-2 inline-block border border-black hover:bg-amber-800"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
