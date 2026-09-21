import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, 8px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`;

const Box = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 18px;
  border-radius: 8px;
  background: #111827;
  color: #fff;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.2s ease-out;
`;

// 표시만 담당. 자동 닫힘 타이머(E-06)는 App이 관리
export default function Toast({ message }) {
  return <Box role="status">{message}</Box>;
}
