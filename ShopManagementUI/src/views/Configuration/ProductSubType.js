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
        subType: ''
    }
    let [productSubTypeObj, setProductSubTypeObj] = useState(data);

    const fields = [{ key: 'subType', label: 'Product Sub Type' }, 'actions'];
    let productSubTypes = dataApi.useDataApi(`api/ProductSubType`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setProductSubTypeObj(data);
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
                                            setProductSubTypeObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setProductSubTypeObj(item);
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
                >
                    <Formik
                        enableReinitialize
                        initialValues={productSubTypeObj}
                        validationSchema={
                            Yup.object({
                                subType: Yup.string()
                                    .max(100, "Product Sub Type should be in 100 Letters")
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            // console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/ProductSubType', values, () => {
                                    productSubTypes.refresh()
                                })
                            } else {
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
                                            <CModalTitle>Product SubType Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                {/* Provide country name*/}
                                                <CCol md="12">
                                                    <SAInput
                                                        id="subType"
                                                        name="subType"
                                                        type="text"
                                                        label="Sub Type"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
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
