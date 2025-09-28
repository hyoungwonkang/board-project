import { deleteArticle, postArticle } from "../api/articleApi";

// 게시글 등록
export const handleSubmit = (article, navigate) => {
    console.log('article:', article);
    
    postArticle(article)
        .then((data) => {
            console.log("게시물 등록 성공")
            console.log('data:', data);
            navigate('/list', {replace: true});
        })
        .catch((err) => {
            console.log("게시물 등록 실패");
            console.log('err:', err);
        })
}

// 게시글 삭제
export const handleRemove = (id, navigate) => {
    deleteArticle(id)
        .then((data) => {
            console.log('data:', data);
            navigate('/list', {replace: true});
        })
        .catch((err) => {
            console.log('err:', err);
            setError('게시글 삭제 실패')
        })
}
