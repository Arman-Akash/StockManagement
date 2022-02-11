import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
    CDataTable,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CTooltip
} from '@coreui/react';
import SAInput from '../FormLib/saInput';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SATextArea from '../FormLib/saTextarea';
import AddButton from '../commonComponents/AddButton';
import SATagsInput from '../FormLib/saTagsInput';
import * as axios from '../../axios/axiosLib';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDownload, faSave } from '@fortawesome/free-solid-svg-icons';
//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";
import './uploadStyle.css';
import { apiHostName, archiveFolder, nominatingfolder } from '../../config';


const ArchiveContainer = (props) => {
    let [isOpen, toggleModal] = useState(false);
    let [tags, onSetTags] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    let data = {
        id: 0,
        title: '',
        source: '',
        documentType: '',
        desk: '',
        physicalLocation: '',
        documentVersion: '',
        description: '',
        keywords: '',
    }
    let [archiveObj, setArchiveObj] = useState(data);

    const fields = ['title', 'documentType', 'documentVersion', 'physicalLocation', 'actions'];
    let archives = dataApi.useDataApi(`api/Archive`, initialState.initialCollections);
    let [attachment, setAttachment] = useState(null);

    return (
        <>
            <CCard>
                <CCardBody>
                    <AddButton
                        onClick={() => {
                            toggleModal(!isOpen);
                            setIsAdd(true);
                            setArchiveObj(data);
                        }}
                    />

                    <CDataTable
                        items={archives.data.data}
                        addTableClasses="table table-bordered table-striped"
                        fields={fields}
                        tableFilter
                        pagination
                        scopedSlots={{
                            'actions':
                                (item) => (
                                    <td>
                                        <a href={apiHostName + "/" + archiveFolder + "/" + item.attachment} download>
                                            <CTooltip content="Download File?">
                                                <FontAwesomeIcon icon={faDownload} />
                                            </CTooltip>
                                        </a>
                                    </td>
                                )
                        }}
                    />

                    {/*Message Modal*/}
                    <CModal
                        style={{ marginLeft: "100px", marginTop: "100px" }}
                        show={isOpen}
                        onClose={() => toggleModal(!isOpen)}
                        color="primary"
                        size="md"
                    >
                        <Formik
                            enableReinitialize
                            initialValues={archiveObj}
                            validationSchema={
                                Yup.object({
                                    title: Yup.string()
                                        .required("Required"),
                                    source: Yup.string()
                                        .required("Required"),
                                    documentType: Yup.string()
                                        .required("Required"),
                                })
                            }
                            onSubmit={(values, { resetForm }) => {
                                values.keywords = tags.join(',');
                                if (isAdd) {
                                    // Axios.post('https://localhost:44302/api/Archive', formData, {header:{'Content-type':'multipart/form-data'}})
                                    axios.postFormData('api/Archive', values, null, [{ name: "attachment", attachment: attachment }], () => {
                                        archives.refresh()
                                    })
                                } else {
                                    axios.fetchPutData(`api/Archive/${values.id}`, values, () => {
                                        archives.refresh();
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
                                                <CModalTitle>Archive</CModalTitle>
                                            </CModalHeader>
                                            <Form>
                                                <CModalBody>
                                                    <CRow>
                                                        <CCol md="11">
                                                            <SAInput
                                                                id="title"
                                                                name="title"
                                                                type="text"
                                                                label="Title"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                isRequired="true"
                                                                labelClassName="label-style" />
                                                            <SAReactAutoSelect
                                                                id="source"
                                                                name="source"
                                                                label="Source"
                                                                labelClassName="label-style"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                formProps={formProps}
                                                                boxHeight="27px"
                                                                isRequired="true"
                                                                options={[
                                                                    { label: 'Officer', value: 'Officer' },
                                                                    { label: 'Online News', value: 'OnlineNews' },
                                                                    { label: 'News Paper', value: 'NewsPaper' }].map(item => {
                                                                        return { label: item.label, value: item.value }
                                                                    })}
                                                            />
                                                            <SAReactAutoSelect
                                                                id="documentType"
                                                                name="documentType"
                                                                label="Document Type"
                                                                labelClassName="label-style"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                formProps={formProps}
                                                                boxHeight="27px"
                                                                isRequired="true"
                                                                options={[{ label: 'E-Paper', value: 'E-Paper' },
                                                                { label: 'Journal', value: 'Journal' },
                                                                { label: 'Magazine', value: 'Magazine' },
                                                                { label: 'Publication', value: 'Publication' },
                                                                { label: 'Passport', value: 'Passport' },
                                                                { label: 'Visa', value: 'Visa' }].map(item => {
                                                                    return { label: item.label, value: item.value }
                                                                })}
                                                            />
                                                            <SAReactAutoSelect
                                                                id="desk"
                                                                name="desk"
                                                                label="Desk"
                                                                labelClassName="label-style"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                formProps={formProps}
                                                                boxHeight="27px"
                                                                options={[
                                                                    { label: 'Accounts', value: 'Accounts' },
                                                                    { label: 'Budget', value: 'Budget' },
                                                                    { label: 'Inventory', value: 'Inventory' },
                                                                    { label: 'Passport', value: 'Passport' },
                                                                    { label: 'Complain', value: 'Complain' },
                                                                    { label: 'Event', value: 'Event' },
                                                                    { label: 'Returns', value: 'Returns' }
                                                                ].map(item => {
                                                                    return { label: item.label, value: item.value }
                                                                })}
                                                            />
                                                            <SAInput
                                                                id="physicalLocation"
                                                                name="physicalLocation"
                                                                type="text"
                                                                label="Physical Location"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="label-style" />
                                                            <SAInput
                                                                id="documentVersion"
                                                                name="documentVersion"
                                                                type="text"
                                                                label="Version"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                labelClassName="label-style" />
                                                            <SATextArea
                                                                id="description"
                                                                name="description"
                                                                label="Description"
                                                                labelClassName="label-style"
                                                                isInline="true"
                                                                lSize="4"
                                                                rSize="8"
                                                                rows="4"
                                                            />
                                                            <SATagsInput
                                                                label="keywords"
                                                                labelStyle="search-label-style"
                                                                lSize="4"
                                                                rSize="8"
                                                                tagValues={tags}
                                                                onChageTagValues={onSetTags}
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <input
                                                        type="file"
                                                        name="attachment"
                                                        style={{ marginLeft: "140px", padding: "2px" }}
                                                        accept=".doc,.docx,.pdf"
                                                        onChange={
                                                            (e) => {
                                                                setAttachment(e.target.files[0]);
                                                            }
                                                        }
                                                    />
                                                </CModalBody>
                                                <CModalFooter>
                                                    <div>
                                                        <CButton type="submit" color="success" size="sm" onClick={() => { }}><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                                        <CButton type="button" style={{ marginLeft: '5px' }} color="secondary" size="sm" onClick={() => { toggleModal(!isOpen) }}><FontAwesomeIcon icon={faTimes} /> Cancel</CButton>
                                                    </div>
                                                </CModalFooter>
                                            </Form>
                                        </>
                                    );
                                }
                            }
                        </Formik>
                    </CModal>
                </CCardBody>
            </CCard>
        </>
    );
}

export default ArchiveContainer;