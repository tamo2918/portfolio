"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Typewriter from 'typewriter-effect';
import { useRef, useEffect } from "react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* 背景アニメーション */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -inset-[10%] z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl dark:opacity-10"></div>
        </div>
        <motion.div 
          className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ 
            x: [50, 150, 100, 50], 
            y: [-50, 50, -100, -50],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ 
            duration: 20, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-3xl"
          animate={{ 
            x: [-50, -150, -100, -50], 
            y: [50, 150, 100, 50],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 25, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-pink-500/15 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 15, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>

      {/* コンテンツ */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="block text-primary min-h-[120px]">
              <Typewriter
                options={{
                  cursor: '|',
                  loop: false,
                  delay: 15,
                  autoStart: true,
                  strings: [''],
                  wrapperClassName: 'text-primary',
                }}
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(15)
                    .typeString("Hi, I'm Tatsuki Morita👋")
                    .pauseFor(200)
                    .typeString("<br />Let's turn ideas into reality:)")
                    .start();
                }}
              />
            </div>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transition-all hover:shadow-xl"
              asChild
            >
              <a href="#projects">プロジェクトを見る</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 shadow-lg transition-all hover:shadow-xl dark:border-primary dark:text-primary"
              asChild
            >
              <a href="#contact">お問い合わせ</a>
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex space-x-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="https://x.com/PzSg5t/articles" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://github.com/tamo2918" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="https://www.instagram.com/tatsuki_dev?igsh=MWMxdHUwYTI5dDA5dQ%3D%3D&utm_source=qr" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* スクロール指示 */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm">スクロールして詳細を見る</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mouse"
          >
            <rect x="6" y="3" width="12" height="18" rx="6" />
            <path d="M12 7v4" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
} 