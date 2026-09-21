# 독서 기록장 (reading-log)

React Router + useEffect cleanup 연습 과제.

```bash
npm install
npm run dev
```

| 경로 | 페이지 | effect |
|---|---|---|
| `/` | HomePage | E-01 |
| `/books` | BookListPage | E-01, E-02(디바운스) |
| `/books/new` | BookFormPage | E-01, E-07(포커스), 임시저장 |
| `/books/:id` | BookDetailPage | E-01 |
| `/books/:id/read` | ReadingSessionPage | E-01, E-03(interval), E-04(keydown) |
| `*` | NotFoundPage | E-01 |

`App`이 E-05(localStorage), E-06(토스트 자동 닫힘)과 `books` 상태를 담당한다.
