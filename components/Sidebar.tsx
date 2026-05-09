"use client";

import { Home, ChefHat, BookOpen, Users, Settings, HelpCircle, RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface SidebarProps {
  nickname: string;
}

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "#" },
  { icon: ChefHat, label: "My Kitchen", href: "#dashboard" },
  { icon: BookOpen, label: "Recipes", href: "#" },
  { icon: Users, label: "Community", href: "#" },
];

export default function Sidebar({ nickname }: SidebarProps) {
  // Live Kitchen 리셋: 모든 세션과 메시지 삭제
  const handleReset = async () => {
    if (!confirm("채팅 메시지와 접속 유저를 모두 초기화할까요?")) return;

    const supabase = createClient();
    await supabase.from("chat_messages").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("users_session").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // sessionStorage 초기화 후 새로고침
    sessionStorage.removeItem("kitchen-nickname");
    window.location.reload();
  };

  // 데모 봇 추가: 가짜 유저 3명을 DB에 삽입
  const handleAddDemoUsers = async () => {
    const supabase = createClient();
    const demoUsers = [
      { nickname: "김철수", status: "cooking" },
      { nickname: "배고픈무지", status: "eating" },
      { nickname: "요리초보", status: "cooking" },
    ];

    for (const user of demoUsers) {
      // 이미 존재하면 skip
      const { data: existing } = await supabase
        .from("users_session")
        .select("id")
        .eq("nickname", user.nickname)
        .single();

      if (!existing) {
        await supabase.from("users_session").insert({
          nickname: user.nickname,
          status: user.status as "cooking" | "eating" | "finished",
        });
      }
    }

    // 시스템 메시지
    await supabase.from("chat_messages").insert([
      { nickname: "시스템", content: "🤖 데모 유저 3명이 입장했습니다!", type: "system" },
      { nickname: "김철수", content: "김치볶음밥엔 역시 스팸인가요 참치인가요?", type: "user" },
      { nickname: "배고픈무지", content: "오늘은 베이컨으로 갑니다.", type: "user" },
      { nickname: "요리초보", content: "저는 계란만 올릴게요 ㅎㅎ", type: "user" },
    ]);
  };

  const handleJoinKitchen = () => {
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="hidden lg:flex flex-col h-full border-r border-outline-variant w-64 fixed left-0 top-0 bg-surface-container-low shadow-md z-40">
      {/* Logo */}
      <div className="p-gutter">
        <h1 className="text-headline-md text-primary tracking-tight">
          오늘의 주방
        </h1>
        <p className="text-label-md text-on-surface-variant mt-xs">
          Happy Cooking!
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-sm px-gutter mb-lg">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant bg-secondary-container flex items-center justify-center">
          <span className="text-xl">👨‍🍳</span>
        </div>
        <span className="text-label-md text-on-surface">{nickname}</span>
      </div>

      {/* Navigation */}
      <ul className="flex flex-col gap-xs flex-1">
        {NAV_ITEMS.map((item, idx) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={`flex items-center gap-sm rounded-xl px-4 py-3 mx-2 transition-all ${
                idx === 0
                  ? "bg-primary-container text-on-primary-container font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-variant"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-label-md">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-gutter border-t border-outline-variant mt-auto">
        <button
          onClick={handleJoinKitchen}
          className="w-full bg-primary text-on-primary text-label-md py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
        >
          Join Kitchen
        </button>
        <ul className="flex flex-col gap-xs mt-md">
          <li>
            <button
              onClick={handleAddDemoUsers}
              className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-4 py-2 mx-2 rounded-xl transition-all w-full text-left"
            >
              <Users className="w-5 h-5" />
              <span className="text-label-md">데모 유저 추가</span>
            </button>
          </li>
          <li>
            <button
              onClick={handleReset}
              className="flex items-center gap-sm text-on-surface-variant hover:text-error px-4 py-2 mx-2 rounded-xl transition-all w-full text-left"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-label-md">초기화</span>
            </button>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-4 py-2 mx-2 rounded-xl transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-label-md">Help</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
