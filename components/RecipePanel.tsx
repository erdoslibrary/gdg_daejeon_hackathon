"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Egg, Droplet, UtensilsCrossed, Check } from "lucide-react";

const INGREDIENTS = [
  { icon: <Leaf className="w-3.5 h-3.5" />, name: "신김치 1컵" },
  { icon: <UtensilsCrossed className="w-3.5 h-3.5" />, name: "밥 1공기" },
  { icon: <Egg className="w-3.5 h-3.5" />, name: "계란 1개" },
  { icon: <Droplet className="w-3.5 h-3.5" />, name: "참기름 1스푼" },
];

const STEPS = [
  "팬에 기름을 두르고 파를 볶아 파기름을 냅니다.",
  "잘게 썬 신김치를 넣고 함께 볶아줍니다. (설탕 한 꼬집 추가)",
  "밥을 넣고 주걱으로 가르듯 볶아줍니다.",
  "참기름을 두르고 계란 후라이를 올려 완성합니다.",
];

export default function RecipePanel() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (idx: number) => {
    const next = new Set(completedSteps);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
      // 다음 미완료 스텝으로 active 이동
      const nextActive = STEPS.findIndex((_, i) => i > idx && !next.has(i));
      if (nextActive !== -1) setActiveStep(nextActive);
    }
    setCompletedSteps(next);
  };

  return (
    <div className="flex-1 lg:w-[60%] space-y-md">
      {/* 준비물 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant hover:translate-y-[-2px] transition-transform"
      >
        <h3 className="text-headline-md text-on-surface mb-md">준비물</h3>
        <div className="flex flex-wrap gap-sm">
          {INGREDIENTS.map((item) => (
            <span
              key={item.name}
              className="inline-flex items-center gap-xs px-3 py-1.5 rounded-full bg-secondary-container/30 text-on-secondary-container text-label-sm border border-secondary-container/50"
            >
              {item.icon} {item.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 조리 순서 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant"
      >
        <h3 className="text-headline-md text-on-surface mb-md">조리 순서</h3>
        <ul className="space-y-sm">
          {STEPS.map((step, idx) => {
            const isDone = completedSteps.has(idx);
            const isActive = idx === activeStep && !isDone;

            return (
              <motion.li
                key={idx}
                layout
                onClick={() => toggleStep(idx)}
                className={`flex items-start gap-md p-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
                  isDone
                    ? "bg-surface-container-low opacity-60"
                    : isActive
                    ? "bg-surface-container shadow-sm border border-outline-variant/30"
                    : "hover:bg-surface-variant"
                }`}
              >
                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="active-bar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Step Number / Check */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    isDone
                      ? "border-primary bg-primary-container text-primary"
                      : isActive
                      ? "border-primary text-primary"
                      : "border-outline text-outline"
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-label-sm">{idx + 1}</span>
                  )}
                </div>

                {/* Step Text */}
                <p
                  className={`text-body-md transition-all ${
                    isDone
                      ? "text-on-surface-variant line-through"
                      : "text-on-surface"
                  }`}
                >
                  {step}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
