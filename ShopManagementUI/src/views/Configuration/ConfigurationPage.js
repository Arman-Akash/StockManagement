import React from 'react'
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
    CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
//Icons
import iSupplier from '../../assets/images/supplier.png';
import iSubType from '../../assets/images/subtype.png';
import iProductType from '../../assets/images/productType.png';
import iProduct from '../../assets/images/products.png';
import iUnit from '../../assets/images/unit.png';
import iOrder from '../../assets/images/order.png';
import iBusinessUnit from '../../assets/images/businessunit.png';
import iOpeningStock from '../../assets/images/stock.png';
import iReport from '../../assets/images/report.png';

const ConfigurationPage = () => {

    return (
        <CCard>
            <CCardBody className="dashboard">
                <CRow style={{ padding: "10px" }}>
                <CCol xs="2" sm="2" className="text-center oms-icon">
                        <CLink to="/branch">
                            <CIcon src={iBusinessUnit} />
                            <h6>Branch Information</h6>
                        </CLink>
                    </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                        <CLink to="/customer">
                            <CIcon src={iSupplier} />
                            <h6>Customer</h6>
                        </CLink>
                    </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                    <CLink to="/product-sub-type">
                        <CIcon src={iProductType} />
                        <h6>Product Sub Type</h6>
                    </CLink>
                </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                        <CLink to="/product-type">
                            <CIcon src={iSubType} />
                            <h6>Product Type</h6>
                        </CLink>
                    </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                        <CLink to="/product">
                            <CIcon src={iProduct} />
                            <h6>Product</h6>
                        </CLink>
                    </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                        <CLink to="/unit">
                            <CIcon src={iUnit} />
                            <h6>Unit</h6>
                        </CLink>
                    </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                        <CLink to="/warehouse-receive">
                            <CIcon src={iOrder} />
                            <h6>Warehouse Product Receive</h6>
                        </CLink>
                    </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                    <CLink to="/opening-stock-entry">
                        <CIcon src={iOpeningStock} />
                        <h6>Opening Stock Entry</h6>
                    </CLink>
                    </CCol>
                    <CCol xs="2" sm="2" className="text-center oms-icon">
                    <CLink to="/purchase-report">
                        <CIcon src={iReport} />
                        <h6>Purchase Report</h6>
                    </CLink>
                </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}
export default ConfigurationPage