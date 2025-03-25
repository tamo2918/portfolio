"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function CursorTracker() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // デフォルトでモバイル判定にして、CSRで上書き
  const { theme } = useTheme();

  useEffect(() => {
    // クライアントサイドでのみ実行
    // モバイルデバイスの検出
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
                 /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    // 初期位置を画面外に設定し、ちらつきを防止
    setMousePosition({ x: -100, y: -100 });
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // シンプル化：マウスオーバー/アウトの処理を単純化
    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // 対象要素にイベントリスナーを追加
    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, [role="button"], .hoverable');
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
      
      return () => {
        hoverElements.forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    // イベントリスナーを追加
    window.addEventListener("mousemove", handleMouseMove);
    const removeHoverListeners = addHoverListeners();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      removeHoverListeners();
    };
  }, []);

  // モバイルデバイスではレンダリングしない
  if (isMobile) return null;

  // テーマに基づいてカーソルの色を決定
  const isDark = theme === 'dark';
  const ringColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
  
  // ホバー状態の色：プライマリカラーを使用
  const hoverRingColor = isDark ? 'rgba(147, 51, 234, 0.4)' : 'rgba(79, 70, 229, 0.4)';

  return (
    <>
      {/* リングのみのトラッカー */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.3 : 1,
          borderColor: isHovering ? hoverRingColor : ringColor,
        }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 28, mass: 0.5 },
          y: { type: "spring", stiffness: 300, damping: 28, mass: 0.5 },
          scale: { type: "spring", stiffness: 200, damping: 22 },
          borderColor: { type: "tween", duration: 0.2 },
        }}
        style={{
          width: "32px",
          height: "32px",
          border: `1.5px solid ${isHovering ? hoverRingColor : ringColor}`,
          opacity: 0.95,
        }}
      />
    </>
  );
} 