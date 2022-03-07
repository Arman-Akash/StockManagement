import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDataTable,
    CButton,
    CLink
} from '@coreui/react'
import SAInput from '../FormLib/saInput';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect'
import SADatePicker from '../FormLib/saDatePicker'


import { Form, Formik } from "formik";
import * as Yup from "yup";
import * as axios from '../../axios/axiosLib';
import EditIcon from '../commonComponents/EditIcon';
import DeleteModal from '../commonComponents/DeleteModal';
import DeleteIcon from '../commonComponents/DeleteIcon';

///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
//Custom hook and state
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';

const PaymentReceive = (props) => {
    const [isAdd, setIsAdd] = useState(true);
    const [isDelete, toggleDeleteModal] = useState(false);
    let fields = [
        { key: 'paymentDate', label: 'Payment Date' },
        { key: 'invoiceNo', label: 'Invoice No' },
        { key: 'customerName', label: 'Customer Name' },
        { key: 'paymentType', label: 'Payment Type' },
        { key: 'amount', label: 'Amount' },
        'actions'
    ];
    const payType = [
        { label: "Full Payment", value: "Full Payment" },
        { label: "Part Payment", value: "Part Payment" }
    ]

    const payBy = [
        { label: "Cash", value: "Cash" },
        { label: "Cheque", value: "Cheque" },
        { label: "D.D", value: "D.D" },
        { label: "P.O", value: "P.O" }
    ]
    let customers = dataApi.useDataApi(`api/Customer`, initialState.initialCollections);
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let payments = dataApi.useDataApi(`api/PaymentReceive`, initialState.initialCollections);

    // useEffect(() => {
    //     axios.fetchGetData('api/MeasurementUnit', units, setUnits);
    // }, []);

    var data = {
        id: 0,
        no:'',
        branchId: 0,
        customerId: 0,
        invoiceNo: '',
        invoiceDate: new Date(),
        date: new Date(),
        paymentDate: new Date(),
        paymentType: '',
        paidBy: '',
        bank: '',
        bankBranchName: '',
        amount: ''
    }
    let [paymentObj, setPaymentObj] = useState({
        data: data
    })

    return (
        <CCard>
            <Formik
                enableReinitialize
                initialValues={paymentObj.data}
                validationSchema={
                    Yup.object({
                        customerId: Yup.string().required('name is required'),
                        no: Yup.string().required('No is required'),
                        amount: Yup.string().required('Amount is required'),
                    })
                }
                onSubmit={(values, { resetForm }) => {
                    values = {
                        ...values,
                    }
                    if (isAdd) {
                        axios.fetchPostData('api/PaymentReceive', values, () => {
                            payments.refresh();
                        });
                    } else {
                        axios.fetchPutData(`api/PaymentReceive/${values.id}`, values, () => {
                            payments.refresh();
                        });
                    }
                    resetForm();
                    setPaymentObj({
                        data: data
                    })
                }}
            >
                {
                    formProps => {
                        return (
                            <Form>
                                <CCardBody >
                                    <h5 style={{ marginBottom: "20px" }} className='page-title'> Money Receipt</h5>
                                    {/*For Concern?department  section*/}
                                    <CRow>
                                        <CCol md="4">
                                            <SAInput
                                                id="no"
                                                name="no"
                                                type="number"
                                                label="No"
                                                isInline="true"
                                                lSize="4"
                                                isRequired="true"
                                                rSize="8"
                                                labelClassName="float-right"
                                            />
                                        </CCol>
                                        <CCol md=""></CCol>
                                        <CCol md="4">
                                            <SADatePicker
                                                name="date"
                                                label="Date"
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
                                        <CCol md="4">
                                            <SAInput
                                                id="invoiceNo"
                                                name="invoiceNo"
                                                type="text"
                                                label="Invoice No"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                isRequired="true"
                                                labelClassName="float-right"
                                            />
                                        </CCol>
                                        <CCol md="4">
                                            <SADatePicker
                                                name="invoiceDate"
                                                label="Invoice Date"
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
                                                id="paymentType"
                                                name="paymentType"
                                                label="Payment Type"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                options={payType} />
                                        </CCol>
                                        <CCol md="4">
                                            <SAReactAutoSelect
                                                id="paidBy"
                                                name="paidBy"
                                                label="Payment By"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                options={payBy} />
                                        </CCol>
                                        <CCol md="4">
                                            <SADatePicker
                                                name="paymentDate"
                                                label="Payment Date"
                                                labelClassName="float-right"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                isRequired="true"
                                                formProps={formProps}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="dd/MM/yyyy"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4">
                                            <SAInput
                                                id="bank"
                                                name="bank"
                                                type="text"
                                                label="Bank"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                            />
                                        </CCol>
                                        <CCol md="4">
                                            <SAInput
                                                name="bankBranchName"
                                                type="text"
                                                label="Branch"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                            />
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
                                </CCardBody>
                                <CRow className=" mt-4">
                                    <CCol md="12" className="text-center mb-3" >
                                        <CButton size="sm" type="submit" color="success" ><FontAwesomeIcon icon={faSave} />&nbsp;Save</CButton>
                                        <CLink to="/dashboard">
                                            <CButton size="sm" style={{ marginLeft: "20px" }} color="danger" type="rest"><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Exit</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </Form>
                        );
                    }
                }
            </Formik>
            <CDataTable
                items={payments.data.data}
                fields={fields}
                border
                striped
                tableFilter
                pagination
                sorter
                scopedSlots={{
                    'actions':
                        (item) => (
                            <td>
                                <EditIcon
                                    onClick={() => {
                                        setPaymentObj({
                                            ...paymentObj,
                                            data: {
                                                id: item.id,
                                                no: item.no,
                                                paymentType: item.paymentType,
                                                invoiceNo: item.invoiceNo,
                                                invoiceDate: item.invoiceDate,
                                                date: item.date,
                                                paymentDate: item.paymentDate,
                                                paymentType: item.paymentType,
                                                paidBy: item.paidBy,
                                                bank: item.bank,
                                                bankBranchName: item.bankBranchName,
                                                customerId: item.customerId,
                                                amount: item.amount
                                            }
                                        });
                                        // itemId.setData({ data: item.itemId });
                                        setIsAdd(false);
                                    }}
                                />
                                <DeleteIcon
                                    onClick={() => {
                                        setPaymentObj({
                                            ...paymentObj,
                                            data: {
                                                id: item.id
                                            }
                                        });
                                        toggleDeleteModal(true);
                                    }}
                                    style={{
                                        marginLeft: '5%'
                                    }}

                                />
                            </td>
                        )
                }}
            />
            {/*Delete Modal section*/}
            <DeleteModal
                isDelete={isDelete}
                toggleDeleteModal={(flag) => {
                    toggleDeleteModal(flag);
                }}
                deleteOpp={() => {
                    axios.fetchDeleteData(`api/PaymentReceive/${paymentObj.data.id}`, () => {
                        payments.refresh();
                    });
                }}
            />
        </CCard>
    )
}

export default PaymentReceive;