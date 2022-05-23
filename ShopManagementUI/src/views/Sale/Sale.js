import React, { useState, useEffect } from 'react';
import {
    CRow, CCardBody,
    CCol, CButton, CDataTable, CCard, CLink, CTooltip
} from '@coreui/react';
import SAInput from '../FormLib/saInput';
import SADatePicker from '../FormLib/saDatePicker';
import SAReactCreatableAutoSelect from '../FormLib/SAReactCreatableAutoSelect';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';

//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTrash, faTimes, faPrint } from '@fortawesome/free-solid-svg-icons';
import * as axios from '../../axios/axiosLib';
import * as initialState from '../../functionalLib/initialState';
import * as dataApi from '../../customHooks/UseDataApi';
import DeleteModal from '../commonComponents/DeleteModal';
import DeleteIcon from '../commonComponents/DeleteIcon';
import EditIcon from '../commonComponents/EditIcon';
import SADataTable from '../FormLib/saDataTable';
import { apiHostName } from '../../../src/config';

const Sale = () => {
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    var data = {
        id: 0,
        billNo: '',
        saleDate: new Date(),
        customerId: null,
        orderNo: '',
        amount: '',
        paidAmount: 0,
        transactionType: '',
        saleDetails: []
    }
    let [saleObj, setSaleObj] = useState({ data: data });
    let [unitName, setUnitname] = useState('');
    const fields = [
        { key: 'saleDate', label: 'Date' },
        { key: 'orderNo', label: 'Order No' },
        { key: 'customerName', label: 'Name' },
        { key: 'billNo', label: 'Bill No' },
        { key: 'amount', label: 'Amount' },
        'print', 'actions'];

    let dataObj = {
        productId: 0,
        quantity: '',
        rate: '',
        amount: '',
        customerId: null
    };

    const transactionType = [
        { label: "Full Payment", value: "Paid" },
        { label: "Part Payment", value: "Partial" },
        { label: "Full Credit", value: "Credit" },
    ]

    let [dataArr, onSetDataArray] = useState([]);

    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let sales = dataApi.useDataApi(`api/Sale`, initialState.initialCollections);
    const [customer, setCustomer] = useState(initialState.initialCollections);

    useEffect(() => {
        axios.fetchGetData('api/Customer', customer, setCustomer);
    }, []);

    // const [total, setTotal] = useState(0);

    // useEffect(() => {
    //     setTotal(dataArr.reduce((a, b) => a + b.stock, 0).toFixed("2"))
    // }, [dataArr])

    return (
        <>
            <CCard>
                <CCardBody>
                    <h5 style={{ marginBottom: "10px" }} className='page-title'>Product Sale</h5>
                    <CRow>
                        <CCol md="12">
                            <Formik
                                enableReinitialize
                                initialValues={saleObj.data}
                                validationSchema={
                                    Yup.object({
                                        billNo: Yup.string().required('Bill is required'),
                                        amount: Yup.string().required('Amount is required'),
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
                                        if (isAdd) {
                                            axios.fetchPostData('api/Sale', values, () => {
                                                sales.refresh();
                                            });
                                            onSetDataArray([]);
                                        } else {
                                            axios.fetchPutData(`api/Sale/${values.id}`, values, () => {
                                                sales.refresh();
                                            })
                                            onSetDataArray([]);
                                        }
                                        resetForm();
                                        setSaleObj({
                                            data: data
                                        })
                                    }
                                }}
                            >
                                {
                                    formProps => {
                                        return (
                                            <Form>
                                                <div id="accordion" style={{ padding: "0px" }}>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <SADatePicker
                                                                name="saleDate"
                                                                label="Date"
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
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <SAInput
                                                                id="billNo"
                                                                name="billNo"
                                                                type="text"
                                                                label="Bill No."
                                                                isInline="true"
                                                                isRequired="true"
                                                                lSize="4"
                                                                className="text-uppercase"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>

                                                        <CCol md="4">
                                                            <SAInput
                                                                id="orderNo"
                                                                name="orderNo"
                                                                type="text"
                                                                label="Order No"
                                                                isInline="true"
                                                                lSize="4"
                                                                className="text-uppercase"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>

                                                        <CCol md='4'>
                                                            <SAReactCreatableAutoSelect
                                                                name="customerId"
                                                                label="Name"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                                formProps={formProps}
                                                                onHandleCreate={(inputValue, isLoading, setIsLoading) => {
                                                                    axios.fetchPostData('api/Customer', {
                                                                        name: inputValue
                                                                    }, (obj) => {
                                                                        formProps.setFieldValue('name', obj.data.name);
                                                                        setIsLoading(false);
                                                                        axios.fetchGetData('api/Customer', customer, setCustomer);
                                                                    });
                                                                }}
                                                                options={customer.data.map(item => {
                                                                    return { label: item.name, value: item.id }
                                                                })}
                                                            />
                                                        </CCol>

                                                        <CCol md="4">
                                                            <SAInput
                                                                id="amount"
                                                                name="amount"
                                                                type="text"
                                                                label="Total Amount"
                                                                isInline="true"
                                                                isRequired="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <SAReactAutoSelect
                                                                id="transactionType"
                                                                name="transactionType"
                                                                label="Payment Type"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                                formProps={formProps}
                                                                options={transactionType} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <SAInput
                                                                id="paidAmount"
                                                                name="paidAmount"
                                                                type="text"
                                                                label="Paid Amount"
                                                                isInline="true"
                                                                isRequired="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
                                                    </CRow>

                                                    <CRow style={{ marginTop: '10px' }}>
                                                        <SADataTable
                                                            md="12"
                                                            tableName="Product Sale Details:"
                                                            style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', paddingTop: '0px', paddingBottom: '0px' }}
                                                            dataTableStyle={{ maxHeight: '200px', overflow: 'auto' }}
                                                            columns={["Product", "Unit", "Stock", "Sale Quantity", "Actions"]}
                                                            fields={["productId", "unitName", "stock", "quantity"]}
                                                            readOnlyArr={["unitName", "stock", "amount"]}
                                                            dataArr={dataArr}
                                                            dataObj={dataObj}
                                                            onSetDataArray={onSetDataArray}
                                                            // extraRow={<tr>
                                                            //     <td colSpan="2" className="text-right">Total:</td>
                                                            //     <td>{total}</td>
                                                            //     <td colSpan="7"></td>
                                                            // </tr>}
                                                            fieldsTypeWithValue={[

                                                                {
                                                                    thStyle: { width: '50%' },
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
                                                                            axios.fetchGetData(`api/Stock/GetStock/${e.target.value}`, undefined, undefined, (stock) => {
                                                                                axios.fetchGetData(`api/Transfer/LastTransferPrice/${e.target.value}`, undefined, undefined, (lastPrice) => {
                                                                                    let newArr = [...dataArr];
                                                                                    var selectedObj = { ...newArr[indexI] };
                                                                                    selectedObj['unitName'] = response.data.unitName;
                                                                                    selectedObj['stock'] = stock.data;
                                                                                    selectedObj['rate'] = lastPrice.data;
                                                                                    newArr[indexI] = selectedObj;
                                                                                    onSetDataArray(newArr);
                                                                                    setUnitname(response.data.unitName);
                                                                                })
                                                                            })
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
                                                                    thStyle: { width: '10%', textAlign: 'center' },
                                                                    fieldName: 'stock',
                                                                    fieldStyle: { textAlign: 'center' },
                                                                    fieldType: 'text',
                                                                },
                                                                {
                                                                    thStyle: { width: '15%' },
                                                                    fieldName: 'quantity',
                                                                    fieldStyle: { textAlign: 'center' },
                                                                    fieldType: 'NUMBER',
                                                                    min: 0,
                                                                    onChange: (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
                                                                        let newArr = [...dataArr];
                                                                        // var selectedObj = { ...newArr[indexI] };
                                                                        var quantity = parseFloat(e.target.value);
                                                                        var selectedObj = newArr[indexI];
                                                                        selectedObj['quantity'] = quantity;
                                                                        var rate = parseFloat(selectedObj['rate']);
                                                                        var amount = parseFloat(quantity * rate);
                                                                        selectedObj['amount'] = amount;
                                                                        newArr[indexI] = selectedObj;
                                                                        onSetDataArray(newArr);
                                                                    }
                                                                },
                                                                // {
                                                                //     thStyle: { width: '10%' },
                                                                //     fieldName: 'action',
                                                                // }
                                                                // {
                                                                    // thStyle: { width: '10%' },
                                                                    // fieldName: 'rate',
                                                                    // fieldStyle: { textAlign: 'center' },
                                                                    // fieldType: 'NUMBER',
                                                                    // min: 0,
                                                                    // onChange: (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
                                                                    //     let newArr = [...dataArr];
                                                                    //     // var selectedObj = { ...newArr[indexI] };
                                                                    //     var rate = parseFloat(e.target.value);
                                                                    //     var selectedObj = newArr[indexI];
                                                                    //     selectedObj['rate'] = rate;
                                                                    //     // selectedObj['quantity'] = 1;
                                                                    //     var quantity = parseFloat(selectedObj['quantity']);
                                                                    //     var amount = parseFloat(quantity * rate);
                                                                    //     selectedObj['amount'] = amount;
                                                                    //     newArr[indexI] = selectedObj;
                                                                    //     onSetDataArray(newArr);
                                                                    // }
                                                                // },
                                                                // {
                                                                //     thStyle: { width: '15%' },
                                                                //     fieldName: 'amount',
                                                                //     fieldStyle: { textAlign: 'center' },
                                                                //     fieldType: 'NUMBER',
                                                                //     min: 0
                                                                // }
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
                                                            <CButton style={{ marginRight: "20px" }} onClick={() => {
                                                                // setAccordion(!accordion);
                                                                // toggleButtonSymbol(!buttonSymbol);
                                                                // setIsAdd(true);
                                                            }} size="sm" color="success" type="submit"><FontAwesomeIcon icon={faSave} />&nbsp;Save</CButton>
                                                            <CButton onClick={() => {
                                                                onSetDataArray([]);
                                                                // setSaleObj({
                                                                //     data: ''
                                                                // });
                                                                sales.refresh();
                                                            }} size="sm" color="secondary"><FontAwesomeIcon icon={faTimes} />&nbsp;Cancel</CButton>
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
                                                    setSaleObj({
                                                        ...saleObj,
                                                        data: {
                                                            id: item.id,
                                                            saleDate: item.saleDate,
                                                            customerId: item.customerId,
                                                            billNo: item.billNo,
                                                            orderNo: item.orderNo,
                                                            amount: item.amount,
                                                            paidAmount: item.paidAmount,
                                                            transactionType: item.transactionType
                                                        }
                                                    });
                                                    console.log(item);
                                                    setIsAdd(false);
                                                    onSetDataArray(item.saleDetails);
                                                    console.log(item.saleDetails);
                                                    item.saleDetails.forEach(e => {
                                                        e.unitName = e.product.unitName
                                                    })
                                                }}
                                            />
                                            <DeleteIcon
                                                onClick={() => {
                                                    setSaleObj({
                                                        ...saleObj,
                                                        data: {
                                                            id: item.id,
                                                        }
                                                    });
                                                    toggleDeleteModal(true);
                                                }}
                                            />
                                        </td>
                                    ),
                                'print': (item) => (
                                    <td>
                                        <CTooltip content="Sale Print">
                                            <CLink href={`${apiHostName}/api/Report/SaleReport/${item.id}`} target="_blank">
                                                <FontAwesomeIcon icon={faPrint} />
                                            </CLink>
                                        </CTooltip>
                                    </td>
                                )
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
                        axios.fetchDeleteData(`api/Sale/${saleObj.data.id}`, () => {
                            sales.refresh();
                        });
                    }}
                />
            </CCard>
        </>
    );
}

export default Sale;