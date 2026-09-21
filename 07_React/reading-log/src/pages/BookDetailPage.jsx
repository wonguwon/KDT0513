import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, Muted, Page, ProgressBar, Row, Title } from '../components/ui';
import { progressOf } from '../utils/book';
import { STATUS_LABEL } from '../data/books';

const SessionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  li {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
  }
`;

export default function BookDetailPage({ books, onDelete, showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // FR-10: useParams는 문자열 → Number로 비교
  const book = books.find((b) => b.id === Number(id));

  // E-01: 책 제목 포함. 조기 return보다 위에 있어야 한다
  useEffect(() => {
    document.title = book ? `${book.title} · 독서 기록장` : '책을 찾을 수 없음';
    return () => { document.title = '독서 기록장'; };
  }, [book]);

  if (!book) {
    return (
      <Page>
        <Title>책을 찾을 수 없습니다</Title>
        <Link to="/books">목록으로</Link>
      </Page>
    );
  }

  // FR-11
  const handleDelete = () => {
    if (!confirm(`'${book.title}'을(를) 삭제할까요?`)) return;
    onDelete(book.id);
    showToast('책이 삭제되었습니다');
    navigate('/books');
  };

  // 최신순 — 원본 배열은 건드리지 않음
  const sessions = [...book.sessions].sort((a, b) => b.id - a.id);
  const percent = progressOf(book);

  return (
    <Page>
      <Title>{book.title}</Title>
      <Muted>{book.author} · {STATUS_LABEL[book.status]}</Muted>

      <Card style={{ margin: '16px 0' }}>
        <Muted>진행률 {book.currentPage} / {book.totalPages}p ({percent}%)</Muted>
        <ProgressBar percent={percent} />
      </Card>

      <Row>
        <Button as={Link} to={`/books/${book.id}/read`} $variant="primary">독서 시작</Button>
        <Button $variant="danger" onClick={handleDelete}>삭제</Button>
        <Button as={Link} to="/books">목록</Button>
      </Row>

      <h2 style={{ fontSize: '1.1rem', marginTop: 24 }}>독서 세션</h2>
      {sessions.length === 0 ? (
        <Muted>아직 기록이 없습니다.</Muted>
      ) : (
        <SessionList>
          {sessions.map((s) => (
            <li key={s.id}>
              <span>{s.date}</span>
              <span>{Math.floor(s.seconds / 60)}분 · ~{s.endPage}p</span>
            </li>
          ))}
        </SessionList>
      )}
    </Page>
  );
}
