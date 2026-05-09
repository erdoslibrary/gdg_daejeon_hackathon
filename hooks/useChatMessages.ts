"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase";

export type MessageType = "user" | "system";

export interface ChatMessage {
  id: string;
  nickname: string;
  content: string;
  type: MessageType;
  created_at: string;
}

export function useChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const supabase = createClient();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ── 초기 메시지 로드 ──────────────────────────────
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);

      if (data) setMessages(data as ChatMessage[]);
    }
    load();
  }, [supabase]);

  // ── Realtime 구독 ──────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("chat_messages_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => {
            // 중복 방지 (Optimistic UI로 이미 추가된 경우)
            if (prev.find((m) => m.id === newMsg.id)) return prev;
            // Optimistic 메시지(임시 ID)가 있으면 교체
            const withoutOptimistic = prev.filter(
              (m) => !(m.id.startsWith("temp-") && m.content === newMsg.content && m.nickname === newMsg.nickname)
            );
            return [...withoutOptimistic, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // ── 메시지 전송 (Optimistic UI) ────────────────────
  const sendMessage = useCallback(
    async (nickname: string, content: string) => {
      if (!content.trim()) return;

      // 1. Optimistic: 임시 ID로 즉시 추가
      const tempMsg: ChatMessage = {
        id: `temp-${Date.now()}`,
        nickname,
        content: content.trim(),
        type: "user",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempMsg]);

      // 2. 서버 전송
      await supabase.from("chat_messages").insert({
        nickname,
        content: content.trim(),
        type: "user",
      });
    },
    [supabase]
  );

  // ── 시스템 메시지 전송 ─────────────────────────────
  const sendSystemMessage = useCallback(
    async (content: string) => {
      await supabase.from("chat_messages").insert({
        nickname: "시스템",
        content,
        type: "system",
      });
    },
    [supabase]
  );

  return { messages, sendMessage, sendSystemMessage, scrollRef };
}
