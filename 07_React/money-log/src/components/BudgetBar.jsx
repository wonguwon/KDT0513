import styled from 'styled-components';
import { formatWon } from '../utils/format';

// 예산 대비 사용률 바 (확장)
function BudgetBar({ name, spent, budget }) {
  const rate = Math.round((spent / budget) * 100);
  const over = spent > budget;

  return (
    <Wrap>
      <Top>
        <span>{name}</span>
        <Rate $over={over}>{rate}%</Rate>
      </Top>
      <Track>
        <Fill style={{ width: `${Math.min(rate, 100)}%` }} $over={over} />
      </Track>
      <Sub>
        {formatWon(spent)} / {formatWon(budget)}
      </Sub>
    </Wrap>
  );
}

export default BudgetBar;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Rate = styled.span`
  font-weight: 600;
  color: ${({ $over, theme }) => ($over ? theme.color.expense : theme.color.text)};
`;

const Track = styled.div`
  height: 6px;
  border-radius: 99px;
  background: ${({ theme }) => theme.color.border};
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  border-radius: 99px;
  background: ${({ $over, theme }) => ($over ? theme.color.expense : theme.color.text)};
  transition: width 0.3s;
`;

const Sub = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;
