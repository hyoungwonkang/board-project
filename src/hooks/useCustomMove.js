import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

// 페이지 이동을 재사용하기 위한 훅
export function useCustomMove() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page")) || 1;
    const size = parseInt(searchParams.get("size")) || 10;
    const keyfield = searchParams.get("keyfield");
    const keyword = searchParams.get("keyword");

    const queryDefault = createSearchParams({ page, size });

    const moveToList = (pageParams) => {
        let queryStr = '';
        if (pageParams) {
            const newPage = parseInt(pageParams.page) || 1;
            const newSize = parseInt(pageParams.size) || 10;
            const newKeyfield = pageParams.keyfield;
            const newKeyword = pageParams.keyword;
            
            // 검색 파라미터가 falsy하지 않으면 포함
            if (newKeyfield !== undefined && newKeyword !== undefined) {
                queryStr = createSearchParams({ 
                    page: newPage, 
                    size: newSize, 
                    keyfield: newKeyfield, 
                    keyword: newKeyword 
                }).toString();
            } else {
                queryStr = createSearchParams({ page: newPage, size: newSize }).toString();
            }
            navigate(`/list?${queryStr}`);
        } else {
            // 현재 검색 파라미터가 있으면 유지
            if (keyfield && keyword) {
                queryStr = createSearchParams({ page, size, keyfield, keyword }).toString();
            } else {
                queryStr = queryDefault.toString();
            }
            navigate(`/list?${queryStr}`);
        }
    }
    
    const moveToModify = (id, articleData = null) => {
        let searchQuery = queryDefault.toString();
        if (keyfield && keyword) {
            searchQuery = createSearchParams({ page, size, keyfield, keyword }).toString();
        }
        
        const navigateOptions = {
            pathname: `/modify/${id}`,
            search: `?${searchQuery}`
        };
        
        if (articleData) {
            navigateOptions.state = articleData;
        }
        
        navigate(navigateOptions);
    }

    const moveToView = (id) => {
        let searchQuery = queryDefault.toString();
        if (keyfield && keyword) {
            searchQuery = createSearchParams({ page, size, keyfield, keyword }).toString();
        }
        navigate(`/view/${id}?${searchQuery}`);
    }

    return { moveToList, moveToModify, moveToView, page, size, keyfield, keyword };
}