// currentPage / totalPages → 0~100 정수
export function progressOf(book) {
  if (!book.totalPages) return 0;
  return Math.min(100, Math.round((book.currentPage / book.totalPages) * 100));
}
