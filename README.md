# KOMICS USA 2026 - 초대장 + 클릭 추적 시스템

## 📂 파일 구조
```
├── index.html       # 초대장 페이지
├── config.js        # Supabase 설정 (anon key 입력 필요!)
├── tracker.js       # 클릭 추적 로직
├── admin/
│   └── index.html   # 관리자 대시보드
├── sql/
│   └── setup.sql    # DB 테이블 생성 SQL
└── vercel.json      # Vercel 설정
```

## 🚀 사용법

### 초대장 URL
- 일반: `https://komics2026-invite.vercel.app/`
- 회사별: `https://komics2026-invite.vercel.app/?t=토큰값`

### 관리자 대시보드
- `https://komics2026-invite.vercel.app/admin?key=komics2026`

## ⚙️ 설정
1. Supabase SQL Editor에서 `sql/setup.sql` 실행
2. `config.js`의 `SUPABASE_ANON_KEY` 교체
3. (선택) `config.js`의 `ADMIN_KEY` 변경
4. GitHub push → Vercel 자동 배포
