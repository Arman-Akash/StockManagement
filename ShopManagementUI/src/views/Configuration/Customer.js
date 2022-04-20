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

const Supplier = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        name: '',
        details: '',
        address: '',
        mobileNo: ''
    }
    let [supplierObj, setSupplierObj] = useState(data);

    const fields = [{ key: 'name', label: 'Customer Name' },
    { key: 'details', label: 'Customer Type' },
    { key: 'address', label: 'Address' },
    { key: 'mobileNo', label: 'Mobile Number' }, 'actions'];
    let customers = dataApi.useDataApi(`api/Customer`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setSupplierObj(data);
                    }}
                />
                {/*Datatable*/}
                <CDataTable
                    items={customers.data.data}
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
                                            setSupplierObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setSupplierObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />
                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of Customer's: {customers.data != undefined && customers.data.data != undefined ? customers.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>
                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                    style={{ marginLeft: '0px' }}
                >
                    <Formik
                        enableReinitialize
                        initialValues={supplierObj}
                        validationSchema={
                            Yup.object({
                                name: Yup.string()
                                    .max(100, "Name should be in 100 characters")
                                    .min(3, "Name should be in minimum 3 characters")
                                    .required("Required"),
                                mobileNo: Yup.string()
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/Customer', values, () => {
                                    customers.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/Customer/${values.id}`, values, () => {
                                    customers.refresh();
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
                                            <CModalTitle>Customer Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        label="Customer Name"
                                                        isInline="true"
                                                        lSize="4"
                                                        className="text-uppercase"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        isRequired="true"
                                                    />
                                                </CCol>

                                                <CCol md="12">
                                                    <SAInput
                                                        id="details"
                                                        name="details"
                                                        type="text"
                                                        label="Customer Type"
                                                        className="text-uppercase"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                    />
                                                </CCol>

                                                <CCol md="12">
                                                    <SAInput
                                                        id="address"
                                                        name="address"
                                                        type="text"
                                                        label="Customer Address"
                                                        className="text-uppercase"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                    />
                                                </CCol>

                                                <CCol md="12">
                                                    <SAInput
                                                        id="mobileNo"
                                                        name="mobileNo"
                                                        type="text"
                                                        label="Mobile No"
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
                        axios.fetchDeleteData(`api/Customer/${supplierObj.id}`, () => {
                            customers.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Supplier