import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import {
  deleteTransaction,
  getCategories,
  getTransaction,
  updateTransaction,
} from '../api/transactions';
import TransactionForm from '../components/TransactionForm';
import StatusMessage from '../components/StatusMessage';
import { Amount, Button, ButtonLink, Card, PageHeader } from '../components/ui';
import { formatSigned } from '../utils/format';

function TransactionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);

  // id로 한 건 조회
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const [tx, cats] = await Promise.all([getTransaction(id), getCategories()]);
        if (!ignore) {
          setTransaction(tx);
          setCategories(cats);
        }
      } catch (e) {
        if (ignore) return;
        // 없는 id는 404로 구분
        if (e.response?.status === 404) setNotFound(true);
        else setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  // 수정 → 토스트 → 상세 반영
  const handleUpdate = async (data) => {
    try {
      const updated = await updateTransaction(id, data);
      setTransaction(updated);
      setEditing(false);
      toast.success('거래를 수정했습니다.');
    } catch {
      toast.error('수정에 실패했습니다.');
    }
  };

  // 삭제 → 토스트 → 목록 이동
  const handleDelete = async () => {
    if (!window.confirm('이 거래를 삭제할까요?')) return;
    try {
      await deleteTransaction(id);
      toast.success('거래를 삭제했습니다.');
      navigate('/transactions');
    } catch {
      toast.error('삭제에 실패했습니다.');
    }
  };

  if (loading) return <StatusMessage type="loading" />;
  if (error) return <StatusMessage type="error" />;
  if (notFound || !transaction) {
    return (
      <StatusMessage message="거래를 찾을 수 없습니다.">
        <ButtonLink to="/transactions">목록으로</ButtonLink>
      </StatusMessage>
    );
  }

  const category = categories.find((c) => c.id === transaction.categoryId);

  return (
    <>
      <PageHeader>
        <h1>{editing ? '거래 수정' : '거래 상세'}</h1>
        {!editing && (
          <Tools>
            <Button onClick={() => setEditing(true)}>수정</Button>
            <Button $variant="danger" onClick={handleDelete}>
              삭제
            </Button>
          </Tools>
        )}
      </PageHeader>

      <Card>
        {editing ? (
          // 등록 폼 재사용
          <TransactionForm
            defaultValues={{
              type: transaction.type,
              date: transaction.date,
              categoryId: transaction.categoryId,
              amount: transaction.amount,
              memo: transaction.memo ?? '',
            }}
            categories={categories}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            submitLabel="수정 완료"
          />
        ) : (
          <>
            <Hero>
              <Amount $type={transaction.type}>
                {formatSigned(transaction.type, transaction.amount)}
              </Amount>
            </Hero>
            <Info>
              <dt>유형</dt>
              <dd>{transaction.type === 'income' ? '수입' : '지출'}</dd>
              <dt>날짜</dt>
              <dd>{transaction.date}</dd>
              <dt>카테고리</dt>
              <dd>{category?.name ?? '-'}</dd>
              <dt>메모</dt>
              <dd>{transaction.memo || '-'}</dd>
            </Info>
          </>
        )}
      </Card>

      <Back to="/transactions">← 목록으로</Back>
    </>
  );
}

export default TransactionDetailPage;

const Tools = styled.div`
  display: flex;
  gap: 8px;
`;

const Hero = styled.div`
  padding: 12px 0 24px;
  font-size: 30px;
  letter-spacing: -0.02em;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Info = styled.dl`
  display: grid;
  grid-template-columns: 80px 1fr;
  row-gap: 14px;
  margin: 20px 0 0;
  font-size: 14px;

  dt {
    color: ${({ theme }) => theme.color.sub};
  }
  dd {
    margin: 0;
  }
`;

const Back = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.sub};

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`;
