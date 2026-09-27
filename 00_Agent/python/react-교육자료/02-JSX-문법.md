---
title: "JSX 문법"
source: "https://app.notion.com/p/09e435fcbd9d83759aaf81e3a317b8aa"
---

# JSX 문법

> 노션 원문: https://app.notion.com/p/09e435fcbd9d83759aaf81e3a317b8aa

## JSX ? 
*자바스크립트 파일 내에 HTML과 유사한 마크업을 작성할 수 있도록 하는 확장 구문*
> \t💡 JSX와 React는 별개의 개념입니다. 
\t     함께 사용되는 경우가 많지만, 서로 독립적으로 사용할 수도 있습니다.

## 규칙 (JSX 문법)
### 📌 1. 하나의 루트 요소만 반환
구성 요소에서 여러 요소를 포함하고자 할 경우 단일 부모 태그로 요소를 감싸줍니다.
```html
<div>
\t<h1> JSX 문법 </h1>
\t<p> 부모 요소는 하나가 되도록하여 반환할 것! </p>
</div>
```
부모 요소에 별다른 속성 없이 단순히 감싸는 용도로 사용된다면 빈 태그도 사용 가능합니다.
```html
<>
\t<h1> JSX 문법 </h1>
\t<p> 부모 요소는 하나가 되도록하여 반환할 것! </p>
</>
```
빈 태그 사용 시 HTML 트리에는 아무런 흔적도 남기지 않습니다.
> \t❓ JSX는 HTML 처럼 보이지만 실제로는 일반 자바스크립트 객체로 변환됩니다. 
\t     함수에서 두 객체를 반환하려면 배열로 감싸야 하는데 이는 JSX 태그를 다른 태그나 프래그먼트(빈 태그)로 감싸지 않고는 반환할 수 없기 때문입니다.

### 📌 2. 모든 태그는 잘 닫아야 함
JSX 에서는 태그를 명시적으로 닫아야 합니다. 
```html
<img>   // x
<img /> // o

<li>아이템      // x
<li>아이템</li> // o
```
### 📌 3. 대부분 명칭은 카멜케이스(camelCase)를 사용
JSX가 자바스크립트로 변환될 때, JSX의 속성들은 자바스크립트의 객체의 키 값이 됩니다. 이러한 속성은 변수로 읽어 사용하게 되는데, 자바스크립트에서는 변수 이름에 제약이 있습니다.
따라서 카멜케이스 표기법으로 작성되어야 합니다. 
- class 속성의 경우 예약어로 사용되어 className 을 사용합니다.
참고: [DOM 컴포넌트 속성 목록](https://react.dev/reference/react-dom/components/common)
### 📌 4. 자바스크립트 코드를 작성하고자 할 경우 중괄호(\\{\\})를 사용
특정 로직을 추가하거나 동적인 처리를 하고자 할 때 중괄호를 사용합니다.
HTML에서 작성한 방법인 따옴표(””)를 사용하게 되면 문자열로 전달됩니다. 따라서 변수 또는 논리적인 로직을 적용하고자 할 경우 중괄호를 사용합니다.
### 📌 5. 조건부 렌더링
**\\[1\\] if 문 사용 → 반환 자체를 분리**
```javascript
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default PackingList() {
  return (
\t  <section>
\t    <h1>Packing List</h1>
\t    <ul>
\t\t    <Item isPacked={true} name="세면도구" />
\t\t    <Item isPacked={false} name="간식" />
\t\t    <Item isPacked={true} name="비상약" />
\t    </ul>
\t  </section>
  );
}
```
**\\[2\\] 삼항 연산자 사용**
```javascript
function Item({ name, isPacked }) {
  return (
    <li className="item">
\t\t  { isPacked ? name + '✔' : name }
\t  </li>
  );
}

export default PackingList() {
  return (
\t  <section>
\t    <h1>Packing List</h1>
\t    <ul>
\t\t    <Item isPacked={true} name="세면도구" />
\t\t    <Item isPacked={false} name="간식" />
\t\t    <Item isPacked={true} name="비상약" />
\t    </ul>
\t  </section>
  );
}
```
**\\[3\\] 논리 연산자 사용 (&&)**
```javascript
function Item({ name, isPacked }) {
  return (
    <li className="item">
\t\t  name { isPacked && '✔' }
\t  </li>
  );
}

export default PackingList() {
  return (
\t  <section>
\t    <h1>Packing List</h1>
\t    <ul>
\t\t    <Item isPacked={true} name="세면도구" />
\t\t    <Item isPacked={false} name="간식" />
\t\t    <Item isPacked={true} name="비상약" />
\t    </ul>
\t  </section>
  );
}
```
### 📌 6. 렌더링 목록 (반복 처리)
컬렉션(목록)을 사용하여 여러 개의 유사한 컴포넌트를 렌더링하고자 할 때, 자바스크립트의 배열 메소드를 사용하여 조작합니다.
**\\[1\\] map() : 배열의 구성 요소를 렌더링**
```javascript
const people = [
  '하이유: 보컬리스트',
  '마둥석: 배우',
  '얌세찬: 개그맨',
  '무재석: 탤런트',
  '마리나: 아이돌'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```
- filter() : 특정 구성 요소만 렌더링
```javascript
const people = [
  {name:'하이유', job: '보컬리스트', age: 20},
  {name:'마둥석', job: '배우', age: 45},
  {name:'얌세찬', job: '개그맨', age: 33},
  {name:'무재석', job: '탤런트', age: 55},
  {name:'마리나', job: '아이돌', age: 25}
];

export default function List() {
  const youngItems = people.filter(person =>
\t\tperson.age < 30
  );
  
  const listItems = youngItems.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```
> \t💡 화살표 함수는 암시적으로 사용 시 바로 뒤에 표현식을 반환하므로 return 명령문을 생략합니다. 여러 줄을 포함하는 블록 본문인 경우 중괄호를 사용하여 return 명령문을 반드시 작성해야 합니다.

> \t💡 배열 항목이 이동, 삽입, 삭제 시 key 속성이 중요한 역할을 합니다. 형제 항목들 사이에서 고유하게 식별할 수 있으며, DOM 트리를 올바르게 업데이트하기 위해서는 key가 잘 설정되어야 합니다.
\t- 형제 노드 간의 고유해야 한다.
\t- 변경되면 안된다.
\t- React 자체에서 힌트로 사용되므로 컴포넌트에 식별 값이 필요한 경우 별도의 props로 전달해야 한다.

### 📌 7. 주석
```javascript
{/* 주석 작성 */}
```
---
**Ref.**
[Writing Markup with JSX – React](https://react.dev/learn/writing-markup-with-jsx)
[JavaScript in JSX with Curly Braces – React](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
[Conditional Rendering – React](https://react.dev/learn/conditional-rendering)

