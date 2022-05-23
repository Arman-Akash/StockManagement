import React, { useState } from 'react'
import login1 from '../../assets/login-page/images/bgimage.jpg';
// import logo from '../../assets/login-page/images/logomansur.png';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import * as axios from '../../axios/axiosLib';
import { CRow, CCol } from '@coreui/react';

const Login = (props) => {
    let [msg, setMsg] = useState('');
    return (
        <>
            <link rel="stylesheet" href="/login-page/css/ghpages-materialize.css" />
            <link rel="stylesheet" href="/login-page/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/login-page/css/font-awesome.min.css" />
            <link rel="stylesheet" href="/login-page/css/ionicons.min.css" />
            <link rel="stylesheet" href="/login-page/css/components-md.min.css" />
            <link rel="stylesheet" href="/login-page/css/login2-custom.css" />
            <div id="login-body">
                <img src={login1} className="login-image" />

                <div className="login2-box-body">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={
                            Yup.object({
                                username: Yup.string()
                                    .required("Required"),
                                password: Yup.string()
                                    .required("Required")
                            })
                        }
                        onSubmit={(values, formik) => {
                            axios.fetchLogin(values, (response) => {
                                props.history.push("/");
                            }, (response) => {
                                if (response?.status === 401) {
                                    setMsg("UserID or Password is incorrect");
                                    formik.setSubmitting(false);
                                }
                                else {
                                    setMsg("Something Went wrong! Please try again letter");
                                    formik.setSubmitting(false);
                                }
                            })
                            // axios.postFormData('api/account/authenticate', values)
                        }}
                    >
                        {
                            formProps => {
                                return (
                                    <Form>
                                        <CRow style={{paddingTop:"210px"}}>
                                            <CCol md="4">
                                                <h1 className="main-header text-center"><span style={{ color: "#fff", fontStyle: "italic" }}>Welcome to</span></h1>
                                                <h1 className="main-header"><span style={{ color: "#fff", fontWeight: 'bold' }}>M/S. Mansur Traders</span></h1>
                                                <h4 className="text-center"><span style={{ color: "#fff" }}>Stock Management Solution.</span></h4>
                                            </CCol>
                                            <CCol md="3">
                                                <div className="form-body">
                                                    <div className="form-group form-md-line-input form-md-floating-label">
                                                        <input type="text" id="username" name="username"
                                                            className={"form-control" + (formProps.values !== '' ? " edited" : "")}
                                                            value={formProps.values.username}
                                                            onChange={(e) => {
                                                                formProps.setValues({ ...formProps.values, username: e.target.value })
                                                            }}
                                                            required
                                                        />
                                                        <label htmlFor="email">User ID</label>
                                                    </div>
                                                    <div className="form-group form-md-line-input form-md-floating-label margin-bottom-20 ">
                                                        <input type="password" id="password" name="password"
                                                            className={"form-control" + (formProps.values !== '' ? " edited" : "")}
                                                            value={formProps.values.password}
                                                            onChange={(e) => {
                                                                formProps.setValues({ ...formProps.values, password: e.target.value })
                                                            }}
                                                        />
                                                        <label htmlFor="password">Password</label>
                                                    </div>
                                                    <div className="text-danger mb-2 mt-0">{msg}</div>
                                                    <button type="submit" disabled={formProps.isSubmitting} className="btn btn-success btn-block btn-login">Sign In</button>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </div>
                <footer>
                    <p className="footer-note">
                        <span style={{ color: "#fff" }}>Developed by :</span> <a href="#" target="_blank">Laa Tahzan</a>
                    </p>
                </footer>
            </div>
        </>
    )
}

export default Login;