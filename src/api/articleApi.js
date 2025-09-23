import axios from "axios";

const API_SERVER_HOST = 'http://localhost:9000';
const prefix = `${API_SERVER_HOST}/api/v1`


// 게시글 목록 조회 
export const fetchArticles = async () => {
   const res = await axios.get(`${prefix}/articles`); // axios는 비동기 처리하는 라이브러리. await를 사용하여 응답을 기다림

   console.log('res.data: ', res.data); // axios로 Array객체 반환
   
   return res.data; // promise 객체 반환
}


// 게시글 상세 조회
export const fetchArticle = async (id) => {
    const res = await axios.get(`${prefix}/articles/${id}`);

    console.log('res.data: ', res.data);

    return res.data[0];
}


// 게시글 삭제
export const deleteArticle = async (id) => {
    const res = await axios.delete(`${prefix}/articles/${id}`);
    console.log('res.data: ', res.data);

    return res.data;
}


// 게시글 등록
export const postArticle = async (article) => {
    console.log('article:', article);
    
    const res = await axios.post(`${prefix}/articles`, article);
    console.log(`res.data: `, res.data);

    return res.data;
}


// 게시글 수정
export const putArticle = async (article) => {
    console.log('article:', article);
    
    const res = await axios.put(`${prefix}/articles/${article.id}`, article);

    return res.data;
}