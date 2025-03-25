"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";

const socialLinks = [
  {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/tamo2918",
  },
  {
    name: "Twitter",
    icon: "twitter",
    url: "https://x.com/PzSg5t/articles",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/tatsuki_dev?igsh=MWMxdHUwYTI5dDA5dQ%3D%3D&utm_source=qr",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const handleContactClick = () => {
    const subject = encodeURIComponent('ポートフォリオサイトからのお問い合わせ');
    const body = encodeURIComponent('お問い合わせ内容をご記入ください。\n\n');
    window.location.href = `mailto:mrt.t0304@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] translate-y-[20%] -translate-x-[20%] rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] -translate-y-[20%] translate-x-[20%] rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">お問い合わせ</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            ご質問やプロジェクトのご依頼、その他のお問い合わせはお気軽にご連絡ください。
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="backdrop-blur-sm bg-card/80 border border-border/50 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">お問い合わせ情報</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">メール</p>
                        <p className="text-muted-foreground text-sm mt-1">mrt.t0304@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium mb-4">SNSでつながる</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors duration-200"
                          aria-label={link.name}
                        >
                          <span className="sr-only">{link.name}</span>
                          {link.icon === "github" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                              <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                          )}
                          {link.icon === "twitter" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          )}
                          {link.icon === "instagram" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-1 flex items-center justify-center">
                  <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-lg w-full">
                    <div className="bg-card rounded-lg p-8 flex flex-col items-center text-center">
                      <div className="mb-6">
                        <div className="bg-primary/10 p-4 rounded-full mx-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">メールでのお問い合わせ</h3>
                      <p className="text-muted-foreground mb-6">
                        下のボタンをクリックすると、メールクライアントが自動的に開きます。
                      </p>
                      <Button 
                        onClick={handleContactClick}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      >
                        お問い合わせメールを作成
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 