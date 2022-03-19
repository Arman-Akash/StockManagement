import React, { useState } from 'react'
import * as axios from '../../axios/axiosLib';
import {
    CButton,
    CCard,
    CCardBody,
    CRow,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../commonComponents/DeleteModal';
import AddButton from '../commonComponents/AddButton'
import EditIcon from '../commonComponents/EditIcon';
import DeleteIcon from '../commonComponents/DeleteIcon';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';

const DueEntry = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        creditAmount: 0,
        customerId: 0
    }
    let [dueObj, setDueObj] = useState(data);

    const fields = [{ key: 'customerName', label: 'Customer Name' },'creditAmount', 'actions'];
    let dues = dataApi.useDataApi(`api/CustomerDue`, initialState.initialCollections);
    let customers = dataApi.useDataApi(`api/Customer`, initialState.initialCollections);

    return (
        <CCard>
            <CRow>
                <CCol md="8">
                    <CCardBody>
                    <h5 style={{ marginBottom: "10px" }} className='page-title'>Opening Due Balance Entry</h5>
                        <AddButton
                            onClick={() => {
                                toggleModal(!isOpen);
                                setIsAdd(true);
                                setDueObj(data);
                            }}
                        />

                        {/*Datatable*/}
                        <CDataTable
                            items={dues.data.data}
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
                                                    setDueObj(item);
                                                    setIsAdd(false);
                                                    toggleModal(!isOpen);
                                                }}
                                            />

                                            <DeleteIcon
                                                onClick={() => {
                                                    setDueObj(item);
                                                    toggleDeleteModal(true);
                                                }}
                                            />
                                        </td>
                                    )
                            }}
                        />
                        <CModal
                            show={isOpen}
                            onClose={() => toggleModal(!isOpen)}
                            style={{ marginLeft: "0px" }}
                            color="primary"
                        >
                            <Formik
                                enableReinitialize
                                initialValues={dueObj}
                                validationSchema={
                                    Yup.object({
                                        customerId: Yup.string()
                                            .required("Required")
                                    })
                                }
                                onSubmit={(values, { resetForm }) => {
                                    // console.log('Inside submit');
                                    if (isAdd) {
                                        axios.fetchPostData('api/CustomerDue', values, () => {
                                            dues.refresh()
                                        })
                                    } else {
                                        axios.fetchPutData(`api/CustomerDue/${values.id}`, values, () => {
                                            dues.refresh();
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
                                                    <CModalTitle>Customer Due Entry</CModalTitle>
                                                </CModalHeader>
                                                <Form>
                                                    <CModalBody>
                                                        {/* Provide country name*/}
                                                        <CCol md='12' style={{ marginBottom: '5px' }}>
                                                        <SAReactAutoSelect
                                                            name="customerId"
                                                            label="Customer"
                                                            isRequired="true"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="9"
                                                            labelClassName="float-right"
                                                            formProps={formProps}
                                                            options={customers.data.data.map(item => {
                                                                return { label: item.name, value: item.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                        <CCol md="12">
                                                            <SAInput
                                                                id="creditAmount"
                                                                name="creditAmount"
                                                                type="number"
                                                                label="Due Amount"
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
                                axios.fetchDeleteData(`api/CustomerDue/${dueObj.id}`, () => {
                                    dues.refresh();
                                });
                            }}
                        />
                    </CCardBody>
                </CCol>
            </CRow>
        </CCard>
    )
}
export default DueEntry
