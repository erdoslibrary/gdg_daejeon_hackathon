"use client";

import { Send } from "lucide-react";
import { motion } from "framer-motion";
import UserBoard from "@/components/UserBoard";
import { useUserSession } from "@/hooks/useUserSession";

interface LivePanelProps {
  nickname: string;
}

export default function LivePanel({ nickname }: LivePanelProps) {
  const { grouped, mySession, changeStatus } = useUserSession(nickname);
  const onlineCount =
    grouped.cooking.length + grouped.eating.length + grouped.finished.length;

  return (
    <div className="flex-1 lg:w-[40%] flex flex-col gap-md">
      {/* Live Chat - Phase 3에서 실시간 연동 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant flex-1 min-h-[300px] flex flex-col relative overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-low/50 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-md relative z-10">
          <h3 className="text-headline-md text-on-surface flex items-center gap-sm">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
            Live Kitchen
          </h3>
          <span className="text-label-sm text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">
            {onlineCount} 접속 중
          </span>
        </div>

        {/* Messages (Phase 3에서 실시간으로 교체) */}
        <div className="flex-1 overflow-y-auto space-y-sm pr-2 relative z-10 scrollbar-hide">
          {/* System message */}
          <div className="bg-secondary-container/20 border border-secondary-container/30 text-center py-2 rounded-lg my-2 mx-4 shadow-sm">
            <p className="text-label-sm text-secondary italic">
              {nickname}님이 주방에 입장했습니다! 🎉
            </p>
          </div>
        </div>

        {/* Input (Phase 3에서 활성화) */}
        <div className="mt-md relative z-10 flex gap-2">
          <input
            className="flex-1 bg-surface-container rounded-full px-4 py-2 text-body-md border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="채팅은 Phase 3에서 활성화됩니다..."
            type="text"
            disabled
          />
          <button
            disabled
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* 실시간 유저 상태 보드 (Phase 2 핵심!) */}
      <UserBoard
        grouped={grouped}
        myNickname={nickname}
        currentStatus={mySession?.status}
        onStatusChange={changeStatus}
      />
    </div>
  );
}
