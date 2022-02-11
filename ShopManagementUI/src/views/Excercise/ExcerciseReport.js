import React, { useState } from 'react'
import {
    CCol,
    CRow,
    CButton,
    CDataTable,
    CTooltip,
} from '@coreui/react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSearch, faPrint } from '@fortawesome/free-solid-svg-icons';
import SATextArea from '../FormLib/saTextarea';
import * as axios from '../../axios/axiosLib';
import { apiHostName } from '../../config';
import { Form, Formik } from "formik";
import SAInput from '../FormLib/saInput';
import { initialCollections } from '../../functionalLib/initialState';
import { useParams } from 'react-router';

const ExcerciseReport = (props) => {
    let [isOpen, toggleModal] = useState(false);
    const { country } = useParams();

    const fields = [{ key: 'name', label: 'Name', _style: { textAlign: 'center', width: '20%' }, _classes: 'text-center' },
    { key: 'objective', label: 'Objective', _style: { textAlign: 'center', width: '40%' } },
    { label: 'Updated Info of Last Exercise', key: 'updatedInfo', _style: { textAlign: 'center', width: '40%' } }];

    let [response, setResponse] = useState({ data: [] });

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: '',
                objective: '',
                updatedInfo: '',
                country: ''
            }}

            onSubmit={(values) => {

            }}
        >
            {
                formProps => {
                    return (
                        <Form>
                            {/*For Concern?department  section*/}
                            <CRow>
                                <CCol md="4" className="mb-1">
                                    <SAInput
                                        name="name"
                                        label="Name"
                                        isInline="true"
                                        type="text"
                                        lSize="4"
                                        rSize="8"
                                        labelClassName="float-right"
                                    />
                                </CCol>

                                <CCol md="4" className="mb-1">
                                    <SATextArea
                                        name="objective"
                                        type="text"
                                        label="Objective"
                                        isInline="true"
                                        lSize="4"
                                        rSize="8"
                                        labelClassName="label-style"
                                    />
                                </CCol>

                                <CCol md="4" className="mb-1">
                                    <SATextArea
                                        name="updatedInfo"
                                        type="text"
                                        label="Updated Info of Last Exercise"
                                        isInline="true"
                                        lSize="4"
                                        rSize="8"
                                        labelClassName="label-style"
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol md={{ offset: 3, size: 4 }} style={{ textAlign: 'right' }}>
                                    <CButton
                                        type="button"
                                        color="success"
                                        size="md"
                                        style={{
                                            // float: 'right'
                                            marginRight: '25px'
                                        }}
                                        onClick={() => {
                                            axios.fetchReportData(`api/Excercise/Search/${country}`, formProps.values, undefined, (response) => {
                                                setResponse({
                                                    ...initialCollections,
                                                    data: axios.filterNull(response.data)
                                                });
                                            });
                                        }}
                                    ><FontAwesomeIcon icon={faSearch} /> Search</CButton>
                                    <CButton
                                        type="button"
                                        color="warning"
                                        size="md"
                                        style={{
                                            float: 'right',
                                            color: 'white'
                                        }}
                                        onClick={() => {
                                            window.open(
                                                `${apiHostName}/api/Report/ExcerciseReport`,
                                                '_blank'
                                            );
                                        }}
                                    ><FontAwesomeIcon icon={faPrint} /> Print</CButton>
                                </CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <CDataTable
                                    items={axios.filterNull(response.data)}
                                    addTableClasses="table table-bordered table-striped"
                                    fields={fields}
                                    scopedSlots={{
                                        'actions':
                                            (item) => (
                                                <td>
                                                    <CTooltip content="View">
                                                        <FontAwesomeIcon className="text-info" onClick={() => {
                                                            toggleModal(!isOpen);
                                                        }} icon={faEye} />
                                                    </CTooltip>
                                                </td>
                                            )
                                    }}
                                />
                            </CRow>
                        </Form>
                    );
                }
            }
        </Formik>
    )
}

export default ExcerciseReport;