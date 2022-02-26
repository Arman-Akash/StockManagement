import React, { useState } from 'react'
import * as axios from '../../axios/axiosLib';
import {
    CButton,
    CCard,
    CCardBody,
    CRow,
    CLabel,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CDataTable
} from '@coreui/react'
import SAInput from '../FormLib/saInput';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SATextArea from '../FormLib/saTextarea';
import { Form, Formik } from "formik";
import * as Yup from "yup";

///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../commonComponents/DeleteModal';
import AddButton from '../commonComponents/AddButton'
import EditIcon from '../commonComponents/EditIcon';
import DeleteIcon from '../commonComponents/DeleteIcon';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';

const Product = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        productSubTypeId: 0,
        unitId: 0,
        productCode: '',
        productName: '',
        origin: '',
        reOrderLebel: '',
        packSize: '',
        manufactureDate: null,
        expireDate: null,
        shelfNo: '',
        expireDate: null,
        details: ''
    }
    let [productObj, setProductObj] = useState(data);

    const fields = [
        { key: 'productSubTypeName', label: 'Product Sub Type' },
        { key: 'productCode', label: 'Product Code' },
        { key: 'productName', label: 'Product Name' },
        { key: 'origin', label: 'Origin' },
        { key: 'packSize', label: 'Pack Size' },
        { key: 'unitName', label: 'Unit' },
        { key: 'reOrderLebel', label: 'Re-Order Label' },
        // { key: 'manufactureDate', label: 'Manufacture Date' },
        // { key: 'expireDate', label: 'Expire Date' },
        // { key: 'shelfNo', label: 'Shelf No' },
        'actions'];
    let productSubTypes = dataApi.useDataApi(`api/ProductSubType`, initialState.initialCollections);
    let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
    let units = dataApi.useDataApi(`api/Unit`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setProductObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={products.data.data}
                    fields={fields}
                    tableFilter
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
                                            setProductObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setProductObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />
                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of Products: {products.data != undefined && products.data.data != undefined ? products.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>
                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                    size='lg'
                    style={{ marginLeft: '0px' }}
                >
                    <Formik
                        enableReinitialize
                        initialValues={productObj}
                        validationSchema={
                            Yup.object({
                                productCode: Yup.string()
                                    .min(3, "Product Code should be min 03 Letters")
                                    .max(100, "Product Code should be in 100 Letters")
                                    .required("Required"),

                                productName: Yup.string()
                                    .min(3, "Product Name should be min 03 Letters")
                                    .max(100, "Product Name should be in 100 Letters")
                                    .required("Required"),

                                productSubTypeId: Yup.number().min(1, "please select product sub type")
                                    .required("Required"),

                                unitId: Yup.number().min(1, "please select unit")
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/Product', values, () => {
                                    products.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/Product/${values.id}`, values, () => {
                                    products.refresh();
                                })
                            }
                            resetForm();
                            toggleModal(false);
                        }}
                    >
                        {
                            formProps => {
                                return (
                                    <>
                                        <CModalHeader closeButton>
                                            <CModalTitle>Product Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CRow>
                                                    <CCol md='6' style={{ marginBottom: '5px' }}>
                                                        <SAReactAutoSelect
                                                            name="productSubTypeId"
                                                            label="Product Sub Type"
                                                            isRequired="true"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            formProps={formProps}
                                                            options={productSubTypes.data.data.map(item => {
                                                                return { label: item.subType, value: item.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                    <CCol md="6" style={{ marginBottom: '5px' }}>
                                                        <SAInput
                                                            id="productCode"
                                                            name="productCode"
                                                            type="text"
                                                            label="Product Code"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            isRequired="true"
                                                        />
                                                    </CCol>
                                                    <CCol md="6" style={{ marginBottom: '5px' }}>
                                                        <SAInput
                                                            id="productName"
                                                            name="productName"
                                                            type="text"
                                                            label="Product Name"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            isRequired="true"
                                                        />
                                                    </CCol>
                                                    <CCol md='6' style={{ marginBottom: '5px' }}>
                                                        <SAReactAutoSelect
                                                            name="unitId"
                                                            label="Unit"
                                                            isRequired="true"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            formProps={formProps}
                                                            options={units.data.data.map(item => {
                                                                return { label: item.name, value: item.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                    <CCol md="6" style={{ marginBottom: '5px' }}>
                                                        <SAInput
                                                            id="packSize"
                                                            name="packSize"
                                                            type="text"
                                                            label="Pack Size"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>
                                                    <CCol md="6" style={{ marginBottom: '5px' }}>
                                                        <SAInput
                                                            id="origin"
                                                            name="origin"
                                                            type="text"
                                                            label="Origin"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>
                                                    {/* <CCol md="6" style={{ marginBottom: '5px' }}>
                                                        <SADatePicker
                                                            name="manufactureDate"
                                                            label="Manufacture Date"
                                                            labelClassName="float-right"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            formProps={formProps}
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="dd/MM/yyyy"
                                                        />
                                                        </CCol>
                                                    <CCol md="6" style={{ marginBottom: '5px' }}>
                                                        <SADatePicker
                                                            name="expireDate"
                                                            label="Expire Date"
                                                            labelClassName="float-right"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            formProps={formProps}
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="dd/MM/yyyy"
                                                        />
                                                    </CCol>*/}
                                                    <CCol md="6" style={{ marginBottom: '5px' }}>
                                                        <SAInput
                                                            id="reOrderLebel"
                                                            name="reOrderLebel"
                                                            label="Re-Order Label"
                                                            type="number"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>

                                                    {/*<CCol md="6" style={{ marginBottom: '5px' }}>
                                                <SAInput
                                                    id="shelfNo"
                                                    name="shelfNo"
                                                    type="text"
                                                    label="Shelf No"
                                                    isInline="true"
                                                    lSize="4"
                                                    rSize="8"
                                                    labelClassName="float-right"
                                                />
                                            </CCol>*/}
                                                    <CCol md="12">
                                                        <SATextArea
                                                            id="details"
                                                            name="details"
                                                            type="text"
                                                            label="Product Details"
                                                            isInline="true"
                                                            lSize="2"
                                                            rSize="10"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>
                                                </CRow>
                                            </CModalBody>
                                            <CModalFooter>
                                                <CButton type="submit" color="success" size="sm"><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                                <CButton color="secondary" size="sm" onClick={() => { toggleModal(!isOpen) }}><FontAwesomeIcon icon={faTimes} /> Cancel</CButton>
                                            </CModalFooter>
                                        </Form>
                                    </>
                                );
                            }
                        }
                    </Formik>
                </CModal>
                {/*Delete Modal section*/}
                <DeleteModal
                    isDelete={isDelete}
                    toggleDeleteModal={toggleDeleteModal}
                    deleteOpp={() => {
                        axios.fetchDeleteData(`api/Product/${productObj.id}`, () => {
                            products.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Product
