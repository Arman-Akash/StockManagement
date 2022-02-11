import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
    CButton
} from '@coreui/react';
import SearchButton from '../commonComponents/SearchButton';
import SAInput from '../FormLib/saInput';
import SADataTable from '../FormLib/saDataTable';
import SACheckBox from '../FormLib/saCheckBoxTest';
import SATextArea from '../FormLib/saTextarea';
import AddButton from '../commonComponents/AddButton';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";


const TaskContainer = (props) => {
    let dataObj = {
        task: '',
        assignTo: '',
        dateTime: '',
        remarks: '',
        isComplete: ''
    };

    let [dataArr, onSetDataArray] = useState([dataObj, dataObj]);

    return (
        <>
            <CRow>
                <CCol md="12">
                    <CCard>
                        <CCardBody>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    fromDate: '',
                                    toDate: ''
                                }}
                                validationSchema={
                                    Yup.object()
                                }
                                onSubmit={(values, { resetForm }) => {
                                    console.log(values);
                                }}
                            >
                                {
                                    formProps => {
                                        return (
                                            <Form>
                                                <CRow>
                                                    <CCol md="4" style={{ marginTop: '1px' }}>
                                                        <SAInput
                                                            id="fromDate"
                                                            name="fromDate"
                                                            type="date"
                                                            label="From"
                                                            labelClassName="search-label-style"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="9"
                                                            formProps={formProps}
                                                        />
                                                    </CCol>
                                                    <CCol md="4" style={{ marginTop: '1px' }}>
                                                        <SAInput
                                                            id="toDate"
                                                            name="toDate"
                                                            type="date"
                                                            label="To"
                                                            labelClassName="search-label-style"
                                                            isInline="true"
                                                            lSize="3"
                                                            rSize="9"
                                                            formProps={formProps}
                                                        />
                                                    </CCol>
                                                    <CCol md="4">
                                                        <SearchButton
                                                            type="submit"
                                                            style={{ marginTop: '1px', height: '80%' }}
                                                            onClick={() => {

                                                            }} />
                                                    </CCol>
                                                </CRow>
                                            </Form>
                                        )
                                    }
                                }
                            </Formik>
                            <CRow style={{ marginTop: '10px' }}>
                                <CCol md="12">
                                    <SADataTable
                                        md="12"
                                        style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}
                                        columns={["Task", "Assign To", "Date Time", "Remarks", "Is Complete", "Action"]}
                                        fields={["task", "assignTo", "dateTime", "remarks", "isComplete"]}
                                        dataArr={dataArr}
                                        dataObj={dataObj}
                                        onSetDataArray={onSetDataArray}
                                        fieldsTypeWithValue={[{
                                            fieldName: 'assignTo',
                                            fieldType: 'SELECT',
                                            options: [{ name: 'Shams', value: 'Shams' }, { name: 'Wadud', value: 'Wadud' },]
                                        }, {
                                            fieldName: 'dateTime',
                                            fieldType: 'date'
                                        }, {
                                            fieldName: 'isComplete',
                                            fieldType: 'checkbox',
                                            fieldStyle: {
                                                width: '15px',
                                                margin: '0 auto'
                                            }
                                        }]}
                                        scopedSlots={(item) => {
                                            return (
                                                <td key={item}>
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
                                        }}
                                    />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

export default TaskContainer;