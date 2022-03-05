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

const CustomerDue = (props) => {
    const [isAdd, setIsAdd] = useState(true);
    const [isDelete, toggleDeleteModal] = useState(false);
    let fields = [
        { key: 'creditDate', label: 'Credit Date' },
        { key: 'branchName', label: 'Branch Name' },
        { key: 'customerName', label: 'Customer Name' },
        { key: 'type', label: 'Type' },
        { key: 'amount', label: 'Amount' },
        'actions'
    ];
    const Type = [
        { label: "Cash", value: "Cash" },
        { label: "Credit", value: "Credit" }
    ]
    let customers = dataApi.useDataApi(`api/Customer`, initialState.initialCollections);
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let customerDues = dataApi.useDataApi(`api/CustomerDue`, initialState.initialCollections);

    // useEffect(() => {
    //     axios.fetchGetData('api/MeasurementUnit', units, setUnits);
    // }, []);

    var data = {
        id: 0,
        branchId: 0,
        customerId: 0,
        type: '',
        creditDate: new Date(),
        challanNo: "",
        amount: ''
    }
    let [customerDueObj, setCustomerDueObj] = useState({
        data: data
    })

    return (
        <CCard>
            <Formik
                enableReinitialize
                initialValues={customerDueObj.data}
                validationSchema={
                    Yup.object({
                        customerId: Yup.string().required('name is required'),
                        branchId: Yup.string().required('name is required'),
                    })
                }
                onSubmit={(values, { resetForm }) => {
                    values = {
                        ...values,
                    }
                    if (isAdd) {
                        axios.fetchPostData('api/CustomerDue', values, () => {
                            customerDues.refresh();
                        });
                    } else {
                        axios.fetchPutData(`api/CustomerDue/${values.id}`, values, () => {
                            customerDues.refresh();
                        });
                    }
                    resetForm();
                    setCustomerDueObj({
                        data: data
                    })
                }}
            >
                {
                    formProps => {
                        return (
                            <Form>
                                <CCardBody >
                                    <h5 style={{ marginBottom: "20px" }} className='page-title'>Customer Dues</h5>
                                    {/*For Concern?department  section*/}
                                    <CRow>
                                        <CCol md="4">
                                            <SADatePicker
                                                name="creditDate"
                                                label="Credit Date"
                                                labelClassName="float-right"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                isRequired="true"
                                                readOnly={true}
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
                items={customerDues.data.data}
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
                                        setCustomerDueObj({
                                            ...customerDueObj,
                                            data: {
                                                id: item.id,
                                                type: item.type,
                                                challanNo: item.challanNo,
                                                creditDate: item.creditDate,
                                                branchId: item.branchId,
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
                                        setCustomerDueObj({
                                            ...customerDueObj,
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
                    axios.fetchDeleteData(`api/CustomerDue/${customerDueObj.data.id}`, () => {
                        customerDues.refresh();
                    });
                }}
            />
        </CCard>
    )
}

export default CustomerDue;