"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

// プロジェクトのデータ
const projects = [
  {
    title: "SnapGen",
    description: "YouTubeや記事、PDFから文章を抽出・要約・翻訳できるツール。Gemini APIを活用し、ブログ生成も自動で。",
    image: "/snapgen.jpg",
    tags: ["SwiftUI", "Firebase", "Gemini API"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Mapshot",
    description: "旅先で撮った写真が、地図に残る思い出アプリ。",
    image: "/mapshot.jpg",
    tags: ["SwiftUI"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "CopyGenius",
    description: "YouTubeや記事、PDFから文章を抽出・要約・翻訳できるツール。Gemini APIを活用し、ブログ生成も自動で。",
    image: null,
    tags: ["SwiftUI", "Firebase", "Gemini API"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -inset-[10%] z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">プロジェクト</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            これまでに開発したプロジェクトの一部をご紹介します。
            各プロジェクトではユーザー体験とパフォーマンスを重視しています。
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex flex-col backdrop-blur-sm bg-card/80 border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="relative w-full aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-70 z-10"></div>
                  {project.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-4xl">🖼️</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 pt-4">
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      もっと見る
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 