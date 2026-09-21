import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, ErrorText, Input, Muted, Page, Row, Title } from '../components/ui';
import { formatTime, todayString } from '../utils/date';

// 실행 중 / 일시정지를 색으로 구분
const Clock = styled.div`
  font-size: 4rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  text-align: center;
  padding: 24px 0;
  color: ${({ $running }) => ($running ? 'var(--success)' : 'var(--muted)')};
`;

export default function ReadingSessionPage({ books, onAddSession, showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [endPage, setEndPage] = useState('');
  const [error, setError] = useState('');

  // E-01
  useEffect(() => {
    document.title = book ? `${book.title} · 독서 중` : '책을 찾을 수 없음';
    return () => { document.title = '독서 기록장'; };
  }, [book]);

  // E-03: isRunning이 true인 동안만 interval이 산다. 일시정지·언마운트 시 clearInterval
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      console.log('tick'); // FR-15: 페이지를 떠난 뒤에도 찍히면 cleanup 실패
      setSeconds((s) => s + 1); // 함수형 업데이트 — 클로저의 옛 값을 쓰지 않는다
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  // E-04: 키보드 단축키. 등록/해제는 한 쌍
  useEffect(() => {
    const onKeyDown = (e) => {
      // 입력창 안에서의 Space는 무시, Esc는 항상 동작
      if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        setIsRunning((r) => !r);
      }
      if (e.key === 'Escape') navigate(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  // 조기 return은 모든 Hook 뒤에
  if (!book) {
    return (
      <Page>
        <Title>책을 찾을 수 없습니다</Title>
        <Link to="/books">목록으로</Link>
      </Page>
    );
  }

  // FR-14
  const handleSave = () => {
    if (seconds === 0) return setError('0초는 저장할 수 없습니다');
    const page = Number(endPage);
    if (!endPage || Number.isNaN(page) || page < 0 || page > book.totalPages) {
      return setError(`읽은 페이지는 0 ~ ${book.totalPages} 사이여야 합니다`);
    }
    setIsRunning(false);
    onAddSession(book.id, { seconds, date: todayString(), endPage: page });
    showToast('독서 기록이 저장되었습니다');
    navigate('/books/' + book.id);
  };

  return (
    <Page>
      <Title>{book.title}</Title>
      <Muted>{book.author} · 현재 {book.currentPage}p</Muted>

      <Card style={{ marginTop: 16 }}>
        <Clock $running={isRunning}>{formatTime(seconds)}</Clock>
        <Row style={{ justifyContent: 'center' }}>
          <Button $variant="primary" onClick={() => setIsRunning((r) => !r)}>
            {isRunning ? '일시정지' : '시작'}
          </Button>
          <Button onClick={() => navigate(-1)}>뒤로</Button>
        </Row>
        <Muted style={{ textAlign: 'center', fontSize: '0.8rem' }}>Space: 시작/일시정지 · Esc: 뒤로</Muted>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Muted>종료 및 저장</Muted>
        <Row>
          <Input
            type="number"
            placeholder={`읽은 페이지 (현재 ${book.currentPage}p)`}
            min="0"
            max={book.totalPages}
            value={endPage}
            onChange={(e) => setEndPage(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button $variant="primary" disabled={seconds === 0} onClick={handleSave}>저장</Button>
        </Row>
        {error && <ErrorText>{error}</ErrorText>}
      </Card>
    </Page>
  );
}
