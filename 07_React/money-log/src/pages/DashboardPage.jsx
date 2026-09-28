import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getBudgets, getCategories, getTransactions } from '../api/transactions';
import useFilterStore from '../store/useFilterStore';
import MonthSelector from '../components/MonthSelector';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import StatusMessage from '../components/StatusMessage';
import BudgetBar from '../components/BudgetBar';
import { ButtonLink, Card, CardTitle, PageHeader, Amount } from '../components/ui';
import { formatWon } from '../utils/format';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const month = useFilterStore((s) => s.month);

  // 최초 진입 시 데이터 조회
  useEffect(() => {
    let ignore = false; // 언마운트 후 응답 무시

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

  // id → 이름 매핑
  const categoryName = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  // 선택 월 거래
  const monthly = useMemo(
    () => transactions.filter((t) => t.date.startsWith(month)),
    [transactions, month],
  );

  // 수입 · 지출 · 잔액
  const summary = useMemo(() => {
    const sumOf = (type) =>
      monthly.filter((t) => t.type === type).reduce((sum, t) => sum + t.amount, 0);
    const income = sumOf('income');
    const expense = sumOf('expense');
    return { income, expense, balance: income - expense };
  }, [monthly]);

  // 카테고리별 지출 합계
  const expenseByCategory = useMemo(() => {
    const map = {};
    monthly
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.categoryId] = (map[t.categoryId] ?? 0) + t.amount;
      });
    return map;
  }, [monthly]);

  // 지출 상위 5개 카테고리
  const topCategories = useMemo(
    () =>
      Object.entries(expenseByCategory)
        .map(([id, total]) => ({ id, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5),
    [expenseByCategory],
  );

  // 최근 거래 5건
  const recent = useMemo(
    () => [...monthly].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [monthly],
  );

  const renderBody = () => {
    if (loading) return <StatusMessage type="loading" />;
    if (error) return <StatusMessage type="error" />;

    return (
      <>
        <Summary>
          <SummaryCard label="총수입" amount={summary.income} type="income" />
          <SummaryCard label="총지출" amount={summary.expense} type="expense" />
          <SummaryCard label="잔액" amount={summary.balance} />
        </Summary>

        <Grid>
          <Card>
            <CardTitle>카테고리별 지출</CardTitle>
            {topCategories.length === 0 ? (
              <StatusMessage message="이번 달 지출이 없습니다." />
            ) : (
              <List>
                {topCategories.map((c, i) => (
                  <li key={c.id}>
                    <span>
                      <Rank>{i + 1}</Rank>
                      {categoryName[c.id] ?? c.id}
                    </span>
                    <Amount $type="expense">{formatWon(c.total)}</Amount>
                  </li>
                ))}
              </List>
            )}
          </Card>

          <Card>
            <CardTitle>예산 사용률</CardTitle>
            {budgets.length === 0 ? (
              <StatusMessage message="설정된 예산이 없습니다." />
            ) : (
              <Bars>
                {budgets.map((b) => (
                  <BudgetBar
                    key={b.id}
                    name={categoryName[b.id] ?? b.id}
                    spent={expenseByCategory[b.id] ?? 0}
                    budget={b.amount}
                  />
                ))}
              </Bars>
            )}
          </Card>
        </Grid>

        <Card>
          <CardTitle>최근 거래</CardTitle>
          {recent.length === 0 ? (
            <StatusMessage message="이번 달 거래가 없습니다." />
          ) : (
            recent.map((t) => (
              <TransactionItem
                key={t.id}
                transaction={t}
                categoryName={categoryName[t.categoryId]}
              />
            ))
          )}
        </Card>
      </>
    );
  };

  return (
    <>
      <PageHeader>
        <h1>대시보드</h1>
        <Tools>
          <MonthSelector />
          <ButtonLink to="/transactions/new" $variant="primary">
            + 거래 등록
          </ButtonLink>
        </Tools>
      </PageHeader>
      <Stack>{renderBody()}</Stack>
    </>
  );
}

export default DashboardPage;

const Tools = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 14px;
  }
`;

const Rank = styled.span`
  display: inline-block;
  width: 20px;
  color: ${({ theme }) => theme.color.muted};
`;

const Bars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
