# 🍳 오늘의 주방 (Today's Kitchen)

> **"혼자 하는 요리를 함께하는 즐거움으로"**  
> Next.js와 Supabase Realtime을 결합한 1인 가구용 실시간 소셜 요리 플랫폼입니다.

---

### 🌐 [실제 서비스 구경하러 가기 (Live Demo)](https://todays-kitchen.vercel.app)

![오늘의 주방 히어로](./public/hero-food.png)

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

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React

### Backend & Infrastructure
- **BaaS/DB:** Supabase (PostgreSQL)
- **Realtime:** Supabase Realtime Engine
- **ORM:** Drizzle ORM
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## 🚀 CI/CD & 배포 환경
본 프로젝트는 **GitHub Actions**를 통한 자동 배포 파이프라인이 구축되어 있어, 코드 변경 시 즉시 서비스에 반영됩니다.

1.  **Code Push**: `main` 브랜치에 코드 푸시
2.  **Lint Check**: ESLint를 통한 코드 품질 검사
3.  **Build**: Next.js 프로젝트 빌드 및 Vercel Artifact 생성
4.  **Auto Deploy**: Vercel Production 환경으로 즉시 배포

## ⚙️ 시작하기

### 환경 변수 설정
`.env.local` 파일을 생성하고 Supabase 및 Vercel 정보를 입력합니다.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 로컬 설치 및 실행
> **💡 설치 없이 바로 확인하고 싶다면? [Live Demo 바로가기](https://todays-kitchen.vercel.app)**

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 🗓️ Hackathon Information

### 🎯 Mission: Today's Brief
- **Main Keyword**: **1인 가구 (Single-Person Household)**
- **Sub Keywords**: 
  - 🛡️ **안전**: 혼자 사는 집에서의 위급 상황 및 보안
  - 🌙 **외로움**: 관계의 결핍을 줄이는 동반자 및 연결
  - 🥗 **식생활**: 1인분의 식재료, 메뉴, 영양의 비효율 해결 (**본 프로젝트의 핵심 주제!**)
  - 💰 **경제**: 고정비 절약 및 재무 의사결정

### ⏱️ 상세 타임라인
| 시간 | 내용 |
| :--- | :--- |
| 10:00 ~ 10:30 | 입장 및 체크인, 팀빌딩 |
| 10:30 ~ 14:30 | **해커톤 진행 (4시간)** - 집중 개발 및 몰입 |
| 14:30 ~ 15:00 | 발표자료 및 프로젝트 최종 제출 |
| 15:00 ~ 15:30 | 1차 투표 및 최종 10팀 선발 |
| 15:30 ~ 17:00 | 최종 발표 및 시상 (팀당 3분 스피치) |

---
**상상하라, 구현하라, 증명하라: Build with AI Hackathon 2026 in Daejeon**
