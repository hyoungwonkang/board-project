import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

// 페이지 이동을 재사용하기 위한 훅
export function useCustomMove() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page")) || 1;
    const size = parseInt(searchParams.get("size")) || 10;

    const queryDefault = createSearchParams({ page, size });

    const moveToList = (pageParams) => {
        let queryStr = '';
        if (pageParams) {
            const newPage = parseInt(pageParams.page) || 1;
            const newSize = parseInt(pageParams.size) || 10;
            queryStr = createSearchParams({ page: newPage, size: newSize }).toString();
            navigate(`/list?${queryStr}`);
        } else {
            queryStr = queryDefault.toString();
            navigate(`/list?${queryStr}`);
        }
    }
    
    const moveToModify = (id, articleData = null) => {
        const navigateOptions = {
            pathname: `/modify/${id}`,
            search: `?${queryDefault.toString()}`
        };
        
        if (articleData) {
            navigateOptions.state = articleData;
        }
        
        navigate(navigateOptions);
    }

    const moveToView = (id) => {
        navigate(`/view/${id}?${queryDefault.toString()}`);
    }

    return { moveToList, moveToModify, moveToView, page, size };
}