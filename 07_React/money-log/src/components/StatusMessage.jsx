import styled from 'styled-components';

// 로딩 · 에러 · 빈 상태 공용 메시지
function StatusMessage({ type = 'empty', message, children }) {
  const defaults = {
    loading: '불러오는 중...',
    error: '데이터를 불러오지 못했습니다. 서버 상태를 확인해 주세요.',
    empty: '데이터가 없습니다.',
  };

  return (
    <Box $type={type} role={type === 'error' ? 'alert' : 'status'}>
      <p>{message ?? defaults[type]}</p>
      {children}
    </Box>
  );
}

export default StatusMessage;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 20px;
  text-align: center;
  font-size: 14px;
  color: ${({ $type, theme }) => ($type === 'error' ? theme.color.expense : theme.color.sub)};
`;
