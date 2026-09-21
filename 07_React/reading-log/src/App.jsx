import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Toast from './components/Toast';
import { initialBooks } from './data/books';
import BookDetailPage from './pages/BookDetailPage';
import BookFormPage from './pages/BookFormPage';
import BookListPage from './pages/BookListPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ReadingSessionPage from './pages/ReadingSessionPage';

const STORAGE_KEY = 'reading-log:books';

// books 상태는 App이 보유. 페이지는 props로 받은 값/콜백만 사용
function App() {
  // FR-04: 함수형 초기값 — 첫 렌더에서만 localStorage를 읽는다
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialBooks;
  });
  const [toast, setToast] = useState(null);

  // E-05: books가 바뀔 때마다 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  // E-06: 토스트 2초 후 제거. 새 토스트가 오면 cleanup이 이전 타이머 취소
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  // 같은 메시지여도 새 객체 → effect 재실행 → 2초 리셋
  const showToast = (message) => setToast({ id: Date.now(), message });

  const addBook = (book) => setBooks((prev) => [...prev, book]);

  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  // 세션 추가 + currentPage 갱신
  const addSession = (bookId, session) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              currentPage: session.endPage,
              sessions: [...b.sessions, { id: Date.now(), ...session }],
            }
          : b,
      ),
    );
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage books={books} />} />
        <Route path="/books" element={<BookListPage books={books} />} />
        <Route path="/books/new" element={<BookFormPage onAdd={addBook} showToast={showToast} />} />
        <Route
          path="/books/:id"
          element={<BookDetailPage books={books} onDelete={deleteBook} showToast={showToast} />}
        />
        <Route
          path="/books/:id/read"
          element={<ReadingSessionPage books={books} onAddSession={addSession} showToast={showToast} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {toast && <Toast message={toast.message} />}
    </>
  );
}

export default App;
