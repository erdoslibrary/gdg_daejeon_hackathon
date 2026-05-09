---
trigger: always_on
---

# 프로젝트: 오늘의 주방 (Today's Kitchen) - 1인 가구를 위한 실시간 버추얼 키친

## 🎯 핵심 원칙 (Core Principles)
- **Context over Code:** 복잡한 아키텍처보다 사용자 경험과 실시간 상호작용의 흐름을 우선한다.
- **Modern & Lean:** Next.js, Supabase, Drizzle을 사용하여 가장 빠르게 '동작하는' 결과물을 만든다.
- **Production-Ready Interaction:** 해커톤용이지만, 사용자에게 전달되는 시각적 피드백과 인터랙션은 완성도가 높아야 한다.

## 🛠 Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **BaaS/Database:** Supabase (Auth, Realtime, DB)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS + Shadcn UI
- **Motion:** Framer Motion (상태 변경 애니메이션용)

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
   - created_at: timestamp
3. **cook_photos** (Optional/Phase 4)
   - id: uuid (PK)
   - image_url: text
   - nickname: text

## 🚀 구현 단계 (Implementation Phases)

### Phase 1: 기반 설정 및 Mock Auth
- Supabase 프로젝트 연결 및 Drizzle 스키마 푸시.
- 실제 Auth 대신 `sessionStorage`를 활용한 닉네임 기반 세션 관리 시스템 구축.
- 첫 진입 시 닉네임을 입력받는 오버레이 모달 구현.

### Phase 2: 오늘의 레시피 & 레이아웃 (PC 친화적)
- **좌측 섹션 (60%):** '오늘의 메뉴(김치볶음밥)' 레시피를 JSON 데이터로 관리하여 렌더링. 세로 스크롤 가능.
- **우측 섹션 (40%):** 실시간 채팅 및 상태 대시보드 배치.

### Phase 3: 실시간 인터랙션 (핵심 구현력)
- **Realtime Chat:** Supabase Realtime을 사용하여 지연 없는 채팅 구현.
- **Status Sync:** - [요리 중], [먹는 중], [다 먹음] 버튼 구현.
  - 버튼 클릭 시 DB의 `status`를 `upsert`하고, 이를 구독 중인 모든 유저의 화면에 실시간으로 반영.
  - 상태 변경 시 채팅창에 "[닉네임]님이 요리를 시작했습니다! 🔥"와 같은 시스템 메시지 자동 생성.

### Phase 4: 위트 있는 UX 및 애니메이션
- **상태별 피드백:**
  - '요리 중': 칼질이나 불꽃 아이콘 애니메이션.
  - '먹는 중': "진실의 미간 작동 중" 멘트 노출.
  - '다 먹음': "설거지는 미래의 나에게..." 멘트 및 화면 딤 처리.
- **인증 샷:** 간단한 이미지 URL 입력으로 완성된 요리 사진 공유 기능.

## 💡 시연 시나리오 (Demo Scenario)
1. 유저 A가 접속하여 '자취왕' 닉네임 설정.
2. 레시피를 보며 [요리 중] 버튼 클릭 -> 실시간으로 타 유저에게 알림 전송.
3. 채팅창으로 "다들 불 조절 조심하세요!" 메시지 전송.
4. 요리 완료 후 [먹는 중] 상태 변경 -> 위트 있는 문구와 함께 식사 모드 전환.
5. 최종적으로 요리 사진 URL을 올려 '명예의 전당' 등록.