import React, { useState } from 'react'
import {
    CRow,
    CCol,
    CDataTable,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
} from '@coreui/react'
import SAInput from '../FormLib/saInput';
import EditIcon from '../commonComponents/EditIcon';
import AddButton from '../commonComponents/AddButton'
import DeleteIcon from '../commonComponents/DeleteIcon';
import DeleteModal from '../commonComponents/DeleteModal';
import SATextArea from '../FormLib/saTextarea';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import * as axios from '../../axios/axiosLib';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

const Excercise = () => {
    let [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const { country } = useParams();

    let data = {
        id: 0,
        name: '',
        objective: '',
        updatedInfo: '',
        country: ''
    }
    let [excerciseObj, setExcerciseObj] = useState(data);

    let excercises = dataApi.useDataApi(`api/Excercise/${country}`, initialState.initialCollections);

    const fields = [{ key: 'name', label: 'Name', _style: { textAlign: 'center', width: '120px' }, _classes: 'text-center' },
    { key: 'objective', label: 'Objective', _style: { textAlign: 'center' } },
    { label: 'Updated Info of Last Exercise', key: 'updatedInfo', _style: { textAlign: 'center' } },
    { label: 'Actions', key: 'actions' }];

    return (
        <CRow>
            <CCol md="12">
                <AddButton style={{ marginBottom: '5px' }}
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setExcerciseObj(data);
                    }}
                />
                <CDataTable
                    items={excercises.data.data}
                    fields={fields}
                    border
                    striped
                    tableFilter
                    scopedSlots={{
                        'actions':
                            (item) => (
                                <td>
                                    <EditIcon
                                        onClick={() => {
                                            setExcerciseObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setExcerciseObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />

                <CModal
                    style={{ marginLeft: "0px", marginTop: "0px" }}
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                    closeOnBackdrop={false}
                    size="lg"
                >
                    <Formik
                        enableReinitialize
                        initialValues={excerciseObj}
                        validationSchema={
                            Yup.object({
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            values.country = country;
                            if (isAdd) {
                                axios.fetchPostData('api/Excercise', values, () => {
                                    excercises.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/Excercise/${values.id}`, values, () => {
                                    excercises.refresh();
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
                                            <CModalTitle>Exercise</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CRow>
                                                    <CCol md='12' style={{ marginBottom: '5px' }}>
                                                        <SAInput
                                                            name="name"
                                                            label="Name"
                                                            isInline="true"
                                                            type="text"
                                                            lSize="3"
                                                            rSize="9"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>
                                                    <CCol md="12" style={{ marginBottom: '5px' }}>
                                                        <SATextArea style={{ height: '100px' }}
                                                            name="objective"
                                                            type="text"
                                                            label="Objective"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="9"
                                                            labelClassName="label-style"
                                                        />
                                                    </CCol>
                                                    <CCol md="12" style={{ marginBottom: '5px' }}>
                                                        <SATextArea style={{ height: '100px' }}
                                                            name="updatedInfo"
                                                            type="text"
                                                            label="Updated Info of Last Exercise"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="9"
                                                            labelClassName="label-style"
                                                        />
                                                    </CCol>
                                                </CRow>
                                            </CModalBody>
                                            <CModalFooter>
                                                <div>
                                                    <CButton type="submit" color="success" className="save-btn" onClick={() => { }}><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                                    <CButton className="cancel-btn" style={{ marginLeft: '15px' }} color="secondary" onClick={() => { toggleModal(!isOpen) }}><FontAwesomeIcon icon={faTimes} /> Cancel</CButton>
                                                </div>
                                            </CModalFooter>
                                        </Form>
                                    </>
                                );
                            }
                        }
                    </Formik>
                </CModal>

                <DeleteModal
                    isDelete={isDelete}
                    toggleDeleteModal={toggleDeleteModal}
                    deleteOpp={() => {
                        axios.fetchDeleteData(`api/Excercise/${excerciseObj.id}`, () => {
                            excercises.refresh();
                        });
                    }}
                />
            </CCol>
        </CRow >
    );
}

export default Excercise