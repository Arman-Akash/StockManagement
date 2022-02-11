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

const Reminder = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        remindTitle: '',
        remindDate: '',
        remindTo: '',
        description: '',
    }
    let [remindObj, setRemindObj] = useState(data);

    let [chooseIndividualOffice, toggleState] = useState({
        isIndividual: false,
        isOffice: false
    });

    const fields = ['remindTitle', 'remindDate', 'remindTo', { label: 'Individual Reminder(PO-Number)', key: 'poNumber' },
        { label: 'Reminder Desk', key: 'OfficeNames' }, 'actions'];

    let reminds = dataApi.useDataApi(`api/Remind/GetName`, initialState.initialCollections);
    let offices = dataApi.useDataApi(`api/Office`, initialState.initialCollections);
    let poNumbers = dataApi.useDataApi(`api/BasicInfo/GetPONumbers`, initialState.initialCollections);


    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setRemindObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={reminds.data.data}
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
                                    <EditIcon
                                        onClick={() => {
                                            setRemindObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            setRemindObj(item);
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
                    size="md"
                >
                    <Formik
                        enableReinitialize
                        initialValues={remindObj}
                        validationSchema={
                            Yup.object({
                                remindTitle: Yup.string()
                                    .required("Required"),
                                remindDate: Yup.string()
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log(values);
                            values.remindPersons = [];
                            if (chooseIndividualOffice.isIndividual) {
                                values.individualRemindId.forEach(element => {
                                    values.remindPersons.push({
                                        personId: element,
                                    })
                                });
                            }
                            else {
                                values.remindOffices = [];
                                values.officeId.forEach(element => {
                                    values.remindOffices.push({
                                        officeId: element,
                                    })
                                });
                            }
                            axios.fetchPostData('api/Remind', values, () => {
                                reminds.refresh()
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
                                            <CModalTitle>Reminder</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CCol>
                                                    <CRow>
                                                        <CCol md="12" className="mb-1">
                                                            <SAInput
                                                                id="remindTitle"
                                                                name="remindTitle"
                                                                type="text"
                                                                label="Title"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                placeholder="Remind Title..."
                                                                isRequired="true"
                                                                labelClassName="label-style"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12" className="mb-1">
                                                            <SAInput
                                                                id="remindDate"
                                                                name="remindDate"
                                                                type="date"
                                                                label="Remind Date"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                isRequired="true"
                                                                labelClassName="label-style" />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12" className="mb-1">
                                                            <SAReactAutoSelect
                                                                id="remindTo"
                                                                name="remindTo"
                                                                label="Remind To"
                                                                labelClassName="label-style"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                formProps={formProps}
                                                                boxHeight="27px"
                                                                isRequired="true"
                                                                onChangeHandle={(name, value) => {
                                                                    if (value === 'Individual') {
                                                                        toggleState({
                                                                            ...chooseIndividualOffice,
                                                                            isIndividual: true,
                                                                            isOffice: false
                                                                        });
                                                                    } else if (value === 'Office') {
                                                                        toggleState({
                                                                            ...chooseIndividualOffice,
                                                                            isIndividual: false,
                                                                            isOffice: true,
                                                                        });
                                                                    } else {
                                                                        toggleState({
                                                                            ...chooseIndividualOffice,
                                                                            isIndividual: false,
                                                                            isOffice: false,
                                                                        });
                                                                    }
                                                                }}
                                                                options={[{ label: 'Me', value: 'Me' },
                                                                { label: 'Individual', value: 'Individual' },
                                                                { label: 'Desk', value: 'Office' }].map(item => {
                                                                    return { label: item.label, value: item.value }
                                                                })} />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow style={{ display: chooseIndividualOffice.isIndividual ? 'block' : 'none' }}>
                                                        <CCol md="12" className="mb-1">
                                                            <SAReactAutoSelect
                                                                id="individualRemindId"
                                                                name="individualRemindId"
                                                                label="Individuals"
                                                                labelClassName="label-style"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                formProps={formProps}
                                                                isMulti={true}
                                                                boxHeight="27px"
                                                                isDisabled={!chooseIndividualOffice.isIndividual}
                                                                options={poNumbers.data.data.map(poNumber => {
                                                                    return { label: poNumber.poNumber + ' - ' + poNumber.nameEnglish, value: poNumber.id }
                                                                })}
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow style={{ display: chooseIndividualOffice.isOffice ? 'block' : 'none' }}>
                                                        <CCol md="12" className="mb-1">
                                                            <SAReactAutoSelect
                                                                id="officeId"
                                                                name="officeId"
                                                                label="Reminder Desk"
                                                                isMulti={true}
                                                                labelClassName="label-style"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                formProps={formProps}
                                                                boxHeight="27px"
                                                                isDisabled={!chooseIndividualOffice.isOffice}
                                                                options={offices.data.data.map(offices => {
                                                                    return { label: offices.name, value: offices.id }
                                                                })}
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12">
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
                                                    </CRow>
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
                        axios.fetchDeleteData(`api/Remind/${remindObj.id}`, () => {
                            reminds.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Reminder
