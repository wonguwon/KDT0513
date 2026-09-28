import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// 공통 UI 조각 모음

const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.color.surface};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant, theme }) =>
    $variant === 'primary' &&
    css`
      background: ${theme.color.primary};
      border-color: ${theme.color.primary};
      color: #fff;
      &:hover:not(:disabled) {
        background: #333;
      }
    `}

  ${({ $variant, theme }) =>
    $variant === 'danger' &&
    css`
      color: ${theme.color.expense};
    `}
`;

export const Button = styled.button`
  ${buttonStyle}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyle}
`;

export const Card = styled.section`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius};
  background: #fff;
`;

export const CardTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 600;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  h1 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
`;

// 수입/지출 색상 금액
export const Amount = styled.span`
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ $type, theme }) =>
    $type === 'income'
      ? theme.color.income
      : $type === 'expense'
        ? theme.color.expense
        : theme.color.text};
`;

const inputStyle = css`
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 10px;
  background: #fff;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.color.text};
  }
`;

export const Input = styled.input`
  ${inputStyle}
`;

export const Select = styled.select`
  ${inputStyle}
`;
