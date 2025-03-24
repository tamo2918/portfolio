"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border/50 -z-10"></div>
      <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">自己紹介</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70 blur"></div>
              <div className="relative overflow-hidden rounded-full aspect-square shadow-xl">
                {/* プロフィール画像を表示 */}
                <div className="w-full h-full bg-muted overflow-hidden rounded-full">
                  <Image 
                    src="/icon.jpg" 
                    alt="Tatsuki Morita" 
                    width={500} 
                    height={500} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="backdrop-blur-md bg-card/80 border-none shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">こんにちは！tatsukiです。</h3>
                <p className="text-muted-foreground mb-4">
                  ものづくりが大好きで、「こんなアプリあったらいいな」と思ったらすぐに形にしています。
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">学歴</h4>
                    <p className="text-muted-foreground">国際情報高校</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">趣味</h4>
                    <p className="text-muted-foreground">映画鑑賞（スター・ウォーズとマーベル好き）、バスケットボール、そして最新ガジェットチェック！</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 