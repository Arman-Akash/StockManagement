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

const StockShow = () => {

    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);

    const [stocks, setStocks] = useState([]);
    const [disable, setDisable] = useState(true);

    var user = loadState(LOGGED_IN_USER);

    useEffect(() => {
        if (user?.permissions == Roles.Admin) {
            setDisable(false);
        }
        console.log(user);
        axios.fetchGetData(`api/stock/GetStockByBranch/${user?.branch_id}`, undefined, undefined, (response) => {
            console.log(response.data)
            // formProps.setFieldValue('productSubType', value);
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
                                                        options={branches.data.data.map(item => {
                                                            return { label: item.name, value: item.id }
                                                        })}
                                                        isDisabled={disable}
                                                        onChangeHandle={(name, value) => {
                                                            axios.fetchGetData(`api/stock/GetStockByBranch/${value}`, undefined, undefined, (response) => {
                                                                console.log(response.data)
                                                                // formProps.setFieldValue('productSubType', value);
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
                    fields={[
                        { key: "productName", label: "Product" },
                        { key: 'quantity', label: 'stock' },
                        { key: "unitName", label: 'Unit' },
                        { key: 'amount', _classes: 'text-right' }
                    ]}
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

export default StockShow