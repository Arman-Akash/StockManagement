import React, { useState } from 'react';
import {
    CRow, CCardBody,
    CCol, CButton, CDataTable, CCard, CLink
} from '@coreui/react';
import SAInput from '../FormLib/saInput';
import SADatePicker from '../FormLib/saDatePicker';
//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as axios from '../../axios/axiosLib';
import * as initialState from '../../functionalLib/initialState';
import * as dataApi from '../../customHooks/UseDataApi';
import DeleteModal from '../commonComponents/DeleteModal';
import DeleteIcon from '../commonComponents/DeleteIcon';
import EditIcon from '../commonComponents/EditIcon';
import SADataTable from '../FormLib/saDataTable';
import SATextArea from '../FormLib/saTextarea';

const Purchase = (props) => {
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    var data = {
        id: 0,
        rcvSerNo: '',
        rcvDate: new Date(),
        rcvFrom: '',
        comment: '',
        receiveDetails: []
    }
    let [receiveObj, setReceiveObj] = useState({ data: data });
    let [unitName, setUnitname] = useState('');
    const fields = ['rcvDate', 'rcvSerNo', 'rcvFrom', 'comment', 'actions'];

    let dataObj = {
        productId: 0,
        quantity: '',
        rate: '',
        amount: '',
        manufactureDate: null,
        expireDate: null,
        shelfNo: ''
    };

    let [dataArr, onSetDataArray] = useState([]);

    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let units = dataApi.useDataApi(`api/Unit`, initialState.initialCollections);
    let productReceives = dataApi.useDataApi(`api/Receive`, initialState.initialCollections);
    let rcvSerNo = dataApi.useDataApi(`api/Receive/RcvSerNo`, initialState.initialCollections);
    return (
        <>
            <CCard>
                <CCardBody>
                    <h5 style={{ marginBottom: "0px" }} className='page-title'>Product Purchase</h5>
                    <CRow>
                        <CCol md="12">
                            <Formik
                                enableReinitialize
                                initialValues={receiveObj.data}
                                validationSchema={
                                    Yup.object({
                                        // rcvSerNo: Yup.string().required('serial no is required'),

                                    })
                                }
                                onSubmit={(values, { resetForm }) => {
                                    values = {
                                        ...values,
                                        rcvSerNo: rcvSerNo.data.data,
                                        details: dataArr
                                    }
                                    if (dataArr.length <= 0) {
                                        alert("Please Enter Product, Unit and Quantity....!")
                                    }
                                    else {
                                        if (isAdd) {
                                            axios.fetchPostData('api/Receive', values, () => {
                                                productReceives.refresh();
                                                rcvSerNo.refresh();
                                            });
                                            onSetDataArray([]);
                                        } else {
                                            axios.fetchPutData(`api/Receive/${values.id}`, values, () => {
                                                productReceives.refresh();
                                                rcvSerNo.refresh();
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
                                                <div style={{ padding: "0px" }}>

                                                    <CRow>
                                                        <CCol md="4">
                                                            <SAInput
                                                                id="rcvSerNo"
                                                                name="rcvSerNo"
                                                                type="text"
                                                                label="Serial No."
                                                                isInline="true"
                                                                isRequired="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                                readOnly={true}
                                                                value={rcvSerNo.data.data}
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <SADatePicker
                                                                id="rcvDate"
                                                                name="rcvDate"
                                                                label="Receive Date"
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
                                                        <CCol md="4" >
                                                            <SAInput
                                                                name="rcvFrom"
                                                                label="Receive From"
                                                                isInline="true"
                                                                type="text"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
                                                        <CCol md='4'>
                                                            <SATextArea
                                                                name="comment"
                                                                label="Rcv. Details"
                                                                isInline="true"
                                                                type="text"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow style={{ marginTop: '10px' }}>
                                                        <SADataTable
                                                            md="12"
                                                            tableName="Details:"
                                                            style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', paddingTop: '0px', paddingBottom: '0px' }}
                                                            dataTableStyle={{ maxHeight: '200px', overflow: 'auto' }}
                                                            columns={["Product", "Unit", "Quantity", "Rate","Amount", "MFG. Date", "EXP. Date", "Actions"]}
                                                            fields={["productId", "unitName", "quantity", "rate","amount", "manufactureDate", "expireDate"]}
                                                            readOnlyArr={["amount", "unitName"]}
                                                            dataArr={dataArr}
                                                            dataObj={dataObj}
                                                            onSetDataArray={onSetDataArray}
                                                            fieldsTypeWithValue={[

                                                                {
                                                                    thStyle: { width: '25%' },
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
                                                                {
                                                                    thStyle: { width: '10%', textAlign: 'center' },
                                                                    fieldName: 'unitName',
                                                                    fieldStyle: { textAlign: 'center' },
                                                                    fieldType: 'text',
                                                                },
                                                                {
                                                                    thStyle: { width: '10%' },
                                                                    fieldName: 'quantity',
                                                                    fieldType: 'NUMBER',
                                                                    fieldStyle: { textAlign: 'center' },
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
                                                                    thStyle: { width: '10%' },
                                                                    fieldName: 'rate',
                                                                    fieldStyle: { textAlign: 'center' },
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
                                                                    thStyle: { width: '10%' },
                                                                    fieldName: 'manufactureDate',
                                                                    dateFormat: 'dd/MM/yyyy',
                                                                    fieldType: 'REACT-DATEPICKER'
                                                                },
                                                                {
                                                                    thStyle: { width: '15%' },
                                                                    fieldName: 'amount',
                                                                    fieldStyle: { textAlign: 'center' },
                                                                    fieldType: 'NUMBER',
                                                                    min: 0
                                                                },
                                                                {
                                                                    thStyle: { width: '10%' },
                                                                    fieldName: 'expireDate',
                                                                    dateFormat: 'dd/MM/yyyy',
                                                                    fieldType: 'REACT-DATEPICKER',
                                                                    fieldStyle: { textAlign: 'center' },
                                                                }
                                                            ]}
                                                            scopedSlots={
                                                                (item) => {
                                                                    return (
                                                                        <td style={{ width: '10px important' }}>
                                                                            <CButton
                                                                                className="deleteIconButton mx-auto d-block"
                                                                                shape="square"
                                                                                size="sm"
                                                                                onClick={() => {
                                                                                    var theArr = [...dataArr];
                                                                                    theArr.splice(item, 1);
                                                                                    onSetDataArray(theArr);
                                                                                }}
                                                                                style={{
                                                                                    marginLeft: '5%'
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                            </CButton>
                                                                        </td>
                                                                    )
                                                                }
                                                            }
                                                        />
                                                    </CRow>
                                                    <CRow>
                                                        <CCol style={{ padding: "10px", textAlign: "center" }} >
                                                            <CButton onClick={() => {
                                                                // setIsAdd(true);
                                                            }} size="sm" color="success" type="submit"><FontAwesomeIcon icon={faSave} />&nbsp;Save</CButton>
                                                            <CButton
                                                                onClick={() => {
                                                                    onSetDataArray([]);
                                                                    setReceiveObj({
                                                                        data: ''
                                                                    });
                                                                }}
                                                                size="sm" style={{ marginLeft: "20px" }} color="secondary" type="rest"><FontAwesomeIcon icon={faTimes} />&nbsp;Cancel</CButton>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </Form>
                                        );
                                    }
                                }
                            </Formik>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CDataTable
                            items={productReceives.data.data}
                            fields={fields}
                            tableFilter
                            addTableClasses="header-text-center"
                            border
                            striped
                            pagination
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
                                                            rcvDate: item.rcvDate,
                                                            rcvFrom: item.rcvFrom,
                                                            comment: item.comment
                                                        }
                                                    });
                                                    rcvSerNo.setData({ data: item.rcvSerNo });
                                                    setUnitname(unitName);
                                                    // axios.fetchGetData(`api/Product/${item.unitName}`, unitName, setUnitname);
                                                    setIsAdd(false);
                                                    onSetDataArray(item.receiveDetails);
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
                        axios.fetchDeleteData(`api/Receive/${receiveObj.data.id}`, () => {
                            productReceives.refresh();
                        });
                    }}
                />
            </CCard>
        </>
    );
}

export default Purchase;