"use client";

import ChatRoom from "@/components/ChatRoom";
import UserBoard from "@/components/UserBoard";
import { useUserSession } from "@/hooks/useUserSession";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useStatusTransition } from "@/hooks/useStatusTransition";
import type { UserStatus } from "@/hooks/useUserSession";

interface LivePanelProps {
  nickname: string;
  onStatusChange?: (status: UserStatus) => void;
}

export default function LivePanel({ nickname, onStatusChange }: LivePanelProps) {
  const { grouped, mySession, changeStatus } = useUserSession(nickname);
  const { messages, sendMessage, sendSystemMessage } = useChatMessages();
  const { transition } = useStatusTransition({
    nickname,
    changeStatus,
    sendSystemMessage,
  });

  const onlineCount =
    grouped.cooking.length + grouped.eating.length + grouped.finished.length;

  const handleStatusChange = async (status: UserStatus) => {
    await transition(status);
    onStatusChange?.(status);
  };

  return (
    <div className="flex-1 lg:w-[40%] flex flex-col gap-md">
      {/* 실시간 채팅 */}
      <ChatRoom
        messages={messages}
        nickname={nickname}
        onlineCount={onlineCount}
        onSend={sendMessage}
      />

      {/* 실시간 유저 상태 보드 */}
      <UserBoard
        grouped={grouped}
        myNickname={nickname}
        currentStatus={mySession?.status}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
