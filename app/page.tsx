"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NicknameModal from "@/components/NicknameModal";
import HeroSection from "@/components/HeroSection";
import RecipePanel from "@/components/RecipePanel";
import LivePanel from "@/components/LivePanel";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/lib/supabase";
import type { UserStatus } from "@/hooks/useUserSession";

export default function Home() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<UserStatus>("cooking");
  const entryMessageSent = useRef(false);

  const handleNicknameSubmit = useCallback((name: string) => {
    setNickname(name);
    setShowNicknameModal(false);
  }, []);

  // 입장 시 시스템 메시지 전송 (1회만)
  useEffect(() => {
    if (nickname && !entryMessageSent.current) {
      entryMessageSent.current = true;
      const supabase = createClient();
      supabase.from("chat_messages").insert({
        nickname: "시스템",
        content: `🎉 '${nickname}'님이 주방에 입장했습니다!`,
        type: "system",
      });
    }
  }, [nickname]);

  const handleJoinClick = () => {
    if (!nickname) {
      setShowNicknameModal(true);
    } else {
      document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 식사 모드: eating 상태일 때 따뜻한 톤
  const isEatingMode = currentStatus === "eating";

  return (
    <>
      {/* Nickname Modal */}
      {(showNicknameModal || !nickname) && (
        <NicknameModal onSubmit={handleNicknameSubmit} />
      )}

      {/* Sidebar (Desktop) */}
      {nickname && <Sidebar nickname={nickname} />}

      {/* 식사 모드 오버레이 */}
      <AnimatePresence>
        {isEatingMode && nickname && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-amber-900/5 pointer-events-none z-30"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`max-w-[1200px] mx-auto px-4 lg:px-gutter py-6 lg:py-lg space-y-6 lg:space-y-xl transition-all duration-700 ${
          nickname ? "lg:ml-64 lg:pl-gutter" : ""
        }`}
      >
        {/* Hero Section */}
        <HeroSection onJoinClick={handleJoinClick} />

        {/* Virtual Kitchen (6:4 Split View) */}
        {nickname && (
          <section
            className="flex flex-col lg:flex-row gap-gutter"
            id="dashboard"
          >
            <RecipePanel />
            <LivePanel
              nickname={nickname}
              onStatusChange={setCurrentStatus}
            />
          </section>
        )}
      </main>
    </>
  );
}
