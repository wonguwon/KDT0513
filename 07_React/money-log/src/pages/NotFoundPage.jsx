import styled from 'styled-components';
import { ButtonLink } from '../components/ui';

// 404
function NotFoundPage() {
  return (
    <Wrap>
      <Code>404</Code>
      <p>페이지를 찾을 수 없습니다.</p>
      <ButtonLink to="/" $variant="primary">
        대시보드로
      </ButtonLink>
    </Wrap>
  );
}

export default NotFoundPage;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 96px 0;
  color: ${({ theme }) => theme.color.sub};
`;

const Code = styled.h1`
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.color.text};
`;
