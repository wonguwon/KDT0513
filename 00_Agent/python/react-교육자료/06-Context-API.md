---
title: "Context API"
source: "https://app.notion.com/p/43d435fcbd9d83b69360812da5f6f0c5"
---

# Context API

> 노션 원문: https://app.notion.com/p/43d435fcbd9d83b69360812da5f6f0c5

> \tReact 컴포넌트 트리 전체에서 데이터를 공유할 수 있는 방법을 제공하는 API

## 특징
- 여러 단계로 중첩된 컴포넌트 구조에서도 데이터를 쉽게 전달
- props drilling 문제 해결
\t- props drilling : 중간 컴포넌트를 거쳐서 props를 계속 전달해야 하는 문제
- `Context Provider` 로 감싼 컴포넌트 트리 내부에서만 사용 가능
- 전역 설정이 필요한 상태 관리에 유용
\t- 로그인 정보, 테마, 다국어 설정 등
## 사용법
### 1. Context 생성 : `createContext()` 를 사용하여 Context를 생성
```javascript
const MyContext = createContext();
```
### 2. Provider 로 값 전달 : 최상위에서 Provider로 감싸서 값을 전달
```javascript
<MyContext.Provider value={/* 전달할 값 */}>
\t<App />
</MyContext.Provider>
```
### 3. useContext 로 값 사용 : 하위 컴포넌트에서 `useContext` 를 호출하여 값을 사용
```javascript
const value = useContext(MyContext);
```
## 참고 - 예제 코드
`ThemeContext.jsx`
```javascript
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };  

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

```
`App.js`
```javascript
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { useContext } from 'react';

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme === 'dark' ? '#333' : '#eee',
    color: theme === 'dark' ? '#eee' : '#333',
    padding: '2rem',
    textAlign: 'center'
  };

  return (
    <div style={style}>
      <h1>{theme.toUpperCase()} THEME</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
export default App;

```
## 주의할 점
> Context는 전역 상태를 관리하는 강력한 도구지만, <br>무분별한 사용은 오히려 성능 저하를 불러올 수 있음<br>자주 변경되지 않는 전역 데이터(예: 로그인 정보, 테마 설정 등)에만 사용하는 것이 바람직함.

