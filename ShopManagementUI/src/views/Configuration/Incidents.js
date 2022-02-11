import React, { useState } from 'react'
import * as axios from '../../axios/axiosLib';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CModal,
    CLabel,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CDataTable,
    CTooltip,
    CImg,
    CLink,
    CListGroup,
    CListGroupItem
} from '@coreui/react'
import SAInput from '../FormLib/saInput';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import { Form, Formik } from "formik";
import * as Yup from "yup";

///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes, faFileDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../commonComponents/DeleteModal';
import AddButton from '../commonComponents/AddButton'
import EditIcon from '../commonComponents/EditIcon';
import DeleteIcon from '../commonComponents/DeleteIcon';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import SATextArea from '../FormLib/saTextarea';
import { apiHostName, incidentsFolder } from '../../config';

const Incidents = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        countryId: null,
        unitId: null,
        incidentTitle: '',
        incidentDate: '',
        description: '',
        locationType: '',
        locationName: '',
        latitude: '',
        longitude: '',
        bnAction: '',
    }
    let [incidentsObj, setIncidentsObj] = useState(data);
    const fields = ['incidentTitle', 'incidentDate', 'locationName',
        { key: 'countryName', label: 'Country Name' },
        { key: 'unitName', label: 'Unit Name' }, 'latitude', 'longitude', { label: 'BN Action', key: 'bnAction' }, 'description', 'actions'];

    let incidents = dataApi.useDataApi(`api/Incident/GetName`, initialState.initialCollections);
    let countries = dataApi.useDataApi(`api/Country`, initialState.initialCollections);
    let units = dataApi.useDataApi(`api/Unit`, initialState.initialCollections);
    let [attachment, setAttachment] = useState(null);
    let [attachmentId, setAttachmentId] = useState();
    let [files, setFiles] = useState([]);
    let [openAttachment, toggleAttachmentModal] = useState(false);
    let [deleteAttachment, toggledeleteAttachmentModal] = useState(false);

    let [chooseTypeWise, toggleState] = useState({
        isLocationName: false,
        isMap: false,
    });

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setIncidentsObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={incidents.data.data}
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
                                    <CTooltip content="View Attachment">
                                        <FontAwesomeIcon icon={faFileDownload}
                                            onClick={() => {
                                                setFiles(item.attachments);
                                                toggleAttachmentModal(!openAttachment);
                                            }}
                                        />
                                    </CTooltip>
                                    {/* <a href={apiHostName + "/" + incidentsFolder + "/" + item.attachment} target="_blank" download>
                                        <CTooltip content="Download fILE?">
                                            <FontAwesomeIcon icon={faDownload} />
                                        </CTooltip>
                                    </a> */}
                                    <EditIcon
                                        onClick={() => {
                                            setIncidentsObj(item);
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    <DeleteIcon
                                        onClick={() => {
                                            setIncidentsObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />

                <CModal
                    style={{ marginLeft: "100px", marginTop: "100px" }}
                    show={openAttachment}
                    onClose={() => toggleAttachmentModal(!openAttachment)}
                    color="primary"
                    size="md"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Attachments</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CListGroup typeof='none'>
                            {
                                files?.map((file, index) => {
                                    return <CListGroupItem>
                                        <CLink href={`${apiHostName}/${file.path}`} target="_blank" download>{index + 1}. {file.name}</CLink>
                                        <span className='text-danger ml-3'><FontAwesomeIcon icon={faTrash} onClick={() => {
                                            setAttachmentId(file.id);
                                            toggledeleteAttachmentModal(true);
                                        }} /></span>
                                    </CListGroupItem>
                                })
                            }
                        </CListGroup>
                    </CModalBody>
                </CModal>


                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of incidents: {incidents.data != undefined && incidents.data.data != undefined ? incidents.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>

                <CModal
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                    size="lg"
                >
                    <Formik
                        enableReinitialize
                        initialValues={incidentsObj}
                        validationSchema={
                            Yup.object({
                                incidentDate: Yup.string()
                                    .required("Required"),
                                incidentTitle: Yup.string()
                                    .required("Required"),

                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)
                            if (isAdd) {
                                axios.postFormData('api/Incident', values, null, [{ name: "attachments", attachment: attachment }], () => {
                                    incidents.refresh()
                                })
                            } else {
                                axios.putFormData(`api/Incident/${values.id}`, values, null, [{ name: "attachments", attachment: attachment }], () => {
                                    incidents.refresh();
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
                                            <CModalTitle>Incidents Information</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CRow>
                                                    <CCol md="5">
                                                        <SAInput
                                                            id="incidentDate"
                                                            name="incidentDate"
                                                            type="date"
                                                            label="Incident Date"
                                                            isRequired="true"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="label-style"
                                                        />
                                                    </CCol>
                                                    <CCol md="5">
                                                        <SAInput
                                                            id="incidentTitle"
                                                            name="incidentTitle"
                                                            label="Incident Title"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8    "
                                                            isRequired="true"
                                                            formProps={formProps}
                                                            labelStyle={{
                                                                textAlign: 'right'
                                                            }}
                                                        />
                                                    </CCol>
                                                    <CCol md="5">
                                                        <SAReactAutoSelect
                                                            id="locationType"
                                                            name="locationType"
                                                            label="Location Type"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            formProps={formProps}
                                                            labelClassName="label-style"
                                                            boxHeight='25px'
                                                            options={[
                                                                { label: 'Location Name', value: 'LocationName' },
                                                                { label: 'Map', value: 'Map' }
                                                            ].map(item => {
                                                                return { label: item.label, value: item.value }
                                                            })}
                                                            onChangeHandle={(name, value) => {
                                                                if (value === 'LocationName') {
                                                                    toggleState({
                                                                        ...chooseTypeWise,
                                                                        isLocationName: true,
                                                                        isMap: false,
                                                                    });
                                                                }
                                                                else if (value === 'Map') {
                                                                    toggleState({
                                                                        ...chooseTypeWise,
                                                                        isLocationName: false,
                                                                        isMap: true,
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </CCol>
                                                    <CCol md="5">
                                                        <SAInput
                                                            id="bnAction"
                                                            name="bnAction"
                                                            type="text"
                                                            label="BN Action"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="label-style"
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="5" style={{ display: chooseTypeWise.isLocationName ? 'block' : 'none' }}>
                                                        <SAInput
                                                            id="locationName"
                                                            name="locationName"
                                                            type="text"
                                                            label="Location Name"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="label-style"
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="5" style={{ display: chooseTypeWise.isMap ? 'block' : 'none' }}>
                                                        <SAInput
                                                            id="latitude"
                                                            name="latitude"
                                                            type="text"
                                                            label="Latitude"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="label-style"
                                                        />
                                                    </CCol>
                                                    <CCol md="5" style={{ display: chooseTypeWise.isMap ? 'block' : 'none' }}>
                                                        <SAInput
                                                            id="longitude"
                                                            name="longitude"
                                                            type="text"
                                                            label="Longitude"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="label-style"
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="5">
                                                        <SAReactAutoSelect
                                                            id="countryId"
                                                            name="countryId"
                                                            label="Country"
                                                            labelClassName="label-style"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            formProps={formProps}
                                                            options={countries.data.data.map(country => {
                                                                return { label: country.name, value: country.id }
                                                            })}
                                                        />
                                                    </CCol>

                                                    <CCol md="5">
                                                        <SAReactAutoSelect
                                                            id="unitId"
                                                            name="unitId"
                                                            label="Unit"
                                                            labelClassName="label-style"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            formProps={formProps}
                                                            options={units.data.data.map(unit => {
                                                                return { label: unit.name, value: unit.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="10">
                                                        <SATextArea
                                                            id="description"
                                                            name="description"
                                                            type="text"
                                                            label="Description"
                                                            isInline="true"
                                                            lSize="2"
                                                            rSize="10"
                                                            labelClassName="label-style"
                                                            boxHeight="300px"
                                                            style={{ height: "100px" }}
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <input
                                                    type="file"
                                                    name="attachment[]"
                                                    accept=".jpg, .jpeg, .png, .doc, .docs, .docx, .docx, .pdf, .xlx, .xlsx"
                                                    label="Status"
                                                    style={{ marginLeft: "100px", paddingTop: "2px" }}
                                                    onChange={
                                                        (e) => {
                                                            setAttachment(e.target.files);
                                                        }
                                                    }
                                                    multiple={true}
                                                />

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
                        axios.fetchDeleteData(`api/Incident/${incidentsObj.id}`, () => {
                            incidents.refresh();
                        });
                    }}
                />
                <DeleteModal
                    isDelete={deleteAttachment}
                    toggleDeleteModal={toggledeleteAttachmentModal}
                    deleteOpp={() => {
                        axios.fetchDeleteData(`api/Incident/DeleteAttachment/${attachmentId}`, () => {
                            setFiles(() => {
                                return files.filter(e => e.id != attachmentId);
                            })
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Incidents
