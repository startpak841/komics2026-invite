// ============================================
// Supabase 설정
// ⚠️ SUPABASE_ANON_KEY를 본인 키로 교체하세요!
// 위치: Supabase Dashboard → Project Settings → API → anon/public key
// ============================================

const SUPABASE_URL = 'https://olztpirknykqdvqjlewb.supabase.co';
const SUPABASE_ANON_KEY = 'PASTE_YOUR_ANON_KEY_HERE';

// 관리자 비밀 키 (URL에 ?key=xxx 와 일치해야 admin 접근 가능)
const ADMIN_KEY = 'komics2026';

// Supabase 클라이언트 초기화
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
