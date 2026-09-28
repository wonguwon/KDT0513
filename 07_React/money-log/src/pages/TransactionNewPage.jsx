import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTransaction, getCategories } from '../api/transactions';
import TransactionForm from '../components/TransactionForm';
import StatusMessage from '../components/StatusMessage';
import { Card, PageHeader } from '../components/ui';
import { getToday } from '../utils/format';

function TransactionNewPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리 조회
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const cats = await getCategories();
        if (!ignore) setCategories(cats);
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // 저장 → 토스트 → 목록 이동
  const handleSubmit = async (data) => {
    try {
      await createTransaction(data);
      toast.success('거래를 등록했습니다.');
      navigate('/transactions');
    } catch {
      toast.error('등록에 실패했습니다.');
    }
  };

  const renderBody = () => {
    if (loading) return <StatusMessage type="loading" />;
    if (error) return <StatusMessage type="error" />;
    return (
      <TransactionForm
        defaultValues={{ type: 'expense', date: getToday(), categoryId: '', amount: '', memo: '' }}
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        submitLabel="등록"
      />
    );
  };

  return (
    <>
      <PageHeader>
        <h1>거래 등록</h1>
      </PageHeader>
      <Card>{renderBody()}</Card>
    </>
  );
}

export default TransactionNewPage;
