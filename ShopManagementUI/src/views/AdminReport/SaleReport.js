import React, { useState,useEffect } from 'react'
import {
    CCol,
    CRow,
    CButton,
    CDataTable,
    CTooltip,
    CCard,
    CCardBody
} from '@coreui/react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import SADatePicker from '../FormLib/saDatePicker';
import * as axios from '../../axios/axiosLib';
import { Form, Formik } from "formik";
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import { loadState } from '../../axios/storage';
import { LOGGED_IN_USER } from '../../axios/keys';
import { Roles } from '../../staticData';

const SaleReport = () => {
    let [isOpen, toggleModal] = useState(false);
    const [disable, setDisable] = useState(true);
    var user = loadState(LOGGED_IN_USER);

    useEffect(() => {
        if (user?.permissions == Roles.Admin) {
            setDisable(false);
        }
    }, [])

    const fields = ['saleDate',
        { key: 'productName', label: 'Product' },
        { key: 'unitName', label: 'Unit' },
        'quantity',
        { key: 'amount', _classes: 'text-right' }
    ];
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);

    let [response, setResponse] = useState({ data: [] });
    const [total, setTotal] = useState(0);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                startDate: null,
                endDate: null,
                branchId: user?.branch_id,
                productId: 0
            }}

            onSubmit={(values) => {

            }}
        >
            {
                formProps => {
                    return (
                        <CCard>
                            <CCardBody>
                                <h5 style={{ marginBottom: "10px" }} className='page-title'>Sale Report</h5>
                                <Form>
                                    <CRow>
                                        <CCol md="4">
                                            <SAReactAutoSelect
                                                id="branchId"
                                                name="branchId"
                                                label="Branch"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                isDisabled={disable}
                                                options={branches.data.data.map(item => {
                                                    return { label: item.name, value: item.id }
                                                })}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4">
                                            <SADatePicker
                                                id="startDate"
                                                name="startDate"
                                                label="Start Date"
                                                labelClassName="float-right"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="dd/MM/yyyy"
                                            />
                                        </CCol>

                                        <CCol md="4">
                                            <SADatePicker
                                                id="endDate"
                                                name="endDate"
                                                label="End Date"
                                                labelClassName="float-right"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="dd/MM/yyyy"
                                            />
                                        </CCol>
                                        <CCol md="4">
                                            <SAReactAutoSelect
                                                id="productId"
                                                name="productId"
                                                label="Product"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                options={products.data.data.map(item => {
                                                    return { label: item.productCode + " " + item.productName, value: item.id }
                                                })}
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol md={{ offset: 3, size: 4 }} style={{ textAlign: 'right' }}>
                                            <CButton
                                                type="button"
                                                color="success"
                                                size="sm"
                                                style={{
                                                    // float: 'right'
                                                    marginRight: '25px'
                                                }}
                                                onClick={() => {
                                                    //axios.fetchPostData(`api/Sale/SaleReport`, formProps.values, setResponse);
                                                    axios.fetchPostData(`api/Sale/SaleReport`, formProps.values, undefined, (response) => {
                                                        setResponse(response.data);
                                                        setTotal(response.data.data.reduce((a, b) => a + b.amount, 0).toFixed("2"));
                                                    })
                                                }}
                                            ><FontAwesomeIcon icon={faSearch} /> Search</CButton>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mt-3">
                                        <CDataTable
                                            items={axios.filterNull(response.data)}
                                            addTableClasses="table table-bordered table-striped"
                                            fields={fields}
                                            tableFilter
                                            scopedSlots={{
                                                'actions':
                                                    (item) => (
                                                        <td>
                                                            <CTooltip content="View">
                                                                <FontAwesomeIcon className="text-info" onClick={() => {
                                                                    toggleModal(!isOpen);
                                                                }} icon={faEye} />
                                                            </CTooltip>
                                                        </td>
                                                    )
                                            }}
                                        />
                                    </CRow>
                                    <CRow>
                                        <CCol md="12" className="text-right">
                                            Total Sale Amount: <span style={{ color: 'green', fontWeight: 'bold' }}>{total}</span> TK
                                        </CCol>
                                    </CRow>
                                </Form>
                            </CCardBody>
                        </CCard>
                    );
                }
            }
        </Formik>
    )
}

export default SaleReport;