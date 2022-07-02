import React, { useState } from 'react';
import {
    CRow, CCardBody,
    CCol, CButton, CDataTable, CCard, CLink, CTooltip,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';
import SAInput from '../FormLib/saInput';
import SADatePicker from '../FormLib/saDatePicker';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';

//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTimes, faTrash, faEye, faPrint, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as axios from '../../axios/axiosLib';
import * as initialState from '../../functionalLib/initialState';
import * as dataApi from '../../customHooks/UseDataApi';
import DeleteModal from '../commonComponents/DeleteModal';
import DeleteIcon from '../commonComponents/DeleteIcon';
import EditIcon from '../commonComponents/EditIcon';
import SADataTable from '../FormLib/saDataTable';
import { apiHostName } from '../../../src/config';
import SACheckBox from '../FormLib/saCheckbox'

const Transfer = (props) => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    var data = {
        id: 0,
        transferDate: new Date(),
        transferChallan: '',
        vehicleNo: '',
        details: '',
        transferedBranchId: 0,
        rcvFlg: false,
        isPrinted: false,
        status: '',
        transferDetails: []
    }
    let [transferObj, setTransferObj] = useState({ data: data });
    const [saveBtn, setSaveBtn] = useState(true);
    let [checkBoxArr, setCheckboxArr] = useState({
        issPrintedArr: []
    });
    const handleIsPrintedChange = (obj, prop, val) => {

    }
    const fields = [{ key: 'transferChallan', _style: { textAlign: "center" } },
    { key: 'transferDate', _style: { textAlign: "center" } },
    { key: 'transferBranch', label: 'From Branch', _style: { textAlign: "center" } },
    { key: 'transferedBranch', label: 'To Branch', _style: { textAlign: "center" } },
    { key: 'vehicleNo', _style: { textAlign: "center" } },
    { key: 'details', _style: { textAlign: "center" } },
    { key: 'status', _style: { textAlign: "center" } },
    { key: 'print', _style: { textAlign: "center" } }, 'actions'];

    let dataObj = {
        productId: 0,
        quantity: '',
        rate: '',
        amount: ''
    };
    let [dataArr, onSetDataArray] = useState([]);

    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let transfers = dataApi.useDataApi(`api/Transfer`, initialState.initialCollections);

    return (
        <>
            <CCard>
                <CCardBody>
                    <h5 style={{ marginBottom: "10px" }} className='page-title'>Product Transfer</h5>
                    <CRow>
                        <CCol md="12">
                            <Formik
                                enableReinitialize
                                initialValues={transferObj.data}
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
                                            axios.fetchPostData('api/Transfer', values, undefined, (response) => {
                                                transfers.refresh();
                                            });
                                            onSetDataArray([]);
                                        } else {
                                            axios.fetchPutData(`api/Transfer/${values.id}`, values, () => {
                                                transfers.refresh();
                                            })
                                            onSetDataArray([]);
                                        }
                                        resetForm();
                                        setTransferObj({
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
                                                <div id="accordion" style={{ padding: "0px" }}>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <SAInput
                                                                id="transferChallan"
                                                                name="transferChallan"
                                                                type="text"
                                                                label="Transfer Challan"
                                                                isInline="true"
                                                                isRequired="true"
                                                                className="text-uppercase"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
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
                                                                name="transferedBranchId"
                                                                label="To Branch"
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
                                                        <CCol md="4">
                                                            <SAInput
                                                                id="vehicleNo"
                                                                name="vehicleNo"
                                                                type="text"
                                                                label="Vehicle No"
                                                                isInline="true"
                                                                lSize="4"
                                                                className="text-uppercase"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol>
                                                        {/* <CCol md="4">
                                                            <SATextArea
                                                                id="details"
                                                                name="details"
                                                                type="text"
                                                                label="Details"
                                                                isInline="true"
                                                                className="text-uppercase"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="float-right"
                                                            />
                                                        </CCol> */}
                                                    </CRow>

                                                    <CRow style={{ marginTop: '10px' }}>
                                                        <SADataTable
                                                            md="12"
                                                            tableName="Product Transfer Details:"
                                                            style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', paddingTop: '0px', paddingBottom: '0px' }}
                                                            dataTableStyle={{ maxHeight: '200px', overflow: 'auto' }}
                                                            columns={["Product", "Unit", "Stock", "Transfer Quantity", "Rate", "Amount", "Actions"]}
                                                            fields={["productId", "unitName", "stock", "quantity", "rate", "amount"]}
                                                            readOnlyArr={["unitName", "amount", "stock"]}
                                                            dataArr={dataArr}
                                                            dataObj={dataObj}
                                                            onSetDataArray={onSetDataArray}
                                                            fieldsTypeWithValue={[
                                                                {
                                                                    thStyle: { width: '37%' },
                                                                    fieldName: 'productId',
                                                                    fieldType: 'REACT-SELECT',
                                                                    options: products.data.data?.map(product => {
                                                                        return {
                                                                            name: product.productCode + " " + product.productName,
                                                                            value: product.id
                                                                        }
                                                                    }),
                                                                    onOptionChangeHandler: (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
                                                                        axios.fetchGetData(`api/Product/${e.target.value}`, undefined, undefined, (response) => {
                                                                            axios.fetchGetData(`api/Stock/GetStock/${e.target.value}`, undefined, undefined, (stock) => {
                                                                                axios.fetchGetData(`api/purchase/LastOSPrice/${e.target.value}`, undefined, undefined, (lastPrice) => {
                                                                                    let newArr = [...dataArr];
                                                                                    var selectedObj = { ...newArr[indexI] };
                                                                                    selectedObj['unitName'] = response.data.unitName;
                                                                                    selectedObj['stock'] = stock.data;
                                                                                    selectedObj['rate'] = lastPrice.data;
                                                                                    console.log(selectedObj['rate']);
                                                                                    console.log(stock.data);
                                                                                    newArr[indexI] = selectedObj;
                                                                                    onSetDataArray(newArr);
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
                                                                    thStyle: { width: '15%' },
                                                                    fieldName: 'quantity',
                                                                    fieldStyle: { textAlign: 'center' },
                                                                    fieldType: 'NUMBER',
                                                                    min: 0,
                                                                    onChange: (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
                                                                        let newArr = [...dataArr];
                                                                        var selectedObj = { ...newArr[indexI] };
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
                                                                {
                                                                    thStyle: { width: '15%' },
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
                                                                    fieldName: 'amount',
                                                                    fieldStyle: { textAlign: 'center' },
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
                                                            {
                                                                saveBtn ? <>
                                                                    <CButton style={{ marginRight: "20px" }} onClick={() => {
                                                                    }} size="sm" color="success" type="submit"><FontAwesomeIcon icon={faSave} />&nbsp;Save</CButton>
                                                                </> : null
                                                            }
                                                            <CButton onClick={() => {
                                                                onSetDataArray([]);
                                                                setTransferObj({
                                                                    data: ''
                                                                });
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
                        <CModal
                            show={isOpen}
                            onClose={() => toggleModal(!isOpen)}
                            style={{ marginLeft: "0px" }}
                            color="primary"
                        >
                            <Formik
                                enableReinitialize
                                initialValues={transferObj}
                                validationSchema={Yup.object({})}
                                onSubmit={(values, { resetForm }) => {
                                    // console.log('Inside submit');
                                    if (isAdd) {
                                        axios.fetchPostData(
                                            "api/Transfer",
                                            values,
                                            () => {
                                                transfers.refresh();
                                            }
                                        );
                                    } else {
                                        axios.fetchPutData(
                                            `api/Transfer/${values.id}`,
                                            values,
                                            () => {
                                                transfers.refresh();
                                            }
                                        );
                                    }
                                    resetForm();
                                    toggleModal(false);
                                }}
                            >
                                {(formProps) => {
                                    return (
                                        <>
                                            <CModalHeader closeButton>
                                                <CModalTitle>
                                                    Iss Printed
                                                </CModalTitle>
                                            </CModalHeader>
                                            <Form>
                                                <CModalBody>
                                                    {/* Provide name*/}
                                                    <CCol md="12">
                                                        <SACheckBox
                                                            id="isPrinted"
                                                            name="Is Printed?"
                                                            lSize="3"
                                                            rSize="8"
                                                            isInline="true"
                                                            handleChange={handleIsPrintedChange}
                                                            formProps={formProps}
                                                            options={[{
                                                                id: 'isPrinted',
                                                                value: 'true',
                                                                title: 'Is Printed?'
                                                            }]}
                                                        />
                                                    </CCol>
                                                </CModalBody>
                                                <CModalFooter>
                                                    <CButton
                                                        type="submit"
                                                        color="success"
                                                        size="sm"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faSave}
                                                        />{" "}
                                                        Save
                                                    </CButton>
                                                    <CButton
                                                        color="secondary"
                                                        size="sm"
                                                        onClick={() => {
                                                            toggleModal(!isOpen);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                        />{" "}
                                                        Cancel
                                                    </CButton>
                                                </CModalFooter>
                                            </Form>
                                        </>
                                    );
                                }}
                            </Formik>
                        </CModal>
                    </CRow>
                    <CRow>
                        <CDataTable className="table-style"
                            items={transfers.data.data}
                            fields={fields}
                            tableFilter
                            addTableClasses="table table-bordered table-striped table-style"
                            border
                            striped
                            pagination
                            scopedSlots={{
                                'actions':
                                    (item) => (
                                        <td>
                                            <FontAwesomeIcon
                                                title="Is Printed?"
                                                className="text-info"
                                                icon={faCheck}
                                                onClick={() => {
                                                    setTransferObj({
                                                        ...transferObj,
                                                        data: {
                                                            id: item.id,
                                                        },
                                                    });
                                                    setIsAdd(false);
                                                    toggleModal(!isOpen);
                                                }}
                                            />
                                            {
                                                item.status == "Pending" ? <>
                                                    <EditIcon
                                                        onClick={() => {
                                                            setSaveBtn(true);
                                                            axios.fetchGetData(`api/Transfer/${item.id}`, undefined, undefined, (response) => {
                                                                setTransferObj({
                                                                    ...transferObj,
                                                                    data: {
                                                                        id: item.id,
                                                                        transferChallan: item.transferChallan,
                                                                        transferDate: item.transferDate,
                                                                        transferedBranchId: item.transferedBranchId,
                                                                        vehicleNo: item.vehicleNo,
                                                                        details: item.details,
                                                                        rcvFlg: false
                                                                    }
                                                                });
                                                                var array = response.data;
                                                                array.transferDetails.forEach(e => {
                                                                    e.unitName = e.product.unitName
                                                                })
                                                                onSetDataArray(array.transferDetails);
                                                                console.log(response.data);
                                                            })

                                                            setIsAdd(false);
                                                            // console.log(item.transferDetails);
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        onClick={() => {
                                                            setTransferObj({
                                                                ...transferObj,
                                                                data: {
                                                                    id: item.id
                                                                }
                                                            });
                                                            toggleDeleteModal(true);
                                                        }}
                                                    />
                                                </> :
                                                    <FontAwesomeIcon
                                                        title="View"
                                                        className="text-info"
                                                        onClick={() => {
                                                            setSaveBtn(false);
                                                            axios.fetchGetData(`api/Transfer/${item.id}`, undefined, undefined, (response) => {
                                                                setTransferObj({
                                                                    ...transferObj,
                                                                    data: {
                                                                        id: item.id,
                                                                        transferChallan: item.transferChallan,
                                                                        transferDate: item.transferDate,
                                                                        transferedBranchId: item.transferedBranchId,
                                                                        vehicleNo: item.vehicleNo,
                                                                        details: item.details,
                                                                        rcvFlg: false
                                                                    }
                                                                });
                                                                var array = response.data;
                                                                array.transferDetails.forEach(e => {
                                                                    e.unitName = e.product.unitName
                                                                })
                                                                onSetDataArray(array.transferDetails);
                                                                console.log(response.data);
                                                            })
                                                            setIsAdd(false);
                                                        }}
                                                        icon={faEye}
                                                    />
                                            }
                                        </td>
                                    ),
                                'print': (item) => (
                                    <td>
                                        <CTooltip content="Transfer Print">
                                            <CLink href={`${apiHostName}/api/Report/TransferReport/${item.id}`} target="_blank">
                                                {
                                                    item.isPrinted == true ? <>
                                                        <FontAwesomeIcon
                                                            icon={faCheck} />
                                                    </> :
                                                        <FontAwesomeIcon
                                                            icon={faPrint} />
                                                }
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
                        axios.fetchDeleteData(`api/Transfer/${transferObj.data.id}`, () => {
                            transfers.refresh();
                        });
                    }}
                />
            </CCard>
        </>
    );
}

export default Transfer;