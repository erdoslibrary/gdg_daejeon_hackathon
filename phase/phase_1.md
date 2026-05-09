# Phase 1: 디자인 시스템 및 초기 레이아웃 🎨

## 이 단계에서 한 일

디자인 레퍼런스(`design/screen.png`, `design/code.html`)를 기반으로 **전체 페이지의 뼈대**를 만들었습니다.
집으로 치면 벽을 세우고 방을 나누고 페인트를 칠한 단계입니다.

---

## 핵심 개념 설명

### 1. 컴포넌트(Component) 기반 개발이란?

Next.js(React)에서는 화면을 **컴포넌트**라는 독립적인 조각으로 나눕니다. 레고 블록처럼 각 조각을 따로 만들고, 마지막에 조립합니다.

```
page.tsx (조립)
├── NicknameModal  → 닉네임 입력 모달
├── Sidebar        → 왼쪽 네비게이션 바
├── HeroSection    → 상단 히어로 이미지 + 메뉴 소개
├── RecipePanel    → 준비물 + 조리 순서 (왼쪽 60%)
└── LivePanel      → 라이브 채팅 + 유저 상태 (오른쪽 40%)
```

**왜 나누나요?**
- 각 컴포넌트를 **독립적으로 수정** 가능 (채팅만 고치고 싶으면 LivePanel만 수정)
- **재사용** 가능 (같은 컴포넌트를 다른 페이지에서도 쓸 수 있음)
- 코드가 훨씬 **읽기 쉬움**

### 2. "use client"란?

Next.js에는 두 종류의 컴포넌트가 있습니다:

| 종류 | 실행 위치 | 사용 가능 기능 |
|------|-----------|----------------|
| Server Component (기본값) | 서버 | DB 직접 접근, API 호출 |
| Client Component (`"use client"`) | 브라우저 | useState, onClick, 애니메이션 |

우리 컴포넌트들은 사용자 클릭, 입력, 애니메이션이 필요하므로 `"use client"`를 선언했습니다.

### 3. sessionStorage란?

브라우저에 데이터를 임시 저장하는 공간입니다:

```
sessionStorage.setItem("kitchen-nickname", "자취요리왕");  // 저장
sessionStorage.getItem("kitchen-nickname");                 // 읽기 → "자취요리왕"
```

- **탭을 닫으면** 데이터가 사라짐 (영구 저장이 아님)
- 우리는 이걸 **Pseudo-Auth(가짜 인증)**로 사용합니다
- 로그인/비밀번호 대신 닉네임만 저장해서 빠르게 유저를 식별

### 4. 6:4 스플릿 뷰란?

화면을 두 영역으로 나누는 레이아웃입니다:

```
┌──────────────────────────────────────────┐
│              히어로 섹션                  │
├─────────────────────┬────────────────────┤
│    레시피 (60%)     │   라이브 룸 (40%)  │
│    ┌───────────┐    │   ┌────────────┐   │
│    │  준비물    │    │   │ Live Chat  │   │
│    ├───────────┤    │   ├────────────┤   │
│    │  조리순서  │    │   │ 상태 보드  │   │
│    └───────────┘    │   └────────────┘   │
└─────────────────────┴────────────────────┘
```

Tailwind CSS에서 이렇게 구현합니다:
```html
<section class="flex flex-col lg:flex-row gap-gutter">
  <div class="flex-1 lg:w-[60%]">레시피</div>  <!-- 60% -->
  <div class="flex-1 lg:w-[40%]">라이브</div>  <!-- 40% -->
</section>
```

- `flex-col`: 모바일에서는 세로로 쌓임
- `lg:flex-row`: 데스크톱(14인치 이상)에서는 가로로 나란히

### 5. Next.js Image 컴포넌트

일반 `<img>` 태그 대신 Next.js의 `<Image>`를 사용하면:

```tsx
import Image from "next/image";

<Image src="/hero-food.png" alt="김치볶음밥" fill className="object-cover" priority />
```

**장점:**
- **자동 최적화**: WebP 등 최적 포맷으로 변환
- **레이지 로딩**: 화면에 보일 때만 로드 (성능 향상)
- `priority`: 히어로 이미지처럼 중요한 건 즉시 로드

### 6. Framer Motion 기초

애니메이션 라이브러리입니다. `motion.div`로 감싸면 자동으로 애니메이션이 적용됩니다:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}    // 시작: 투명하고 아래에
  animate={{ opacity: 1, y: 0 }}      // 끝: 불투명하고 제자리
  transition={{ duration: 0.6 }}       // 0.6초 동안
>
  내용
</motion.div>
```

Phase 2에서는 `layout` 속성을 사용해 유저 칩이 그룹 간 이동하는 고급 애니메이션을 구현할 예정입니다.

---

## 생성/수정된 파일 요약

| 파일 | 역할 |
|------|------|
| `app/globals.css` | 디자인 토큰 전체 보강 (타이포그래피 유틸리티, scrollbar-hide 등) |
| `app/page.tsx` | 메인 페이지 - 모든 컴포넌트 조립 |
| `components/NicknameModal.tsx` | 닉네임 입력 모달 (Pseudo-Auth) |
| `components/HeroSection.tsx` | 히어로 섹션 (배경 이미지 + CTA) |
| `components/RecipePanel.tsx` | 준비물 태그 + 조리 순서 체크리스트 |
| `components/LivePanel.tsx` | 라이브 채팅 + 유저 상태 보드 (정적 UI) |
| `components/Sidebar.tsx` | 데스크톱 사이드바 네비게이션 |
| `public/hero-food.png` | AI 생성 김치볶음밥 히어로 이미지 |

---

## 현재 상태

- ✅ 닉네임 입력 모달 → sessionStorage 저장
- ✅ 히어로 섹션 (이미지 + 그라데이션 + CTA)
- ✅ 6:4 스플릿 뷰 (레시피 | 라이브)
- ✅ 조리 순서 클릭 시 완료 처리 (딤 + 취소선)
- ⏳ 채팅과 유저 보드는 **정적 UI** (Phase 2-3에서 실시간 연동)

---

## 다음은? → Phase 2

Supabase Realtime을 연결하여 **유저 상태 보드를 실시간으로 동작**시킵니다.
다른 사람이 [요리 중] → [먹는 중]으로 변경하면, 내 화면에서도 칩이 부드럽게 이동합니다.
