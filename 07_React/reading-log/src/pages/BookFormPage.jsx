import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, ErrorText, Input, Page, Row, Select, Title } from '../components/ui';
import { STATUSES, STATUS_LABEL } from '../data/books';

const DRAFT_KEY = 'book-draft';
const EMPTY_FORM = { title: '', author: '', totalPages: '', status: 'wish' };

const Field = styled.label`
  display: block;
  margin-bottom: 14px;
  span { display: block; font-size: 0.875rem; margin-bottom: 4px; color: var(--muted); }
`;

export default function BookFormPage({ onAdd, showToast }) {
  const navigate = useNavigate();
  const titleRef = useRef(null);

  // FR-09: 임시저장된 draft가 있으면 복원
  const [form, setForm] = useState(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : EMPTY_FORM;
  });
  const [errors, setErrors] = useState({});

  // E-01
  useEffect(() => {
    document.title = '책 추가 · 독서 기록장';
    return () => { document.title = '독서 기록장'; };
  }, []);

  // E-07: 진입 시 제목 input 포커스
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // FR-09: 폼이 바뀔 때마다 임시저장
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = '제목을 입력하세요';
    const pages = Number(form.totalPages);
    if (!form.totalPages || Number.isNaN(pages) || pages <= 0) next.totalPages = '총 페이지는 1 이상이어야 합니다';
    return next;
  };

  // FR-08
  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const newBook = {
      id: Date.now(),
      title: form.title.trim(),
      author: form.author.trim(),
      totalPages: Number(form.totalPages),
      status: form.status,
      currentPage: 0,
      sessions: [],
    };
    onAdd(newBook);
    localStorage.removeItem(DRAFT_KEY);
    showToast('책이 추가되었습니다');
    navigate('/books/' + newBook.id);
  };

  const handleCancel = () => {
    localStorage.removeItem(DRAFT_KEY);
    navigate('/books');
  };

  return (
    <Page>
      <Title>책 추가</Title>
      <Card as="form" onSubmit={handleSubmit} noValidate>
        <Field>
          <span>제목</span>
          <Input ref={titleRef} name="title" value={form.title} onChange={handleChange} />
          {errors.title && <ErrorText>{errors.title}</ErrorText>}
        </Field>
        <Field>
          <span>저자</span>
          <Input name="author" value={form.author} onChange={handleChange} />
        </Field>
        <Field>
          <span>총 페이지</span>
          <Input type="number" name="totalPages" min="1" value={form.totalPages} onChange={handleChange} />
          {errors.totalPages && <ErrorText>{errors.totalPages}</ErrorText>}
        </Field>
        <Field>
          <span>상태</span>
          <Select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABEL[s]}</option>
            ))}
          </Select>
        </Field>
        <Row>
          <Button type="submit" $variant="primary">저장</Button>
          <Button type="button" onClick={handleCancel}>취소</Button>
        </Row>
      </Card>
    </Page>
  );
}
