import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articleApi";
import { useNavigate } from "react-router-dom";

function ArticleList () {
    
    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        fetchArticles()
            .then((data) => { // fetchArticles()가 반환하는 promise 객체의 결과를 data로 받음
                console.log('data:', data);
                setArticles(data);
            })
        .catch((err) => {
            console.log('error:', err);
            
        })
    },[])

    const descArticles = articles.sort((a,b) => a.id - b.id);

    return (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>writer</th>
                    <th>reg_date</th>
                </tr>
            </thead>
            <tbody>
                {articles &&
                    descArticles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => navigate(`/view/${article.id}`)}>{article.title}</td>
                            <td>{article.writer}</td>
                            <td>{article.reg_date}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default ArticleList;