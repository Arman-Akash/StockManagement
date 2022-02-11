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

const SubCategory = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        name: '',
        categoryId: 0
    }
    let [subCategoryObj, setSubCategoryObj] = useState(data);

    const fields = [{ key: 'categoryName', label: 'Squadron' }, { key: 'name', label: 'Sub Category' }, 'actions'];
    let subCategories = dataApi.useDataApi(`api/SubCategory`, initialState.initialCollections);
    let categories = dataApi.useDataApi(`api/Category`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setSubCategoryObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={subCategories.data.data}
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
                                            setSubCategoryObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setSubCategoryObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />
                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of Sub Categories: {subCategories.data != undefined && subCategories.data.data != undefined ? subCategories.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>
                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                >
                    <Formik
                        enableReinitialize
                        initialValues={subCategoryObj}
                        validationSchema={
                            Yup.object({
                                name: Yup.string()
                                    .max(100, "Name should be in 100 Letters")
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/SubCategory', values, () => {
                                    subCategories.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/SubCategory/${values.id}`, values, () => {
                                    subCategories.refresh();
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
                                            <CModalTitle>Sub Category Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CCol md="12">
                                                    <SAReactAutoSelect
                                                        id="categoryId"
                                                        name="categoryId"
                                                        label="Category"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={categories.data.data.map(item => {
                                                            return { label: item.name, value: item.id }
                                                        })}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        label="Sub Category Name"
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
                        axios.fetchDeleteData(`api/SubCategory/${subCategoryObj.id}`, () => {
                            subCategories.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default SubCategory