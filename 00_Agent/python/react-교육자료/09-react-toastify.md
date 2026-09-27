---
title: "[라이브러리] react-toastify"
source: "https://app.notion.com/p/503435fcbd9d83a6bd89011ef0480cfd"
---

# [라이브러리] react-toastify

> 노션 원문: https://app.notion.com/p/503435fcbd9d83a6bd89011ef0480cfd

> \t화면에서 사용되는 다양한 알림창을 제공하는 라이브러리

### dependency 추가
```bash
프로젝트경로> npm add react-toastify
```
### 사용법
- ToastContainer 컴포넌트를 어플리케이션에서 최상위 컴포넌트에서 한번만 렌더링
- 메시지를 표시할 곳에서 toast 함수 호출
```javascript
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  const notify = () => toast('Wow so easy !');

  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  );
}
```
[이미지: 원문 노션 페이지 참고]
**Custom ⇒ 다양하므로 공식 사이트를 통해 확인 가능**
- 위치 지정 : `toast(표시할 메시지, { position: 위치 })`
\t```javascript
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  const topRight = () => {
    toast('Hey 👋!', {
      position: 'top-right',
    });
  };
  const topLeft = () => {
    toast('Hey 👋!', {
      position: 'top-left',
    });
  };
  const topCenter = () => {
    toast('Hey 👋!', {
      position: 'top-center',
    });
  };

  const botRight = () => {
    toast('Hey 👋!', {
      position: 'bottom-right',
    });
  };
  const botLeft = () => {
    toast('Hey 👋!', {
      position: 'bottom-left',
    });
  };
  const botCenter = () => {
    toast('Hey 👋!', {
      position: 'bottom-center',
    });
  };

  return (
    <div className="grid h-dvh bg-zinc-900/15 grid-cols-2 place-items-center">
      <button onClick={topRight}>Top Right</button>
      <button onClick={topLeft}>Top Left</button>
      <button onClick={topCenter}>Top Center</button>
      <button onClick={botRight}>Bottom Right</button>
      <button onClick={botLeft}>Bottom Left</button>
      <button onClick={botCenter}>Bottom Center</button>
      <ToastContainer />
    </div>
  );
}
\t```
\t[이미지: 원문 노션 페이지 참고]
- 메시지창 종류 : `toast.종류(…);`
\t```javascript
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  const successToast = () => {
    toast.success('Success 👋!');
  };
  const errorToast = () => {
    toast.error('Error 👋!');
  };
  const infoToast = () => {
    toast.info('Info 👋!');
  };

  const darkToast = () => {
    toast.dark('Dark 👋!');
  };
  const warnToast = () => {
    toast.warn('Warning 👋!');
  };

  return (
    <div className="grid h-dvh bg-zinc-900/15 grid-cols-2 place-items-center">
      <button onClick={successToast}>Success</button>
      <button onClick={errorToast}>Error</button>
      <button onClick={infoToast}>Info</button>
      <button onClick={darkToast}>Dark</button>
      <button onClick={warnToast}>Warning</button>
      <ToastContainer />
    </div>
  );
}
\t```
\t[이미지: 원문 노션 페이지 참고]
### Ref.
[npm: react-toastify](https://www.npmjs.com/package/react-toastify)
[React-toastify \\| React-Toastify](https://fkhadra.github.io/react-toastify/introduction/)

