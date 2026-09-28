import client from './client';

// 카테고리
export const getCategories = async () => (await client.get('/categories')).data;

// 거래
export const getTransactions = async () => (await client.get('/transactions')).data;
export const getTransaction = async (id) => (await client.get(`/transactions/${id}`)).data;
export const createTransaction = async (data) => (await client.post('/transactions', data)).data;
export const updateTransaction = async (id, data) =>
  (await client.patch(`/transactions/${id}`, data)).data;
export const deleteTransaction = async (id) => {
  await client.delete(`/transactions/${id}`);
};

// 예산 (확장) - id는 카테고리 id와 같다
export const getBudgets = async () => (await client.get('/budgets')).data;
export const saveBudget = async (id, amount, exists) =>
  exists
    ? (await client.patch(`/budgets/${id}`, { amount })).data
    : (await client.post('/budgets', { id, amount })).data;
export const deleteBudget = async (id) => {
  await client.delete(`/budgets/${id}`);
};
