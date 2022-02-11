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

const ProductType = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        type: '',
        productSubTypeId: 0
    }
    let [productTypeObj, setProductTypeObj] = useState(data);

    const fields = [
        { key: 'productSubTypeName', label: 'Product Sub Type' },
        { key: 'type', label: 'Product Type' },
        'actions'];
    let productTypes = dataApi.useDataApi(`api/ProductType`, initialState.initialCollections);
    let productSubTypes = dataApi.useDataApi(`api/ProductSubType`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setProductTypeObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={productTypes.data.data}
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
                                            setProductTypeObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setProductTypeObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />
                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of Product Types: {productTypes.data != undefined && productTypes.data.data != undefined ? productTypes.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>
                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                >
                    <Formik
                        enableReinitialize
                        initialValues={productTypeObj}
                        validationSchema={

                            Yup.object({
                                type: Yup.string()
                                    .min(3, "Product Type should be min 03 Letters")
                                    .max(100, "Product Type should be in 100 Letters")
                                    .required("Required"),

                                productSubTypeId: Yup.number().min(1, "please select sub type")
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/ProductType', values, () => {
                                    productTypes.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/ProductType/${values.id}`, values, () => {
                                    productTypes.refresh();
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
                                            <CModalTitle>Product Type Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                {/* Provide country name*/}

                                                <CCol md='12' style={{ marginBottom: '5px' }}>
                                                    <SAReactAutoSelect
                                                        name="productSubTypeId"
                                                        label="Product Sub Type"
                                                        isRequired="true"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={productSubTypes.data.data.map(item => {
                                                            return { label: item.subType, value: item.id }
                                                        })}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="type"
                                                        name="type"
                                                        type="text"
                                                        label="Product Type"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        labelClassName="float-right"
                                                        isRequired="true"
                                                    />
                                                </CCol>
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
                        axios.fetchDeleteData(`api/ProductType/${productTypeObj.id}`, () => {
                            productTypes.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default ProductType
