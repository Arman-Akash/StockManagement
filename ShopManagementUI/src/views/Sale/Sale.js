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

const Sale = (props) => {
    let [buttonSymbol, toggleButtonSymbol] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    var data = {
        id: 0,
        saleDate: new Date(),
        customerId: 0,
        challanNo: '',
        saleDetails: []
    }
    let [challanObj, setChallanObj] = useState({ data: data });
    let [challanNo, setChallanNo] = useState('');
    let [unitName, setUnitname] = useState('');
    const fields = ['saleDate', 'challanNo', 'customerName', 'actions'];

    let dataObj = {
        productId: 0,
        quantity: '',
        rate: '',
        amount: ''
    };

    let [dataArr, onSetDataArray] = useState([]);

    const [accordion, setAccordion] = useState(false);
    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let sales = dataApi.useDataApi(`api/Sale`, initialState.initialCollections);
    let customers = dataApi.useDataApi(`api/Customer`, initialState.initialCollections);
    let clnNo = dataApi.useDataApi(`api/Sale/ChallanNo`, initialState.initialCollections);
    return (
        <>
            <CCard>
                <CCardBody>
                    <h5 style={{ marginBottom: "0px" }} className='page-title'>Product Sale</h5>
                    <CRow>
                        <CCol md="12">
                            <Formik
                                enableReinitialize
                                initialValues={challanObj.data}
                                validationSchema={
                                    Yup.object({

                                    })
                                }
                                onSubmit={(values, { resetForm }) => {
                                    values = {
                                        ...values,
                                        saleDetails: dataArr,
                                    }
                                    if (dataArr.length <= 0) {
                                        alert("Please Enter Product, Quantity and Rate....!")
                                    }
                                    else {
                                        values.challanNo = clnNo.data.data;
                                        if (isAdd) {
                                            axios.fetchPostData('api/Sale', values, () => {
                                                sales.refresh();
                                                clnNo.refresh();
                                            });
                                        } else {
                                            axios.fetchPutData(`api/Sale/${values.id}`, values, () => {
                                                sales.refresh();
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
                                                        <CCol md={{ offset: 10, size: 2 }} style={{ marginBottom: '6px' }}>
                                                            <CTooltip content={buttonSymbol ? "Close" : "Add"}>
                                                                <CButton
                                                                    className="btn add-btn btn-sm float-right btn-circle"
                                                                    onClick={() => {
                                                                        setAccordion(!accordion);
                                                                        toggleButtonSymbol(!buttonSymbol);
                                                                        setIsAdd(true);
                                                                        setChallanObj({
                                                                            data: data
                                                                        });
                                                                        setChallanNo(clnNo.data.data);
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
                                                                <SADatePicker
                                                                    name="saleDate"
                                                                    label="Sale Date"
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
                                                                <SAInput
                                                                    id="challanNo"
                                                                    name="challanNo"
                                                                    type="text"
                                                                    label="Challan No."
                                                                    isInline="true"
                                                                    isRequired="true"
                                                                    lSize="4"
                                                                    rSize="8"
                                                                    labelClassName="float-right"
                                                                    readOnly={true}
                                                                    value={challanNo}
                                                                />
                                                            </CCol>

                                                            <CCol md='4'>
                                                                <SAReactAutoSelect
                                                                    name="customerId"
                                                                    label="Customer"
                                                                    isInline="true"
                                                                    lSize="4"
                                                                    rSize="8"
                                                                    labelClassName="float-right"
                                                                    formProps={formProps}
                                                                    options={customers.data.data.map(item => {
                                                                        return { label: item.name, value: item.id }
                                                                    })}
                                                                />
                                                            </CCol>
                                                        </CRow>

                                                        <CRow style={{ marginTop: '10px' }}>
                                                            <SADataTable
                                                                md="12"
                                                                tableName="Product Sale Details:"
                                                                style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', paddingTop: '0px', paddingBottom: '0px' }}
                                                                dataTableStyle={{ maxHeight: '200px', overflow: 'auto' }}
                                                                columns={["Product", "Unit", "Sale Quantity", "Rate", "Amount", "Actions"]}
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
                                                                                name: product.productCode + "-" + product.productName,
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
                            items={sales.data.data}
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
                                                    setChallanObj({
                                                        ...challanObj,
                                                        data: {
                                                            id: item.id,
                                                            buyerName: item.buyerName,
                                                            orderDate: item.orderDate,
                                                            buyerAddress: item.buyerAddress,
                                                            buyerPhnNo: item.buyerPhnNo,
                                                            purchaseDate: item.purchaseDate,
                                                            deleveryType: item.deleveryType,
                                                            advancedType: item.advancedType,
                                                            challanNo: item.challanNo,
                                                            advancedAmount: item.advancedAmount,
                                                            deleveryDate: item.deleveryDate
                                                        }
                                                    });
                                                    setChallanNo(item.challanNo);
                                                    console.log(item);
                                                    // axios.fetchGetData(`api/Supplier/${item.supplier.address}`, address, setAddress);
                                                    setAccordion(!accordion);
                                                    toggleButtonSymbol(!buttonSymbol);
                                                    setIsAdd(false);
                                                    onSetDataArray(item.saleDetails);
                                                }}
                                            />
                                            <DeleteIcon
                                                onClick={() => {
                                                    setChallanObj({
                                                        ...challanObj,
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
                        axios.fetchDeleteData(`api/Sale/${challanObj.data.id}`, () => {
                            sales.refresh();
                        });
                    }}
                />
            </CCard>
        </>
    );
}

export default Sale;