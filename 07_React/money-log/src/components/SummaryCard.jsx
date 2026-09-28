import styled from 'styled-components';
import { Card, Amount } from './ui';
import { formatWon } from '../utils/format';

// 월 요약 카드 (수입 · 지출 · 잔액)
function SummaryCard({ label, amount, type }) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value $type={type}>{formatWon(amount)}</Value>
    </Card>
  );
}

export default SummaryCard;

const Label = styled.p`
  margin-bottom: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.color.sub};
`;

const Value = styled(Amount)`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;
