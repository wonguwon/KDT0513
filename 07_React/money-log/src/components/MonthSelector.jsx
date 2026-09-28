import styled from 'styled-components';
import useFilterStore from '../store/useFilterStore';

// ◀ 2026-09 ▶ (선택 월은 스토어에 저장)
function MonthSelector() {
  const month = useFilterStore((s) => s.month);
  const prevMonth = useFilterStore((s) => s.prevMonth);
  const nextMonth = useFilterStore((s) => s.nextMonth);

  return (
    <Wrap>
      <Arrow onClick={prevMonth} aria-label="이전 달">
        ◀
      </Arrow>
      <Month>{month}</Month>
      <Arrow onClick={nextMonth} aria-label="다음 달">
        ▶
      </Arrow>
    </Wrap>
  );
}

export default MonthSelector;

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 10px;
`;

const Arrow = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: none;
  font-size: 11px;
  color: ${({ theme }) => theme.color.sub};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.surface};
    color: ${({ theme }) => theme.color.text};
  }
`;

const Month = styled.span`
  min-width: 72px;
  text-align: center;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;
