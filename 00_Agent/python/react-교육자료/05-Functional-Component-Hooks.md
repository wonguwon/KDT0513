---
title: "Functional Component : Hooks"
source: "https://app.notion.com/p/ee3435fcbd9d835fb59681cf7df9d79f"
---

# Functional Component : Hooks

> 노션 원문: https://app.notion.com/p/ee3435fcbd9d835fb59681cf7df9d79f

### Hooks?
리액트는 **가상 DOM**을 사용하여 **상태가 변경될 때마다 컴포넌트가 다시 렌더링**되도록 한다.
이때, 컴포넌트가 렌더링될 때마다 상태를 유지하고 업데이트할 수 있는 메커니즘을 다양한 훅들을 사용하여 제공한다.
상태(state), 생명주기(lifecycle), 참조(ref), 효과(effect) 등 여러 가지 리액트의 기능을 사용할 수 있다.
공통적으로 이름 앞에 `use` 라는 접두어가 붙는다.
### 주의 사항 (규칙)
1. **함수형 컴포넌트와 커스텀 훅 내에서만 사용 가능**
\t- 잘못된 위치에서 사용 시 `Invalid hook call` 오류가 발생됨!
```javascript
import { useState } from 'react';

// Error: Invalid hook call. Hooks can only be called inside of the body of a function compoent.
const state = useState(); // 잘못된 사용

const Sample = () => {
\treturn <h2>Hook Test</h2>;
};

export default Sample;
```
1. **조건문/반복문 내에서 호출될 수 없음**
\t- 훅은 컴포넌트 렌더링 중 조건문 내에서 호출할 수 없음
\t- 항상 같은 순서로 호출되어야 하므로 조건문이나 반복문에서 호출할 수 없음
```javascript
import { useState } from 'react';

const Sample2 = () => {
  if (true) {
    // Error: React Hook "useState" is called conditionally.
    const state = useState();  // 조건문 내에서 훅 호출 x
  }
  
  return <h2>Hook Test2</h2>;
}

export default Sample2;
```
---
### useState : 상태 관리
가장 기본적인 훅으로 함수형 컴포넌트에서 상태 관리를 도와주는 훅
```javascript
const [state, setState] = useState(initialValue);
/*
  * state : 현재 상태 값
  * setState : 상태 변경 함수
  * initialValue : 상태 초기값. 컴포넌트가 처음 렌더링될 때 적용됨.
*/
```
- 상태 변수와 상태를 변경하는 함수를 배열로 반환
- 상태가 변경되면 컴포넌트는 리렌더링되며 업데이트된 상태 값이 반영된 UI를 다시 렌더링함
- 불변성 유지 : 리액트는 가상 DOM을 이용하여 상태가 변경될 때마다 UI를 업데이트함. 상태가 불변성을 유지하면 **이전 상태와 새로운 상태를 비교하여 리렌더링이 필요한지 여부를 쉽게 결정**할 수 있음. 따라서, 리액트에서는 불변성을 중요하게 생각함.
### useEffect : 사이드 이펙트 처리
리액트에서 컴포넌트가 렌더링된 이후 실행할 작업(⇒사이드 이펙트)을 처리할 때 사용
비동기 API 호출, 이벤트 등록/해제, 타이머 설정, DOM 접근의 작업은 화면에 바로 나타나는 UI 변경 외의 부가적인 작업으로 useEffect 내부에서 처리해야 함
```javascript
useEffect(()=> {
  // Mounting, Updating 시 실행할 작업 (effect)
  return () => {
    // UnMouting 시 실행할 작업
  }
}, [dependency]);
```
- 컴포넌트가 Mounting(최초 렌더링)되거나, Updating(의존성 값 변경)될 때 실행됨
- 의존성 배열(`[]`)을 통해 언제 실행할 지 조건을 지정할 수 있음
- 리턴되는 함수는 컴포넌트 UnMounting 시 또는 다음 effect 실행 직전에 실행됨
- ⚠️ 의존성 배열을 생략할 경우 불필요한 재실행이 발생되어 성능 문제를 유발할 수 있음!
### useRef : 참조 관리
리액트에서 **DOM 요소**나 **값을 참조하고 렌더링 사이에 값을 유지**할 수 있게 해주는 훅
함수형 컴포넌트에서 DOM 요소나 **특정 값을 변경 없이 유지하고자 할 때** 사용
상태와 다르게 컴포넌트가 리렌더링될 때 다시 초기화하지 않고 유지할 수 있음
⇒ 컴포넌트 내부에서 렌더링에 영향을 미치지 않아야 하는 변수 생성 시 사용
```javascript
const sampleRef = useRef(initialValue);
/*
  * sampleRef : ref 객체 -> 컴포넌트 내부 변수
  * initialValue : ref의 초기값 (생략 시 기본값 : null)
*/
```
- DOM 요소를 참조하거나 렌더링 간에 값을 유지할 수 있는 ref 객체를 반환함
- `sampleRef.current` : ref 객체의 현재 값
- `useRef`로 저장한 값은 컴포넌트가 레런더링되어도 유지되며, 리렌더링을 트리거하지 않음
`useRef` vs `useState`
- 리렌더링 트리거
\t- `useState` : 상태 값이 변경되면 컴포넌트를 리렌더링함
\t- `useRef` : ref 값이 변경되더라도 리렌더링을 트리거하지 않음. 상태 변경 없이 값만 유지할 때 사용
- 값의 용도
\t- `useState` : UI에 영향을 미치는 값 관리
\t- `useRef` : UI에 영향을 미치지 않는 값 관리 또는 DOM 요소를 직접 참조 
### useContext : 전역으로 데이터 공유
리액트의 컨텍스트(Context) 시스템에서 데이터를 꺼내 쓰기 위한 훅
props를 여러 단계에 걸쳐 전달하는 대신 원하는 컴포넌트에서 바로 데이터를 사용할 수 있게 도와줌
```javascript
// 1. Context 생성
const SampleContext = createContext();

// 2. Context Provider로 데이터 공유
<SampleContext.Provider value={공유할데이터}>
  {/* 하위 컴포넌트들은 모두 useContext로 데이터 접근 가능 */}
</SampleContext.Provider>

// 3. 하위 컴포넌트에서 데이터 사용
const value = useContext(SampleContext);
/*
  * SampleContext : createContext() 로 생성한 컨텍스트 객체
  * value : Provider 로부터 전달된 value
*/
```
- props drilling 제거 : 상위 컴포넌트에서 하위 컴포넌트로 계속적으로 props를 전달하지 않아도 됨
- 데이터 접근 단순화 : 원하는 컴포넌트에서 바로 데이터 접근 가능
- 글로벌 설정 관리 용이 : 로그인 정보, 테마, 다국어 설정, 사용자 설정 등 전역 상태 관리 유용
- ⚠️ Context 의 value가 변경되면 해당 Context 를 사용 중인 모든 하위 컴포넌트가 자동으로 리렌더링됨 ⇒ 자주 바뀌지 않는 전역적인 값(테마, 사용자 정보 등)에 사용하는 것이 좋음
### useMemo : 계산 결과 캐싱
리액트에서 계산 비용이 큰 작업의 결과를 캐싱하여 불필요한 재계산을 막고 성능을 최적화하는 훅
- 무거운 연산을 렌더링마다 반복하지 않고자 할 때
- 동일한 값을 계산 계산할 필요 없이 의존성 값이 바뀔 때만 다시 계산하고자 할 때
- 컴포넌트가 불필요하게 다시 렌더링되면서 계산이 반복될 때
```javascript
const memoizedValue = useMemo(()=>{
  // 복잡한 계산
  return result;
}, [dependency]);
```
- `dependency` 가 변경되었을 때만 계산을 다시 수행
- 그렇지 않은 경우 이전 결과 `memoizedValue` 를 그대로 재사용
- ⚠️ 의존성 배열이 비어있을 경우 초기 마운트 시 한번만 계산
- ⚠️ 의존성 배열을 정확히 관리하지 않으면 버그가 발생할 수 있음
### useCallback : 함수 캐싱
함수를 메모이제이션하여 컴포넌트가 리렌더링될 때 동일한 함수 객체를 재사용할 수 있도록 해주는 훅 ⇒ 컴포넌트가 다시 렌더링되더라도 의존성 배열에 변화가 없다면 함수를 새로 만들지 않고 기존 함수를 재사용함.
- 자식 컴포넌트에 콜백 함수를 props로 전달할 때
- 컴포넌트가 불필요하게 리렌더링되는 것을 방지하고자 할 때
- 이벤트 핸들러나 콜백 함수가 불필요하게 매번 새로 만들어지는 것을 막고자 할 때
```javascript
const memoizedFunction = useCallback(()=>{
  // 실행할 내용
}, [dependency]);
```
- `dependency` 가 변경되었을 때만 새로운 함수를 생성
- 그렇지 않으면 이전에 만든 함수를 재사용
- ⚠️ 모든 함수에 사용하는 것은 비효율적임
- ⚠️ 리렌더링이 자주 일어나지 않거나 전달되는 함수가 단순한 경우에는 그냥 함수를 선언하는 것이 더 나음
### Custom Hook : 나만의 훅 만들기
리액트의 기본 훅 (useState, useEffect 등)을 조합하여 재사용 가능한 로직을 추출한 함수
컴포넌트 간에 반복되는 로직(ex. 입력 상태 관리, API 호출, 이벤트 등록 등)을 커스텀 훅으로 분리하면 코드를 더 깔끔하고 유지보수하기 쉽게 만들 수 있음
```javascript
// 커스텀 훅 정의
import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  
  const onChange = (e) => {
    setValue(e.target.value);
  }
  
  return { value, onChange };
}

export default useInput;
```
```javascript
// 커스텀 훅 사용
const myHook = useInput("");

<input value={myHook.value} onChange={myHook.onChange} />
```
- 이름은 반드시 `use` 로 시작해야 함 ⇒ 리액트에서 훅으로 인식함
- 컴포넌트가 아닌 일반 함수지만 내부에서 `useState`, `useEffect` 등의 훅을 사용할 수 있음
- 상태와 로직을 캡슐화하고 재사용 가능
- ⚠️ 훅의 규칙을 그대로 따라야 함
- ⚠️ 상태가 공유되지 않음 ⇒ 로직을 공유하는 것으로 내부 상태는 각각 독립적임
- ⚠️ 단순하거나 짧은 로직을 모두 커스텀 훅으로 만들면 코드가 분리되어 오히려 가독성 저하됨
---
**Ref.**
[Built-in React Hooks – React](https://react.dev/reference/react/hooks)
[Rules of Hooks – React](https://react.dev/warnings/invalid-hook-call-warning)

