"use client";

import { useState, useCallback } from "react";
import NicknameModal from "@/components/NicknameModal";
import HeroSection from "@/components/HeroSection";
import RecipePanel from "@/components/RecipePanel";
import LivePanel from "@/components/LivePanel";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);

  const handleNicknameSubmit = useCallback((name: string) => {
    setNickname(name);
    setShowNicknameModal(false);
  }, []);

  const handleJoinClick = () => {
    if (!nickname) {
      setShowNicknameModal(true);
    } else {
      // 이미 닉네임이 있으면 대시보드로 스크롤
      document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Nickname Modal (첫 접속 시 또는 Join 클릭 시) */}
      {(showNicknameModal || !nickname) && (
        <NicknameModal onSubmit={handleNicknameSubmit} />
      )}

      {/* Sidebar (Desktop) */}
      {nickname && <Sidebar nickname={nickname} />}

      {/* Main Content */}
      <main
        className={`max-w-[1200px] mx-auto px-margin-mobile lg:px-gutter py-lg space-y-xl ${
          nickname ? "lg:pl-[calc(256px+24px)]" : ""
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
            <LivePanel nickname={nickname} />
          </section>
        )}
      </main>
    </>
  );
}
