# 🍳 오늘의 주방 (Today's Kitchen)

> **"혼자 하는 요리를 함께하는 즐거움으로"**  
> Next.js와 Supabase Realtime을 결합한 1인 가구용 실시간 소셜 요리 플랫폼입니다.

![오늘의 주방 히어로](/hero-food.png)

## 📋 프로젝트 개요
'오늘의 주방'은 혼자 사는 사람들이 같은 메뉴를 요리하며 실시간으로 소통할 수 있는 공간입니다. 레시피를 따라가며 자신의 상태를 공유하고, 다른 유저들과 실시간으로 대화하며 요리의 외로움을 즐거움으로 바꿉니다.

## ✨ 주요 기능

### 1. 실시간 유저 보드 (Realtime Status Board)
*   유저의 상태(`요리 중`, `먹는 중`, `설거지 대기`)를 실시간으로 공유.
*   **Framer Motion LayoutGroup**을 이용해 상태 변경 시 유저 칩이 부드럽게 이동하는 애니메이션 구현.

### 2. 실시간 채팅 & 자동 피드백 (Live Kitchen)
*   **Supabase Realtime** 기반의 딜레이 없는 실시간 채팅.
*   유저 상태 변경 시 위트 있는 **자동 시스템 메시지** 삽입 (예: "OOO님이 진실의 미간을 작동하며 식사를 시작했습니다!").
*   **Optimistic UI** 적용으로 메시지 전송 및 상태 변경 시 즉각적인 반응성 제공.

### 3. 인터랙티브 레시피 체크리스트
*   단계별 조리 순서 체크 기능.
*   실시간 **진행률 바(Progress Bar)** 및 전체 완료 시 축하 애니메이션.

### 4. 위트 있는 UX 디테일
*   **식사 모드:** '먹는 중' 상태일 때 화면 전체에 따뜻한 앰버 톤 오버레이 적용.
*   **설거지 필터:** '설거지 대기' 유저에게 흑백(Grayscale) 필터를 적용하여 위트 있는 시각적 피드백 제공.

## 🛠 기술 스택 (Tech Stack)

### Implementation Tools
- **AI Assistant:** `Antigravity` - 전체 프로젝트 설계 및 실시간 코드 구현.
- **UI/UX Design:** `Stitch` - 디자인 시스템 토큰 관리 및 최적화된 UI 구현.

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React

### Backend
- **BaaS/DB:** Supabase (PostgreSQL)
- **Realtime:** Supabase Realtime Engine
- **ORM:** Drizzle ORM

### Design System
- **Theme:** Kitchen Harmony (Olive Green & Soft Apricot)
- **Fonts:** Plus Jakarta Sans (Headlines), Nunito Sans (Body)

## 🚀 시작하기

### 환경 변수 설정
`.env.local` 파일을 생성하고 Supabase 정보를 입력합니다.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 설치 및 실행
```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 📂 단계별 구현 기록 (Phases)
상세한 구현 과정과 개념 설명은 아래 문서에서 확인하실 수 있습니다.

1.  [Phase 1: 디자인 시스템 및 초기 레이아웃](./phase/phase_1.md)
2.  [Phase 2: 개인화 실시간 유저 보드](./phase/phase_2.md)
3.  [Phase 3: 실시간 채팅 및 자동 피드백](./phase/phase_3.md)
4.  [Phase 4: 위트 있는 디테일 마무리](./phase/phase_4.md)

---
Developed for **Mogakyo Hackathon** with ❤️
