import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input, Muted, Page, Row, Title } from '../components/ui';
import { STATUSES, STATUS_LABEL } from '../data/books';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 16px;
  &:hover { border-color: var(--primary); }
`;

const Badge = styled.span`
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 999px;
  color: #fff;
  background: ${({ $status }) =>
    $status === 'reading' ? 'var(--primary)'
    : $status === 'done' ? 'var(--success)'
    : 'var(--warn)'};
`;

export default function BookListPage({ books }) {
  const [keyword, setKeyword] = useState('');                   // input과 즉시 동기화
  const [debouncedKeyword, setDebouncedKeyword] = useState(''); // 300ms 뒤 확정
  const [status, setStatus] = useState('all');

  // E-01
  useEffect(() => {
    document.title = '책 목록 · 독서 기록장';
    return () => { document.title = '독서 기록장'; };
  }, []);

  // E-02: keyword가 바뀔 때마다 새 타이머, 이전 타이머는 cleanup에서 취소
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword.trim()), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  // FR-07: keyword가 아니라 debouncedKeyword 기준
  const filtered = useMemo(() => {
    return books
      .filter((b) => status === 'all' || b.status === status)
      .filter((b) => b.title.includes(debouncedKeyword) || b.author.includes(debouncedKeyword));
  }, [books, debouncedKeyword, status]);

  return (
    <Page>
      <Row style={{ justifyContent: 'space-between' }}>
        <Title style={{ margin: 0 }}>책 목록</Title>
        <Button as={Link} to="/books/new" $variant="primary">+ 책 추가</Button>
      </Row>

      <Input
        style={{ margin: '16px 0 8px' }}
        placeholder="제목 · 저자 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Row>
        {['all', ...STATUSES].map((s) => (
          <Button key={s} $variant={status === s ? 'primary' : undefined} onClick={() => setStatus(s)}>
            {s === 'all' ? '전체' : STATUS_LABEL[s]}
          </Button>
        ))}
      </Row>

      {filtered.length === 0 ? (
        <Muted style={{ marginTop: 24 }}>조건에 맞는 책이 없습니다.</Muted>
      ) : (
        <List>
          {filtered.map((b) => (
            <li key={b.id}>
              <Item to={`/books/${b.id}`}>
                <div>
                  <div>{b.title}</div>
                  <Muted style={{ fontSize: '0.875rem' }}>{b.author}</Muted>
                </div>
                <Badge $status={b.status}>{STATUS_LABEL[b.status]}</Badge>
              </Item>
            </li>
          ))}
        </List>
      )}
    </Page>
  );
}
