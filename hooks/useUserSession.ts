"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

export type UserStatus = "cooking" | "eating" | "finished";

export interface UserSession {
  id: string;
  nickname: string;
  status: UserStatus;
  updated_at: string;
}

export function useUserSession(nickname: string) {
  const [users, setUsers] = useState<UserSession[]>([]);
  const [mySession, setMySession] = useState<UserSession | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const supabase = createClient();

  // ── 초기 데이터 로드 & 내 세션 등록 ──────────────
  useEffect(() => {
    async function init() {
      // 1. 기존 세션 확인 (닉네임 중복 방지)
      const { data: existing } = await supabase
        .from("users_session")
        .select("*")
        .eq("nickname", nickname)
        .single();

      if (existing) {
        // 이미 존재하면 상태만 cooking으로 업데이트
        const { data: updated } = await supabase
          .from("users_session")
          .update({ status: "cooking", updated_at: new Date().toISOString() })
          .eq("id", existing.id)
          .select()
          .single();
        if (updated) setMySession(updated as UserSession);
      } else {
        // 새 세션 생성
        const { data: created } = await supabase
          .from("users_session")
          .insert({ nickname, status: "cooking" })
          .select()
          .single();
        if (created) setMySession(created as UserSession);
      }

      // 2. 전체 유저 목록 가져오기
      const { data: allUsers } = await supabase
        .from("users_session")
        .select("*")
        .order("updated_at", { ascending: false });

      if (allUsers) setUsers(allUsers as UserSession[]);
    }

    init();
  }, [nickname, supabase]);

  // ── Realtime 구독 ──────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("users_session_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users_session" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newUser = payload.new as UserSession;
            setUsers((prev) => {
              // 중복 방지
              if (prev.find((u) => u.id === newUser.id)) return prev;
              return [newUser, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as UserSession;
            setUsers((prev) =>
              prev.map((u) => (u.id === updated.id ? updated : u))
            );
            // 내 세션 업데이트
            if (updated.nickname === nickname) {
              setMySession(updated);
            }
          } else if (payload.eventType === "DELETE") {
            const deleted = payload.old as UserSession;
            setUsers((prev) => prev.filter((u) => u.id !== deleted.id));
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [nickname, supabase]);

  // ── 상태 변경 함수 (Optimistic UI) ─────────────────
  const changeStatus = useCallback(
    async (newStatus: UserStatus) => {
      if (!mySession) return;

      // 1. Optimistic: 즉시 UI 반영
      const optimistic = { ...mySession, status: newStatus, updated_at: new Date().toISOString() };
      setMySession(optimistic);
      setUsers((prev) =>
        prev.map((u) => (u.id === mySession.id ? optimistic : u))
      );

      // 2. 서버 반영
      await supabase
        .from("users_session")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", mySession.id);
    },
    [mySession, supabase]
  );

  // ── 유저를 상태별로 그룹화 ─────────────────────────
  const grouped = {
    cooking: users.filter((u) => u.status === "cooking"),
    eating: users.filter((u) => u.status === "eating"),
    finished: users.filter((u) => u.status === "finished"),
  };

  return { users, mySession, grouped, changeStatus };
}
