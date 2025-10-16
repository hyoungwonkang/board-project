import { useEffect, useState } from "react";
import { fetchArticle } from "../api/articleApi";
import { useParams } from "react-router-dom";
import { deleteArticle } from "../api/articleApi";
import { useCustomMove } from "../hooks/useCustomMove";

function ArticleView() {
    const id = useParams().id;
    const { moveToList, moveToModify, page, size } = useCustomMove();

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
    
    const handleRemove = (id) => {
        deleteArticle(id)
            .then((data) => {
                console.log('data:', data);
                moveToList({page, size});
            })
            .catch((err) => {
                console.log('err:', err);
                setError('게시글 삭제 실패')
            })
    }

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
                    <p>첨부파일:</p>
                    { !article.files || article.files.length === 0 ? <p>첨부파일이 없습니다.</p> : (
                        <ul>
                            {article.files.map((file) => (
                                <li key={file.id}>
                                    <p>{file.fileName}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={()=>{moveToModify(id, article)}}>게시글 수정</button>
                    <button onClick={()=>{moveToList({page, size})}}>게시글 조회</button>
                    <button onClick={()=>handleRemove(id)}>게시글 삭제</button>
                </div>
                </>
            )}
        </>
    )
}

export default ArticleView;