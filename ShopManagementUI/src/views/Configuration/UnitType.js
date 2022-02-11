
import React, { useState } from 'react'
import {
    CButton,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CDataTable,
    CLabel,
    CRow,
    CCard,
    CCardBody
} from '@coreui/react'
import SAInput from '../FormLib/saInput';
import SADataTable from '../FormLib/saDataTable';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import * as axios from '../../axios/axiosLib';

import { Form, Formik } from "formik";
import * as Yup from "yup";

///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../commonComponents/DeleteModal';
import AddButton from '../commonComponents/AddButton';
import DeleteIcon from '../commonComponents/DeleteIcon';
import EditIcon from '../commonComponents/EditIcon';

const UnitType = () => {
    const [isOpen, toggleModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    let data = {
        id: 0,
        name: ''
    }
    let [unitTypesObj, setUnitTypesObj] = useState(data);

    let dataObj = {
        featureName: ''
    };

    let [dataArr, onSetDataArray] = useState([]);
    let unitTypes = dataApi.useDataApi(`api/UnitType`, initialState.initialCollections);

    const fields = [{ label: 'Unit Type', key: 'name' }, 'actions'];
    // { label: 'Feature Name', key: 'featureName' },
    return (

        <CCard>
            <CCardBody>
                <AddButton
                    onClick={() => {
                        toggleModal(!isOpen);
                        setIsAdd(true);
                        setUnitTypesObj(data);
                    }}
                />

                {/*Datatable*/}
                <CDataTable
                    items={unitTypes.data.data}
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
                                    <EditIcon
                                        onClick={() => {
                                            setUnitTypesObj(item);
                                            onSetDataArray(item.features)
                                            setIsAdd(false);
                                            toggleModal(!isOpen);
                                        }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            setUnitTypesObj(item);
                                            toggleDeleteModal(true);
                                        }}
                                    />
                                </td>
                            )
                    }}
                />

                <CRow>
                    <CCol md="4">
                        <CLabel>Total: {unitTypes.data != undefined && unitTypes.data.data != undefined ? unitTypes.data.data.length : 0}</CLabel>
                    </CCol>
                </CRow>

                <CModal
                    size="lg"
                    style={{ marginLeft: "-30px" }}
                    show={isOpen}
                    onClose={() => toggleModal(!isOpen)}
                    color="primary"
                    size="md"
                >
                    <Formik
                        enableReinitialize
                        initialValues={unitTypesObj}
                        validationSchema={
                            Yup.object({
                                name: Yup.string()
                                    .required("Required"),
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            values.features = dataArr;
                            console.log(dataArr);
                            if (isAdd) {
                                axios.fetchPostData('api/UnitType', values, () => {
                                    unitTypes.refresh()
                                })
                            } else {
                                axios.fetchPutData(`api/UnitType/${values.id}`, values, () => {
                                    unitTypes.refresh();
                                })
                            }
                            resetForm({});
                            onSetDataArray([]);
                            toggleModal(false);
                        }}
                    >
                        {
                            formProps => {
                                return (
                                    <>
                                        <CModalHeader closeButton>
                                            <CModalTitle>Unit Type</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CRow className="mr-0 ml-1">
                                                    <CCol md="8">
                                                        <SAInput
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            label="Unit Type Name"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            labelClassName="float-right"
                                                            isRequired="true"
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow>
                                                    <SADataTable
                                                        md="12"
                                                        tableName="Unit Type Features:"
                                                        style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}
                                                        columns={["Feature Name", "Actions"]}
                                                        fields={["featureName"]}
                                                        dataArr={dataArr}
                                                        onSetDataArray={onSetDataArray}
                                                        dataObj={dataObj}
                                                        scopedSlots={
                                                            (item) => {
                                                                return (
                                                                    <td>
                                                                        <CButton
                                                                            className="deleteIconButton mx-auto d-block"
                                                                            shape="square"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                var theArr = [...dataArr];
                                                                                theArr.splice(item, 1);
                                                                                onSetDataArray(theArr);
                                                                            }}
                                                                            style={{
                                                                                marginLeft: '5%'
                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </CButton>
                                                                    </td>
                                                                )
                                                            }
                                                        }
                                                    />
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

                {/*Delete Modal section*/}
                <DeleteModal
                    isDelete={isDelete}
                    toggleDeleteModal={toggleDeleteModal}
                    deleteOpp={() => {
                        axios.fetchDeleteData(`api/UnitType/${unitTypesObj.id}`, () => {
                            unitTypes.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}

export default UnitType