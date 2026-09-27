---
title: "axios"
source: "https://app.notion.com/p/f36435fcbd9d8306a299818c9ced705e"
---

# axios

> 노션 원문: https://app.notion.com/p/f36435fcbd9d8306a299818c9ced705e

> \t❓ 자바스크립트에서 HTTP 통신에 대한 쉬운 접근성을 제공하는 라이브러리

### 특징
- 비동기 통신, REST API 통신 시 자주 사용
- Promise 기반 ⇒ then\\~catch / async\\~await 으로 사용 *(ES6 문법 참고)*
### 주요 메소드
> \turl : 요청 주소
\tdata : 전달 데이터

- GET 요청 : 데이터 조회
\t```javascript
axios.get(url)
\t```
- POST 요청 : 데이터 전송(추가)
\t```javascript
axios.post(url, data)
\t```
- PUT 요청 : 데이터 수정(갱신)
\t```javascript
axios.put(url, data)
\t```
- DELETE 요청 : 데이터 삭제
\t```javascript
axios.delete(url)
\t```
### 기본 구조
```javascript
import axios from 'axios';

// get 요청 시
axios.get(요청주소, 옵션)
     .then(response=>{
         // 성공 시 실행
\t\t\t\t console.log(response.data); // 응답 데이터를 확인할 수 있음
     })
     .catch(error=>{
         // 실패 시 실행
         console.log(error); // 오류 내용을 확인할 수 있음
     });
```
### 사용법
**라이브러리 설치**
```bash
> npm add axios
```
**axios 를 사용한 서버로 요청**
then \\~ catch 사용
```javascript
import axios from 'axios';

axios.get('https://api.thedogapi.com/v1/images/search')
     .then(response => {
         console.log('결과 데이터 : ' + response.data);
     })
     .catch(error => {
         console.log('오류 내용 : ' + error);
     });
```
async \\~ await 사용
```javascript
import axios from 'axios';

async function getDogImage() {
  try {
\t\tconst response = await axios.get('https://api.thedogapi.com/v1/images/search');
\t\tconsole.log('결과 데이터 : ' + response.data);
  } catch (error) {
\t  console.log('오류 내용 : ' + error);
  }
}

getDogImage();  // 필요한 위치에서 함수 호출!
```
---
### **UseEffect와 사용하기**
리액트에서는 컴포넌트가 렌더링된 후에 데이터를 조회하여 사용하기도 함.
따라서 useEffect를 활용하여 요청을 하도록 처리하게 됨.
**기본 형식**
```javascript
import { useEffect } from 'react';

useEffect(()=>{
\t// 이 곳에 비동기 요청! (API, 서버 데이터 가져오기 등)
}, []);          // 렌더링되었을 때만 실행되는 useEffect
```
**axios를 사용하여 데이터 불러오기**
then \\~ catch 사용
```javascript
import { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/posts")
         .then(response => setPosts(response.data))
         .catch(error => console.error('에러 : ', error));
  }, []);

  return (
    <ul>
      {
        posts.map(post => <li key={post.id}>{post.title}</li>)
      }
    </ul>
  );
}

export default PostList;
```
async \\~ await 사용
```javascript
import { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  
  useEffect(()=>{
    async function getPosts() {
      try {
\t\t    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
\t\t    setPosts(response.data);
\t\t\t} catch (e) {
\t\t\t  alert("오류가 발생했습니다.");
\t\t\t}
    }
    getPosts();
  }, []);

  return (
    <ul>
      {
        posts.map(post => <li key={post.id}>{post.title}</li>)
      }
    </ul>
  );
}

export default PostList;
```
---
### **Ref.**
[시작하기 \\| Axios Docs](https://axios-http.com/kr/docs/intro)

