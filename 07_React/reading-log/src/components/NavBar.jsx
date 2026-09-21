import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Bar = styled.nav`
  background: var(--card);
  border-bottom: 1px solid var(--border);
`;

const Inner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Brand = styled.span`
  font-weight: 700;
  margin-right: auto;
`;

// NavLink는 Link + 현재 경로일 때 .active 클래스
const Item = styled(NavLink)`
  color: var(--muted);
  &.active { color: var(--primary); font-weight: 600; }
`;

export default function NavBar() {
  return (
    <Bar>
      <Inner>
        <Brand>독서 기록장</Brand>
        <Item to="/" end>홈</Item>
        <Item to="/books" end>책 목록</Item>
        <Item to="/books/new">책 추가</Item>
      </Inner>
    </Bar>
  );
}
