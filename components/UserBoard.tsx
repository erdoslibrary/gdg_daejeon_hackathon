"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { UserSession, UserStatus } from "@/hooks/useUserSession";

interface UserBoardProps {
  grouped: {
    cooking: UserSession[];
    eating: UserSession[];
    finished: UserSession[];
  };
  myNickname: string;
  currentStatus: UserStatus | undefined;
  onStatusChange: (status: UserStatus) => void;
}

interface StatusColumnProps {
  emoji: string;
  label: string;
  labelColor: string;
  status: UserStatus;
  users: UserSession[];
  myNickname: string;
  isActive: boolean;
  emptyText: string;
  onSelect: () => void;
}

function StatusColumn({
  emoji,
  label,
  labelColor,
  status,
  users,
  myNickname,
  isActive,
  emptyText,
  onSelect,
}: StatusColumnProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-surface-container-low/50 border rounded-xl p-3 flex flex-col gap-sm text-left transition-all cursor-pointer ${
        isActive
          ? "border-primary/50 ring-2 ring-primary/20 shadow-md"
          : "border-outline-variant hover:border-primary/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-xs pb-2 border-b border-outline-variant/30">
        <span className="text-lg">{emoji}</span>
        <span className={`text-label-md ${labelColor}`}>{label}</span>
        {isActive && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-label-sm text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-full"
          >
            현재
          </motion.span>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-xs min-h-[40px] items-start">
        <AnimatePresence mode="popLayout">
          {users.length > 0 ? (
            users.map((user) => (
              <motion.span
                key={user.id}
                layoutId={`chip-${user.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  layout: { type: "spring", damping: 20, stiffness: 200 },
                  opacity: { duration: 0.2 },
                }}
                className={`px-3 py-1 rounded-full text-label-sm shadow-sm ${
                  user.nickname === myNickname
                    ? "bg-primary-container text-on-primary-container font-bold ring-1 ring-primary/30"
                    : status === "finished"
                    ? "bg-surface-dim text-on-surface-variant grayscale-[60%]"
                    : "bg-surface-container-high text-on-surface border border-outline-variant/30"
                }`}
              >
                {user.nickname}
              </motion.span>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-label-sm text-on-surface-variant italic opacity-70 text-center w-full flex items-center justify-center min-h-[28px]"
            >
              {emptyText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export default function UserBoard({
  grouped,
  myNickname,
  currentStatus,
  onStatusChange,
}: UserBoardProps) {
  const columns: {
    status: UserStatus;
    emoji: string;
    label: string;
    labelColor: string;
    emptyText: string;
  }[] = [
    {
      status: "cooking",
      emoji: "🔪",
      label: "요리 중",
      labelColor: "text-primary",
      emptyText: "첫 번째 요리사가 되어보세요!",
    },
    {
      status: "eating",
      emoji: "🥢",
      label: "먹는 중",
      labelColor: "text-secondary",
      emptyText: "아직 아무도 없어요",
    },
    {
      status: "finished",
      emoji: "😋",
      label: "설거지 대기",
      labelColor: "text-tertiary",
      emptyText: "설거지는 미래의 나에게...",
    },
  ];

  return (
    <LayoutGroup>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-sm"
      >
        {columns.map((col) => (
          <StatusColumn
            key={col.status}
            {...col}
            users={grouped[col.status]}
            myNickname={myNickname}
            isActive={currentStatus === col.status}
            onSelect={() => onStatusChange(col.status)}
          />
        ))}
      </motion.div>
    </LayoutGroup>
  );
}
