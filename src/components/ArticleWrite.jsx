import {useState} from 'react';
import { handleSubmit } from '../common/article';
import { useCustomMove } from '../hooks/useCustomMove';

const initialArticle = {
    title: '',
    writer: '',
    contents: '',
    files: []
};

function ArticleWrite () {
    const { moveToList, page, size } = useCustomMove();
    const [article, setArticle] = useState({...initialArticle});
    
    
    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    }
    
    const handleFileChange = (e) => {
        setArticle(prev => ({
            ...prev,
            files: [...prev.files, ...Array.from(e.target.files)]
        }));
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
                <div className="form-group-horizontal">
                    <label htmlFor="files">파일 첨부</label>
                    <input
                        type="file"
                        name="files"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                {/* 파일 목록 표시 */}
                {article.files.length > 0 && (
                    <div className="form-group-horizontal">
                        <label>첨부된 파일:</label>
                        <ul>
                            {article.files.map((file, idx) => (
                                <li key={idx}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="form-actions">
                    <button type="button" onClick={() => handleSubmit(article, moveToList, page, size)}>Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>    
            </div>    
        </>
    )
}

export default ArticleWrite;