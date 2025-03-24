"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import axios from "axios";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  url: string;
  thumbnailUrl: string;
}

// フォールバック用のモックデータ
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "記事を読み込み中...",
    excerpt: "記事データを取得しています...",
    publishedAt: new Date().toISOString(),
    url: "https://note.com/tamo2918/",
    thumbnailUrl: "",
  },
  {
    id: "2",
    title: "記事を読み込み中...",
    excerpt: "記事データを取得しています...",
    publishedAt: new Date().toISOString(),
    url: "https://note.com/tamo2918/",
    thumbnailUrl: "",
  },
  {
    id: "3",
    title: "記事を読み込み中...",
    excerpt: "記事データを取得しています...",
    publishedAt: new Date().toISOString(),
    url: "https://note.com/tamo2918/",
    thumbnailUrl: "",
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

export function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // noteのRSSフィードを取得する関数
  const fetchNotePosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/blog');
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch note posts:', error);
      setError('ブログ記事の取得に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotePosts();
  }, []);

  // 日付をフォーマットする関数
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-muted/30">
      {/* 背景装飾 */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] translate-x-[20%] -translate-y-[20%] rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] -translate-x-[20%] translate-y-[20%] rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">最新ブログ</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Noteで公開している最新の記事です。
            ガジェット、AIなどについて発信しています。
          </p>
        </motion.div>

        {error && (
          <div className="text-center text-destructive mb-8">
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => fetchNotePosts()}
            >
              再読み込み
            </Button>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card className="h-full flex flex-col backdrop-blur-sm bg-card/80 border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative w-full aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-70"></div>
                  {post.thumbnailUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={post.thumbnailUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">
                    {formatDate(post.publishedAt)}
                  </div>
                  <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      記事を読む
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://note.com/tamo2918/all" target="_blank" rel="noopener noreferrer">
              すべての記事を見る →
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 