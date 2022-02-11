import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CDataTable,
  } from '@coreui/react';
  import { faSave } from '@fortawesome/free-solid-svg-icons';
  ///Font Awesome
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import React, { useEffect, useState } from 'react';
  import * as axios from '../../axios/axiosLib';
  //Custom hook and state
  import * as dataApi from '../../customHooks/UseDataApi';
  import * as initialState from '../../functionalLib/initialState';
  
  
  const OpeningStockEntry = () => {
    var fields = [
      { key: "productCodeName", label: "Product" },
      { key: "unitName", label: 'Unit' },
      'quantity']
  
    let productList = dataApi.useDataApi(`api/Product`, initialState.initialCollections);
  
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      setProducts(productList.data.data)
    }, [productList])
  
    return (
      <CCard>
        <CCardBody>
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
                      // label="Concern Name"
                      isInline="true"
                      lSize="3"
                      rSize="9"
                      isRequired="true"
                      labelClassName="float-right"
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
                axios.fetchPostData('api/OpeningStock/StockUpdate', products)
              }}
            ><FontAwesomeIcon icon={faSave} className="ml-1" /> Save
            </CButton>
          </CCol>
  
        </CCardBody>
      </CCard>
    )
  }
  
  export default OpeningStockEntry  