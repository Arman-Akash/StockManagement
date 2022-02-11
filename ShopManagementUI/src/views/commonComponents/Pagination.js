import React from 'react'
import {CPagination} from '@coreui/react'

const Pagination = ({config, pageInfo, setPageInfo}) => {
    let pageconfig = config;
    let paginationDiv;
    if(pageconfig && pageconfig.totalPages)
    {
        paginationDiv =
            <CPagination
                activePage={pageInfo.pageNo}
                align="end"
                size="sm"
                // className="mb-3"
                pages={pageconfig !== undefined && pageconfig.totalPages !== undefined ? pageconfig.totalPages : 1}
                onActivePageChange={(i) => {
                    setPageInfo({
                        ...pageInfo,
                        pageNo: i
                    });
                }}>
            </CPagination>
    }
    return (
        <>
            {paginationDiv}
        </>
    );
}

export default Pagination;