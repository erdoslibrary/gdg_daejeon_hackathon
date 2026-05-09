"use client";

import { Home, ChefHat, BookOpen, Users, Settings, HelpCircle } from "lucide-react";

interface SidebarProps {
  nickname: string;
}

const NAV_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: ChefHat, label: "My Kitchen", active: false },
  { icon: BookOpen, label: "Recipes", active: false },
  { icon: Users, label: "Community", active: false },
];

export default function Sidebar({ nickname }: SidebarProps) {
  return (
    <nav className="hidden lg:flex flex-col h-full border-r border-outline-variant w-64 fixed left-0 top-0 bg-surface-container-low shadow-md z-40">
      {/* Logo */}
      <div className="p-gutter">
        <h1 className="text-headline-md text-primary tracking-tight">
          오늘의 주방
        </h1>
        <p className="text-label-md text-on-surface-variant mt-xs">
          Happy Cooking!
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-sm px-gutter mb-lg">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant bg-secondary-container flex items-center justify-center">
          <span className="text-xl">👨‍🍳</span>
        </div>
        <span className="text-label-md text-on-surface">{nickname}</span>
      </div>

      {/* Navigation */}
      <ul className="flex flex-col gap-xs flex-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a
              href="#"
              className={`flex items-center gap-sm rounded-xl px-4 py-3 mx-2 transition-all ${
                item.active
                  ? "bg-primary-container text-on-primary-container font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-variant"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-label-md">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-gutter border-t border-outline-variant mt-auto">
        <button className="w-full bg-primary text-on-primary text-label-md py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
          Join Kitchen
        </button>
        <ul className="flex flex-col gap-xs mt-md">
          <li>
            <a
              href="#"
              className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-4 py-2 mx-2 rounded-xl transition-all"
            >
              <Settings className="w-5 h-5" />
              <span className="text-label-md">Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-4 py-2 mx-2 rounded-xl transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-label-md">Help</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
