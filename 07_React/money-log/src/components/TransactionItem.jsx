import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Amount } from './ui';
import { formatSigned } from '../utils/format';

// 거래 한 줄 (클릭 시 상세로 이동)
function TransactionItem({ transaction, categoryName }) {
  const { id, type, date, amount, memo } = transaction;

  return (
    <Row to={`/transactions/${id}`}>
      <Info>
        <Memo>{memo || categoryName}</Memo>
        <Meta>
          {date} · {categoryName}
        </Meta>
      </Info>
      <Amount $type={type}>{formatSigned(type, amount)}</Amount>
    </Row>
  );
}

export default TransactionItem;

const Row = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 4px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.color.surface};
  }
`;

const Info = styled.div`
  min-width: 0;
`;

const Memo = styled.p`
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Meta = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
`;
