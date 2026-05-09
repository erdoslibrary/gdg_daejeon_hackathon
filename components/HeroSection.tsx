"use client";

import Image from "next/image";
import { Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onJoinClick: () => void;
}

export default function HeroSection({ onJoinClick }: HeroSectionProps) {
  return (
    <section className="relative rounded-[32px] overflow-hidden min-h-[400px] flex items-center shadow-md border border-[#E8E4D8]">
      {/* Background Image */}
      <Image
        src="/hero-food.png"
        alt="김치볶음밥"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/70 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 p-lg max-w-2xl"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-xs px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm mb-md">
          <Flame className="w-4 h-4" />
          Today&apos;s Command
        </span>

        {/* Title */}
        <h2 className="text-display-lg text-on-surface mb-md leading-tight">
          오늘의 메뉴는{" "}
          <span className="text-primary font-bold">[김치볶음밥]</span>
          입니다.
        </h2>

        {/* Subtitle */}
        <p className="text-body-lg text-on-surface-variant mb-lg">
          고민은 20분 늦출 뿐입니다.
        </p>

        {/* CTA Button */}
        <button
          onClick={onJoinClick}
          className="bg-primary text-on-primary text-label-md px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-sm"
        >
          주방 입장하기 <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
