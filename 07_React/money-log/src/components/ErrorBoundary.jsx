import { Component } from 'react';
import styled from 'styled-components';
import { Button } from './ui';

// 렌더링 에러를 잡아 대체 화면을 보여준다 (클래스 컴포넌트)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('렌더링 에러:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fallback>
          <p>문제가 발생했습니다.</p>
          <Button $variant="primary" onClick={() => window.location.reload()}>
            새로고침
          </Button>
        </Fallback>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 120px 20px;
  font-size: 16px;
`;
