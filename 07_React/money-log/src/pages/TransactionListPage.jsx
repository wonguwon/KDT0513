import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { getCategories, getTransactions } from '../api/transactions';
import useFilterStore from '../store/useFilterStore';
import MonthSelector from '../components/MonthSelector';
import TransactionItem from '../components/TransactionItem';
import StatusMessage from '../components/StatusMessage';
import { Amount, Button, ButtonLink, Card, Input, PageHeader, Select } from '../components/ui';
import { formatWon } from '../utils/format';
import { downloadCsv } from '../utils/csv';

const TYPE_FILTERS = [
  { value: 'all', label: '전체' },
  { value: 'income', label: '수입' },
  { value: 'expense', label: '지출' },
];

function TransactionListPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 공유 필터 (스토어)
  const month = useFilterStore((s) => s.month);
  const type = useFilterStore((s) => s.type);
  const categoryId = useFilterStore((s) => s.categoryId);
  const setType = useFilterStore((s) => s.setType);
  const setCategoryId = useFilterStore((s) => s.setCategoryId);

  // 검색 (이 페이지 전용)
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const searchRef = useRef(null);

  // 데이터 조회
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const [txs, cats] = await Promise.all([getTransactions(), getCategories()]);
        if (!ignore) {
          setTransactions(txs);
          setCategories(cats);
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

  // 300ms 디바운스
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword.trim()), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  // "/" 키로 검색창 포커스 (다른 입력창에선 무시)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== '/') return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const categoryName = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  // 유형에 맞는 카테고리 옵션
  const categoryOptions = useMemo(
    () => (type === 'all' ? categories : categories.filter((c) => c.type === type)),
    [categories, type],
  );

  // 월 · 유형 · 카테고리 · 검색어 필터 + 날짜 내림차순
  const filtered = useMemo(
    () =>
      transactions
        .filter((t) => t.date.startsWith(month))
        .filter((t) => type === 'all' || t.type === type)
        .filter((t) => categoryId === 'all' || t.categoryId === categoryId)
        .filter((t) => !debouncedKeyword || (t.memo ?? '').includes(debouncedKeyword))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [transactions, month, type, categoryId, debouncedKeyword],
  );

  // 합계 (수입 − 지출)
  const total = useMemo(
    () => filtered.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0),
    [filtered],
  );

  const renderBody = () => {
    if (loading) return <StatusMessage type="loading" />;
    if (error) return <StatusMessage type="error" />;
    if (filtered.length === 0) {
      return (
        <StatusMessage message="조건에 맞는 거래가 없습니다.">
          <ButtonLink to="/transactions/new" $variant="primary">
            + 거래 등록
          </ButtonLink>
        </StatusMessage>
      );
    }
    return filtered.map((t) => (
      <TransactionItem key={t.id} transaction={t} categoryName={categoryName[t.categoryId]} />
    ));
  };

  return (
    <>
      <PageHeader>
        <h1>거래 내역</h1>
        <Tools>
          <MonthSelector />
          <ButtonLink to="/transactions/new" $variant="primary">
            + 거래 등록
          </ButtonLink>
        </Tools>
      </PageHeader>

      <Filters>
        <Tabs>
          {TYPE_FILTERS.map((f) => (
            <Tab key={f.value} $active={type === f.value} onClick={() => setType(f.value)}>
              {f.label}
            </Tab>
          ))}
        </Tabs>
        <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="all">전체 카테고리</option>
          {categoryOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Search
          ref={searchRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="메모 검색 ( / )"
        />
      </Filters>

      <Card>
        <ListHeader>
          <span>
            {filtered.length}건 · 합계{' '}
            <Amount $type={total >= 0 ? 'income' : 'expense'}>
              {total >= 0 ? '+' : '−'}
              {formatWon(Math.abs(total))}
            </Amount>
          </span>
          <Button
            disabled={filtered.length === 0}
            onClick={() => downloadCsv(`moneylog-${month}.csv`, filtered, categoryName)}
          >
            CSV 내보내기
          </Button>
        </ListHeader>
        {renderBody()}
      </Card>
    </>
  );
}

export default TransactionListPage;

const Tools = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.surface};
`;

const Tab = styled.button`
  padding: 0 14px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none')};
  color: ${({ $active, theme }) => ($active ? theme.color.text : theme.color.sub)};
`;

const Search = styled(Input)`
  flex: 1;
  min-width: 180px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  font-size: 14px;
  color: ${({ theme }) => theme.color.sub};
`;
