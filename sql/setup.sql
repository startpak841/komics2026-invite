-- ============================================
-- KOMICS USA 2026 클릭 추적 시스템 DB 세팅
-- 실행 위치: Supabase Dashboard → SQL Editor → New query
-- ============================================

-- 1. 회사 정보 테이블
CREATE TABLE IF NOT EXISTS komics_companies (
  id BIGSERIAL PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  company_code TEXT,
  company_name TEXT NOT NULL,
  contact_email TEXT,
  contact_name TEXT,
  country TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 클릭 로그 테이블
CREATE TABLE IF NOT EXISTS komics_click_logs (
  id BIGSERIAL PRIMARY KEY,
  token TEXT,
  company_code TEXT,
  company_name TEXT,
  event_type TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 인덱스
CREATE INDEX IF NOT EXISTS idx_logs_token ON komics_click_logs(token);
CREATE INDEX IF NOT EXISTS idx_logs_event ON komics_click_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_logs_time ON komics_click_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_companies_token ON komics_companies(token);

-- 4. RLS 활성화
ALTER TABLE komics_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE komics_click_logs ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책
DROP POLICY IF EXISTS "anyone_insert_logs" ON komics_click_logs;
CREATE POLICY "anyone_insert_logs" ON komics_click_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "anyone_read_logs" ON komics_click_logs;
CREATE POLICY "anyone_read_logs" ON komics_click_logs FOR SELECT USING (true);

DROP POLICY IF EXISTS "anyone_read_companies" ON komics_companies;
CREATE POLICY "anyone_read_companies" ON komics_companies FOR SELECT USING (true);

DROP POLICY IF EXISTS "anyone_insert_companies" ON komics_companies;
CREATE POLICY "anyone_insert_companies" ON komics_companies FOR INSERT WITH CHECK (true);

-- 6. 통계 뷰
CREATE OR REPLACE VIEW komics_stats_by_company AS
SELECT
  c.id, c.company_name, c.token, c.company_code, c.contact_email, c.country,
  COUNT(CASE WHEN l.event_type = 'page_view' THEN 1 END) AS page_views,
  COUNT(CASE WHEN l.event_type = 'ip_library' THEN 1 END) AS ip_library_clicks,
  COUNT(CASE WHEN l.event_type = 'rsvp' THEN 1 END) AS rsvp_clicks,
  MAX(l.created_at) AS last_activity
FROM komics_companies c
LEFT JOIN komics_click_logs l ON l.token = c.token
GROUP BY c.id, c.company_name, c.token, c.company_code, c.contact_email, c.country
ORDER BY last_activity DESC NULLS LAST;

-- ✅ 완료!
