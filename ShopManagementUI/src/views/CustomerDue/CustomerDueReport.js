import React, { useState } from 'react'
import {
    CCol,
    CRow,
    CButton,
    CDataTable,
    CTooltip,
} from '@coreui/react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSearch, faPrint } from '@fortawesome/free-solid-svg-icons';
import * as axios from '../../axios/axiosLib';
import { apiHostName } from '../../config';
import { Form, Formik } from "formik";
import SAInput from '../FormLib/saInput';
import { initialCollections } from '../../functionalLib/initialState';
import { useParams } from 'react-router';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect'
import SADatePicker from '../FormLib/saDatePicker'
//Custom hook and state
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';

const CustomerDueReport = (props) => {
    let [isOpen, toggleModal] = useState(false);
    const { country } = useParams();

    let fields = [
        { key: 'creditDate', label: 'Credit Date' },
        { key: 'branchId', label: 'Branch Name' },
        { key: 'customerId', label: 'Customer Name' },
        { key: 'type', label: 'Type' },
        { key: 'amount', label: 'Amount' },
        'actions'
    ];
    const Type = [
        { label: "Cash", value: 1 },
        { label: "Credit", value: 2 }
    ]
    let customers = dataApi.useDataApi(`api/Customer`, initialState.initialCollections);
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let customerDues = dataApi.useDataApi(`api/CustomerDue`, initialState.initialCollections);
    let [response, setResponse] = useState({ data: [] });

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: '',
                objective: '',
                updatedInfo: '',
                country: ''
            }}

            onSubmit={(values) => {

            }}
        >
            {
                formProps => {
                    return (
                        <Form>
                            {/*For Concern?department  section*/}
                            <CRow>
                            <CCol md="4">
                                <SADatePicker
                                    name="creditdate"
                                    label="Credit Date"
                                    labelClassName="float-right"
                                    isInline="true"
                                    isRequired="true"
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
                                    isRequired="true"
                                    isInline="true"
                                    lSize="4"
                                    rSize="8"
                                    labelClassName="float-right"
                                    formProps={formProps}
                                    options={branches.data.data.map(item => {
                                        return { label: item.name, value: item.id }
                                    })} />
                            </CCol>
                            <CCol md="4">
                                <SAReactAutoSelect
                                    id="customerId"
                                    name="customerId"
                                    label="Customer"
                                    isInline="true"
                                    lSize="4"
                                    rSize="8"
                                    isRequired="true"
                                    labelClassName="float-right"
                                    formProps={formProps}
                                    options={customers.data.data.map(item => {
                                        return { label: item.name, value: item.id }
                                    })} />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md="4">
                                <SAInput
                                    id="challanNo"
                                    name="challanNo"
                                    type="text"
                                    label="Challan No"
                                    isInline="true"
                                    lSize="4"
                                    rSize="8"
                                    labelClassName="float-right"
                                />
                            </CCol>
                            <CCol md="4">
                                <SAReactAutoSelect
                                    id="type"
                                    name="type"
                                    label="Type"
                                    isRequired="true"
                                    isInline="true"
                                    lSize="4"
                                    rSize="8"
                                    labelClassName="float-right"
                                    formProps={formProps}
                                    options={Type} />
                            </CCol>
                            <CCol md="4">
                                <SAInput
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    isRequired="true"
                                    label="Amount"
                                    isInline="true"
                                    lSize="4"
                                    rSize="8"
                                    labelClassName="float-right"
                                />
                            </CCol>
                        </CRow>

                            <CRow>
                                <CCol md={{ offset: 3, size: 4 }} style={{ textAlign: 'right' }}>
                                    <CButton
                                        type="button"
                                        color="success"
                                        size="md"
                                        style={{
                                            // float: 'right'
                                            marginRight: '25px'
                                        }}
                                        onClick={() => {
                                            axios.fetchReportData(`api/Excercise/Search/${country}`, formProps.values, undefined, (response) => {
                                                setResponse({
                                                    ...initialCollections,
                                                    data: axios.filterNull(response.data)
                                                });
                                            });
                                        }}
                                    ><FontAwesomeIcon icon={faSearch} /> Search</CButton>
                                    <CButton
                                        type="button"
                                        color="warning"
                                        size="md"
                                        style={{
                                            float: 'right',
                                            color: 'white'
                                        }}
                                        onClick={() => {
                                            window.open(
                                                `${apiHostName}/api/Report/ExcerciseReport`,
                                                '_blank'
                                            );
                                        }}
                                    ><FontAwesomeIcon icon={faPrint} /> Print</CButton>
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
                    );
                }
            }
        </Formik>
    )
}

export default CustomerDueReport;