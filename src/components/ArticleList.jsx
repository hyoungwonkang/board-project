import { useEffect, useState } from "react";
import { fetchArticlesBySearch } from "../api/articleApi";
import { useNavigate, useSearchParams } from "react-router-dom";

function ArticleList () {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // 컴포넌트가 처음 렌더링될 때와 searchParams가 변경될 때마다 실행
    useEffect(() => {
        const keyfield = searchParams.get("keyfield") || "title";
        const keyword = searchParams.get("keyword") || "";
        fetchArticlesBySearch(keyfield, keyword)
            .then((data) => {
                setArticles(data);
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }, [searchParams]);

    // 검색 기능
    const handleSearch = () => {
        const keyfield = document.querySelector('select').value;
        const keyword = document.querySelector('input').value;
        setSearchParams({ keyfield, keyword });
    };

    const descArticles = [...articles].sort((a, b) => a.id - b.id);

    return (
        <>
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
                {descArticles.map((article) => (
                    <tr key={article.id}>
                        <td>{article.id}</td>
                        <td style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => navigate(`/view/${article.id}`)}>{article.title}</td>
                        <td>{article.writer}</td>
                        <td>{article.reg_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            <select name="keyfield" id="keyfield">
                <option value="title">제목</option>
                <option value="writer">작성자</option>
                <option value="contents">내용</option>
            </select>
            <input type="text" />
            <button onClick={handleSearch}>검색</button>
        </div>
        </>
    )
}

export default ArticleList;