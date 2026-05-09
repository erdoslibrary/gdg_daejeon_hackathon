-- ============================================
-- 🍳 오늘의 주방 (Today's Kitchen)
-- 데이터베이스 초기 설정 SQL
-- Supabase Dashboard > SQL Editor에서 실행하세요
-- ============================================

-- ── 1. Enum 타입 생성 ──────────────────────────
CREATE TYPE user_status AS ENUM ('cooking', 'eating', 'finished');
CREATE TYPE message_type AS ENUM ('user', 'system');

-- ── 2. users_session 테이블 ────────────────────
CREATE TABLE IF NOT EXISTS users_session (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname TEXT NOT NULL UNIQUE,
  status user_status NOT NULL DEFAULT 'cooking',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 3. chat_messages 테이블 ────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname TEXT NOT NULL,
  content TEXT NOT NULL,
  type message_type NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 4. RLS (Row Level Security) 활성화 ─────────
-- RLS를 켜면 인증되지 않은 접근을 차단할 수 있습니다.
-- 우리는 해커톤이므로 모든 접근을 허용하는 정책을 설정합니다.

ALTER TABLE users_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- users_session: 모든 사용자가 읽기/쓰기 가능
CREATE POLICY "Allow all access to users_session"
  ON users_session FOR ALL
  USING (true)
  WITH CHECK (true);

-- chat_messages: 모든 사용자가 읽기/쓰기 가능
CREATE POLICY "Allow all access to chat_messages"
  ON chat_messages FOR ALL
  USING (true)
  WITH CHECK (true);

-- ── 5. Realtime 활성화 ─────────────────────────
-- Supabase Realtime으로 테이블 변경사항을 실시간 구독합니다.

ALTER PUBLICATION supabase_realtime ADD TABLE users_session;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
