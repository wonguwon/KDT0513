const pad = (n) => String(n).padStart(2, '0');

// 오늘이 속한 달 "2026-09" (toISOString은 UTC라 쓰지 않음)
export const getCurrentMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
};

// 오늘 날짜 "2026-09-23"
export const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// "2026-01", -1 → "2025-12"
export const shiftMonth = (month, diff) => {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(y, m - 1 + diff, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
};

export const formatWon = (n) => `${n.toLocaleString()}원`;

// 유형에 따라 +/− 부호를 붙인다
export const formatSigned = (type, n) => `${type === 'income' ? '+' : '−'}${formatWon(n)}`;
