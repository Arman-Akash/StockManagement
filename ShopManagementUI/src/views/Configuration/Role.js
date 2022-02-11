import React, { useState } from 'react'
import * as axios from '../../axios/axiosLib';
import {
    CButton,
    CCard,
    CCardBody,
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

const Role = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        name: '',
        officeId: 0,
        organogramLavel: null,
        description: '',
    }
    let [roleObj, setRoleObj] = useState(data);

    const fields = ['name', {label: 'Office', key: 'officeName'}, 'organogramLavel', 'description', 'actions'];
    let Roles = dataApi.useDataApi(`api/Role/GetName`, initialState.initialCollections);
    let offices = dataApi.useDataApi(`api/Office`, initialState.initialCollections);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setRoleObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={Roles.data.data}
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
                                            setRoleObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setRoleObj(item);
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
                    color="primary"
                >
                    <Formik
                        enableReinitialize
                        initialValues={roleObj}
                        validationSchema={
                            Yup.object({
                                name: Yup.string()
                                    .max(100, "Name should be in 100 Letters")
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            // console.log('Inside submit');
                            if (isAdd) {
                                axios.fetchPostData('api/Role', values, () => {
                                    Roles.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/Role/${values.id}`, values, () => {
                                    Roles.refresh();
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
                                            <CModalTitle>Role Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        label="Role Name"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        isRequired="true"
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAReactAutoSelect
                                                        id="officeId"
                                                        name="officeId"
                                                        label="Office Name"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        rows="8"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={offices.data.data.map(offices => {
                                                            console.log()
                                                            return { label: offices.name, value: offices.id }
                                                        })}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAReactAutoSelect
                                                        id="OrganogramLavel"
                                                        name="OrganogramLavel"
                                                        label="Organogram Lavel"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        rows="8"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={[]}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SATextArea
                                                        style={{ height: "80px" }}
                                                        id="description"
                                                        name="description"
                                                        label="Descriptions"
                                                        labelClassName="float-right"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        rows="8"
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
                        axios.fetchDeleteData(`api/Role/${roleObj.id}`, () => {
                            Roles.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Role
