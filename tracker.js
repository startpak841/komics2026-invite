// ============================================
// 클릭 추적 로직
// ============================================

// URL에서 토큰/회사코드 추출
function getCompanyInfo() {
  const p = new URLSearchParams(window.location.search);
  return { token: p.get('t'), companyCode: p.get('c') };
}

// 토큰으로 회사 정보 조회
async function fetchCompany(token) {
  if (!token) return null;
  const { data } = await sb.from('komics_companies').select('*').eq('token', token).maybeSingle();
  return data;
}

// 이벤트 기록
async function logEvent(eventType) {
  try {
    const { token, companyCode } = getCompanyInfo();
    let companyName = null;
    if (token) {
      const c = await fetchCompany(token);
      companyName = c?.company_name || null;
    }
    await sb.from('komics_click_logs').insert({
      token: token || null,
      company_code: companyCode || null,
      company_name: companyName,
      event_type: eventType,
      user_agent: navigator.userAgent,
      referrer: document.referrer
    });
    console.log(`[komics] ✅ ${eventType} logged`);
  } catch (e) {
    console.warn('[komics] tracking failed:', e);
  }
}

// 페이지 로드 시 page_view 기록 + 인사말 표시
window.addEventListener('DOMContentLoaded', async () => {
  logEvent('page_view');

  const { token } = getCompanyInfo();
  if (token) {
    const company = await fetchCompany(token);
    if (company) {
      const g = document.getElementById('greeting');
      g.innerHTML = `Dear <strong>${company.company_name}</strong>,`;
      g.style.display = 'block';
    }
  }

  // 링크 클릭 시 이벤트 기록 후 이동
  const ipLink = document.getElementById('ipLink');
  const rsvpLink = document.getElementById('rsvpLink');

  ipLink.addEventListener('click', (e) => {
    e.preventDefault();
    logEvent('ip_library').finally(() => {
      setTimeout(() => window.open(ipLink.href, '_blank'), 100);
    });
  });

  rsvpLink.addEventListener('click', (e) => {
    e.preventDefault();
    logEvent('rsvp').finally(() => {
      setTimeout(() => window.open(rsvpLink.href, '_blank'), 100);
    });
  });
});
