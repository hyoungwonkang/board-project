import {useState} from 'react';
import { handleSubmit } from '../common/article';
import { useNavigate } from 'react-router-dom';

const initialArticle = {
    title: '',
    writer: '',
    contents: ''
};

function ArticleWrite () {
    const navigate = useNavigate();
    const [article, setArticle] = useState({...initialArticle});
    
    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    }

    const handleReset = () => {
        setArticle({...initialArticle})
    }
    
    
    return (
        <>
            <div className="form-container">
                <h1 className="form-title">게시글 등록</h1>

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
                        type="text"
                        name="writer"        
                        value={article.writer}                        
                        onChange={handleChange}
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

export default ArticleWrite;