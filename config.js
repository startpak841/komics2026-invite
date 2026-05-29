// ============================================
// Supabase 설정
// ⚠️ SUPABASE_ANON_KEY를 본인 키로 교체하세요!
// 위치: Supabase Dashboard → Project Settings → API → anon/public key
// ============================================

const SUPABASE_URL = 'https://olztpirknykqdvqjlewb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZGd6Z2hoZHZoY3d1bWt2dXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzg2MjUsImV4cCI6MjA5NTYxNDYyNX0.on5K0A68OD8i9FlhaBoBcvSspmXL8bok5-VL-03n-EY';

// 관리자 비밀 키 (URL에 ?key=xxx 와 일치해야 admin 접근 가능)
const ADMIN_KEY = 'komics2026';

// Supabase 클라이언트 초기화
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
