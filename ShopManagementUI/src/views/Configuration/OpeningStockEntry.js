import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import * as axios from '../../axios/axiosLib';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SADataTable from '../FormLib/saDataTable';

//Custom hook and state
import { Form, Formik } from "formik";
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';


const OpeningStockEntry = () => {
  let dataObj = {
    productId: 0,
    quantity: 0,
    amount: 0
  };
  const [productSubTypes, setProductSubTypes] = useState([]);

  let [dataArr, onSetDataArray] = useState([]);

  let productTypes = dataApi.useDataApi(`api/ProductType`, initialState.initialCollections);
  let products = dataApi.useDataApi(`api/Product`, initialState.initialCollections);

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
                console.log(dataArr);
                axios.fetchPostData('api/OpeningStock', dataArr);
              }}
            >
              {
                formProps => {
                  return (
                    <Form>
                      <h5 style={{ marginBottom: "10px" }} className='page-title'>Opening Stock</h5>
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
                                // formProps.setFieldValue('productSubType', value);
                                onSetDataArray(response.data);
                              })
                            }}
                          />
                        </CCol>
                      </CRow>
                      <CRow style={{ marginTop: '10px' }}>
                        <SADataTable
                          md="12"
                          tableName="Opening Stock Details:"
                          style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', paddingTop: '0px', paddingBottom: '0px' }}
                          dataTableStyle={{ maxHeight: '200px', overflow: 'auto' }}
                          columns={["Product Name","Quantity", "Unit Name","Amount" ]}
                          fields={["productName","quantity", "unitName","amount" ]}
                          readOnlyArr={["unitName"]}
                          dataArr={dataArr}
                          dataObj={dataObj}
                          onSetDataArray={onSetDataArray}
                          fieldsTypeWithValue={[
                            {
                              thStyle: { width: '30%' },
                              fieldName: 'productName',
                              fieldType: 'text',
                            },
                            {
                              thStyle: { width: '15%' },
                              fieldName: 'unitName',
                              fieldType: 'text',
                            },
                            {
                              thStyle: { width: '15%' },
                              fieldName: 'quantity',
                              fieldType: 'NUMBER',
                            }
                            ,
                            {
                              thStyle: { width: '15%' },
                              fieldName: 'amount',
                              fieldType: 'NUMBER',
                            }
                          ]}
                        />
                      </CRow>

                      <CCol md="6" className="text-right mt-2">
                        <CButton color="success" size="md" type="submit"
                        ><FontAwesomeIcon icon={faSave} className="ml-1" /> Save
                        </CButton>
                      </CCol>
                    </Form>
                  );
                }
              }
            </Formik>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default OpeningStockEntry