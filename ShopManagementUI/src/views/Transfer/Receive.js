import React, { useState } from 'react';
import {
    CCollapse,
    CRow, CCardBody, CTooltip,
    CCol, CButton, CDataTable, CCard, CLink
} from '@coreui/react';
import SAInput from '../FormLib/saInput';
import SADatePicker from '../FormLib/saDatePicker';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';

//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as axios from '../../axios/axiosLib';
import * as initialState from '../../functionalLib/initialState';
import * as dataApi from '../../customHooks/UseDataApi';
import DeleteModal from '../commonComponents/DeleteModal';
import DeleteIcon from '../commonComponents/DeleteIcon';
import EditIcon from '../commonComponents/EditIcon';
import SADataTable from '../FormLib/saDataTable';

const Receive = (props) => {
    let [buttonSymbol, toggleButtonSymbol] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    var data = {
        id: 0,
        transferDate: new Date(),
        branchId: 0,
        userId: 0,
        rcvFlg: false,
        transferDetails: []
    }
    let [receiveObj, setReceiveObj] = useState({ data: data });
    let [unitName, setUnitname] = useState('');
    const fields = ['transferDate', 'fromBrach', 'fromUser','status', 'actions'];

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
    let users = dataApi.useDataApi(`api/User`, initialState.initialCollections);
    let transfers = dataApi.useDataApi(`api/Transfer`, initialState.initialCollections);
    return (
        <>
            <CCard>
                <CCardBody>
                    <h5 style={{ marginBottom: "0px" }} className='page-title'>Product Receive</h5>
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
                                        transferDetails: dataArr,
                                    }
                                    if (dataArr.length <= 0) {
                                        alert("Please Enter Product, Quantity and Rate....!")
                                    }
                                    else {
                                        if (isAdd) {
                                            axios.fetchPostData('api/Transfer', values, () => {
                                                transfers.refresh();
                                            });
                                        } else {
                                            axios.fetchPutData(`api/Transfer/${values.id}`, values, () => {
                                                transfers.refresh();
                                            })
                                        }
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
                                                                <SADatePicker
                                                                    name="transferDate"
                                                                    label="Transfer Date"
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
                                                            <CCol md='4'>
                                                            <SAReactAutoSelect
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
                                                                })}
                                                            />
                                                        </CCol>

                                                        <CCol md='4'>
                                                        <SAReactAutoSelect
                                                            name="userId"
                                                            label="User"
                                                            isRequired="true"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            formProps={formProps}
                                                            options={users.data.data.map(item => {
                                                                return { label: item.name, value: item.id }
                                                            })}
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
                                                                readOnlyArr={["unitName", "amount"]}
                                                                dataArr={dataArr}
                                                                dataObj={dataObj}
                                                                onSetDataArray={onSetDataArray}
                                                                fieldsTypeWithValue={[

                                                                    {
                                                                        thStyle: { width: '30%' },
                                                                        fieldName: 'productId',
                                                                        fieldType: 'REACT-SELECT',
                                                                        options: products.data.data?.map(product => {
                                                                            return {
                                                                                name: product.productCode + " " + product.productName,
                                                                                value: product.id
                                                                            }
                                                                        }),
                                                                        onOptionChangeHandler: (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
                                                                            axios.fetchGetData(`api/Product/${e.target.value}`, unitName, setUnitname, (response) => {
                                                                                console.log(response.data.unitName);
                                                                                let newArr = [...dataArr];
                                                                                var selectedObj = { ...newArr[indexI] };
                                                                                selectedObj['unitName'] = response.data.unitName;
                                                                                newArr[indexI] = selectedObj;
                                                                                console.log(newArr);
                                                                                onSetDataArray(newArr);
                                                                                setUnitname(response.data.unitName);
                                                                            });
                                                                        }
                                                                    },
                                                                    // {
                                                                    //     thStyle: { width: '10%' },
                                                                    //     fieldName: 'unitId',
                                                                    //     fieldType: 'REACT-SELECT',
                                                                    //     options: units.data.data?.map(unit => {
                                                                    //         return {
                                                                    //             name: unit.name,
                                                                    //             value: unit.id
                                                                    //         }
                                                                    //     })
                                                                    // },
                                                                    {
                                                                        thStyle: { width: '15%' },
                                                                        fieldName: 'quantity',
                                                                        fieldType: 'NUMBER',
                                                                        min: 0,
                                                                        onChange: (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
                                                                            let newArr = [...dataArr];
                                                                            var selectedObj = { ...newArr[indexI] };
                                                                            var quantity = parseFloat(e.target.value);
                                                                            var selectedObj = newArr[indexI];
                                                                            selectedObj['quantity'] = quantity;
                                                                            selectedObj['rate'] = 1;
                                                                            var rate = parseFloat(selectedObj['rate']);
                                                                            var amount = parseFloat(quantity * rate);
                                                                            selectedObj['amount'] = amount;
                                                                            newArr[indexI] = selectedObj;
                                                                            onSetDataArray(newArr);
                                                                        }
                                                                    },
                                                                    {
                                                                        thStyle: { width: '15%' },
                                                                        fieldName: 'rate',
                                                                        fieldType: 'NUMBER',
                                                                        min: 0,
                                                                        onChange: (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
                                                                            let newArr = [...dataArr];
                                                                            var selectedObj = { ...newArr[indexI] };
                                                                            var rate = parseFloat(e.target.value);
                                                                            var selectedObj = newArr[indexI];
                                                                            selectedObj['rate'] = rate;
                                                                            // selectedObj['quantity'] = 1;
                                                                            var quantity = parseFloat(selectedObj['quantity']);
                                                                            var amount = parseFloat(quantity * rate);
                                                                            selectedObj['amount'] = amount;
                                                                            newArr[indexI] = selectedObj;
                                                                            onSetDataArray(newArr);
                                                                        }
                                                                    },
                                                                    {
                                                                        thStyle: { width: '20%' },
                                                                        fieldName: 'amount',
                                                                        fieldType: 'NUMBER',
                                                                        min: 0
                                                                    }
                                                                ]}
                                                            />
                                                        </CRow>
                                                        <CRow>
                                                            <CCol md={{ size: 12 }} style={{ padding: "10px", textAlign: "center" }} >
                                                                <CButton onClick={() => {
                                                                    // setAccordion(!accordion);
                                                                    // toggleButtonSymbol(!buttonSymbol);
                                                                    // setIsAdd(true);
                                                                }} size="sm" color="success" type="submit"><FontAwesomeIcon icon={faSave} />&nbsp;Save</CButton>

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
                            items={transfers.data.data}
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
                                            <EditIcon
                                                onClick={() => {
                                                    setReceiveObj({
                                                        ...receiveObj,
                                                        data: {
                                                            id: item.id,
                                                            transferDate: item.transferDate,
                                                            branchId: item.branchId,
                                                            userId: item.userId,
                                                            rcvFlg: false
                                                        }
                                                    });
                                                    console.log(item);
                                                    // axios.fetchGetData(`api/Supplier/${item.supplier.address}`, address, setAddress);
                                                    setAccordion(!accordion);
                                                    toggleButtonSymbol(!buttonSymbol);
                                                    setIsAdd(false);
                                                    onSetDataArray(item.transferDetails);
                                                }}
                                            />
                                            <DeleteIcon
                                                onClick={() => {
                                                    setReceiveObj({
                                                        ...receiveObj,
                                                        data: {
                                                            id: item.id,
                                                        }
                                                    });
                                                    toggleDeleteModal(true);
                                                }}
                                            />
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
                            transfers.refresh();
                        });
                    }}
                />
            </CCard>
        </>
    );
}

export default Receive;