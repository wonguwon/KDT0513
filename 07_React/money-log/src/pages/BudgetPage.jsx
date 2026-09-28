import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import {
  deleteBudget,
  getBudgets,
  getCategories,
  getTransactions,
  saveBudget,
} from '../api/transactions';
import useFilterStore from '../store/useFilterStore';
import MonthSelector from '../components/MonthSelector';
import StatusMessage from '../components/StatusMessage';
import BudgetBar from '../components/BudgetBar';
import { Button, Card, Input, PageHeader } from '../components/ui';
import { formatWon } from '../utils/format';

// 카테고리별 월 예산 설정 (확장)
function BudgetPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const month = useFilterStore((s) => s.month);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const [txs, cats, bgs] = await Promise.all([
          getTransactions(),
          getCategories(),
          getBudgets(),
        ]);
        if (!ignore) {
          setTransactions(txs);
          setCategories(cats);
          setBudgets(bgs);
        }
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const expenseCategories = useMemo(
    () => categories.filter((c) => c.type === 'expense'),
    [categories],
  );

  // 선택 월 카테고리별 지출
  const spentByCategory = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(month))
      .forEach((t) => {
        map[t.categoryId] = (map[t.categoryId] ?? 0) + t.amount;
      });
    return map;
  }, [transactions, month]);

  // 저장: 0 또는 빈 값이면 예산 삭제
  const handleSave = async (categoryId, amount) => {
    const exists = budgets.some((b) => b.id === categoryId);
    try {
      if (!amount) {
        if (exists) await deleteBudget(categoryId);
        setBudgets((prev) => prev.filter((b) => b.id !== categoryId));
        toast.success('예산을 해제했습니다.');
        return;
      }
      const saved = await saveBudget(categoryId, amount, exists);
      setBudgets((prev) =>
        exists ? prev.map((b) => (b.id === categoryId ? saved : b)) : [...prev, saved],
      );
      toast.success('예산을 저장했습니다.');
    } catch {
      toast.error('예산 저장에 실패했습니다.');
    }
  };

  const renderBody = () => {
    if (loading) return <StatusMessage type="loading" />;
    if (error) return <StatusMessage type="error" />;
    if (expenseCategories.length === 0)
      return <StatusMessage message="지출 카테고리가 없습니다." />;

    return expenseCategories.map((c) => (
      <BudgetRow
        key={c.id}
        category={c}
        spent={spentByCategory[c.id] ?? 0}
        budget={budgets.find((b) => b.id === c.id)?.amount}
        onSave={handleSave}
      />
    ));
  };

  return (
    <>
      <PageHeader>
        <h1>예산 관리</h1>
        <MonthSelector />
      </PageHeader>
      <Card>{renderBody()}</Card>
    </>
  );
}

// 카테고리 한 줄 (입력값은 로컬 상태)
function BudgetRow({ category, spent, budget, onSave }) {
  const [value, setValue] = useState(budget ? String(budget) : '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = Number(value);
    if (!Number.isInteger(amount) || amount < 0) {
      toast.error('0 이상의 정수를 입력하세요.');
      return;
    }
    setSaving(true);
    await onSave(category.id, amount);
    setSaving(false);
  };

  return (
    <Row onSubmit={handleSubmit}>
      <Left>
        {budget ? (
          <BudgetBar name={category.name} spent={spent} budget={budget} />
        ) : (
          <>
            <Name>{category.name}</Name>
            <Sub>이번 달 지출 {formatWon(spent)} · 예산 미설정</Sub>
          </>
        )}
      </Left>
      <Right>
        <AmountInput
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="예산 금액"
        />
        <Button type="submit" disabled={saving}>
          저장
        </Button>
      </Right>
    </Row>
  );
}

export default BudgetPage;

const Row = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

const Left = styled.div`
  flex: 1;
  min-width: 220px;
`;

const Name = styled.p`
  font-size: 14px;
`;

const Sub = styled.p`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
`;

const Right = styled.div`
  display: flex;
  gap: 8px;
`;

const AmountInput = styled(Input)`
  width: 140px;
`;
