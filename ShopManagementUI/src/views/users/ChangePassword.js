import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CLabel,
    CRow
} from '@coreui/react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Formik & Yup lib
import { Form, Formik } from "formik";
import React from 'react';
import * as Yup from "yup";
import * as axios from '../../axios/axiosLib';
import SAInput from '../FormLib/saInput';

const ChangePassword = () => {
    return (
        <CCard className="passwordBackground">
            <CCardBody>
                <Formik
                    enableReinitialize
                    initialValues={{
                    }}
                    validationSchema={
                        Yup.object({
                            password: Yup.string()
                                .required("required"),
                            confrimNewPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Password did not match')
                        })
                    }
                    onSubmit={(values, { resetForm }) => {
                        axios.fetchPostData(`api/account/ChangePassword`, {
                            password: values.password,
                            confirmPassword: values.confrimNewPassword
                        }, (response) => {
                            alert("Password Change Successfully");
                        })
                        resetForm();
                    }}
                >
                    {
                        formProps => {
                            return (
                                <>
                                    <CCol md={{ offset: 2, size: 4 }} className="mt-2">
                                        <h5 className="text-center pt-4"><span style={{ color: 'white' }}>Change Password</span></h5>
                                    </CCol>
                                    <Form>
                                        <CCol md={{ offset: 2, size: 4 }}>
                                            <CLabel style={{ color: 'white' }}> New Password <span style={{ color: 'red' }}>*</span></CLabel>
                                            <SAInput
                                                id="password"
                                                name="password"
                                                type="password"
                                                lSize="4"
                                                rSize="5"
                                                labelClassName="float-left"
                                                isRequired="true"
                                                placeholder="Please Enter New Password"
                                            />
                                        </CCol>
                                        <CCol md={{ offset: 2, size: 4 }}>
                                            <CLabel style={{ color: 'white' }}> Confirm Password <span style={{ color: 'red' }}>*</span></CLabel>
                                            <SAInput
                                                id="confrimNewPassword"
                                                name="confrimNewPassword"
                                                type="password"
                                                lSize="4"
                                                rSize="5"
                                                labelClassName="float-left"
                                                isRequired="true"
                                                placeholder="Enter your New Password again"
                                            />
                                        </CCol>
                                        <CRow className="text-center">
                                            <CCol md={{ offset: 5, size: 1 }}>
                                                <CButton type="submit" color="success" size="sm"><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                            </CCol>
                                        </CRow>
                                    </Form>
                                </>
                            );
                        }
                    }
                </Formik>
            </CCardBody>
        </CCard>
    )
}
export default ChangePassword
