import React, { useState } from 'react'
import * as axios from '../../axios/axiosLib';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
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

const Task = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        taskTitte: '',
        personalInfoId: [],
        dateTime: '',
        priority: '',
        remarks: '',
        description: '',
    }
    let [taskobj, setTaskObj] = useState(data);
    const fields = ['taskTitte', { label: 'Assign To(Po-Number)', key: 'poNumber' }, 'dateTime', 'priority', 'actions'];
    let tasks = dataApi.useDataApi(`api/TaskIdms/GetName`, initialState.initialCollections);
    let poNumbers = dataApi.useDataApi(`api/BasicInfo/GetPONumbers`, initialState.initialCollections);


    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setTaskObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={tasks.data.data}
                    fields={fields}
                    tableFilter
                    border
                    striped
                    pagination
                    scopedSlots={{
                        'actions':
                            (item) => (
                                <td>
                                    <EditIcon
                                        onClick={() => {
                                            setTaskObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            setTaskObj(item);
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
                        initialValues={taskobj}
                        validationSchema={
                            Yup.object({
                                taskTitte: Yup.string()
                                    .required("Required"),
                                personalInfoId: Yup.string()
                                    .required("Required"),
                                priority: Yup.string()
                                    .required("Required"),
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log(values);
                            if (isAdd) {
                                axios.fetchPostData('api/TaskIdms', values, () => {
                                    tasks.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/TaskIdms/${values.id}`, values, () => {
                                    tasks.refresh();
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
                                            <CModalTitle>Task</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CCol md="12" className="mb-1">
                                                    <SAInput
                                                        id="taskTitte"
                                                        name="taskTitte"
                                                        type="text"
                                                        label="Title"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        labelClassName="label-style"
                                                        isRequired="true" />
                                                </CCol>
                                                <CCol md="12" className="mb-1">
                                                    <SAReactAutoSelect
                                                        id="personalInfoId"
                                                        name="personalInfoId"
                                                        label="Assign To"
                                                        labelClassName="label-style"
                                                        isInline="true"
                                                        // isMulti={true}
                                                        lSize="4"
                                                        rSize="8"
                                                        formProps={formProps}
                                                        boxHeight="27px"
                                                        isRequired="true"
                                                        options={poNumbers.data.data.map(poNumber => {
                                                            return { label: poNumber.poNumber + ' - ' + poNumber.nameEnglish, value: poNumber.id }
                                                        })}
                                                    />

                                                </CCol>
                                                <CCol md="12" className="mb-1">
                                                    <SAInput
                                                        id="dateTime"
                                                        name="dateTime"
                                                        type="date"
                                                        label="Date"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        labelClassName="label-style"
                                                    />
                                                </CCol>
                                                <CCol md="12" className="mb-1">
                                                    <SAReactAutoSelect
                                                        id="priority"
                                                        name="priority"
                                                        label="Priority"
                                                        labelClassName="label-style"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        formProps={formProps}
                                                        // isMulti={true}
                                                        boxHeight="27px"
                                                        isRequired="true"
                                                        options={[{ label: 'Low', value: 'Low' }, { label: 'Mid', value: 'Mid' }, { label: 'High', value: 'High' }].map(item => {
                                                            return { label: item.label, value: item.value }
                                                        })} />
                                                </CCol>
                                                <CCol md="12" className="mb-1">
                                                    <SAInput
                                                        id="remarks"
                                                        name="remarks"
                                                        type="text"
                                                        label="Remarks"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        labelClassName="label-style" />
                                                </CCol>
                                                <CCol md="12">
                                                    {/*SATextArea*/}
                                                    <SATextArea
                                                        id="description"
                                                        name="description"
                                                        placeholder="Description..."
                                                        label="Description"
                                                        labelClassName="label-style"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        rows="4"
                                                    />
                                                </CCol>
                                            </CModalBody>
                                            <CModalFooter>
                                                <div>
                                                    <CButton type="submit" color="success" size="sm" onClick={() => { }}><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                                    <CButton style={{ marginLeft: '5px' }} color="secondary" size="sm" onClick={() => { toggleModal(!isOpen) }}><FontAwesomeIcon icon={faTimes} /> Cancel</CButton>
                                                </div>
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
                        axios.fetchDeleteData(`api/TaskIdms/${taskobj.id}`, () => {
                            tasks.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Task
