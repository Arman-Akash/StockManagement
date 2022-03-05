import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDataTable,
    CLink,
    CLabel
} from '@coreui/react';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import * as axios from '../../axios/axiosLib';
//Custom hook and state
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';


const StockShow = () => {
    var fields = [
        { key: "productName", label: "Product" },'stock',
        { key: "unitName", label: 'Unit' }]

    let stockList = dataApi.useDataApi(`api/GetStock`, initialState.initialCollections);

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        setStocks(stockList.data.data);
        console.log(stockList.data.data);
    }, [stockList])

    return (
        <CCard>
        <CLabel className='pt-3 pl-3'>Branch Name:</CLabel>
            <CCardBody>
                <CDataTable
                    items={stocks}
                    fields={fields}
                    tableFilter
                    border
                    striped
                    pagination
                />

                <CCol md="6" className="text-right mt-2">
                    <CLink to="/dashboard">
                        <CButton size="sm" style={{ marginLeft: "20px" }} color="danger" type="rest"><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Exit</CButton>
                    </CLink>
                </CCol>
            </CCardBody>
        </CCard>
    )
}

export default StockShow