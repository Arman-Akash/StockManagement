import React, { useState } from 'react';
import {
    CCollapse,
    CRow, CCardBody,
    CCol, CButton, CDataTable, CCard, CLink
} from '@coreui/react';
import SADatePicker from '../FormLib/saDatePicker';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SAInput from '../FormLib/saInput';
import SATextArea from '../FormLib/saTextarea';

//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as axios from '../../axios/axiosLib';
import * as initialState from '../../functionalLib/initialState';
import * as dataApi from '../../customHooks/UseDataApi';
import DeleteModal from '../commonComponents/DeleteModal';
// import DeleteIcon from '../commonComponents/DeleteIcon';
import ViewIcon from '../commonComponents/ViewIcon';
import ApproveIcon from '../commonComponents/ApproveIcon';
import SADataTable from '../FormLib/saDataTable';

const Receive = (props) => {
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    var data = {
        id: 0,
        transferDate: new Date(),
        transferChallan: '',
        vehicleNo: '',
        details: '',
        branchId: 0,
        userId: 0,
        rcvFlg: false,
        status: '',
        transferDetails: []
    }
    let [receiveObj, setReceiveObj] = useState({ data: data });
    const [confirmBtn, setConfirmBtn] = useState(true);

    let [unitName, setUnitname] = useState('');
    const fields = ['transferDate',
        { key: 'branchName', label: "From Branch" },
        { key: 'userName', label: "From User" },
        { key: 'receivedUserName', label: "Received By" },
        'vehicleNo', 'details','status', 'actions'];

    let dataObj = {
        productId: 0,
        quantity: '',
        rate: '',
        amount: ''
    };

    let [dataArr, onSetDataArray] = useState([]);
    const [accordion, setAccordion] = useState(false);

    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let users = dataApi.useDataApi(`api/Account`, initialState.initialCollections);
    let receives = dataApi.useDataApi(`api/Transfer/RevPendingByTransferredId`, initialState.initialCollections);
    let transferChallan = dataApi.useDataApi(`api/Transfer/TransferChallan`, initialState.initialCollections);

    return (
        <>
            <CCard>
                <CCardBody>
                    <h5 style={{ marginBottom: "10px" }} className='page-title'>Product Receive</h5>
                    <CRow>
                        <CCol md="12">
                            <Formik
                                enableReinitialize
                                initialValues={receiveObj.data}
                                validationSchema={
                                    Yup.object({

                                    })
                                }
                                onSubmit={(values, { resetForm }) => {
                                    values = {
                                        ...values,
                                        transferChallan: transferChallan.data.data,
                                        transferDetails: dataArr,
                                    }
                                    if (dataArr.length <= 0) {
                                        alert("Please Enter Product, Quantity and Rate....!")
                                    }
                                    else {
                                        if (isAdd) {
                                            axios.fetchPostData('api/Transfer', values, () => {
                                                receives.refresh();
                                            });
                                            onSetDataArray([]);
                                        } else {
                                            axios.fetchPutData(`api/Transfer/Receive/${values.id}`, values, () => {
                                                receives.refresh();
                                            })
                                            onSetDataArray([]);
                                        }
                                        resetForm();
                                        setReceiveObj({
                                            data: data
                                        })
                                    }
                                    // resetForm();
                                }}
                            >
                                {
                                    formProps => {
                                        return (
                                            <Form>
                                                <CCollapse show={accordion}>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <SAInput
                                                                id="transferChallan"
                                                                name="transferChallan"
                                                                type="text"
                                                                label="Transfer Challan"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                                readOnly={true}
                                                            // value={transferChallan.data.data}
                                                            />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <SADatePicker
                                                                name="transferDate"
                                                                label="Transfer Date"
                                                                labelClassName="float-right"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                readOnly={true}
                                                                formProps={formProps}
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="dd/MM/yyyy"
                                                            />
                                                        </CCol>
                                                        <CCol md='4'>
                                                            <SAReactAutoSelect
                                                                name="branchId"
                                                                label="From Branch"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                isDisabled={true}
                                                                labelClassName="float-right"
                                                                formProps={formProps}
                                                                options={branches.data.data.map(item => {
                                                                    return { label: item.name, value: item.id }
                                                                })}
                                                            />
                                                        </CCol>
                                                        <CCol md='4'>
                                                            <SAReactAutoSelect
                                                                name="userId"
                                                                label="From User"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                isDisabled={true}
                                                                labelClassName="float-right"
                                                                formProps={formProps}
                                                                options={users.data.data.map(item => {
                                                                    return { label: item.username, value: item.id }
                                                                })}
                                                            />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <SAInput
                                                                id="vehicleNo"
                                                                name="vehicleNo"
                                                                type="text"
                                                                label="Vehicle No"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                readOnly="true"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <SATextArea
                                                                id="details"
                                                                name="details"
                                                                type="text"
                                                                label="Details"
                                                                isInline="true"
                                                                readOnly="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
                                                    </CRow>

                                                    <CRow style={{ marginTop: '10px' }}>
                                                        <SADataTable
                                                            md="12"
                                                            tableName="Product Transfer Details:"
                                                            style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', paddingTop: '0px', paddingBottom: '0px' }}
                                                            dataTableStyle={{ maxHeight: '200px', overflow: 'auto' }}
                                                            columns={["Product", "Unit", "Transfer Quantity", "Rate", "Amount"]}
                                                            fields={["productId", "unitName", "quantity", "rate", "amount"]}
                                                            readOnlyArr={["productId","unitName","quantity", "rate", "amount"]}
                                                            dataArr={dataArr}
                                                            dataObj={dataObj}
                                                            onSetDataArray={onSetDataArray}
                                                            fieldsTypeWithValue={[

                                                                {
                                                                    thStyle: { width: '30%' },
                                                                    fieldName: 'productId',
                                                                    fieldType: 'REACT-SELECT',
                                                                    isDisabled: true,
                                                                    options: products.data.data?.map(product => {
                                                                        return {
                                                                            name: product.productCode + " " + product.productName,
                                                                            value: product.id
                                                                        }
                                                                    })
                                                                },
                                                                {
                                                                    thStyle: { width: '10%', textAlign: 'center' },
                                                                    fieldName: 'unitName',
                                                                    fieldStyle: { textAlign: 'center' },
                                                                    fieldType: 'text',
                                                                },
                                                                {
                                                                    thStyle: { width: '15%' },
                                                                    fieldName: 'quantity',
                                                                    fieldType: 'text'
                                                                },
                                                                {
                                                                    thStyle: { width: '15%' },
                                                                    fieldName: 'rate',
                                                                    fieldType: 'text',
                                                                },
                                                                {
                                                                    thStyle: { width: '20%' },
                                                                    fieldName: 'amount',
                                                                    fieldType: 'text'
                                                                }
                                                            ]}
                                                        />
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md={{ size: 12 }} style={{ padding: "10px", textAlign: "center" }} >
                                                        {
                                                            confirmBtn ? <>  
                                                        <CButton style={{ marginRight: "20px" }} onClick={() => {
                                                            }} size="sm" color="info" type="submit"><FontAwesomeIcon icon={faSave} />&nbsp;Confirm</CButton>
                                                            </> : null
                                                        }
                                                            <CButton onClick={() => {
                                                                onSetDataArray([]);
                                                                setAccordion(false);
                                                            }} size="sm" color="secondary" type="button">
                                                                <FontAwesomeIcon icon={faTimes} />&nbsp;Cancel
                                                            </CButton>
                                                        </CCol>
                                                    </CRow>
                                                </CCollapse>
                                            </Form>
                                        );
                                    }
                                }
                            </Formik>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CDataTable
                            items={receives.data.data}
                            fields={fields}
                            tableFilter
                            addTableClasses="header-text-center"
                            border
                            striped
                            pagination
                            // sorter
                            scopedSlots={{
                                'actions':
                                    (item) => (
                                        <td>
                                        {
                                            item.status == "Pending" ? <>
                                            <ApproveIcon
                                                onClick={() => {
                                                    setConfirmBtn(true);
                                                    setReceiveObj({
                                                        ...receiveObj,
                                                        data: {
                                                            id: item.id,
                                                            transferDate: item.transferDate,
                                                            transferChallan: item.transferChallan,
                                                            branchId: item.branchId,
                                                            vehicleNo: item.vehicleNo,
                                                            details: item.details,
                                                            userId: item.userId,
                                                            rcvFlg: false
                                                        }
                                                    });
                                                    transferChallan.setData({ data: item.transferChallan });
                                                    setUnitname(unitName);
                                                    setAccordion(true);
                                                    setIsAdd(false);
                                                    onSetDataArray(item.transferDetails);
                                                }}
                                            />
                                            </> :
                                            <ViewIcon
                                            onClick={() => {
                                                setConfirmBtn(false);
                                                setReceiveObj({
                                                    ...receiveObj,
                                                    data: {
                                                        id: item.id,
                                                        transferDate: item.transferDate,
                                                        transferChallan: item.transferChallan,
                                                        branchId: item.branchId,
                                                        vehicleNo: item.vehicleNo,
                                                        details: item.details,
                                                        userId: item.userId,
                                                        rcvFlg: false
                                                    }
                                                });
                                                transferChallan.setData({ data: item.transferChallan });
                                                setUnitname(unitName);
                                                setAccordion(true);
                                                setIsAdd(false);
                                                onSetDataArray(item.transferDetails);
                                            }}
                                        />
                                    }
                                        </td>
                                    ),
                            }}
                        />
                    </CRow>
                    <CRow className="text-center">
                        <CCol textAlign="center">

                            <CLink to="/dashboard">
                                <CButton size="sm" style={{ marginLeft: "20px" }} color="danger" type="button"><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Exit</CButton>
                            </CLink>
                        </CCol>
                    </CRow>
                </CCardBody>
                <DeleteModal
                    isDelete={isDelete}
                    toggleDeleteModal={toggleDeleteModal}
                    deleteOpp={() => {
                        axios.fetchDeleteData(`api/Transfer/${receiveObj.data.id}`, () => {
                            receives.refresh();
                        });
                    }}
                />
            </CCard>
        </>
    );
}

export default Receive;