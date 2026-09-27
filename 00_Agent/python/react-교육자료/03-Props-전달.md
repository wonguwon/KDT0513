---
title: "Props 전달"
source: "https://app.notion.com/p/528435fcbd9d83bd873a01bcbd7f48d6"
---

# Props 전달

> 노션 원문: https://app.notion.com/p/528435fcbd9d83bd873a01bcbd7f48d6

> \tReact 컴포넌트는 props를 사용하여 서로 통신합니다. 
\t모든 부모 컴포넌트는 props를 통해 자식 컴포넌트에게 정보를 전달할 수 있습니다.
\tprops에는 객체, 배열, 함수 등 모든 자바스크립트 값을 전달합니다.

### 🔴 HTML 태그에 전달되는 속성
태그에 전달할 수 있는 속성은 미리 정의되어 있습니다. 
className, width, height, … HTML 표준을 따릅니다.
### 🔴 자체 컴포넌트에 전달되는 속성
새롭게 정의된 컴포넌트에 전달되는 속성은 props를 통해 전달됩니다. 전달된 속성은 매개변수를 통해 전달받을 수 있으며, props (단일 인수)로 전달 받거나 구조 분해 할당을 적용하여 전달된 속성을 나열할 수 있습니다.
```javascript
function Avatar({ person, size }) {

}

function Avatar(props) {
  let person = props.person;
  let size = props.size;
}

function Profile() {
  return (
    <>
      <Avatar person={"김말똥"} size={100} />
      <Avatar person={"홍길동"} size={80} />
    </>
  );
}
```
### 🔴 prop에 대한 기본값 지정
값이 지정되지 않았을 때 기본값으로 사용할 값을 지정하고자 할 경우 아래와 같이 작성할 수 있습니다.
```javascript
function Avatar({ person, size = 100 }) {  }
```
---
**Ref.**
[Passing Props to a Component – React](https://react.dev/learn/passing-props-to-a-component)

