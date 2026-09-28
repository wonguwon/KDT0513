# MoneyLog - 가계부 SPA

개인의 수입 · 지출을 기록하는 가계부 SPA입니다.
데이터는 json-server(REST API)에 저장하며, API 호출 코드를 `src/api`에 모아 나중에 Spring Boot 서버로 교체할 수 있도록 설계했습니다.

## 기술 스택

React 19 · Vite · React Router · Zustand · axios · styled-components · react-hook-form + yup · react-toastify · json-server · ESLint + Prettier

## 실행 방법

.env.example을 복사해서 .env를 만들어줍니다.  

server를 먼저 실행 후 터미널 하나 더 열어서 dev를 실행해줍니다.

```bash
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:3001
npm run server         # 터미널 1 - json-server (3001)
npm run dev            # 터미널 2 - Vite 개발 서버 (5173)
```

| 스크립트         | 설명                    |
| ---------------- | ----------------------- |
| `npm run lint`   | ESLint 검사             |
| `npm run format` | Prettier로 `src` 포맷팅 |
| `npm run build`  | 프로덕션 빌드           |

## 라우팅

| 경로                | 페이지                  | 설명                                     |
| ------------------- | ----------------------- | ---------------------------------------- |
| `/`                 | `DashboardPage`         | 월 요약, 카테고리별 지출, 예산 사용률, 최근 거래 |
| `/transactions`     | `TransactionListPage`   | 월별 목록, 유형 · 카테고리 필터, 메모 검색, CSV |
| `/transactions/new` | `TransactionNewPage`    | 거래 등록                                |
| `/transactions/:id` | `TransactionDetailPage` | 상세 · 수정 · 삭제                       |
| `/budget`           | `BudgetPage`            | 카테고리별 예산 설정 (확장)              |
| `*`                 | `NotFoundPage`          | 404                                      |



## 확장 구현

| 기능 | 내용 | 이유 |
| --- | --- | --- |
| **예산 관리** `/budget` | 지출 카테고리별 월 예산을 설정(0 입력 시 해제)하고, 대시보드와 예산 페이지에 사용률 바를 표시. 초과 시 빨간색. `db.json`에 `budgets` 추가 | 기록만으로는 소비를 조절하기 어려워, 기준선을 두고 한눈에 비교하기 위해 |
| **공통 레이아웃** | `Outlet` 중첩 라우트로 NavBar + 본문 레이아웃을 공유하고, `NavLink`로 현재 메뉴 강조 | 페이지마다 반복되는 레이아웃 코드를 없애고 현재 위치를 명확히 보여주기 위해 |
| **CSV 내보내기** | 목록 페이지에서 현재 필터가 적용된 거래를 CSV로 다운로드 (엑셀 한글 깨짐 방지 BOM 포함) | 엑셀 등 외부 도구에서 추가로 분석할 수 있도록 |

## 상태 설계

| 값 | 위치 | 이유 |
| --- | --- | --- |
| 거래 · 카테고리 · 예산 데이터 | 각 페이지 `useEffect` → `useState` | 원본은 서버에 있다. 진입할 때마다 새로 받아 항상 최신 상태를 유지한다 |
| 선택 월 · 유형 필터 · 카테고리 필터 | Zustand `useFilterStore` | 대시보드 · 목록 · 예산 페이지가 함께 공유한다 |
| 검색어 · 디바운스 확정값 | 목록 페이지 `useState` | 목록 페이지에서만 쓰므로 전역에 둘 필요가 없다 |
| 폼 입력값 · 에러 | react-hook-form | 검증과 제출 상태(`isSubmitting`)를 라이브러리가 관리한다 |
| 검색창 DOM | `useRef` | 화면에 그릴 값이 아니라 포커스 대상이다 |

- 거래 목록을 Zustand에 복사하지 않은 이유: 서버와 스토어가 어긋날 수 있기 때문에 "서버가 원본, 화면은 매번 조회"로 단순하게 유지했다.
- 월별 합계 · 필터 · 검색은 전체 조회 후 `useMemo`로 클라이언트에서 계산한다.
- 모든 요청은 `src/api/transactions.js`를 거치므로, 백엔드 교체 시 `.env`와 이 파일만 수정하면 된다.

## 폴더 구조

```
src/
├── api/          # axios 인스턴스 · API 함수
├── store/        # Zustand 필터 스토어
├── components/   # 공용 컴포넌트 (NavBar, Layout, Form, ErrorBoundary ...)
├── pages/        # 라우트 페이지
├── utils/        # 날짜 · 금액 포맷, CSV
└── styles/       # 테마 · 전역 스타일
```

