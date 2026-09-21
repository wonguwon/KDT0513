import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Muted, Page, Title } from '../components/ui';

// FR-16
export default function NotFoundPage() {
  // E-01
  useEffect(() => {
    document.title = '페이지를 찾을 수 없음 · 독서 기록장';
    return () => { document.title = '독서 기록장'; };
  }, []);

  return (
    <Page>
      <Title>404</Title>
      <Muted>존재하지 않는 페이지입니다.</Muted>
      <Link to="/">홈으로</Link>
    </Page>
  );
}
