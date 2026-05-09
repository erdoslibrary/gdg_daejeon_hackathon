"use client";

import { useCallback } from "react";
import type { UserStatus } from "@/hooks/useUserSession";

// 상태 변경 시 채팅에 자동 삽입할 시스템 메시지 생성
const STATUS_MESSAGES: Record<UserStatus, (nickname: string) => string> = {
  cooking: (n) => `📢 '${n}'님이 앞치마를 두르고 요리를 시작했습니다! 🔥`,
  eating: (n) => `📢 '${n}'님이 진실의 미간을 작동하며 식사를 시작했습니다! 🍚`,
  finished: (n) => `📢 '${n}'님이 설거지의 세계로 빨려들어갑니다... 🧽`,
};

interface UseStatusTransitionProps {
  nickname: string;
  changeStatus: (status: UserStatus) => Promise<void>;
  sendSystemMessage: (content: string) => Promise<void>;
}

export function useStatusTransition({
  nickname,
  changeStatus,
  sendSystemMessage,
}: UseStatusTransitionProps) {
  const transition = useCallback(
    async (newStatus: UserStatus) => {
      // 1. 유저 상태 변경 (Optimistic UI)
      await changeStatus(newStatus);

      // 2. 시스템 메시지 자동 삽입
      const msg = STATUS_MESSAGES[newStatus](nickname);
      await sendSystemMessage(msg);
    },
    [nickname, changeStatus, sendSystemMessage]
  );

  return { transition };
}
