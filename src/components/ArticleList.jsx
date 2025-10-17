import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articleApi";
import PageComponent from "./common/PageComponent";
import { useCustomMove } from "../hooks/useCustomMove";
import { useSearchParams } from "react-router-dom";

const initialState = {
    dtoList: [],
    pageRequestDto: null,
    totalCount: 0,
    pageNumList: [],
    prev: false,
    next: false,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0
};

function ArticleList () {
    const [searchParams, setSearchParams] = useSearchParams();
    const [serverData, setServerData] = useState({...initialState});
    const [keyfield, setKeyfield] = useState('title');
    const [keyword, setKeyword] = useState('');

    const [loading, setLoading] = useState(false);
    const { moveToView, moveToList, page, size } = useCustomMove();
    
    // 컴포넌트가 처음 렌더링될 때와 searchParams가 변경될 때마다 실행
    useEffect(() => {

        const keyfieldParam = searchParams.get('keyfield') || 'title';
        const keywordParam = searchParams.get('keyword') || '';

        if (keyfieldParam && keywordParam) {
        fetchArticles({page, size, keyfield: keyfieldParam, keyword: keywordParam})
            .then((data) => {
                setServerData(data);
            })
            .catch((err) => {
                console.log('error:', err);
            });
        } else {
        fetchArticles({page, size, keyfield: keyfield, keyword: keyword})
            .then((data) => {
                setServerData(data);
            })
            .catch((err) => {
                console.log('error:', err);
            });
        }
    }, [page]);

    // const descArticles = [...serverData].sort((a, b) => a.id - b.id);
    const descArticles = [...serverData.dtoList].sort((a, b) => a.id - b.id);

    const handleChangeKeyfield = (e) => { setKeyfield(e.target.value); }
    const handleChangeKeyword = (e) => { setKeyword(e.target.value); }
    const handleClickSearch = () => {
        if(!keyfield || !keyword) {
            alert('검색어를 입력하세요');
            return;
        }

        setLoading(true);

        fetchArticles({page: 1, size, keyfield, keyword})
            .then((data) => {
                setServerData(data);
                moveToList({page: 1, size, keyfield, keyword});
            })
            .catch((err) => {
                console.log('error:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
        <h1>게시글 목록</h1>
        {/* 검색 폼 */}
        <div>
            <select onChange={handleChangeKeyfield} name="keyfield" id="keyfield" value={keyfield}>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
                <option value="contents">내용</option>
            </select>&nbsp;
            <input type="text" onChange={handleChangeKeyword} value={keyword} placeholder="검색어 입력" />
            <button type="button" onClick={handleClickSearch}>검색</button>
        </div>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>no</th>
                    <th>title</th>
                    <th>writer</th>
                    <th>reg_date</th>
                </tr>
            </thead>
            <tbody>
                {serverData.dtoList.map((article, index) => (
                    <tr key={article.id}>
                        <td>{(serverData.totalCount - (page - 1)*size) - index}</td>
                        <td>{article.id}</td>
                        <td style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => moveToView(article.id)}>{article.title}</td>
                        <td>{article.writer}</td>
                        <td>{article.regDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <PageComponent serverData={serverData} movePage={moveToList} />
        </>
    )
}

export default ArticleList;