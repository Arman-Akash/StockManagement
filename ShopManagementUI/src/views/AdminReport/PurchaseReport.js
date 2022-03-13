import React, { useState } from 'react'
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
import { faEye, faSearch, faPrint } from '@fortawesome/free-solid-svg-icons';
import SADatePicker from '../FormLib/saDatePicker';
import * as axios from '../../axios/axiosLib';
import { apiHostName } from '../../config';
import { Form, Formik } from "formik";
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SAInput from '../FormLib/saInput';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';

const PurchaseReport = (props) => {
    let [isOpen, toggleModal] = useState(false);

    const fields = [
        { key: 'rcvDate', label: 'Purchase Date' },
        { key: 'lcNumber', label: 'LC Number' },
        { key: 'billOfEntryNo', label: 'Bill of Entry No' },
        { key: 'billOfEntryDate', label: 'Bill Entry Date' },
        { key: 'productName', label: 'Product' },
        { key: 'unitName', label: 'Unit' },
        'quantity',
        { key: 'amount', _classes: 'text-right' }
    ];
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);

    let [response, setResponse] = useState({ data: [] });
    return (
        <Formik
            enableReinitialize
            initialValues={{
                lcNumber:'',
                billOfEntryNo:'',
                startDate: null,
                endDate: null,
                billStartDate: null,
                billEndDate: null,
                branchId: 0,
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
                                <h5 style={{ marginBottom: "10px" }} className='page-title'>Purchase Report</h5>
                                <Form>
                                    <CRow>
                                        <CCol md="4">
                                            <SAInput
                                                id="lcNumber"
                                                name="lcNumber"
                                                type="text"
                                                label="LC Number"
                                                isInline="true"
                                                // isRequired="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                            />
                                        </CCol>
                                        <CCol md="4">
                                            <SAInput
                                                id="billOfEntryNo"
                                                name="billOfEntryNo"
                                                type="text"
                                                label="Bill of Entry No"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                            />
                                        </CCol>
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
                                            <SADatePicker
                                                id="billStartDate"
                                                name="billStartDate"
                                                label="Bill Start Date"
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
                                                id="billEndDate"
                                                name="billEndDate"
                                                label="Bill End Date"
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
                                                id="branchId"
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
                                                    axios.fetchPostData(`api/Receive/PurchaseReport`, formProps.values, setResponse);
                                                }}
                                            ><FontAwesomeIcon icon={faSearch} /> Search</CButton>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mt-3">
                                        <CDataTable
                                            items={axios.filterNull(response.data)}
                                            addTableClasses="table table-bordered table-striped"
                                            fields={fields}
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
                                </Form>
                            </CCardBody>
                        </CCard>
                    );
                }
            }
        </Formik>
    )
}

export default PurchaseReport;