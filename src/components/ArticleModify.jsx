import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchArticle } from "../api/articleApi";
import { useCustomMove } from "../hooks/useCustomMove";
import { handleModify } from "../common/article";

const initialArticle = {
    title: '',
    contents: '',
    writer: ''
};

function ArticleModify() {
    const location = useLocation();
    const { id } = useParams();
    const { moveToList, page, size } = useCustomMove();
    const [article, setArticle] = useState(location.state || initialArticle);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // location.state가 없으면 API에서 데이터를 가져옴
    useEffect(() => {
        if (!location.state && id) {
            setLoading(true);
            fetchArticle(id)
                .then((data) => {
                    setArticle(data);
                })
                .catch((err) => {
                    console.log('error:', err);
                    setError('게시글 정보를 가져오는데 실패했습니다.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [location.state, id]);
    
    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    }
    
    const handleReset = () => {
        setArticle({...initialArticle, writer: article.writer})
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    if (!article || !article.title) {
        return <h2>게시글 데이터를 찾을 수 없습니다.</h2>
    }

    return (
        <>
            <div className="form-container">
                <h1 className="form-title">게시글 수정</h1>

                <div style={{ marginBottom: "16px" }}></div>

                <div className="form-group-horizontal">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        name="title"          
                        value={article.title}                                  
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="writer">작성자</label>
                    <input
                        disabled
                        type="text"
                        name="writer"        
                        value={article.writer}                        
                    />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="contents">내용</label>
                    <textarea
                        name="contents"                                
                        value={article.contents}                  
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={() => handleModify(article, moveToList, page, size)}>Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>    
            </div> 
        </>
    )
}

export default ArticleModify;