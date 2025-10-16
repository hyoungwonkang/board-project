import React from "react";

const PageComponent = ({serverData, movePage}) => {
    return (
        <>
            {serverData.prev ? <span style={{ margin: '0 5px', cursor: 'pointer' }} onClick={() => {movePage({ page: serverData.prevPage, size: serverData.size })}}>이전</span> : <></>}
            {serverData.pageNumList.map((pageNum) => { return <span
                key={pageNum}
                style={{ margin: '0 5px', cursor: 'pointer', fontWeight: pageNum === serverData.currentPage ? 'bold' : 'normal' }}
                onClick={()=> {movePage({ page: pageNum, size: serverData.size })}}>{pageNum}</span>}
            )}
            {serverData.next ? <span style={{ margin: '0 5px', cursor: 'pointer' }} onClick={() => {movePage({ page: serverData.nextPage, size: serverData.size})}}>다음</span> : <></>}
        </>
    );
}

export default PageComponent;
