"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ui/theme-toggle";

const navItems = [
  { name: "ホーム", href: "#hero" },
  { name: "自己紹介", href: "#about" },
  { name: "プロジェクト", href: "#projects" },
  { name: "ブログ", href: "#blog" },
  { name: "お問い合わせ", href: "#contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openSidebar = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  
  const closeSidebarWithDelay = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringMenu()) {
        setIsOpen(false);
      }
    }, 300);
  };

  const isHoveringMenu = () => {
    return (
      menuBtnRef.current?.matches(':hover') ||
      sidebarRef.current?.matches(':hover')
    );
  };
  
  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // サイドバーが開いているときはスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* ハンバーガーメニューボタン */}
            <button 
              ref={menuBtnRef}
              onMouseEnter={openSidebar}
              onMouseLeave={closeSidebarWithDelay}
              onClick={openSidebar}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors relative z-50 -ml-4 sm:-ml-6 lg:-ml-8"
              aria-label="メニューを開く"
            >
              <motion.div
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 bg-primary mb-1.5"
              />
              <motion.div
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 bg-primary mb-1.5"
              />
              <motion.div
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 bg-primary"
              />
            </button>
            
            {/* PCナビゲーション - 常に非表示にします */}
            <nav className="hidden">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* サイドバーオーバーレイ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* サイドバー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-card/60 backdrop-blur-md shadow-xl z-50 p-6 border-r border-border/30"
            onMouseEnter={openSidebar}
            onMouseLeave={closeSidebarWithDelay}
          >
            <div className="flex flex-col h-full">
              <div className="mb-8 mt-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Menu
                </h2>
              </div>
              
              <nav className="flex-1">
                <ul className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeSidebar}
                        className="text-md font-medium flex items-center transition-all hover:text-primary hover:translate-x-2"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-auto pt-6 border-t border-border/30">
                <p className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} tatsuki
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 