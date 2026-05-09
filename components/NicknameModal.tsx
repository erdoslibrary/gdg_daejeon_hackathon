"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NicknameModalProps {
  onSubmit: (nickname: string) => void;
}

const RANDOM_NAMES = [
  "자취요리왕",
  "배고픈무지",
  "요리초보",
  "고독한미식가",
  "혼밥의달인",
  "라면마스터",
  "집밥요정",
  "냉장고파먹기",
];

export default function NicknameModal({ onSubmit }: NicknameModalProps) {
  const [nickname, setNickname] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    // sessionStorage에 닉네임이 있으면 바로 진입
    const stored = sessionStorage.getItem("kitchen-nickname");
    if (stored) {
      onSubmit(stored);
      return;
    }
    
    // 에러 방지: useEffect 내에서 즉시 setState를 호출하는 대신 다음 틱으로 미룹니다.
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPlaceholder(RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [onSubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = nickname.trim() || placeholder;
    sessionStorage.setItem("kitchen-nickname", finalName);
    setIsVisible(false);
    setTimeout(() => onSubmit(finalName), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-surface-container-lowest rounded-2xl p-6 md:p-10 shadow-overlay w-[calc(100%-32px)] max-w-[440px] min-w-[280px] md:min-w-[400px] border border-outline-variant"
          >
            <div className="text-center mb-6 md:mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-on-secondary-container" />
              </div>
              <h2 className="text-headline-md md:text-headline-lg text-on-surface mb-2 leading-tight">
                오늘의 주방에 오신 걸<br />환영합니다!
              </h2>
              <p className="text-body-md text-on-surface-variant px-2">
                자취생의 영혼까지 끌어모은 요리, 함께해요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-md">
              <div>
                <label
                  htmlFor="nickname-input"
                  className="text-label-md text-on-surface-variant block mb-2"
                >
                  닉네임을 정해주세요
                </label>
                <input
                  id="nickname-input"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={placeholder}
                  maxLength={10}
                  className="w-full bg-surface-container rounded-xl px-4 py-3 text-body-md text-on-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  autoFocus
                />
                <p className="text-label-sm text-on-surface-variant mt-2 opacity-70">
                  비워두시면 &quot;{placeholder}&quot;(으)로 입장합니다
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary text-label-md py-3.5 rounded-xl shadow-sm hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                주방 입장하기
                <span className="text-lg">🍳</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
