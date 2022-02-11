import React, { useState, useEffect } from 'react'
import {
    CCol,
    CRow,
    CCard,
    CButton,
    CDataTable,
    CTooltip,
    CCardBody
} from '@coreui/react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import * as axios from '../../axios/axiosLib';
import { Form, Formik } from "formik";
import SAInput from '../FormLib/saInput';
import { apiHostName, incidentsFolder } from '../../config';

const India = (props) => {
    let basicInfos = dataApi.useDataApi(`api/BasicInfo`, initialState.initialCollections);

    const fields = ['incidentTitle', 'incidentDate', 'locationName', 'bNAction'];

    let [response, setResponse] = useState({ data: [] });

    // useEffect(() => {
    //     if (props.match.params.searchBy !== undefined) {
    //         // window.location.href(`/searchBy/${item.name}`)
    //         console.log(window.location.href(`/searchBy/${item.name}`))
    //     }
    // })

    return (
        <Formik
            enableReinitialize
            initialValues={{
            }}

            onSubmit={(values) => {
                axios.fetchPostData(`api/India/Search`, values, setResponse);
                response.data.refresh()
            }}
        >
            {
                formProps => {
                    return (
                        <>
                            <CCard>
                                <Form>
                                    {/*For Concern?department  section*/}
                                    <CRow className="mt-2">
                                        <CCol md="5">
                                            <SAInput
                                                id="incidentDate"
                                                name="incidentDate"
                                                label="Incident Date"
                                                labelClassName="label-style"
                                                isInline="true"
                                                type="date"
                                                lSize="4"
                                                rSize="8"
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                        <CCol md="5">
                                            <SAInput
                                                id="incidentTitle"
                                                name="incidentTitle"
                                                label="Incident Title"
                                                labelClassName="label-style"
                                                isInline="true"
                                                type="text"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                        <CCol md="5">
                                            <SAInput
                                                id="locationName"
                                                name="locationName"
                                                label="Location Name"
                                                labelClassName="label-style"
                                                isInline="true"
                                                type="text"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                        <CCol md="5">
                                            <SAInput
                                                id="unit"
                                                name="unit"
                                                label="Unit"
                                                labelClassName="label-style"
                                                isInline="true"
                                                type="text"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                        <CCol md="5">
                                            <SAInput
                                                id="name"
                                                name="name"
                                                label="Unit Type"
                                                labelClassName="label-style"
                                                isInline="true"
                                                type="text"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                        <CCol md="5">
                                            <SAInput
                                                id="bNAction"
                                                name="bNAction"
                                                label="BN Action"
                                                labelClassName="label-style"
                                                isInline="true"
                                                type="text"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol className="text-center">
                                            <CButton size="sm" color="info" type="submit" className="mt-2"><FontAwesomeIcon icon={faListAlt} />&nbsp;Show</CButton>
                                        </CCol>
                                    </CRow>
                                </Form>
                                <CCardBody>
                                    <CRow className="mt-3">
                                        <CDataTable
                                            items={response.data}
                                            addTableClasses="table table-bordered table-striped"
                                            fields={fields}
                                            tableFilter
                                            columnFilter
                                            scopedSlots={{
                                                'actions':
                                                    (item) => (
                                                        <td>
                                                            <a href={apiHostName + "/" + incidentsFolder + "/" + item.attachment} target="_blank" download>
                                                                <CTooltip content="Download File?">
                                                                    <FontAwesomeIcon icon={faDownload} />
                                                                </CTooltip>
                                                            </a>
                                                        </td>
                                                    )
                                            }}
                                        />
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </>
                    );
                }
            }
        </Formik>

    )
}

export default India;