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

const DamageDeclare = (props) => {
    const [isAdd, setIsAdd] = useState(true);
    const [isDelete, toggleDeleteModal] = useState(false);

    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let damages = dataApi.useDataApi(`api/DamageDeclare`, initialState.initialCollections);

    const [unit, setUnit] = useState([]);

    // useEffect(() => {
    //     axios.fetchGetData('api/MeasurementUnit', units, setUnits);
    // }, []);

    let fields = [
        { key: 'date', label: 'Date' },
        { key: 'branchName', label: 'Branch Name' },
        { key: 'productName', label: 'Product' },
        { key: 'unitName', label: 'Unit' },
        { key: 'quantity', label: 'Quantity' },
        'actions'
    ];

    var data = {
        id: 0,
        branchId: 0,
        productId: 0,
        date: new Date(),
        amount: 0
    }
    let [damageObj, setDamageObj] = useState({
        data: data
    })

    return (
        <CCard>
            <Formik
                enableReinitialize
                initialValues={damageObj.data}
                validationSchema={
                    Yup.object({
                        branchId: Yup.string().required('Branch is required'),
                        productId: Yup.string().required('Product is required'),
                        amount: Yup.string().required('Amount is required'),
                    })
                }
                onSubmit={(values, { resetForm }) => {
                    values = {
                        ...values,
                    }
                    if (isAdd) {
                        axios.fetchPostData('api/DamageDeclare', values, () => {
                            damages.refresh();
                        });
                    } else {
                        axios.fetchPutData(`api/DamageDeclare/${values.id}`, values, () => {
                            damages.refresh();
                        });
                    }
                    resetForm();
                    setDamageObj({
                        data: data
                    })
                }}
            >
                {
                    formProps => {
                        return (
                            <Form>
                                <CCardBody >
                                    <h5 style={{ marginBottom: "10px" }} className='page-title'>Damage Declare</h5>
                                    {/*For Concern?department  section*/}
                                    <CRow>
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
                                        <CCol md="4">
                                            <SAReactAutoSelect
                                                id="branchId"
                                                name="branchId"
                                                label="Branch"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                isRequired="true"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                options={branches.data.data.map(item => {
                                                    return { label: item.name, value: item.id }
                                                })} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4">
                                            <SAReactAutoSelect
                                                id="productId"
                                                name="productId"
                                                label="Product"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                isRequired="true"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                options={products.data.data.map(item => {
                                                    return { label: item.productCode + "-" + item.productName, value: item.id }
                                                })} 
                                                onChangeHandle={(name, value) => {
                                                    formProps.setFieldValue(name, value);
                                                    axios.fetchGetData(`api/product/${value}`, undefined, undefined, (response) => {
                                                        console.log(response);
                                                        setUnit(response.data.unitName);
                                                    })
                                                }}
                                                />
                                        </CCol>
                                        <CCol md="3">
                                            <SAInput
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                isRequired="true"
                                                label="Quantity"
                                                isInline="true"
                                                lSize="5"
                                                rSize="7"
                                                labelClassName="float-right"
                                            />
                                        </CCol>
                                        <CCol md="1">
                                            <SAInput
                                                id="unit"
                                                name="unit"
                                                type="text"
                                                readOnly="true"
                                                // label="Unit"
                                                // isInline="true"
                                                rSize="12"
                                                labelClassName="float-right"
                                                value={unit}
                                            />
                                        </CCol>
                                        
                                        <CCol md="3">
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
                                <CRow className=" ">
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
                items={damages.data.data}
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
                                        setDamageObj({
                                            ...damageObj,
                                            data: {
                                                id: item.id,
                                                branchId: item.branchId == null ? 0 : item.branchId,
                                                productId: item.productId == null ? 0 : item.productId,
                                                date: item.date,
                                                quantity: item.quantity
                                            }
                                        });
                                        setUnit(item.unitName);
                                        // itemId.setData({ data: item.itemId });
                                        setIsAdd(false);
                                    }}
                                />
                                <DeleteIcon
                                    onClick={() => {
                                        setDamageObj({
                                            ...damageObj,
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
                    axios.fetchDeleteData(`api/DamageDeclare/${damageObj.data.id}`, () => {
                        damages.refresh();
                    });
                }}
            />
        </CCard>
    )
}

export default DamageDeclare;