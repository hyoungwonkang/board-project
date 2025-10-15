import axios from "axios";

const API_SERVER_HOST = 'http://localhost:9000';
const prefix = `${API_SERVER_HOST}/api/v1`


// 게시글 목록 조회 
export const fetchArticles = async (page, size) => {
   const res = await axios.get(`${prefix}/articles`, {params: {page, size}}); // axios는 비동기 처리하는 라이브러리. await를 사용하여 응답을 기다림

   console.log('res.data: ', res.data); // axios로 Array객체 반환
   
   return res.data; // promise 객체 반환
}


// 게시글 상세 조회
export const fetchArticle = async (id) => {
    const res = await axios.get(`${prefix}/articles/${id}`);

    console.log('res.data: ', res.data);

    return res.data;
}


// 게시글 삭제
export const deleteArticle = async (id) => {
    const res = await axios.delete(`${prefix}/articles/${id}`);
    console.log('res.data: ', res.data);

    return res.data;
}


// 게시글 등록 (파일 첨부 지원)
export const postArticle = async (article) => {
    console.log('article:', article);

    const formData = new FormData();
    formData.append('article', new Blob([JSON.stringify({
        title: article.title,
        writer: article.writer,
        contents: article.contents
    })], { type: 'application/json' }));

    if (article.files && article.files.length > 0) {
        for (let i = 0; i < article.files.length; i++) {
            formData.append('files', article.files[i]);
        }
    }

    // 파일이 없을때 빈 Blob을 추가해도 안되어 백엔드 컨트롤러에서 files와 연관된 @RequestPart를 required=false로 설정

    const res = await axios.post(`${prefix}/articles`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(`res.data: `, res.data);

    return res.data;
}


// 게시글 수정
export const putArticle = async (article) => {
    console.log('article:', article);
    
    const res = await axios.put(`${prefix}/articles/${article.id}`, article);

    return res.data;
}

// 게시글 검색
export const fetchArticlesBySearch = async (keyfield = "", keyword = "") => {
    const res = await axios.get(`${prefix}/articles`, {
        params: { keyfield, keyword }
    });

    console.log('res.data: ', res.data);

    return res.data;
}