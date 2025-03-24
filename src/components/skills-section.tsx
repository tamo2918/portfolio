"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

// スキルのデータ
const skills = [
  {
    name: "React",
    level: 90,
    icon: "⚛️",
    description: "複雑なUIの構築、状態管理、パフォーマンス最適化に精通しています。",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "TypeScript",
    level: 85,
    icon: "TS",
    description: "型安全なコードを書き、複雑なプロジェクトでも安定した開発を行います。",
    color: "from-blue-600 to-blue-400",
  },
  {
    name: "Next.js",
    level: 80,
    icon: "N",
    description: "App RouterやSSR/SSGを活用した高パフォーマンスなウェブアプリケーションの開発経験があります。",
    color: "from-gray-800 to-gray-600",
  },
  {
    name: "Tailwind CSS",
    level: 95,
    icon: "🎨",
    description: "効率的でモダンなUIデザインを構築するための専門知識を持っています。",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Framer Motion",
    level: 75,
    icon: "🔄",
    description: "滑らかで魅力的なアニメーションでユーザー体験を向上させています。",
    color: "from-purple-600 to-indigo-600",
  },
  {
    name: "GraphQL",
    level: 70,
    icon: "⚡",
    description: "効率的なデータフェッチングとAPI設計の経験があります。",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Node.js",
    level: 65,
    icon: "🟢",
    description: "バックエンド開発とAPIの構築にも取り組んでいます。",
    color: "from-green-600 to-green-400",
  },
  {
    name: "UI/UXデザイン",
    level: 85,
    icon: "🎯",
    description: "ユーザー中心のデザイン思考と美的センスを持ち合わせています。",
    color: "from-amber-500 to-orange-400",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-muted/30">
      {/* 背景装飾 */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 -z-10 h-[300px] w-[300px] -translate-y-[20%] -translate-x-[20%] rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] translate-y-[20%] translate-x-[20%] rounded-full bg-purple-500/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">スキル</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            5年以上の開発経験を通して習得したスキルセットです。常に新しい技術を学び、スキルを更新しています。
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={item}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="relative p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                            {skill.icon}
                          </div>
                          <h3 className="font-bold">{skill.name}</h3>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="backdrop-blur-lg bg-card/80 border border-border/50 shadow-xl w-80">
                  <div className="flex flex-col space-y-2">
                    <h4 className="font-bold text-lg">{skill.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-medium">熟練度:</div>
                      <div className="text-sm font-bold">{skill.level}%</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 