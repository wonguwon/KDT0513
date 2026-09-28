import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import TransactionListPage from './pages/TransactionListPage';
import TransactionNewPage from './pages/TransactionNewPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import BudgetPage from './pages/BudgetPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          {/* 공통 레이아웃 (NavBar + Outlet) */}
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionListPage />} />
            <Route path="/transactions/new" element={<TransactionNewPage />} />
            <Route path="/transactions/:id" element={<TransactionDetailPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar theme="light" />
    </>
  );
}

export default App;
