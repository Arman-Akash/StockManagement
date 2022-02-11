import React, { useState } from 'react';
import {
    CCollapse,
    CRow, CCardBody, CTooltip,
    CCol, CButton, CDataTable, CCard, CLink
} from '@coreui/react';
import SAInput from '../FormLib/saInput';
import SADatePicker from '../FormLib/saDatePicker';
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
import SATextArea from '../FormLib/saTextarea';

const WarehouseReceive = (props) => {
    let [buttonSymbol, toggleButtonSymbol] = useState(false);
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
    let [rcvSerNo, setRcvSerNo] = useState('');
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

    const [accordion, setAccordion] = useState(false);
    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let units = dataApi.useDataApi(`api/Unit`, initialState.initialCollections);
    let productReceives = dataApi.useDataApi(`api/Receive`, initialState.initialCollections);
    let rcvSerNbr = dataApi.useDataApi(`api/Receive/RcvSerNo`, initialState.initialCollections);
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
                                        receiveDetails: dataArr,
                                    }
                                    if (dataArr.length <= 0) {
                                        alert("Please Enter Product, Unit and Quantity....!")
                                    }
                                    else {
                                        values.rcvSerNo = rcvSerNbr.data.data;
                                        if (isAdd) {
                                            axios.fetchPostData('api/Receive', values, () => {
                                                productReceives.refresh();
                                                rcvSerNbr.refresh();
                                            });
                                        } else {
                                            axios.fetchPutData(`api/Receive/${values.id}`, values, () => {
                                                productReceives.refresh();
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
                                                <div id="accordion" style={{ padding: "0px" }}>
                                                    <CRow>
                                                        <CCol md={{ offset: 10, size: 2 }}>
                                                            <CTooltip content={buttonSymbol ? "Close" : "Add"}>
                                                                <CButton
                                                                    className="btn add-btn btn-sm float-right btn-circle"
                                                                    onClick={() => {
                                                                        setAccordion(!accordion);
                                                                        toggleButtonSymbol(!buttonSymbol);
                                                                        setIsAdd(true);
                                                                        setReceiveObj({
                                                                            data: data
                                                                        });
                                                                        setRcvSerNo(rcvSerNbr.data.data);
                                                                        onSetDataArray([]);
                                                                    }}
                                                                >
                                                                    {buttonSymbol ? (<><FontAwesomeIcon icon={faMinus} /> Close</>) : (<><FontAwesomeIcon icon={faPlus} /> Add</>)}
                                                                </CButton>
                                                            </CTooltip>
                                                        </CCol>
                                                    </CRow>
                                                    <CCollapse show={accordion}>
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
                                                                    value={rcvSerNo}
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
                                                                tableName="Product Receive Details:"
                                                                style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', paddingTop: '0px', paddingBottom: '0px' }}
                                                                dataTableStyle={{ maxHeight: '200px', overflow: 'auto' }}
                                                                columns={["Product", "Unit", "Quantity", "Rate", "Mnf. Date","Amount","Exp. Date", "Actions"]}
                                                                fields={["productId", "unitName", "quantity", "rate", "manufactureDate","amount","expireDate"]}
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
                                                                        thStyle: { width: '10%' },
                                                                        fieldName: 'unitId',
                                                                        fieldType: 'REACT-SELECT',
                                                                        options: units.data.data?.map(unit => {
                                                                            return {
                                                                                name: unit.name,
                                                                                value: unit.id
                                                                            }
                                                                        })
                                                                    },
                                                                    {
                                                                        thStyle: { width: '10%' },
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
                                                                        thStyle: { width: '10%' },
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
                                                                        thStyle: { width: '10%' },
                                                                        fieldName: 'manufactureDate',
                                                                        fieldType: 'REACT-DATEPICKER'
                                                                    },
                                                                    {
                                                                        thStyle: { width: '15%' },
                                                                        fieldName: 'amount',
                                                                        fieldType: 'NUMBER',
                                                                        min: 0
                                                                    },
                                                                    {
                                                                        thStyle: { width: '10%' },
                                                                        fieldName: 'expireDate',
                                                                        fieldType: 'REACT-DATEPICKER'
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
                                                            <CCol md={{ size: 12 }} style={{ padding: "10px", textAlign: "center" }} >
                                                                <CButton onClick={() => {
                                                                    // setAccordion(!accordion);
                                                                    // toggleButtonSymbol(!buttonSymbol);
                                                                    // setIsAdd(true);
                                                                }} size="sm" color="success" type="submit"><FontAwesomeIcon icon={faSave} />&nbsp;Save</CButton>

                                                            </CCol>
                                                        </CRow>
                                                    </CCollapse>
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
                                                            rcvDate: item.rcvDate,
                                                            rcvFrom: item.rcvFrom,
                                                            comment: item.comment,
                                                            rcvSerNo: item.rcvSerNo
                                                        }
                                                    });
                                                    setRcvSerNo(item.rcvSerNo);
                                                    console.log(item);
                                                    setUnitname(unitName);
                                                    // axios.fetchGetData(`api/Product/${item.unitName}`, unitName, setUnitname);
                                                    setAccordion(!accordion);
                                                    toggleButtonSymbol(!buttonSymbol);
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

export default WarehouseReceive;