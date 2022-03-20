import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDataTable
} from '@coreui/react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import * as axios from '../../axios/axiosLib';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
//Custom hook and state
import { Form, Formik } from "formik";
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';


const StockAdjustment = () => {
    var fields = [
        { key: "productName", label: "Product" }, {label:'Stock', key:'quantity'},
        { key: "unitName", label: 'Unit' }
    ]

    let productTypes = dataApi.useDataApi(`api/ProductType`, initialState.initialCollections);

    const [products, setProducts] = useState([]);

    const [productSubTypes, setProductSubTypes] = useState([]);

    // useEffect(() => {
    //   setProducts(productList.data.data);
    // }, [productList])

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol md="12">
                        <Formik
                            enableReinitialize
                            initialValues={{
                            }}

                            onSubmit={(values, { resetForm }) => {

                            }}
                        >
                            {
                                formProps => {
                                    return (
                                        <Form>
                                            <h5 style={{ marginBottom: "10px" }} className='page-title'>Stock Adjustment</h5>
                                            <CRow>
                                                <CCol md="2">
                                                </CCol>
                                                <CCol md="4">
                                                    <SAReactAutoSelect
                                                        id="productTypeId"
                                                        name="productTypeId"
                                                        label="Product Type"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={productTypes.data.data.map(item => {
                                                            return { label: item.type, value: item.id }
                                                        })}
                                                        onChangeHandle={(name, value) => {
                                                            axios.fetchGetData(`api/ProductSubType/GetByProductType/${value}`, undefined, undefined, (response) => {
                                                                console.log(response.data)
                                                                // formProps.setFieldValue('productSubType', value);
                                                                setProductSubTypes(response.data);
                                                            })
                                                        }}
                                                    />
                                                </CCol>
                                                <CCol md="4">
                                                    <SAReactAutoSelect
                                                        id="productSubTypeId"
                                                        name="productSubTypeId"
                                                        label="Product Sub Type"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="8"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={productSubTypes.map(item => {
                                                            return { label: item.subType, value: item.id }
                                                        })}
                                                        onChangeHandle={(name, value) => {
                                                            axios.fetchGetData(`api/Product/GetByProductSubType/${value}`, undefined, undefined, (response) => {
                                                                console.log(response.data)
                                                                // formProps.setFieldValue('productSubType', value);
                                                                setProducts(response.data);
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
                    items={products}
                    fields={fields}
                    tableFilter
                    border
                    striped
                    pagination
                    scopedSlots={{
                        'quantity':
                            (item, index) => (
                                <td>
                                    <input
                                        id="quanity"
                                        name="quantity"
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            setProducts(previousproducts => {
                                                previousproducts[index].quantity = parseInt(e.target.value)
                                            });
                                        }}
                                    />
                                </td>
                            )
                    }}
                />

                <CCol md="6" className="text-right mt-2">
                    <CButton color="success" size="md"
                        onClick={() => {
                            axios.fetchPostData('api/OpeningStock', products)
                            console.log(products);
                        }}
                    ><FontAwesomeIcon icon={faSave} className="ml-1" /> Save
                    </CButton>
                </CCol>

            </CCardBody>
        </CCard>
    )
}

export default StockAdjustment  