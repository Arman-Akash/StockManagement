import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
    CDataTable,
    CPagination,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton
} from '@coreui/react';
import SAInput from '../FormLib/saInput';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import AddButton from '../commonComponents/AddButton';
import SASingleFileInput from '../FormLib/saSingleFileInput';
import TooltipIcon from '../commonComponents/TooltipIcon';
import SATagsInput from '../FormLib/saTagsInput';
import SADocumentPreviewer from '../FormLib/saDocumentPreviewer';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDownload, faPrint, faSave } from '@fortawesome/free-solid-svg-icons';

//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";

//Style
import './uploadStyle.css';


const TemplateContainer = (props) => {
    let [isOpen, toggleModal] = useState(false);
    let [tags, onSetTags] = useState([]);

    return (
        <>
            <CRow>
                <CCol md="12">
                    <CCard>
                        <CCardBody>
                            <AddButton
                                type="button"
                                style={{ marginTop: '0.8%', height: '90%' }}
                                onClick={() => {
                                    toggleModal(!isOpen);
                                }} />

                            <CDataTable
                                items={[{
                                    title: 'Template',
                                    documentType: 'Type Template',
                                    owner: 'Jalal'
                                }]}
                                addTableClasses="table table-bordered table-striped"
                                fields={["title", "documentType", 'owner', "actions"]}
                                tableFilter
                                scopedSlots={{
                                    'actions':
                                        (item) => (
                                            <td>
                                                <TooltipIcon
                                                    content="Download"
                                                    icon={faDownload}
                                                    onClick={() => {

                                                    }}
                                                />
                                                <TooltipIcon
                                                    content="Print"
                                                    icon={faPrint}
                                                    onClick={() => {

                                                    }}
                                                />
                                            </td>
                                        )
                                }}
                            />

                            {/*Pagination*/}
                            <CPagination
                                activePage={1}
                                align="end"
                                size="sm"
                                pages={1}
                                size="sm"
                                onActivePageChange={(i) => {

                                }} />

                            {/*Message Modal*/}
                            <CModal
                                style={{ marginLeft: "100px", marginTop: "100px" }}
                                show={isOpen}
                                onClose={() => toggleModal(!isOpen)}
                                color="primary"
                                size="lg"
                            >
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        title: '',
                                        keywords: '',
                                        docType: '',
                                        attachment: ''
                                    }}
                                    validationSchema={
                                        Yup.object()
                                    }
                                    onSubmit={(values, { resetForm }) => {
                                        toggleModal(false);
                                    }}
                                >
                                    {
                                        formProps => {

                                            return (
                                                <>
                                                    <CModalHeader closeButton>
                                                        <CModalTitle>Template</CModalTitle>
                                                    </CModalHeader>
                                                    <Form>
                                                        <CModalBody>
                                                            <CRow>
                                                                <CCol md="7">
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
                                                                        id="docType"
                                                                        name="docType"
                                                                        label="Document Type"
                                                                        labelClassName="label-style"
                                                                        isInline="true"
                                                                        lSize="4"
                                                                        rSize="8"
                                                                        formProps={formProps}
                                                                        boxHeight="27px"
                                                                        isRequired="true"
                                                                        options={[
                                                                            { label: 'Passport', value: 'Passport' },
                                                                            { label: 'Visa', value: 'Visa' }].map(item => {
                                                                                return { label: item.label, value: item.value }
                                                                            })} />

                                                                    <SATagsInput
                                                                        label="Keywords"
                                                                        labelStyle="search-label-style"
                                                                        lSize="4"
                                                                        rSize="8"
                                                                        tagValues={tags}
                                                                        onChageTagValues={onSetTags}
                                                                    />
                                                                </CCol>
                                                                <CCol md="5">
                                                                    <SADocumentPreviewer
                                                                        alt="No document available"
                                                                        fileObj={formProps.values.attachment}
                                                                        documentBoxStyle={{ height: '290px' }}
                                                                        documentViewerStyle={{ height: '290px' }}
                                                                        documentViewerDefaultStyle={{ maxHeight: '290px' }}
                                                                    />
                                                                    <SASingleFileInput
                                                                        name="attachment"
                                                                        formProps={formProps}
                                                                        accept=".doc,.docx,.pdf"
                                                                        isInline="true"
                                                                        lSize="0"
                                                                        rSize="12"
                                                                        isRequired="true"
                                                                        buttonName="Upload a document"
                                                                        buttonClassName="upload-button-style"
                                                                        handleChanges={(file) => {

                                                                        }}
                                                                    />
                                                                </CCol>
                                                            </CRow>
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
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

export default TemplateContainer;