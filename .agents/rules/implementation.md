---
trigger: always_on
---

# 🍳 프로젝트: 오늘의 주방 (Today's Kitchen) - 마스터 구현 가이드

## 🎯 핵심 원칙 (Core Principles)
- **Context over Code:** 복잡한 코드 아키텍처보다 사용자 경험과 실시간 상호작용의 '흐름'을 최우선으로 한다.
- **Modern & Lean:** Next.js, Supabase, Drizzle을 사용하여 해커톤에 최적화된 가장 빠른 배포 환경을 유지한다.
- **Production-Ready Interaction:** 단순 구현을 넘어 시각적 피드백과 애니메이션의 완성도를 통해 실전형 결과물을 만든다.

## 🛠 Tech Stack & Design System
- **Framework:** Next.js 14+ (App Router)
- **BaaS/Database:** Supabase (Realtime, DB)
- **ORM:** Drizzle ORM (Supabase Direct Connection)
- **Styling:** Tailwind CSS + Stitch (배포 및 실시간 UI 반영)
- **Theme:** Kitchen Harmony (Background: #fff8f3, Primary: #52621c)
- **Animation:** Framer Motion (유저 칩의 그룹 간 이동 애니메이션 구현)

## 🗂 Database Schema (Supabase & Drizzle)
1. **users_session**
   - id: uuid (PK)
   - nickname: text (Unique)
   - status: enum ('cooking', 'eating', 'finished')
   - updated_at: timestamp
2. **chat_messages**
   - id: uuid (PK)
   - nickname: text
   - content: text
   - type: enum ('user', 'system') // 유저 메시지와 시스템 알림 구분
   - created_at: timestamp

## 🚀 실전 구현 단계 (Implementation Phases)

### Phase 1: 디자인 시스템 및 초기 레이아웃 (30분)
- **Theme Sync:** `design/design.md`의 컬러 팔레트(#52621c, #ffb28e)를 Tailwind에 즉시 반영.
- **Global Layout:** 상단 히어로 섹션과 하단 6:4 스플릿 뷰(레시피/라이브 룸) 뼈대 잡기.
- **Pseudo-Auth:** `sessionStorage`를 활용해 닉네임 입력만으로 즉시 '자취요리왕' 등 유저 식별자 생성.

### Phase 2: 개인화 실시간 유저 보드 (40분) - **핵심 구현력**
- **유저 그룹화:** `users_session` 테이블을 실시간 구독(Realtime)하여 유저들을 상태별(요리중/먹는중/설거지대기)로 분류.
- **개인화 칩(Chip):** - 각 카테고리 아래에 유저 닉네임을 칩 형태로 나열.
  - 유저 본인의 칩은 강조 색상(#6a7c32)을 적용하여 특정.
  - 상태 버튼 클릭 시, 칩이 부드럽게 다른 카테고리로 슬라이딩 이동(Framer Motion `layout` 적용).
- **Empty State:** 카테고리에 유저가 없을 시 "첫 번째 요리사가 되어보세요!"라는 위트 문구 노출.

### Phase 3: 실시간 채팅 및 자동 피드백 (30분)
- **Realtime Sync:** Supabase Realtime을 통해 채팅창 동기화.
- **Auto-System Message:** 상태 변경 버튼 클릭 시 `chat_messages` 테이블에 시스템 타입 메시지 자동 삽입.
  - 예: `📢 [시스템] '자취요리왕'님이 진실의 미간을 작동하며 식사를 시작했습니다!`
- **Optimistic UI:** 내 상태 변경은 즉시 UI에 반영하여 딜레이 없는 반응성 제공.

### Phase 4: 위트 있는 디테일 마무리 (20분)
- **레시피 체크리스트:** 단계별 완료 시 텍스트 딤 처리 및 취소선 애니메이션.
- **UI 위트:** '설거지 대기' 상태 유저에게는 흑백 필터를 입혀 "설거지는 미래의 나에게..." 문구 강조.

## 💡 데모 시나리오 (Demo Workflow)
1. **입장:** 닉네임 설정 후 '오늘의 메뉴(김치볶음밥)' 확인.
2. **요리:** [요리 중] 클릭 -> 내 칩이 요리 섹션으로 이동 & 채팅창에 시작 알림 전송.
3. **소통:** 실시간 대시보드에서 다른 유저들의 진행 상황을 보며 채팅.
4. **완료:** [먹는 중] 클릭 -> 칩이 이동하며 화면 톤이 따뜻하게 변하는 '식사 모드' 연출.