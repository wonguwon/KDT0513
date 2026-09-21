import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Muted, Page, ProgressBar, Title } from '../components/ui';
import { progressOf } from '../utils/book';
import { todayString } from '../utils/date';

const Stat = styled(Card)`
  margin-bottom: 24px;
  strong { font-size: 2rem; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const BookCard = styled(Link)`
  display: block;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  &:hover { border-color: var(--primary); }
  h3 { margin: 0 0 4px; font-size: 1rem; }
`;

export default function HomePage({ books }) {
  // E-01
  useEffect(() => {
    document.title = '홈 · 독서 기록장';
    return () => { document.title = '독서 기록장'; };
  }, []);

  const reading = books.filter((b) => b.status === 'reading');

  // FR-05: 오늘 날짜 세션의 총 독서 시간(분)
  const today = todayString();
  const todaySeconds = books
    .flatMap((b) => b.sessions)
    .filter((s) => s.date === today)
    .reduce((sum, s) => sum + s.seconds, 0);

  return (
    <Page>
      <Title>홈</Title>

      <Stat>
        <Muted>오늘 독서 시간</Muted>
        <strong>{Math.floor(todaySeconds / 60)}분</strong>
      </Stat>

      <h2 style={{ fontSize: '1.1rem' }}>읽는 중인 책</h2>
      {reading.length === 0 ? (
        <Muted>읽는 중인 책이 없습니다. <Link to="/books">목록에서 골라보세요</Link></Muted>
      ) : (
        <Grid>
          {reading.map((b) => (
            <BookCard key={b.id} to={`/books/${b.id}`}>
              <h3>{b.title}</h3>
              <Muted>{b.author}</Muted>
              <ProgressBar percent={progressOf(b)} />
              <Muted>{progressOf(b)}%</Muted>
            </BookCard>
          ))}
        </Grid>
      )}
    </Page>
  );
}
