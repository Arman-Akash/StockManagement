import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDataTable,
    CLink
} from '@coreui/react';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import * as axios from '../../axios/axiosLib';
//Custom hook and state
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import { Form, Formik } from "formik";
import { loadState } from '../../axios/storage';
import { LOGGED_IN_USER } from '../../axios/keys';
import { Roles } from '../../staticData';

const DueReport = () => {

    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);

    const [dues, setDues] = useState([]);
    const [disable, setDisable] = useState(true);
    const [total, setTotal] = useState(0);

    var user = loadState(LOGGED_IN_USER);

    useEffect(() => {
        if (user?.permissions == Roles.Admin) {
            setDisable(false);
        }
        axios.fetchGetData(`api/due/GetDueByBranch/${user?.branch_id}`, undefined, undefined, (response) => {
            setDues(response.data);
            setTotal(response.data.reduce((a, b) => a + b.amount, 0).toFixed("2"));
        })
    }, [])

    return (
        <CCard>
            <CCardBody>
                <h5 style={{ marginBottom: "10px" }} className='page-title'>Customer Due Report</h5>
                <CRow>
                    <CCol md="12">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                branchId: user?.branch_id
                            }}

                            onSubmit={(values, { resetForm }) => {

                            }}
                        >
                            {
                                formProps => {
                                    return (
                                        <Form>
                                            <CRow>
                                                <CCol md="4">
                                                    <SAReactAutoSelect
                                                        name="branchId"
                                                        label="Branch"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={branches.data.data.map(item => {
                                                            return { label: item.name, value: item.id }
                                                        })}
                                                        isDisabled={disable}
                                                        onChangeHandle={(name, value) => {
                                                            axios.fetchGetData(`api/due/GetDueByBranch/${value}`, undefined, undefined, (response) => {
                                                                console.log(response.data)
                                                                setDues(response.data);
                                                                setTotal(response.data.reduce((a, b) => a + b.amount, 0).toFixed("2"));
                                                            })
                                                        }}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </Form>
                                    );
                                }
                            }
                        </Formik>
                    </CCol>
                </CRow>
                <CDataTable
                    items={dues}
                    fields={[
                        // { key: "branchName", label: "Branch Name" },
                        { key: 'customerName', label: 'Customer Name' },
                        { key: 'address', label: 'Address' },
                        { key: 'phoneNo', label: 'Phone No' },
                        { key: 'amount', label: 'Due Amount', _classes: 'text-right' }
                    ]}
                    tableFilter
                    border
                    striped
                    pagination
                    extraRow={<tr>
                        <td colSpan="2" className="text-right">Total:</td>
                        <td>total</td>
                        <td colSpan="7"></td>
                    </tr>}
                />

                <CRow>
                    <CCol md="12" className="text-right">
                        Total Credit Amount: <span style={{ color: 'red' }}>{total}</span> TK
                    </CCol>
                </CRow>

                <CCol md="6" className="text-right mt-2">
                    <CLink to="/dashboard">
                        <CButton size="sm" style={{ marginLeft: "20px" }} color="danger" type="rest"><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Exit</CButton>
                    </CLink>
                </CCol>
            </CCardBody>
        </CCard>
    )
}

export default DueReport