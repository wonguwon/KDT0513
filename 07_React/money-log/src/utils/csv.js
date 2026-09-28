// 거래 목록을 CSV로 내려받는다 (확장)
export const downloadCsv = (filename, rows, categoryName) => {
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const header = ['날짜', '유형', '카테고리', '금액', '메모'];
  const lines = rows.map((t) =>
    [t.date, t.type === 'income' ? '수입' : '지출', categoryName[t.categoryId], t.amount, t.memo]
      .map(escape)
      .join(','),
  );

  // BOM을 붙여 엑셀에서 한글이 깨지지 않게 한다
  const blob = new Blob(['﻿' + [header.join(','), ...lines].join('\n')], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
