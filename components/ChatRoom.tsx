"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "@/hooks/useChatMessages";

interface ChatRoomProps {
  messages: ChatMessage[];
  nickname: string;
  onlineCount: number;
  onSend: (nickname: string, content: string) => void;
}

export default function ChatRoom({
  messages,
  nickname,
  onlineCount,
  onSend,
}: ChatRoomProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 새 메시지 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(nickname, input);
    setInput("");
  };

  return (
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

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2 relative z-10 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {msg.type === "system" ? (
                /* 시스템 메시지 */
                <div className="bg-secondary-container/20 border border-secondary-container/30 text-center py-2 rounded-lg my-2 mx-2 shadow-sm">
                  <p className="text-label-sm text-secondary italic">
                    {msg.content}
                  </p>
                </div>
              ) : (
                /* 유저 메시지 */
                <div className={`flex gap-sm items-start ${
                  msg.nickname === nickname ? "flex-row-reverse" : ""
                }`}>
                  <div className={`text-label-sm whitespace-nowrap mt-1 ${
                    msg.nickname === nickname
                      ? "text-primary"
                      : "text-tertiary"
                  }`}>
                    {msg.nickname}:
                  </div>
                  <div className={`text-on-surface text-body-md px-3 py-2 rounded-2xl shadow-sm max-w-[70%] ${
                    msg.nickname === nickname
                      ? "bg-primary-container/30 rounded-tr-sm"
                      : "bg-surface-container-low rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-label-sm text-on-surface-variant italic opacity-60">
              첫 번째 메시지를 보내보세요! 🍳
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="mt-md relative z-10 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-surface-container rounded-full px-4 py-2 text-body-md border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="채팅을 입력하세요..."
          type="text"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
