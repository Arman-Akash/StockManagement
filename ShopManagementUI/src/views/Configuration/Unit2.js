import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CImg,
    CTooltip,
    CLink,
    CListGroup,
    CListGroupItem
} from '@coreui/react';
import { faPlus, faSave, faTimes, faFileDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from "formik";
import React, { useState } from 'react';
import * as Yup from "yup";
import * as axios from '../../axios/axiosLib';
//Custom hook and state
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import AddButton from '../commonComponents/AddButton';
import DeleteModal from '../commonComponents/DeleteModal';
import DeleteIcon from '../commonComponents/DeleteIcon';
import EditIcon from '../commonComponents/EditIcon';
import SADataTable from '../FormLib/saDataTable';
import SAInput from '../FormLib/saInput';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SATextArea from '../FormLib/saTextarea';
import { apiHostName, incidentsFolder } from '../../config';

const Unit = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const [isOpenFeature, toggleModalFeature] = useState(false);
    const [isDeleteFeature, toggleDeleteModalFeature] = useState(false);
    const [isAddFeature, setIsAddFeature] = useState(false);

    let data = {
        id: 0,
        countryId: 0,
        name: '',
        date: '',
        description: '',
        unitTypeId: ''
    }

    let data2 = {
        id: 0,
        unitTypeId: 0,
        featureName: ''
    }
    let [featureObj, setFeatureObj] = useState(data2);
    let [unitTypeId, setUnitTypeId] = useState();

    const fields = [{ key: 'countryName', label: 'Country' }, { key: 'unitTypeName', label: 'Unit Type' },
    { key: 'name', label: 'Name' }, { key: 'date', label: 'Date' },
    { label: 'Feature Name ------------ Feature Value', key: 'featureDetails' },
        'actions'];
    let dataObj = {
        id: 0,
        featureId: '',
        featureValue: ''
    };
    let [chooseTypeWise, toggleState] = useState({
        isUnitTypeId: false,
        isPlusIcon: false

    });

    let [dataArr, onSetDataArray] = useState([]);
    let unitTypes = dataApi.useDataApi(`api/UnitType`, initialState.initialCollections);
    let units = dataApi.useDataApi(`api/Unit/GetName`, initialState.initialCollections);
    let countries = dataApi.useDataApi(`api/Country`, initialState.initialCollections);
    // let features = dataApi.useDataApi(`api/Feature`, initialState.initialCollections);
    let [unitObj, setUnitObj] = useState(data);
    let [unitTypesObj, setUnitTypesObj] = useState(data);
    let [attachment, setAttachment] = useState(null);
    let [attachmentId, setAttachmentId] = useState();
    let [files, setFiles] = useState([]);
    let [openAttachment, toggleAttachmentModal] = useState(false);
    let [deleteAttachment, toggledeleteAttachmentModal] = useState(false);

    return (
        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setUnitObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={units.data.data}
                    fields={fields}
                    tableFilter
                    border
                    pagination
                    striped
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
                                    <EditIcon
                                        onClick={() => {
                                            setUnitObj(item);
                                            onSetDataArray(item.unitFeatures)
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />

                                    {/* <DeleteIcon
                                        onClick={() => {
                                            setUnitObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    /> */}
                                </td>
                            )
                    }}
                />

                <CRow>
                    <CCol md="4">
                        <CLabel>Total Number of units: {units.data != undefined && units.data.data != undefined ? units.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>

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

                {/*For Add*/}
                <CModal
                    // style={{ width: "100%", marginTop: "-80px", marginLeft: "-15px" }}
                    style={{ marginLeft: "100px", marginTop: "100px" }}
                    show={isOpen}
                    size="lg"
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                >
                    <Formik
                        enableReinitialize
                        initialValues={unitObj}
                        validationSchema={
                            Yup.object({
                                name: Yup.string()
                                    .required("Required"),
                                unitTypeId: Yup.string()
                                    .required("Required"),
                            })
                        }
                        // onSubmit={(values, { resetForm }) => {
                        //     delete values.unitFeatures;
                        //     console.log(dataArr);
                        //     if (isAdd) {
                        //         axios.postFormData('api/Unit', values, [{ name: "unitFeatures", array: dataArr }], [{ name: "attachment", attachment: attachment }], () => {
                        //             units.refresh()
                        //         })
                        //     } else {
                        //         axios.putFormData(`api/Unit/${values.id}`, values, [{ name: "unitFeatures", array: dataArr }], [{ name: "attachment", attachment: attachment }], () => {
                        //             units.refresh()
                        //         })
                        //     }
                        //     resetForm();
                        //     toggleModal(false);
                        // }}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)
                            if (isAdd) {
                                axios.postFormData('api/Unit', values, [{ name: "unitFeatures", array: dataArr }], [{ name: "attachments", attachment: attachment }], () => {
                                    units.refresh()
                                })
                            } else {
                                axios.putFormData(`api/Unit/${values.id}`, values, [{ name: "unitFeatures", array: dataArr }], [{ name: "attachments", attachment: attachment }], () => {
                                    units.refresh();
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
                                            <CModalTitle>Unit</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CRow>
                                                    <CCol md="6">
                                                        <SAInput
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            label="Name"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            isRequired="true"
                                                        />
                                                    </CCol>
                                                    <CCol md="6">
                                                        <SAReactAutoSelect
                                                            id="countryId"
                                                            name="countryId"
                                                            label="Country"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            formProps={formProps}
                                                            options={countries.data.data.map(country => {
                                                                return { label: country.name, value: country.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow>
                                                    <CCol md="6">
                                                        <SAInput
                                                            id="date"
                                                            name="date"
                                                            type="date"
                                                            label="Date"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>
                                                    <CCol md="6">
                                                        <SAReactAutoSelect
                                                            id="unitTypeId"
                                                            name="unitTypeId"
                                                            label="Unit Type"
                                                            labelClassName="label-style"
                                                            isRequired="true"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="8"
                                                            formProps={formProps}
                                                            onChangeHandle={(name, value) => {
                                                                setUnitTypeId(value);
                                                                axios.fetchGetData(`api/Feature/${value}`, featureObj, setFeatureObj, (response) => {
                                                                    console.log(response);
                                                                    var arr = [];
                                                                    response.data.forEach((feature, index) => {
                                                                        arr.push({
                                                                            featureName: feature.featureName,
                                                                            featureId: feature.id,
                                                                            featureValue: ''
                                                                        });
                                                                    });
                                                                    onSetDataArray(arr);
                                                                });
                                                                if (value === null) {
                                                                    toggleState({
                                                                        ...chooseTypeWise,
                                                                        isPlusIcon: false,
                                                                    });
                                                                }
                                                                else {
                                                                    toggleState({
                                                                        ...chooseTypeWise,
                                                                        isPlusIcon: true,
                                                                    });
                                                                }
                                                            }}
                                                            options={unitTypes.data.data.map(unitType => {
                                                                return { label: unitType.name, value: unitType.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow className="mb-1">
                                                    <CLabel>
                                                        <h6 style={{ marginLeft: '20px' }}>Attachment</h6>
                                                    </CLabel>
                                                    <input
                                                        type="file"
                                                        name="attachment[]"
                                                        accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt"
                                                        label="Attachment"
                                                        style={{ marginLeft: '12px', paddingTop: "3px" }}
                                                        onChange={
                                                            (e) => {
                                                                setAttachment(e.target.files);
                                                            }
                                                        }
                                                        multiple={true}
                                                    />
                                                </CRow>

                                                <CRow className="mb-2">
                                                    <CCol md="11" style={{ marginLeft: "39px" }}>
                                                        <SATextArea
                                                            id="description"
                                                            name="description"
                                                            type="text"
                                                            label="Description"
                                                            isInline="true"
                                                            lSize="1"
                                                            rSize="11"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow style={{ paddingRight: '10px' }}>
                                                    <CCol md="12" >
                                                        <CRow style={{ marginLeft: "696px", display: chooseTypeWise.isPlusIcon ? 'block' : 'none' }}>
                                                            <CCol>
                                                                <CTooltip content="Add Features">
                                                                    <CButton color="secondary" size="sm" color="success"
                                                                        onClick={() => {
                                                                            toggleModalFeature(!isOpenFeature);
                                                                            setIsAdd(true);
                                                                            setUnitTypesObj(data);
                                                                        }}><FontAwesomeIcon icon={faPlus} color="white" />
                                                                    </CButton>
                                                                </CTooltip>
                                                            </CCol>
                                                        </CRow>
                                                        <SADataTable
                                                            md="12"
                                                            style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}
                                                            columns={["Feature Name", "Feature Value"]}
                                                            fields={["featureName", 'featureValue']}
                                                            readOnlyArr={["featureName"]}
                                                            dataArr={dataArr}
                                                            dataObj={dataObj}
                                                            tableStyle={{ width: '100%' }}
                                                            onSetDataArray={onSetDataArray}
                                                            fieldsTypeWithValue={[
                                                                {
                                                                    thStyle: { width: '50%' },
                                                                    fieldType: 'text',
                                                                    fieldName: 'featureId',
                                                                },
                                                                {
                                                                    thStyle: { width: '30%' },
                                                                    fieldType: 'text',
                                                                    fieldName: 'featureValue'
                                                                }
                                                            ]}
                                                        />
                                                    </CCol>
                                                </CRow>
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

                <CModal
                    style={{ marginLeft: "-30px" }}
                    show={isOpenFeature}
                    onClose={() => toggleModalFeature(!isOpenFeature)}
                    color="dark"
                    size="md"
                >
                    <Formik
                        enableReinitialize
                        initialValues={featureObj}
                        validationSchema={
                            Yup.object({

                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            values.unitTypeId = unitTypeId;
                            axios.fetchPostData('api/Feature', values, (response) => {
                                if (response.data != null) {
                                    console.log(response.data);
                                    console.log(dataArr);
                                    var arr = [...dataArr]
                                    arr.push({
                                        featureName: response.data.featureName,
                                        featureId: response.data.id,
                                        featureValue: ''
                                    })
                                    onSetDataArray(arr);
                                }
                            })
                            resetForm();
                            toggleModalFeature(false);
                        }}
                    >
                        {
                            formProps => {
                                return (
                                    <>
                                        <CModalHeader closeButton>
                                            <CModalTitle>Add Feature</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CRow className="mr-0 ml-1">
                                                    <CCol md="8">
                                                        <SAInput
                                                            id="featureName"
                                                            name="featureName"
                                                            type="text"
                                                            label="Feature Name"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                        />
                                                    </CCol>
                                                </CRow>
                                            </CModalBody>
                                            <CModalFooter>
                                                <CButton type="submit" color="success" size="sm"><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                                <CButton color="secondary" size="sm" onClick={() => { toggleModalFeature(!isOpenFeature) }}><FontAwesomeIcon icon={faTimes} /> Cancel</CButton>
                                            </CModalFooter>
                                        </Form>
                                    </>
                                );
                            }
                        }
                    </Formik>
                </CModal>
                <DeleteModal
                    isDelete={deleteAttachment}
                    toggleDeleteModal={toggledeleteAttachmentModal}
                    deleteOpp={() => {
                        axios.fetchDeleteData(`api/Unit/DeleteAttachment/${attachmentId}`, () => {
                            setFiles(() => {
                                return files.filter(e => e.id != attachmentId);
                            })
                        });
                    }}
                />
            </CCardBody>
        </CCard >
    )
}

export default Unit