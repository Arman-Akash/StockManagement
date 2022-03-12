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
import SAInput from '../FormLib/saInput';
import { initialCollections } from '../../functionalLib/initialState';

const SaleReport = (props) => {
    let [isOpen, toggleModal] = useState(false);

    const fields = ['purchaseDate', 'receiptNo', 'transactionType', 'actions'];

    let [response, setResponse] = useState({ data: [] });
    return (
        <Formik
            enableReinitialize
            initialValues={{
                id: 0,
                receiptNo: '',
                purchaseDate: new Date(),
                supplierId: 0,
                transactionType: '',
                purchaseDetails: []
            }}

            onSubmit={(values) => {

            }}
        >
            {
                formProps => {
                    return (
                        <CCard>
                            <CCardBody>
                                <Form>
                                    <CRow>
                                        <CCol md="4" className="mb-1">
                                            <SAInput
                                                id="receiptNo"
                                                name="receiptNo"
                                                type="text"
                                                label="Receipt No."
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
                                                    axios.fetchReportData(`api/Purchase/Search`, formProps.values, undefined, (response) => {
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
                                                size="sm"
                                                style={{
                                                    float: 'right',
                                                    color: 'white'
                                                }}
                                                onClick={() => {
                                                    window.open(
                                                        `${apiHostName}/api/Report/Index`,
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
                            </CCardBody>
                        </CCard>
                    );
                }
            }
        </Formik>
    )
}

export default SaleReport;