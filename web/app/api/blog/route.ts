import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "content/blog");

    // Check if directory exists to avoid errors
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([]);
    }

    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map((filename) => {
      const fileContents = fs.readFileSync(
        path.join(postsDirectory, filename),
        "utf-8"
      );

      const { data } = matter(fileContents);

      return {
        slug: filename.replace(".mdx", ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || "",
        tags: data.tags || [],
      };
    });

    // Sort posts by date in descending order
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
