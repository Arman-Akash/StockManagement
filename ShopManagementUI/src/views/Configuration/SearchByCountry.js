import React, { useState } from 'react'
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
import { faDownload, faListAlt } from '@fortawesome/free-solid-svg-icons';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import * as axios from '../../axios/axiosLib';
import { Form, Formik } from "formik";
import SAInput from '../FormLib/saInput';
import { apiHostName, incidentsFolder } from '../../config';


const SearchIndia = ({match}) => {
    var countryId = match.params.countryId;
    const fields = [{ label: 'Country', key: 'countryName' },
    { label: 'Unit Type', key: 'unitTypeName' }, { label: 'Unit', key: 'unitName' }, { label: 'Incident Date', key: 'incidentDate' },
    { label: 'Incidents Title', key: 'incidentTitle' }, 'locationName', 'attachment', 'actions'];

    let unitTypes = dataApi.useDataApi(`api/UnitType`, initialState.initialCollections);
    let units = dataApi.useDataApi(`api/Unit`, initialState.initialCollections);
    let [response, setResponse] = useState({ data: [] });
    let incidents = dataApi.useDataApi(`api/Incident/GetAllIncident/${countryId}`, initialState.initialCollections, (response) => {
        setResponse({ data: response.data });
    });

    return (
        <Formik
            enableReinitialize
            initialValues={{
                countryNameSearch: 'India',
                unitTypeId: 0
            }}

            onSubmit={(values) => {
                axios.fetchPostData(`api/Incident/Search`, values, setResponse);
                response.data.refresh()
            }}
        >
            {
                formProps => {
                    return (
                        <>
                            <CCard>
                                <Form>
                                    <CRow style={{ marginTop: "20px" }}>
                                        <CCol md={{ size: 4, offset: 0 }} style={{ marginLeft: "-24px" }}>
                                            <SAInput
                                                id="locationName"
                                                name="locationName"
                                                label="Location"
                                                labelClassName="label-style"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                type="text"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                            <SAReactAutoSelect
                                                id="unitTypeId"
                                                name="unitTypeId"
                                                label="Unit Type"
                                                labelClassName="label-style"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                options={unitTypes.data.data.map(unitType => {
                                                    return { label: unitType.name, value: unitType.id }
                                                })}
                                                onChangeHandle={(name, value) => {
                                                    axios.fetchGetData(`api/Unit/GetUnitByCountry/${formProps.values.countryId}/${value}`, units.data, units.setData, undefined);
                                                }}
                                            />
                                        </CCol>
                                        <CCol md={{ size: 4, offset: 0 }}>
                                            <SAReactAutoSelect
                                                id="unitId"
                                                name="unitId"
                                                label="Unit"
                                                labelClassName="label-style"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                labelClassName="float-right"
                                                formProps={formProps}
                                                options={units.data.data.map(unit => {
                                                    return { label: unit.name, value: unit.id }
                                                })}
                                            />
                                            <SAInput
                                                id="incidentName"
                                                name="incidentName"
                                                label="Incident Title"
                                                labelClassName="label-style"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                type="text"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                        <CCol md={{ size: 4, offset: 0 }}>
                                            <SAInput
                                                id="startDate"
                                                name="startDate"
                                                label="Start Date"
                                                labelClassName="label-style"
                                                isInline="true"
                                                type="date"
                                                lSize="4"
                                                rSize="8"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                            <SAInput
                                                id="endDate"
                                                name="endDate"
                                                label="End Date"
                                                labelClassName="label-style"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                type="date"
                                                formProps={formProps}
                                                boxHeight="27px"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol className="text-center mt-1">
                                            <CButton size="sm" color="info" type="submit"><FontAwesomeIcon icon={faListAlt} />&nbsp;Show</CButton>
                                        </CCol>
                                    </CRow>
                                </Form>
                                <CCardBody>
                                    <CRow>
                                        <CDataTable
                                            items={response.data}
                                            addTableClasses="table table-bordered table-striped"
                                            fields={fields}
                                            tableFilter
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

export default SearchIndia;