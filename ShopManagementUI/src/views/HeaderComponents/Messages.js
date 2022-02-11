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
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../commonComponents/DeleteModal';
import AddButton from '../commonComponents/AddButton'
import EditIcon from '../commonComponents/EditIcon';
import DeleteIcon from '../commonComponents/DeleteIcon';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';

const Reminder = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        messageDate: '',
        priority: '',
        messageTitle: '',
        messagebody: '',
    }
    let [messageObj, setMessageObj] = useState(data);

    const fields = [{label:'PoNumbers', key:"poNumbers"}, 'messageDate', 'messageTitle', 'messagebody', 'priority'];

    let messages = dataApi.useDataApi(`api/Message/GetName`, initialState.initialCollections);
    let offices = dataApi.useDataApi(`api/Office`, initialState.initialCollections);
    let poNumbers = dataApi.useDataApi(`api/BasicInfo/GetPONumbers`, initialState.initialCollections);


    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setMessageObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={messages.data.data}
                    // fields={["date", "title", "status", "actions"]}
                    fields={fields}
                    tableFilter
                    border
                    striped
                    pagination
                    scopedSlots={{
                        'actions':
                            (item) => (
                                <td>
                                    {/* <EditIcon
                                        onClick={() => {
                                            setMessageObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            setMessageObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    /> */}
                                </td>
                            )
                    }}
                />
                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                    size="md"
                >
                    <Formik
                        enableReinitialize
                        initialValues={messageObj}
                        validationSchema={
                            Yup.object({
                                messageDate: Yup.string()
                                    .required("Required"),
                                messageTitle: Yup.string()
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log(values);
                            values.messageSendTos = [];
                            values.messageToId.forEach(element => {
                                values.messageSendTos.push({
                                    messageToId: element,
                                })
                            });
                            axios.fetchPostData('api/Message', values, () => {
                                messages.refresh()
                            })
                            resetForm();
                            toggleModal(false);
                        }}
                    >
                        {
                            formProps => {
                                return (
                                    <>
                                        <CModalHeader closeButton>
                                            <CModalTitle>Message</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                {/* <CRow>
                                                    <CCol md="12" className="mb-1">
                                                        <SAReactAutoSelect
                                                            id="messageFrom"
                                                            name="messageFrom"
                                                            label="From"
                                                            labelClassName="label-style"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            formProps={formProps}
                                                            isMulti={true}
                                                            boxHeight="27px"
                                                            isRequired="true"
                                                            options={poNumbers.data.data.map(poNumber => {
                                                                return { label: poNumber.poNumber + ' - ' + poNumber.nameEnglish, value: poNumber.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                </CRow> */}
                                                <CCol md="12" className="mb-1">
                                                    <SAReactAutoSelect
                                                        id="messageToId"
                                                        name="messageToId"
                                                        label="To"
                                                        labelClassName="label-style"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        formProps={formProps}
                                                        isMulti={true}
                                                        boxHeight="27px"
                                                        isRequired="true"
                                                        options={poNumbers.data.data.map(poNumber => {
                                                            return { label: poNumber.poNumber + ' - ' + poNumber.nameEnglish, value: poNumber.id }
                                                        })}
                                                    />
                                                </CCol>
                                                <CCol md="12" className="mb-1">
                                                    <SAInput
                                                        id="messageDate"
                                                        name="messageDate"
                                                        type="date"
                                                        label="Date"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        isRequired="true"
                                                        labelClassName="label-style" />
                                                </CCol>
                                                <CCol md="12" className="mb-1">
                                                    <SAReactAutoSelect
                                                        id="priority"
                                                        name="priority"
                                                        label="Priority"
                                                        labelClassName="label-style"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        formProps={formProps}
                                                        boxHeight="27px"
                                                        isRequired="true"
                                                        options={[{ label: 'Low', value: 'Low' }, { label: 'Mid', value: 'Mid' }, { label: 'High', value: 'High' }].map(item => {
                                                            return { label: item.label, value: item.value }
                                                        })} />
                                                </CCol>
                                                <CCol md="12" className="mb-1">
                                                    <SAInput
                                                        id="messageTitle"
                                                        name="messageTitle"
                                                        type="text"
                                                        label="Message Title"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        labelClassName="label-style"
                                                        isRequired="true"
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    {/*SATextArea*/}
                                                    <SATextArea
                                                        id="messagebody"
                                                        name="messagebody"
                                                        placeholder="Message"
                                                        label="Message"
                                                        labelClassName="label-style"
                                                        isInline="true"
                                                        lSize="3"
                                                        rSize="9"
                                                        rows="4"
                                                        isRequired="true"
                                                    />
                                                </CCol>
                                            </CModalBody>
                                            <CModalFooter>
                                                <div>
                                                    <CButton type="submit" color="success" size="sm" onClick={() => { }}><FontAwesomeIcon icon={faPaperPlane} /> Send</CButton>
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
                        axios.fetchDeleteData(`api/Message/${messageObj.id}`, () => {
                            messages.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Reminder
