import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSubmit } from "../common/article";

const initialArticle = {
    title: '',
    contents: ''
};

function ArticleModify() {
    const navigate = useNavigate();
    const [article, setArticle] = useState(useLocation().state);
    
    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    }
    
    const handleReset = () => {
        setArticle({...initialArticle, writer: article.writer})
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
                    <button type="button" onClick={() => handleSubmit(article, navigate)}>Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>    
            </div> 
        </>
    )
}

export default ArticleModify;