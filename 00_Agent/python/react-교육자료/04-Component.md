---
title: "Component"
source: "https://app.notion.com/p/5e4435fcbd9d8297a9ec81b89f8d1c70"
---

# Component

> 노션 원문: https://app.notion.com/p/5e4435fcbd9d8297a9ec81b89f8d1c70

> \t리액트 컴포넌트는 생성(Mounting), 업데이트(updating), 제거(Unmounting의
\t세 가지 주요 단계로 구성된 생명주기를 가지고 있다.

[이미지: 원문 노션 페이지 참고]](https://prod-files-secure.s3.us-west-2.amazonaws.com/b57435fc-bd9d-8113-8fa8-00031ce9b39d/5846e5e3-e3ce-40d1-9ace-52781000176d/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7FG4MC6%2F20260922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260922T083715Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGoPHC6GZDu98ztgVV%2F2bthLFRGXeB7cz8YKtOUIWa8iAiAppCfopb5lm24Ab6i67nVmW37UdeTIgdiLvzaYdDLOoCqIBAih%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMDSiEwAm1eTj9xSI6KtwD9uuYTWOQipQ2wPljiOjB4eHdesmsKWhPlx%2FS5JPPYeCqiO9ZOLPaQdo2yMUJ1rZZMabocbFTmIbXkBFcT%2FipCs5nSxE0US7Gi5ox9EyeLuyWnKnytN%2BdD7UrZ4zeeasA2MXyWBcFGEdEJUuJbnshXHTI8Mx9S0bTpKyxKgUqMygbvkux1Ac2isGDIruZzbzLQQDYc%2Fk1tHEpv6w6L63sABRd%2FpOEc6tzAY%2BltYjJuNnKSfK%2F7z3KLnQ11Qsl%2F9WFKJtONldrSgvuEeHluyazdd0sYa%2B402cz2hqicYdq3kjFUDGoZzHJ6uQ9K%2B%2Besn7JYmRUWMePSK2amppjuNN2ZSaiUqu9INeY4Erb0Eg0czA6yyvAoRyb5UlOA5rvo4K9VDojO8Gnuf6BFuUEhM3u4im6k7wuFIY1JjR9hyuPP52dWAwdUwNDMotkIFSPoYV6kwnTouJBqLyR973gUyczgfb2kpjj3lXj9j8Br8Fozqhb%2BiN7IhNQQSySG%2FpsBzh9Yh91RHIJyP4rMysEKaXDO50K1qzQqLPDaNf9lzcy9ruVSX4AUhvE5RJeX49pEfTOxU0K0fvsJR3FTGpCU84%2FYVbhBsRpylxFnX40VrDz75VP3YFaE3vX7a5SnPYwt%2BXI1QY6pgES%2BZTQpml3uRmQGGa1FJUQyViCli8LNfhatRKjR4sWUjdICY%2FH2mnlZgqJ6TcrjreSdesokXYGwEvYR2H4B2sfaAgo31YRbxE%2F0gA1KJNVTBuRDWsjF71PRDquWy36czItevHn%2B5UVMy8lqn5Fe4xeBqT56t5B06KaAwqzYMI%2FpUQ%2BsKwB64mtYPpPx%2BkFkCXSX7lqV3UvyMsR%2BR1OL8Tys1DW%2FEPs&X-Amz-Signature=8e8f931e0b59cd932ebe6c7d312e9a88b895ce840e52fec2e338ad8a1d782cb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
## 🔄 생성 (Mounting)
컴포넌트가 처음 렌더링 될 때 실행되는 과정
### 처리 내용
- 상태 초기화, 초기 렌더링, API 호출 등 초기 작업 수행
### 관련 메소드
클래스형 컴포넌트
- contructor
- render
- componentDidMount
함수형 컴포넌트
- useEffect
---
## 🔄 업데이트 (Updating)
컴포넌트가 상태(state)나 속성(props) 변경으로 다시 렌더링 되는 과정
### 처리 내용
- 상태(state)나 속성(props) 변경에 따라 다시 렌더링하거나 로직 실행
### 관련 메소드
클래스형 컴포넌트
- shouldComponentUpdate
- render
- componentDidUpdate
함수형 컴포넌트
- useEffect
---
## 🔄 제거 (Unmounting)
컴포넌트게 제거될 때 실행되는 과정
### 처리 내용
- 타이머 클리어, 이벤트 리스너 제거, 구독 취소 등 정리 작업 수행
### 관련 메소드
클래스형 컴포넌트
- componentWillUnmount
함수형 컴포넌트
- useEffect 내 cleanup 함수
---
## 참고 - 예제 코드
**함수형 컴포넌트**
```javascript
import { useEffect, useState } from "react"

export default function FunctionalComponent () {
    const [now, setNow] = useState(null);
    
    useEffect(()=>{
        console.log("함수형 컴포넌트 생성, 매번 업데이트 시 (Mounting, Updating)");
    });

    useEffect(()=>{
        console.log("함수형 컴포넌트 생성 시 (Mounting)");

        const timer = setInterval(()=>{
            setNow(new Date());
        }, 1*1000);

        return()=>{
            console.log("함수형 컴포넌트 소멸 시 (Unmounting)");
            clearInterval(timer);
        }
    }, []);
    // => dependency를 []로 설정한 경우 한번만 실행

    useEffect(()=>{
        console.log("함수형 컴포넌트 생성 (Mounting) 및 특정 상태 변경에 따라 업데이트 시 (Updating)");
    }, [now]);
    // => dependency를 지정한 경우 해당 상태가 변경될 때마다 실행

    return (
        <div className="App">
            {now && now.toLocaleTimeString()}
        </div>
    )
}
```
클래스형 컴포넌트
```javascript
import { Component } from "react";

export class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { now: null }

        this.timer = null;
    }

    componentDidMount() {
        console.log("클래스 컴포넌트 생성 시 (Mounting)");

        this.timer = setInterval(() => {
            this.setState({now: new Date()})
        }, 1*1000);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("클래스 컴포넌트 업데이트 시 (Updating)");
    }

    componentWillUnmount() {
        console.log("클래스 컴포넌트 소멸 시 (Unmounting)");

        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="App">
                {this.state.now && this.state.now.toLocaleTimeString()}
            </div>
        );
    }
}
```
**App.js**
```javascript
import { useState } from 'react';
import './App.css';
import FunctionalComponent from './components/FunctionalComponent';
import { ClassComponent } from './components/ClassComponent';

function App() {
  const [type, setType] = useState('');
  return (
    <div className="App">
      <button onClick={(e)=>{setType('class')}}>클래스형</button>
      <button onClick={(e)=>{setType('func')}}>함수형</button>

      { type === 'class' && <ClassComponent /> }
      { type === 'func' && <FunctionalComponent /> }      
    </div>
  );
}

export default App;

```

