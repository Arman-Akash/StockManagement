import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
} from '@coreui/react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import * as axios from '../../axios/axiosLib';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';

//Custom hook and state
import { Form, Formik } from "formik";
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';


const OpeningStockEntry = () => {
  const [productSubTypes, setProductSubTypes] = useState([]);

  let [dataArr, onSetDataArray] = useState([]);

  let productTypes = dataApi.useDataApi(`api/ProductType`, initialState.initialCollections);

  useEffect(() => {
    axios.fetchGetData(`api/Product/GetByProductSubType`, undefined, undefined, (response) => {
      onSetDataArray(response.data);
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
              }}

              onSubmit={(values, { resetForm }) => {
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
                                onSetDataArray(response.data);
                              })
                            }}
                          />
                        </CCol>
                      </CRow>
                      <CRow style={{ marginTop: '10px' }}>
                        <CDataTable
                          items={dataArr}
                          fields={[
                            { key: "productName", label: "Product" },
                            'quantity',
                            { key: "unitName", label: 'Unit' },
                            'amount'
                          ]}
                          tableFilter
                          border
                          striped
                          pagination
                          scopedSlots={{
                            'quantity':
                              (item, index) => (
                                <td className='p-0'>
                                  <input
                                    id="quanity"
                                    name="quantity"
                                    type="number"
                                    className='form-control'
                                    value={item.quantity}
                                    onChange={(e) => {
                                      var val = e.target.value;
                                      var arr = [...dataArr];
                                      var product = arr[index];
                                      product.quantity = val;
                                      arr[index] = product;
                                      onSetDataArray(arr);
                                    }}
                                  />
                                </td>
                              ),
                            'amount':
                              (item, index) => (
                                <td className='p-0'>
                                  <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    className='form-control'
                                    value={item.amount}
                                    onChange={(e) => {
                                      var val = e.target.value;
                                      var arr = [...dataArr];
                                      var product = arr[index];
                                      product.amount = val;
                                      arr[index] = product;
                                      onSetDataArray(arr);
                                    }}
                                  />
                                </td>
                              )
                          }}
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