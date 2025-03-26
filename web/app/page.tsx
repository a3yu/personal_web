"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function Home() {
  const [expandedWorkIndex, setExpandedWorkIndex] = useState(-1);
  const [expandedStartupIndex, setExpandedStartupIndex] = useState(-1);
  const [expandedWritingIndex, setExpandedWritingIndex] = useState(-1);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        setRecentPosts(data.slice(0, 2)); // Get only the 2 most recent posts
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    }

    fetchRecentPosts();
  }, []);

  const handleWorkItemClick = (index: number) => {
    setExpandedWorkIndex(expandedWorkIndex === index ? -1 : index);
  };

  const handleStartupItemClick = (index: number) => {
    setExpandedStartupIndex(expandedStartupIndex === index ? -1 : index);
  };

  const handleWritingItemClick = (index: number) => {
    setExpandedWritingIndex(expandedWritingIndex === index ? -1 : index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 font-[var(--font-inconsolata)]">
      <main className="container mx-auto my-8 px-4 w-full max-w-2xl">
        <header className="w-full py-4 text-amber-900">
          <div className="container flex flex-col">
            <h1 className="text-3xl font-bold tracking-wide">Aedin Yu</h1>
            <nav className="mt-4 flex">
              <a
                href="mailto:aedinyu05@gmail.com"
                className="retro-button mr-2"
              >
                <CiMail className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/aedin-yu/"
                className="retro-button mx-2"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://github.com/a3yu" className="retro-button mx-2">
                <FaGithub className="text-xl" />
              </a>
            </nav>
          </div>
        </header>
        <section className="retro-panel">
          <p className="text-amber-900 retro-text font-semibold">
            I pursue exciting and impactful things.
            <br />
            <br /> I am a sophomore at Cornell University building Fissure,
            automation tools for American industry. I am highly interested by
            agriculture and AI.
          </p>
        </section>

        <section className="retro-panel">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-amber-900">Writing</h2>
            <Link
              href="/blog"
              className="text-sm text-amber-900 hover:text-amber-600 font-bold underline underline-offset-2"
            >
              See All →
            </Link>
          </div>

          {isLoadingPosts ? (
            <p className="text-sm text-amber-800 retro-text">
              Loading articles...
            </p>
          ) : recentPosts.length === 0 ? (
            <p className="text-sm text-amber-800 retro-text">
              No articles available yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div
                  key={post.slug}
                  className="border border-black bg-amber-50 p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-md font-bold text-amber-900 hover:text-amber-600">
                      {post.title}
                    </h3>
                  </Link>
                  <time className="text-xs text-amber-700 block mt-1 retro-text">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <p className="text-sm text-amber-900 mt-1 line-clamp-2 retro-text">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs bg-amber-700 text-amber-100 px-2 py-1 mt-2 inline-block border border-black hover:bg-amber-800"
                  >
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="retro-panel">
          <h2 className="text-lg font-bold mb-4 text-amber-900">Experience</h2>
          <div className="space-y-2">
            <div
              className="flex justify-between items-center cursor-pointer border-b border-amber-800 pb-2"
              onClick={() => handleWorkItemClick(0)}
            >
              <div className="flex items-center">
                <img src="/jd.png" alt="John Deere" className="w-5 h-5 mr-2" />
                <h3 className="text-sm text-amber-900 font-bold">
                  John Deere - SWE Intern
                </h3>
              </div>
              {expandedWorkIndex === 0 ? (
                <div className="text-amber-800">
                  <FaChevronUp />
                </div>
              ) : (
                <div className="text-amber-800">
                  <FaChevronDown />
                </div>
              )}
            </div>
            {expandedWorkIndex === 0 && (
              <div className="text-sm transition-all duration-300 ease-in-out overflow-hidden py-2 retro-text">
                <p className="text-amber-900">
                  <span className="font-semibold">
                    Perception systems for automation and autonomy.
                  </span>{" "}
                  Worked on making ML models for perception systems. I worked
                  primarily on crop analysis, safety, and classification models
                  for weeds.
                </p>
              </div>
            )}
            <div
              className="flex justify-between items-center cursor-pointer border-b border-amber-800 pb-2"
              onClick={() => handleWorkItemClick(1)}
            >
              <div className="flex items-center">
                <img
                  src="/cu.png"
                  alt="Cornell University"
                  className="w-5 h-5 mr-2"
                />
                <h3 className="text-sm text-amber-900 font-bold">
                  Cornell University - Undergraduate Researcher
                </h3>
              </div>
              {expandedWorkIndex === 1 ? (
                <div className="text-amber-800">
                  <FaChevronUp />
                </div>
              ) : (
                <div className="text-amber-800">
                  <FaChevronDown />
                </div>
              )}
            </div>
            {expandedWorkIndex === 1 && (
              <div className="text-sm transition-all duration-300 ease-in-out overflow-hidden py-2 retro-text">
                <p className="text-amber-900">
                  <span className="font-semibold">
                    Modular tools for researchers to run causal inference
                    experiments better.
                  </span>{" "}
                  Worked tons on program architecture and optimization. Created
                  modular systems that are easy to understand. (
                  <a
                    href="https://github.com/a3yu/causal_inference"
                    className="text-amber-800 underline"
                  >
                    https://github.com/a3yu/causal_inference
                  </a>
                  ).
                </p>
              </div>
            )}
            <div
              className="flex justify-between items-center cursor-pointer border-b border-amber-800 pb-2"
              onClick={() => handleWorkItemClick(2)}
            >
              <div className="flex items-center">
                <img
                  src="/jh.png"
                  alt="Johns Hopkins"
                  className="w-5 h-5 mr-2"
                />
                <h3 className="text-sm text-amber-900 font-bold">
                  Johns Hopkins - Machine Learning Researcher
                </h3>
              </div>
              {expandedWorkIndex === 2 ? (
                <div className="text-amber-800">
                  <FaChevronUp />
                </div>
              ) : (
                <div className="text-amber-800">
                  <FaChevronDown />
                </div>
              )}
            </div>
            {expandedWorkIndex === 2 && (
              <div className="text-sm transition-all duration-300 ease-in-out overflow-hidden py-2 retro-text">
                <p className="text-amber-900">
                  <span className="font-semibold">
                    Low cost computer vision system that diagnoses malignant
                    skin lesions.
                  </span>{" "}
                  This was apart of my high school ISEF project. First intro to
                  ML.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="retro-panel mb-0">
          <span className="flex space-x-2 items-center mb-4">
            <h2 className="text-lg font-bold text-amber-900">Past Projects</h2>
            <h2 className="italic text-xs text-amber-800">
              (Build quick, fail fast)
            </h2>
          </span>
          <div className="space-y-2">
            <div
              className="flex justify-between items-center cursor-pointer border-b border-amber-800 pb-2"
              onClick={() => handleStartupItemClick(0)}
            >
              <div className="flex items-center">
                <h3 className="text-sm text-amber-900 font-bold">
                  Gekko (2024)
                </h3>
              </div>
              {expandedStartupIndex === 0 ? (
                <div className="text-amber-800">
                  <FaChevronUp />
                </div>
              ) : (
                <div className="text-amber-800">
                  <FaChevronDown />
                </div>
              )}
            </div>
            {expandedStartupIndex === 0 && (
              <div className="text-sm transition-all duration-300 ease-in-out overflow-hidden py-2">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <p className="text-amber-900 flex-1 retro-text">
                    <span className="font-semibold">
                      GPTs for Canvas courses.
                    </span>{" "}
                    This was a cool project that I was able to work with a
                    friend on. This died because we were building a product that
                    didn&apos;t provide clear value to our customers (schools).
                    What we built was intuitively useful for students, but it
                    wasn&apos;t something schools were willing to adopt. <br />
                    <br />
                    Learning:{" "}
                    <span className="font-semibold">Talk with customers.</span>
                  </p>
                </div>
              </div>
            )}
            <div
              className="flex justify-between items-center cursor-pointer border-b border-amber-800 pb-2"
              onClick={() => handleStartupItemClick(1)}
            >
              <div className="flex items-center">
                <h3 className="text-sm text-amber-900 font-bold">
                  TaskRaise (2023-2024)
                </h3>
              </div>
              {expandedStartupIndex === 1 ? (
                <div className="text-amber-800">
                  <FaChevronUp />
                </div>
              ) : (
                <div className="text-amber-800">
                  <FaChevronDown />
                </div>
              )}
            </div>
            {expandedStartupIndex === 1 && (
              <div className="text-sm transition-all duration-300 ease-in-out overflow-hidden py-2">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <p className="text-amber-900 flex-1 retro-text">
                    <span className="font-semibold">
                      Two-sided marketplace for labor seekers and fundraising
                      organizations.
                    </span>{" "}
                    I was able to build this a lot faster. This died because
                    there is a lot of red tape when student/youth labor is
                    involved in anything. Customers were totally game with the
                    idea until insurance and legal documents had to be filed,
                    then it became a logistical nightmare.
                    <br />
                    <br />
                    Learning:{" "}
                    <span className="font-semibold">
                      Understand and plan the &quot;how&quot; of your product
                      early.
                    </span>
                  </p>
                </div>
              </div>
            )}
            <div
              className="flex justify-between items-center cursor-pointer border-b border-amber-800 pb-2"
              onClick={() => handleStartupItemClick(2)}
            >
              <div className="flex items-center">
                <h3 className="text-sm text-amber-900 font-bold">
                  MathRanks (2022-2023)
                </h3>
              </div>
              {expandedStartupIndex === 2 ? (
                <div className="text-amber-800">
                  <FaChevronUp />
                </div>
              ) : (
                <div className="text-amber-800">
                  <FaChevronDown />
                </div>
              )}
            </div>
            {expandedStartupIndex === 2 && (
              <div className="text-sm transition-all duration-300 ease-in-out overflow-hidden py-2">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <p className="text-amber-900 flex-1 retro-text">
                    <span className="font-semibold">
                      Online elo-based math competitions.
                    </span>{" "}
                    This was my first taste of development and building any sort
                    of product. This died as I got busy with college apps and
                    robotics. Learned tons about product vision and development.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
