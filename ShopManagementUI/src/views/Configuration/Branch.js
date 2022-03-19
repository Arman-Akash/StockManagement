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
import { BranchTypes } from '../../staticData';
import SATextArea from '../FormLib/saTextarea';


const Institute = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        name: '',
        type: '',
        phnNumber: '',
        email: '',
        location: ''
    }
    let [branchObj, setBranchObj] = useState(data);

    const fields = [
        { key: 'name', label: 'Branch Name' },
        { key: 'type', label: 'Branch Type' },
        { key: 'phnNumber', label: 'Phone Number' },
        { key: 'email', label: 'Email' },
        { key: 'location', label: 'Address' },
        'actions'];
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setBranchObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={branches.data.data}
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
                                            setBranchObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setBranchObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />
                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of Branches: {branches.data != undefined && branches.data.data != undefined ? branches.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>
                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    style={{ marginLeft: "0px" }}
                    color="primary"
                >
                    <Formik
                        enableReinitialize
                        initialValues={branchObj}
                        validationSchema={
                            Yup.object({
                                name: Yup.string()
                                    .min(3, "Branch Name should be minimum 03 characters")
                                    .max(100, "Branch Name should be in 100 characters")
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            // console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/Branch', values, () => {
                                    branches.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/Branch/${values.id}`, values, () => {
                                    branches.refresh();
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
                                            <CModalTitle>Branch Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                {/* Provide name*/}
                                                <CCol md="12">
                                                    <SAInput
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        label="Branch Name"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        isRequired="true"
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAReactAutoSelect
                                                        id="type"
                                                        name="type"
                                                        label="Branch Type"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={[
                                                            { label: BranchTypes.Warehouse, value: BranchTypes.Warehouse },
                                                            { label: BranchTypes.Outlet, value: BranchTypes.Outlet }
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="phnNumber"
                                                        name="phnNumber"
                                                        type="text"
                                                        label="Phone Number"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="email"
                                                        name="email"
                                                        type="text"
                                                        label="Email"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SATextArea
                                                        id="location"
                                                        name="location"
                                                        type="text"
                                                        label="Address"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
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
                        axios.fetchDeleteData(`api/Branch/${branchObj.id}`, () => {
                            branches.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Institute
