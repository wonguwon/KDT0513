import styled from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, Select } from './ui';

// 입력 검증 스키마
const schema = yup.object({
  type: yup.string().oneOf(['income', 'expense']).required(),
  date: yup.string().required('날짜를 선택하세요.'),
  categoryId: yup.string().required('카테고리를 선택하세요.'),
  amount: yup
    .number()
    .transform((v, orig) => (orig === '' ? undefined : v)) // 빈 칸은 required로 처리
    .typeError('금액을 숫자로 입력하세요.')
    .integer('정수만 입력할 수 있습니다.')
    .min(1, '1원 이상 입력하세요.')
    .required('금액을 입력하세요.'),
  memo: yup.string().max(50, '메모는 50자 이내로 입력하세요.'),
});

const TYPES = [
  { value: 'expense', label: '지출' },
  { value: 'income', label: '수입' },
];

// 등록 · 수정 공용 폼
function TransactionForm({ defaultValues, categories, onSubmit, onCancel, submitLabel = '저장' }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const type = useWatch({ control, name: 'type' });
  const options = categories.filter((c) => c.type === type); // 선택 유형의 카테고리만

  // 유형 변경 시 카테고리 선택 초기화
  const typeField = register('type', {
    onChange: () => setValue('categoryId', ''),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field>
        <Label>유형</Label>
        <Segment>
          {TYPES.map((t) => (
            <SegmentItem key={t.value} $active={type === t.value} $type={t.value}>
              <input type="radio" value={t.value} {...typeField} />
              {t.label}
            </SegmentItem>
          ))}
        </Segment>
      </Field>

      <Field>
        <Label htmlFor="date">날짜</Label>
        <Input id="date" type="date" {...register('date')} />
        {errors.date && <Error>{errors.date.message}</Error>}
      </Field>

      <Field>
        <Label htmlFor="categoryId">카테고리</Label>
        <Select id="categoryId" {...register('categoryId')}>
          <option value="">선택하세요</option>
          {options.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        {errors.categoryId && <Error>{errors.categoryId.message}</Error>}
      </Field>

      <Field>
        <Label htmlFor="amount">금액</Label>
        <Input
          id="amount"
          type="number"
          inputMode="numeric"
          placeholder="0"
          {...register('amount')}
        />
        {errors.amount && <Error>{errors.amount.message}</Error>}
      </Field>

      <Field>
        <Label htmlFor="memo">메모 (선택)</Label>
        <Input id="memo" placeholder="50자 이내" {...register('memo')} />
        {errors.memo && <Error>{errors.memo.message}</Error>}
      </Field>

      <Actions>
        {onCancel && (
          <Button type="button" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button type="submit" $variant="primary" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : submitLabel}
        </Button>
      </Actions>
    </Form>
  );
}

export default TransactionForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.sub};
`;

const Error = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.expense};
`;

const Segment = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.surface};
  align-self: flex-start;
`;

const SegmentItem = styled.label`
  padding: 6px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none')};
  color: ${({ $active, $type, theme }) => ($active ? theme.color[$type] : theme.color.sub)};

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;
