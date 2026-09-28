import axios from 'axios';

// 모든 요청이 공유하는 axios 인스턴스
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export default client;
