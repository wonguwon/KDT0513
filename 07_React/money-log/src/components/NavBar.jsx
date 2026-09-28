import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

const MENUS = [
  { to: '/', label: '대시보드', end: true },
  { to: '/transactions', label: '거래 내역', end: true },
  { to: '/transactions/new', label: '거래 등록' },
  { to: '/budget', label: '예산' },
];

// 상단 네비게이션 (NavLink로 현재 메뉴 강조)
function NavBar() {
  return (
    <Header>
      <Inner>
        <Logo to="/">MoneyLog</Logo>
        <Menu>
          {MENUS.map((m) => (
            <NavItem key={m.to} to={m.to} end={m.end}>
              {m.label}
            </NavItem>
          ))}
        </Menu>
      </Inner>
    </Header>
  );
}

export default NavBar;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.maxWidth};
  min-height: 60px;
  margin: 0 auto;
  padding: 8px 20px;
`;

const Logo = styled(Link)`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const Menu = styled.nav`
  display: flex;
  gap: 4px;
`;

const NavItem = styled(NavLink)`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.sub};

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
  &.active {
    color: ${({ theme }) => theme.color.text};
    font-weight: 600;
    background: ${({ theme }) => theme.color.surface};
  }
`;
