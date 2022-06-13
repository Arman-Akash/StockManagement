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

const ProductSubType = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        subType: '',
        productTypeId: 0
    }
    let [productSubTypeObj, setSubProductTypeObj] = useState(data);

    const fields = [
        { key: 'productTypeName', label: 'Product Type Name' },
        { key: 'subType', label: 'Product Sub Type' },
        'actions'];
    let productSubTypes = dataApi.useDataApi(`api/ProductSubType`, initialState.initialCollections);
    let productTypes = dataApi.useDataApi(`api/ProductType`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setSubProductTypeObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={productSubTypes.data.data}
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
                                            setSubProductTypeObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setSubProductTypeObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />
                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of Product Sub Types: {productSubTypes.data != undefined && productSubTypes.data.data != undefined ? productSubTypes.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>
                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                    style={{ marginLeft: "0px" }}
                >
                    <Formik
                        enableReinitialize
                        initialValues={productSubTypeObj}
                        validationSchema={

                            Yup.object({
                                subType: Yup.string()
                                    .min(3, "Product Sub Type should be min 03 Letters")
                                    .max(100, "Product Sub Type should be in 100 Letters")
                                    .required("Required"),

                                productTypeId: Yup.number().min(1, "please select product type")
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/ProductSubType', values, () => {
                                    productSubTypes.refresh();
                                })
                            } else {
                                values.productType = null;
                                axios.fetchPutData(`api/ProductSubType/${values.id}`, values, () => {
                                    productSubTypes.refresh();
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
                                            <CModalTitle>Product Sub Type Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                {/* Provide country name*/}

                                                <CCol md='12' style={{ marginBottom: '5px' }}>
                                                    <SAReactAutoSelect
                                                        name="productTypeId"
                                                        label="Product Type"
                                                        isRequired="true"
                                                        isInline="true"
                                                        lSize="3"
                                                        className="text-uppercase"
                                                        rSize="9"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={productTypes.data.data.map(item => {
                                                            return { label: item.type, value: item.id }
                                                        })}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="subType"
                                                        name="subType"
                                                        type="text"
                                                        label="Product Sub Type"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        labelClassName="float-right"
                                                        className="text-uppercase"
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
                        axios.fetchDeleteData(`api/ProductSubType/${productSubTypeObj.id}`, () => {
                            productSubTypes.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default ProductSubType
