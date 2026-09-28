import { create } from 'zustand';
import { getCurrentMonth, shiftMonth } from '../utils/format';

// 대시보드 · 목록이 공유하는 필터 상태
const useFilterStore = create((set) => ({
  month: getCurrentMonth(),
  type: 'all', // 'all' | 'income' | 'expense'
  categoryId: 'all',

  prevMonth: () => set((s) => ({ month: shiftMonth(s.month, -1) })),
  nextMonth: () => set((s) => ({ month: shiftMonth(s.month, 1) })),
  setType: (type) => set({ type, categoryId: 'all' }), // 유형 변경 시 카테고리 초기화
  setCategoryId: (categoryId) => set({ categoryId }),
}));

export default useFilterStore;
