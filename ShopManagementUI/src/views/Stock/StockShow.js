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
import { faArrowAltCircleLeft, faList } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import * as axios from '../../axios/axiosLib';
//Custom hook and state
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import { Form, Formik } from "formik";
import { initialCollections } from '../../functionalLib/initialState';
import { apiHostName } from '../../config';

const StockShow = () => {
    var fields = [
        { key: "productName", label: "Product" }, 'stock',
        { key: "unitName", label: 'Unit' }]

    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let stockList = dataApi.useDataApi(`api/GetStock`, initialState.initialCollections);

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        setStocks(stockList.data.data);
        console.log(stockList.data.data);
    }, [stockList])

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol md="12">
                        <Formik
                            enableReinitialize
                            initialValues={{
                            }}

                            onSubmit={(values, { resetForm }) => {

                            }}
                        >
                            {
                                formProps => {
                                    return (
                                        <Form>
                                            <CRow>
                                                <CCol md="2">
                                                    <CLabel className='pl-3'>Branch Name:</CLabel>
                                                </CCol>
                                                <CCol md="4">
                                                    <SAReactAutoSelect
                                                        name="branchId"
                                                        label="Branch"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={branches.data.data.map(item => {
                                                            return { label: item.name, value: item.id }
                                                        })}
                                                    // onChangeHandle={(name, value) => {
                                                    //     axios.fetchGetData(`api/ProductSubType/GetByProductType/${value}`, undefined, undefined, (response) => {
                                                    //         console.log(response.data)
                                                    //         // formProps.setFieldValue('productSubType', value);
                                                    //         setProductSubTypes(response.data);
                                                    //     })
                                                    // }}
                                                    />
                                                </CCol>
                                                <CCol md="2" style={{ textAlign: 'right' }}>
                                                    <CButton
                                                        type="button"
                                                        color="info"
                                                        size="sm"
                                                        style={{
                                                            // float: 'right'
                                                            marginRight: '25px'
                                                        }}
                                                        onClick={() => {
                                                            axios.fetchReportData(`api/Purchase/Search`, formProps.values, undefined, (response) => {
                                                                setStocks({
                                                                    ...initialCollections,
                                                                    data: axios.filterNull(response.data)
                                                                });
                                                            });
                                                        }}
                                                    ><FontAwesomeIcon icon={faList} /> Show</CButton>
                                                </CCol>
                                            </CRow>
                                        </Form>
                                    );
                                }
                            }
                        </Formik>
                    </CCol>
                </CRow>
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