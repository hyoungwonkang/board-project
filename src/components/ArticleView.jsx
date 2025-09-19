import { useEffect, useState } from "react";
import { fetchArticle } from "../api/articleApi";
import { useNavigate, useParams } from "react-router-dom";
import { handleRemove } from "../common/article";

function ArticleView() {
    const navigate = useNavigate();
    const id = useParams().id;
    const [article, setArticle] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true);

        fetchArticle(id)
            .then((data) => {
                console.log('data:', data);
                setArticle(data);
            })
            .catch((err) => {
                console.log('error:', err);
                setError("게시글 상세 정보 조회 실패")
            })
            .finally(()=>{
                setLoading(false);
            })
    },[id])

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>
            { article.length === 0 ? <p>데이터가 없습니다.</p> : (
                <>
                <div>
                    <h2>{article.title}</h2>
                    <p>{article.writer}</p>
                    <p>{article.reg_date}</p>
                    <p>{article.contents}</p>
                </div>
                <div>
                    <button onClick={()=>navigate(`/modify/${article.id}`, {state: {...article}})}>게시글 수정</button>
                    <button onClick={()=>navigate('/list')}>게시글 조회</button>
                    <button onClick={()=>handleRemove(id, navigate)}>게시글 삭제</button>
                </div>
                </>
            )}
        </>
    )
}

export default ArticleView;