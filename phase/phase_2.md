# Phase 2: 개인화 실시간 유저 보드 ⚡

## 이 단계에서 한 일

유저 상태 보드를 **Supabase Realtime**으로 실시간 동기화했습니다.
이제 다른 브라우저 탭에서 상태를 바꾸면 내 화면에서도 칩이 즉시 이동합니다.

---

## 핵심 개념 설명

### 1. Realtime(실시간) 통신이란?

일반 웹은 **요청-응답** 방식입니다:

```
[브라우저] → "새 데이터 있어?" → [서버]
[서버]    → "여기 있어"        → [브라우저]
```

하지만 이러면 다른 유저가 상태를 바꿔도 **내가 새로고침하기 전엔 모릅니다.**

Realtime은 **구독(Subscribe)** 방식입니다:

```
[브라우저] → "users_session 테이블 변경사항을 알려줘" → [Supabase]

(다른 유저가 상태 변경)

[Supabase] → "users_session이 변경됐어!" → [내 브라우저] (자동!)
```

Supabase가 **변경이 생길 때마다 자동으로** 알려주므로, 새로고침 없이 실시간으로 UI가 업데이트됩니다.

### 2. Custom Hook이란?

React에서 **반복되는 로직을 재사용 가능한 함수로 묶은 것**입니다.

```typescript
// hooks/useUserSession.ts
export function useUserSession(nickname: string) {
  // Supabase 연결, 데이터 로드, 실시간 구독, 상태 변경...
  // 이 복잡한 로직을 한곳에 모아둡니다

  return { users, mySession, grouped, changeStatus };
}
```

컴포넌트에서는 이렇게 간단하게 사용합니다:

```typescript
// 컴포넌트에서 한 줄로 사용
const { grouped, mySession, changeStatus } = useUserSession("자취요리왕");
```

**장점:**
- 로직과 UI가 **분리**되어 코드가 깔끔
- 여러 컴포넌트에서 **재사용** 가능
- **테스트**가 쉬움

### 3. Optimistic UI란?

"낙관적 UI" — 서버 응답을 **기다리지 않고** 즉시 UI를 업데이트하는 패턴입니다.

```
[일반 방식]
클릭 → 서버에 요청 → (200ms 대기...) → 서버 응답 → UI 업데이트

[Optimistic UI]
클릭 → 즉시 UI 업데이트 → 서버에 요청 → (백그라운드에서 동기화)
```

사용자에게는 **즉각적인 반응**이 느껴져서 앱이 훨씬 빠르게 느껴집니다.

```typescript
const changeStatus = async (newStatus) => {
  // 1. 먼저 UI를 즉시 변경 (Optimistic)
  setMySession({ ...mySession, status: newStatus });

  // 2. 그 다음 서버에 반영
  await supabase.from("users_session").update({ status: newStatus });
};
```

### 4. Framer Motion `layoutId`란?

같은 `layoutId`를 가진 요소는 **위치가 바뀌면 자동으로 애니메이션**됩니다.

```tsx
// "요리 중" 그룹에 있던 칩
<motion.span layoutId="chip-abc123">자취요리왕</motion.span>

// 사용자가 상태를 "먹는 중"으로 변경하면,
// 칩이 자동으로 "먹는 중" 그룹으로 슬라이딩 이동!
```

React가 컴포넌트를 다시 렌더링할 때, Framer Motion이 같은 `layoutId`를 찾아서 이전 위치 → 새 위치로 **부드럽게 전환**합니다.

### 5. LayoutGroup이란?

여러 컴포넌트에 걸친 `layoutId` 애니메이션을 **동기화**합니다.

```tsx
<LayoutGroup>
  <StatusColumn status="cooking">
    <motion.span layoutId="chip-abc">자취요리왕</motion.span>
  </StatusColumn>
  <StatusColumn status="eating">
    {/* 상태 변경 시, 칩이 여기로 부드럽게 이동 */}
  </StatusColumn>
</LayoutGroup>
```

`LayoutGroup`으로 감싸지 않으면, 서로 다른 부모 안에 있는 `layoutId` 애니메이션이 동작하지 않습니다.

---

## 생성/수정된 파일 요약

| 파일 | 역할 |
|------|------|
| `hooks/useUserSession.ts` | Supabase Realtime 구독 + 유저 세션 관리 + Optimistic UI 통합 훅 |
| `components/UserBoard.tsx` | 상태별 유저 칩 보드 (LayoutGroup 애니메이션 + 클릭 상태 변경) |
| `components/LivePanel.tsx` | UserBoard 통합 + 실시간 접속 인원 표시 |

---

## 동작 확인 방법

1. **브라우저 탭 2개**를 열어 `http://localhost:3000` 접속
2. 각각 **다른 닉네임**으로 입장
3. 한쪽에서 **"먹는 중"** 상태 클릭 → 다른 쪽에서 칩이 이동하는지 확인
4. 본인 칩이 **올리브 그린 강조색**으로 표시되는지 확인
5. 빈 칸에 **위트 있는 문구**가 표시되는지 확인

---

## 다음은? → Phase 3

실시간 채팅을 구현합니다. 상태 변경 시 자동으로 시스템 메시지("자취요리왕님이 식사를 시작했습니다!")가 채팅에 삽입됩니다.
