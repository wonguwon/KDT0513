import styled from 'styled-components';

// 여러 페이지에서 공용으로 쓰는 styled 조각

export const Page = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 80px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0 0 16px;
`;

export const Card = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
`;

export const Muted = styled.p`
  color: var(--muted);
  margin: 4px 0;
`;

export const Button = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: ${({ $variant }) =>
    $variant === 'primary' ? 'var(--primary)'
    : $variant === 'danger' ? 'var(--danger)'
    : 'var(--card)'};
  color: ${({ $variant }) => ($variant ? '#fff' : 'var(--text)')};

  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card);
`;

export const ErrorText = styled.p`
  color: var(--danger);
  font-size: 0.875rem;
  margin: 4px 0 0;
`;

// 진행률 바 — $percent로 너비 결정
const Track = styled.div`
  height: 10px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
`;
const Fill = styled.div`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: var(--primary);
  transition: width 0.3s;
`;

export function ProgressBar({ percent }) {
  return (
    <Track>
      <Fill $percent={percent} />
    </Track>
  );
}

