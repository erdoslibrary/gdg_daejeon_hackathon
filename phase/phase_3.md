# Phase 3: 실시간 채팅 및 자동 피드백 💬

## 이 단계에서 한 일

**채팅 기능을 실시간으로 동작**시키고, 유저 상태가 변할 때 **자동으로 시스템 메시지**가 채팅에 삽입되도록 만들었습니다. 이제 모든 실시간 기능이 연결되었습니다!

---

## 핵심 개념 설명

### 1. 데이터 흐름 전체 그림

Phase 3까지 완성된 데이터 흐름은 이렇습니다:

```
[유저 A 브라우저]                           [유저 B 브라우저]
     │                                          │
     ├─ 채팅 입력 ──→ chat_messages 테이블       │
     │                    │                      │
     │                    └──── Realtime ───→ 메시지 표시
     │                                          │
     ├─ 상태 변경 ──→ users_session 테이블       │
     │     │              │                      │
     │     │              └──── Realtime ───→ 칩 이동
     │     │                                     │
     │     └──────→ chat_messages에                │
     │               시스템 메시지 자동 삽입 ──→ 알림 표시
```

### 2. Optimistic UI 실전 적용

채팅에서 Optimistic UI가 어떻게 동작하는지 단계별로:

```
1. 유저가 "김치볶음밥 맛있겠다!" 입력 후 전송 클릭

2. [Optimistic] 즉시 화면에 메시지 표시
   → id: "temp-1715234567890" (임시 ID)
   → 서버 응답을 기다리지 않음!

3. [서버] Supabase에 INSERT 요청

4. [Realtime] Supabase가 INSERT 이벤트 발송
   → id: "abc-real-uuid" (진짜 ID)

5. [정리] 임시 메시지를 서버 메시지로 교체
   → "temp-" ID + 같은 content/nickname → 제거
   → 서버에서 온 진짜 메시지로 대체
```

코드에서는 이렇게 구현됩니다:

```typescript
// 중복 방지 + Optimistic 메시지 교체 로직
setMessages((prev) => {
  if (prev.find((m) => m.id === newMsg.id)) return prev;  // 진짜 중복
  const withoutOptimistic = prev.filter(                    // 임시 메시지 제거
    (m) => !(m.id.startsWith("temp-") && m.content === newMsg.content)
  );
  return [...withoutOptimistic, newMsg];
});
```

### 3. 시스템 메시지란?

채팅에는 두 종류의 메시지가 있습니다:

| 타입 | 보내는 주체 | 예시 | 스타일 |
|------|------------|------|--------|
| `user` | 유저가 직접 입력 | "김치볶음밥엔 참치인가요?" | 말풍선 (좌/우 정렬) |
| `system` | 코드가 자동 생성 | "📢 '자취요리왕'님이 식사를 시작했습니다!" | 중앙 정렬 + 배경 |

시스템 메시지는 **유저가 상태를 변경할 때 자동으로** 삽입됩니다:

```typescript
// hooks/useStatusTransition.ts
const STATUS_MESSAGES = {
  cooking: (n) => `📢 '${n}'님이 앞치마를 두르고 요리를 시작했습니다! 🔥`,
  eating:  (n) => `📢 '${n}'님이 진실의 미간을 작동하며 식사를 시작했습니다! 🍚`,
  finished:(n) => `📢 '${n}'님이 설거지의 세계로 빨려들어갑니다... 🧽`,
};
```

### 4. useStatusTransition — 두 동작을 하나로

상태 변경 시 두 가지가 동시에 일어나야 합니다:
1. `users_session` 테이블의 상태 업데이트
2. `chat_messages` 테이블에 시스템 메시지 삽입

이 두 동작을 **하나의 함수로 묶은 것**이 `useStatusTransition` 훅입니다:

```typescript
const { transition } = useStatusTransition({
  nickname,
  changeStatus,       // users_session 업데이트 (Phase 2)
  sendSystemMessage,  // chat_messages 삽입 (Phase 3)
});

// 사용: 버튼 클릭 시 transition("eating") 호출
// → 상태 변경 + 시스템 메시지 동시에!
```

### 5. AnimatePresence — 메시지 등장 애니메이션

새 메시지가 추가될 때 **부드럽게 페이드인 + 슬라이드업** 됩니다:

```tsx
<AnimatePresence initial={false}>
  {messages.map((msg) => (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0, y: 10 }}   // 시작: 투명 + 아래
      animate={{ opacity: 1, y: 0 }}     // 끝: 보임 + 제자리
    >
      {/* 메시지 내용 */}
    </motion.div>
  ))}
</AnimatePresence>
```

`initial={false}`는 **최초 렌더링 시에는 애니메이션 없이 표시**하고, 이후 새로 추가되는 메시지만 애니메이션을 적용합니다.

---

## 생성/수정된 파일 요약

| 파일 | 역할 |
|------|------|
| `hooks/useChatMessages.ts` | 채팅 메시지 로드 + Realtime 구독 + Optimistic 전송 |
| `hooks/useStatusTransition.ts` | 상태 변경 + 시스템 메시지 자동 삽입 통합 |
| `components/ChatRoom.tsx` | 채팅 UI (시스템/유저 메시지 구분, 자동 스크롤) |
| `components/LivePanel.tsx` | 모든 실시간 기능 최종 통합 |

---

## 동작 확인 방법

1. 브라우저 새로고침 후 닉네임 입력
2. **채팅 입력창**에 메시지를 입력하고 전송 (Enter 또는 전송 버튼)
3. 하단 상태 보드에서 **[먹는 중]** 클릭
4. 채팅에 시스템 메시지가 자동 삽입되는지 확인:
   > 📢 '집밥요정'님이 진실의 미간을 작동하며 식사를 시작했습니다! 🍚
5. **탭 2개**로 각각 다른 닉네임 입장 → 서로의 채팅과 상태 변경이 실시간 반영되는지 확인

---

## 다음은? → Phase 4

마지막 마무리! 설거지 대기 유저에 흑백 필터, 레시피 체크리스트 세부 애니메이션, 전체 폴리싱을 진행합니다.
