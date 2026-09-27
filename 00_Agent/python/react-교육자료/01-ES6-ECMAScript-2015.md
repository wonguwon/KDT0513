---
title: "ES6 (ECMAScript 2015)"
source: "https://app.notion.com/p/3ee435fcbd9d83f9abcc01c7f946fdb9"
---

# ES6 (ECMAScript 2015)

> 노션 원문: https://app.notion.com/p/3ee435fcbd9d83f9abcc01c7f946fdb9

> \t리액트를 위한 **JavaScript ES6** 필수 문법들에 대해 알아보자.

---
## ES6란?
ES6 (ECMAScript 2015)는 2015년에 발표된 자바스크립트의 6번째 버전이다.
자바스크립트 문법에서 불편하고 일관성이 부족한 부분에 대하여 개선한 버전으로 사용성과 생산성을 크게 개선했다. 이후로도 ES7, ES8 등 버전이 업데이트 되었지만, 가장 큰 변화를 가져온 버전이다.
리액트 코드의 대부분은 ES6 문법으로 작성되어 있다.
공식 문서를 참고해보면, `const`, `let`, `화살표 함수`, `구조 분해 할당`, … 등이 있으며 문법을 모르고 리액트를 공부하기에는 이해가 어려울 것이다.
---
## 주요 문법
> \t❗기억해야 할 문법들❗

### 💡1. `const`, `let` 선언
- 예전에는 `var` 라는 키워드를 사용하여 변수를 선언
- `const`, `let` 키워드를 사용하여 변수를 선언
- 차이점
\t- 블록 스코프 (block scope)
\t- 재선언 불가 : `let`, `const`
\t- 재할당 불가 : `const`
```javascript
var x = 10;
console.log(x);        // 10
{
  let x = 2;
  console.log(x);      // 2
}
console.log(x);        // 10
// --------------------------
const hobby = '독서';
const hobby = '등산';  // 재선언 불가

let goal;
let goal;              // 재선언 불가
// --------------------------
const name = 'yumi';
name = 'mimi';        // 재할당 불가

let age = 20;
age = 21;             // 재할당 가능
```
---
### 💡2. 화살표 함수 (Arrow Function)
- 함수 표현 식을 짧은 구문으로 작성
- `function` 키워드가 필요 없음
\t- 변수로서 선언. `const` 키워드 사용 시 안전함
- `return` 키워드 생략 가능
\t- 한 줄 리턴
- `this` 바인딩 이슈 해결 ⇒ 자체 this 를 가지지 않음
```javascript
function add(num1, num2) {
  return num1 + num2;
}

// ES5
var add = function(num1, num2) {
  return num1 + num2;
}

// ES6
const add = (num1, num2) => {
    return num1 + num2;
}
const add = (num1, num2) => num1 + num2;
```
---
### 💡3. 템플릿 리터럴 (Template Literals, Template Strings)
- 내장된 표현식을 허용하는 문자열 리터럴
- 문자열과 변수 결합 시 유용
- 백틱(\\` \\`)을 이용
- \\$와 중괄호를 사용 하여 표현식 작성 : `${expression}` 
- 여러 줄 문자열 처리
```javascript
const name = 'Tori';
console.log(`우리집 강아지 이름: ${name}!`);     // 우리집 강아지 이름:Tori!
```
---
### 💡4. 객체 구조 분해 (**Object Destructuring**)
- 객체의 속성을 변수에 쉽게 할당할 수 있음
- props / state 에서 값 추출 시 자주 사용
```javascript
const user = {
  name : "Robin",
  age : 30,
  birth : "0206",
  height : 188,
  bloodType: "O"
};

const { name, height } = user;
```
### 💡5. 배열 구조 분해 (**Array Destructuring)**
- 배열의 값을 변수에 쉽게 할당할 수 있음
- `useState` 에서 상태 값, 상태 변경 함수 분리 시 사용
```javascript
const categories = ["소설", "시", "자기계발", "IT"];

const [c1, c2] = categories;
// c1 => "소설", c2 => "시"
```
---
### 💡6. 전개 연산자 (Spread Operator)
- 표현식 : `...` 
- 배열/객체 복사, 병합 가능
- 불변성 유지에 중요
```javascript
const numbers = [1, 2];
const newNumbers = [...numbers, 3];
// => [1, 2, 3]

const tempObj = { a: 1 };
const newTempObj = { ...tempObj, b: 2 };
// => {a: 1, b: 2}
```
---
### 💡7. 기본 매개변수 (Default Parameters)
- 함수 매개변수에 기본 값 설정 가능
- 함수 호출 시 인자가 없을 경우에 대한 대응
```javascript
function greet(name = "Guest") {
\tconsole.log(`Hello, ${name}`);
}

greet("Jenny");    // => Hello, Jenny
greet();           // => Hello, Guest
```
---
### 💡8. 클래스 (Classes)
- 객체를 생성하기 위한 템플릿
- 데이터와 이를 조작하는 코드(함수)를 하나로 추상화한 형태 (⇒ Java의 class와 유사)
- class 키워드를 사용하여 선언
- 리액트 클래스형 컴포넌트 기반
```javascript
class Person {
  // 생성자
  constructor(name) {
    this.name = name;
  }
  // 메소드
  say() {
    console.log(`Hi, I'm ${this.name}!`);
  }
}

const chulsoo = new Person("Chulsoo");
chulsoo.say();    // Hi, I'm Chulsoo
```
---
### 💡9. 모듈 (Modules)
- 모듈 기능을 사용하기 위해 대상을 `export` 해야 함. ( 대상: functions, var, let, const, class, … )
- 내보내기 처리된 기능을 사용하기 위해서 `import` 해야 함. 
\t- 가져오기 할 때는 `from` 절 뒤에 해당 모듈의 경로를 작성
- 리액트에서 컴포넌트 분리 시 모듈 기능을 사용
```javascript
// math.js -------------------------------
const add = (a, b) => a,b;
const sub = (a, b) => a-b;
const check = () => "I'm Math Module";

export { add, sub };
export default check;

// app.js -------------------------------
import check, { add, sub } from './math.js'
```
---
### 💡10. Promise, async/await
- Promise :  비동기 작업에 대한 완료 또는 실패 결과를 나타내는 객체
\t[이미지: 원문 노션 페이지 참고]
\t- 작업 상태 : pending, fulfilled, rejected
\t\t- pending (대기) : 초기 상태. promise가 진행 중이며 아직 완료되지 않음
\t\t- fulfilled (완료) : 작업이 성공적으로 완료된 상태 (결과 값을 반환)
\t\t- rejected (거부) : 작업이 실패된 상태 (오류를 반환)
- async / await
\t- async : 비동기 함수를 정의. 
\t- await : 비동기 작업을 기다림. async 함수 내부에서만 사용 가능
\t```javascript
async function myDisplay() {
  let myPromise = new Promise(function(resolve, reject) {
    resolve("I love You !!");
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

myDisplay();
\t```
---
**Ref.**
[W3Schools.com](https://www.w3schools.com/js/js_es6.asp)
[ECMAScript - MDN Web Docs 용어 사전: 웹 용어 정의 \\| MDN](https://developer.mozilla.org/ko/docs/Glossary/ECMAScript)
[Template literals - JavaScript \\| MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)
[Spread syntax (...) - JavaScript \\| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
[Classes - JavaScript \\| MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
[JavaScript modules - JavaScript \\| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
[export - JavaScript \\| MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export)
[Promise - JavaScript \\| MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[async function - JavaScript \\| MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

