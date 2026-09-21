import { todayString } from '../utils/date';

export const STATUSES = ['reading', 'done', 'wish']; // 읽는 중 / 완독 / 읽고 싶은

export const STATUS_LABEL = {
  reading: '읽는 중',
  done: '완독',
  wish: '읽고 싶은',
};

const today = todayString();

export const initialBooks = [
  {
    id: 1,
    title: '클린 코드',
    author: '로버트 C. 마틴',
    totalPages: 464,
    currentPage: 120,
    status: 'reading',
    sessions: [
      { id: 101, date: '2026-09-16', seconds: 1500, endPage: 80 },
      { id: 102, date: today, seconds: 1200, endPage: 120 },
    ],
  },
  {
    id: 2,
    title: '리팩터링 2판',
    author: '마틴 파울러',
    totalPages: 550,
    currentPage: 40,
    status: 'reading',
    sessions: [{ id: 201, date: '2026-09-17', seconds: 900, endPage: 40 }],
  },
  {
    id: 3,
    title: '함수형 자바스크립트',
    author: '루이스 아텐시오',
    totalPages: 380,
    currentPage: 380,
    status: 'done',
    sessions: [
      { id: 301, date: '2026-09-10', seconds: 3600, endPage: 200 },
      { id: 302, date: '2026-09-12', seconds: 3300, endPage: 380 },
    ],
  },
  {
    id: 4,
    title: '데이터 중심 애플리케이션 설계',
    author: '마틴 클레프만',
    totalPages: 610,
    currentPage: 0,
    status: 'wish',
    sessions: [],
  },
  {
    id: 5,
    title: '러닝 리액트',
    author: '알렉스 뱅크스',
    totalPages: 340,
    currentPage: 0,
    status: 'wish',
    sessions: [],
  },
];
