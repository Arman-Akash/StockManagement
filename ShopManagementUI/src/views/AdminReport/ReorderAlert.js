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

const ReorderAlert = () => {
    var fields = [
        { key: "productName", label: "Product" },
        { key: 'quantity', label: 'Stock', _style: { width: '15%' } },
        { key: "unitName", label: 'Unit', _style: { width: '15%' } },
        { label: "Re-order Label", key: 'reorderLabel', _style: { width: '20%' } }
    ]

    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);
    const [disable, setDisable] = useState(true);

    const [stocks, setStocks] = useState([]);
    var user = loadState(LOGGED_IN_USER);

    useEffect(() => {
        if (user?.permissions == Roles.Admin) {
            setDisable(false);
        }
        axios.fetchGetData(`api/stock/GetReorderByBranch/${user?.branch_id}`, undefined, undefined, (response) => {
            setStocks(response.data);
        })
    }, [])

    return (
        <CCard>
            <CCardBody>
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
                                                        isDisabled={disable}
                                                        options={branches.data.data.map(item => {
                                                            return { label: item.name, value: item.id }
                                                        })}
                                                        onChangeHandle={(name, value) => {
                                                            axios.fetchGetData(`api/stock/GetReorderByBranch/${value}`, undefined, undefined, (response) => {
                                                                setStocks(response.data);
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
                    items={stocks}
                    fields={fields}
                    tableFilter
                    border
                    striped
                    pagination
                />

                <CCol md="6" className="text-right mt-2">
                    <CLink to="/dashboard">
                        <CButton size="sm" style={{ marginLeft: "20px" }} color="danger" type="rest"><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Exit</CButton>
                    </CLink>
                </CCol>
            </CCardBody>
        </CCard>
    )
}

export default ReorderAlert