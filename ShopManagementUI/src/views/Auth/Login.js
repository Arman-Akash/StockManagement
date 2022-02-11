import React, { useState } from 'react'
// import '../../assets/login-page/js/jquery-2.2.3.min.js'
// import '../../assets/login-page/js/bootstrap.min.js'
// import '../../assets/login-page/js/app.min.js'
// import '../../assets/login-page/js/materialize.js'
// import '../../assets/login-page/js/init.js'

import login1 from '../../assets/login-page/images/login1.jpg';
import logo from '../../assets/login-page/images/logo-navy.png';
// import login2 from '../../assets/login-page/images/login2.jpg';
// import login3 from '../../assets/login-page/images/login3.jpg';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import * as axios from '../../axios/axiosLib';

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
                {/* <div className="slider fullscreen">
                    <ul className="slides">
                        <li>
                            <img src={login1} />
                        </li>
                        <li>
                            <img src={login2} />
                        </li>
                        <li>
                            <img src={login3} />
                        </li>
                    </ul>
                </div> */}

                <div className="login2-box-body">
                    <div className="logo-holder">
                        <img src={logo} alt="logo" />
                    </div>
                    {/*<h3 className="main-header">Laa Tahzan Shop</h3>*/}
                    <h1 className="main-header">Mansur Traders</h1>
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
                                            <button type="submit" disabled={formProps.isSubmitting} className="btn btn-primary btn-block btn-login">Sign In</button>
                                        </div>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </div>

                <div className="radar-wrapper2">
                    <div className="radar-wrapper">
                        <div className="radar">
                            <div className="cross-section"></div>
                            <div className="spinner"></div>
                            <div className="blip"></div>
                            <div className="blip"></div>
                            <div className="blip"></div>
                        </div>
                    </div>
                </div>

                <footer>
                    <p className="footer-note">
                        <span style={{ color: "#fff" }}>Developed by :</span> <a href="https://laatahzan.com" target="_blank">Laa Tahzan</a>
                    </p>
                </footer>
            </div>
        </>
    )
}

export default Login;