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
  // カラーの洗練化：より鮮明でありながらトーンダウンされた色
  const isDark = theme === 'dark';
  const cursorColor = isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.65)';
  const ringColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
  
  // ホバー状態の色：プライマリカラーを使用
  const hoverColor = isDark ? 'rgba(147, 51, 234, 0.85)' : 'rgba(79, 70, 229, 0.85)';
  const hoverRingColor = isDark ? 'rgba(147, 51, 234, 0.3)' : 'rgba(79, 70, 229, 0.3)';

  return (
    <>
      {/* 内側の円（メインカーソル） - サイズと動きを調整 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0.8 : 1,
          backgroundColor: isHovering ? hoverColor : cursorColor,
        }}
        transition={{
          // より滑らかな動きのためのパラメータ調整
          x: { type: "spring", stiffness: 1800, damping: 60, mass: 0.3 },
          y: { type: "spring", stiffness: 1800, damping: 60, mass: 0.3 },
          scale: { type: "spring", stiffness: 800, damping: 35 },
          backgroundColor: { type: "tween", duration: 0.15 },
        }}
        style={{
          width: "8px",
          height: "8px",
          boxShadow: isHovering 
            ? `0 0 10px ${hoverColor}` 
            : 'none',
        }}
      />

      {/* 外側のリング（トラッカー） - より洗練された見た目に */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.2 : 1,
          borderColor: isHovering ? hoverRingColor : ringColor,
        }}
        transition={{
          // より緩やかな追従
          x: { type: "spring", stiffness: 120, damping: 26, mass: 0.6 },
          y: { type: "spring", stiffness: 120, damping: 26, mass: 0.6 },
          scale: { type: "spring", stiffness: 200, damping: 22 },
          borderColor: { type: "tween", duration: 0.2 },
        }}
        style={{
          width: "40px",
          height: "40px",
          border: `1px solid ${isHovering ? hoverRingColor : ringColor}`,
          opacity: 0.9,
        }}
      />
    </>
  );
} 