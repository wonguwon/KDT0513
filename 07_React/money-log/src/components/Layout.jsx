import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

// 공통 레이아웃 (중첩 라우트의 Outlet)
function Layout() {
  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default Layout;

const Main = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 32px 20px 80px;
`;
