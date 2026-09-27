---
title: "React Router DOM"
source: "https://app.notion.com/p/3da435fcbd9d8304953701fa0ff2e1ff"
---

# React Router DOM

> 노션 원문: https://app.notion.com/p/3da435fcbd9d8304953701fa0ff2e1ff

> \t❓ SPA(Single Page Application) 방식인 리액트에서  페이지 이동을 구현하는 대표적인 라이브러리

## 특징
### 1. 브라우저 URL에 따라 컴포넌트를 다르게 보여줌 
### 2. 새로고침 없이 부드러운 화면 전환 (UX 향상)
### 3. URL 파라미터, 쿼리스트링으로 동적 데이터 처리 가능
## 라이브러리 설치
```javascript
> yarn add react-router-dom
또는
> npm install react-router-dom
> npm add react-router-dom
```
## 라우터 기본 구조
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} />                 {/* 메인 페이지 */}
       <Route path="/notices" element={<NoticeList />} />    {/* NoticeList  페이지 */}
       <Route path="/notice/:no" element={<NoticeDetail />} />{/* NoticeDetail 페이지 */}
       <Route path="*" element={<NotFound />} />             {/* 404 */}
      </Routes>
    </BrowserRouter>
  );
}
```
### 주요 컴포넌트
- **`BrowserRouter`**
\t앱 전체를 라우터로 감싸주는 부모 컴포넌트 (필수)
- **`Routes`**
\t여러 개의 Route를 묶어주는 컴포넌트
- **`Route`**
\t특정 경로(path)에 어떤 컴포넌트(element)를 보여줄지 설정
- **`Link`**
\t페이지 이동을 위한 앵커태그(새로고침 없이 이동)
- **`useNavigate`**
\t자바스크립트 코드에서 페이지 이동(함수로 이동). 이벤트 발생 시 페이지 이동이 필요한 경우  주로 사용
- **`useParams`**
\tURL 경로에 포함된 파라미터(매개변수)에 접근 ex) /notice/3
- `useSearchParams`
\tURL 의 쿼리 스트링에 접근 및 조작
\t### Link 컴포넌트로 페이지 이동
```javascript
import { Link } from "react-router-dom";

<Link to="/">홈으로</Link>
<Link to="/notices">공지사항</Link>
<Link to={`/notice/${no}`}>{no} 게시글로 이동</Link>
```
### useNavigate로 코드에서 이동
```javascript
import { useNavigate } from "react-router-dom";

function MyButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/notices")}>공지사항으로 이동</button>
  );
}
```
### useParams로 URL 파라미터 사용
```javascript
import { useParams } from "react-router-dom";

function NoticeDetail() {
  const { no } = useParams();
  return <p>게시글 번호 : {no}</p>;
}
```
---
### 404 NotFound 페이지 처리
```javascript
<Route path="*" element={<NotFound />} />
```
- 등록되지 않은 모든 경로에 매칭
---
[React Router Official Documentation](https://reactrouter.com/)

