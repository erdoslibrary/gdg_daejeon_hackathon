# Phase 0: 기술 스택 및 환경 설정 🛠️

## 이 단계에서 한 일

프로젝트의 **기반(foundation)**을 다졌습니다. 집을 짓기 전에 땅을 고르고 자재를 준비하는 것과 같습니다.

---

## 핵심 개념 설명

### 1. Supabase란?

**Supabase**는 "백엔드를 직접 만들지 않아도 되게 해주는 서비스"입니다.

보통 웹 앱을 만들려면:
- 데이터베이스(DB) 서버 설치
- API 서버 코드 작성
- 실시간 통신(WebSocket) 구현
- 사용자 인증(로그인) 시스템 구축

...이 모든 걸 직접 해야 합니다. Supabase는 이걸 **클릭 몇 번으로** 제공합니다.

```
[우리 Next.js 앱] ←→ [Supabase 서버]
                        ├─ PostgreSQL DB (데이터 저장)
                        ├─ Realtime (실시간 데이터 동기화)
                        └─ Auth (인증)
```

우리 프로젝트에서는:
- **DB**: 유저 상태(`users_session`)와 채팅 메시지(`chat_messages`)를 저장
- **Realtime**: 다른 유저의 상태 변화나 새 채팅이 즉시 내 화면에 반영

### 2. `.env.local` 파일이란?

환경 변수(environment variables)를 저장하는 파일입니다. 비밀번호처럼 **코드에 직접 넣으면 안 되는 값**들을 여기에 보관합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co   # Supabase 서버 주소
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx   # 공개 API 키
```

> 💡 `NEXT_PUBLIC_` 접두사가 붙으면 브라우저에서도 접근 가능한 변수입니다.
> `ANON_KEY`(sb_publishable_)는 공개해도 안전한 키로, RLS(행 수준 보안)가 데이터를 보호합니다.

### 3. Drizzle ORM이란?

**ORM(Object-Relational Mapping)**은 "데이터베이스를 TypeScript 코드로 다루게 해주는 도구"입니다.

SQL을 직접 쓰는 대신:
```sql
-- SQL 방식
SELECT * FROM users_session WHERE status = 'cooking';
```

TypeScript로 이렇게 씁니다:
```typescript
// Drizzle 방식
const result = await db
  .select()
  .from(usersSession)
  .where(eq(usersSession.status, 'cooking'));
```

장점:
- **타입 안전성**: 오타가 나면 에디터가 즉시 알려줌
- **자동완성**: 테이블 컬럼명을 자동으로 제안
- **스키마 관리**: 코드로 DB 구조를 정의하고 버전 관리 가능

### 4. Tailwind CSS v4 `@theme` 문법

Tailwind CSS v4에서는 `@theme inline` 블록 안에 디자인 토큰(색상, 폰트, 간격 등)을 정의합니다:

```css
@theme inline {
  --color-primary: #52621c;     /* → 클래스명: bg-primary, text-primary */
  --font-heading: "Plus Jakarta Sans";  /* → 클래스명: font-heading */
}
```

이렇게 정의하면 HTML에서 바로 사용할 수 있습니다:
```html
<h1 class="text-primary font-heading">오늘의 주방</h1>
```

### 5. 데이터베이스 스키마 (Schema)

"스키마"란 **데이터를 어떤 구조로 저장할지 정의한 설계도**입니다.

우리 프로젝트의 테이블 두 개:

| 테이블 | 역할 | 주요 컬럼 |
|--------|------|-----------|
| `users_session` | 유저 상태 관리 | nickname, status(cooking/eating/finished) |
| `chat_messages` | 채팅 메시지 | nickname, content, type(user/system) |

### 6. RLS (Row Level Security)란?

"행 수준 보안"으로, **누가 어떤 데이터에 접근할 수 있는지**를 DB 레벨에서 제어합니다.

해커톤이므로 현재는 "모든 접근 허용" 정책을 사용합니다:
```sql
CREATE POLICY "Allow all access" ON users_session
  FOR ALL USING (true) WITH CHECK (true);
```

---

## 생성/수정된 파일 요약

| 파일 | 역할 |
|------|------|
| `.env.local` | Supabase 접속 정보 (URL을 전체 형식으로 수정) |
| `lib/supabase.ts` | Supabase 클라이언트 인스턴스 생성 |
| `lib/db/schema.ts` | Drizzle ORM 스키마 정의 (2개 테이블) |
| `lib/utils.ts` | `cn()` 유틸리티 (Tailwind 클래스 병합) |
| `drizzle.config.ts` | Drizzle Kit 설정 (마이그레이션 경로 등) |
| `app/globals.css` | Kitchen Harmony 디자인 토큰 전체 반영 |
| `app/layout.tsx` | Google Fonts(Plus Jakarta Sans, Nunito Sans) 적용 |
| `supabase/migrations/0001_initial_setup.sql` | DB 테이블 생성 + RLS + Realtime 활성화 SQL |

---

## ⚠️ 다음 단계 전에 해야 할 일

Supabase Dashboard에서 **SQL Editor**를 열고, `supabase/migrations/0001_initial_setup.sql` 파일의 내용을 **복사-붙여넣기**하여 실행해 주세요.

이 SQL이 하는 일:
1. `user_status`, `message_type` 열거형(Enum) 타입 생성
2. `users_session`, `chat_messages` 테이블 생성
3. RLS 활성화 및 접근 정책 설정
4. Realtime 실시간 구독 활성화

---

## 다음은? → Phase 1

히어로 섹션, 6:4 스플릿 뷰 레이아웃, 그리고 닉네임 입력 UI를 만듭니다.
