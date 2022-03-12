import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

//Icons
import iStock from '../../assets/images/stock.png';
import iSell from '../../assets/images/sell.png';
import iPurchase from '../../assets/images/purchase.png';
import iStockShow from '../../assets/images/stockShow.png';
import iStockAdjustment from '../../assets/images/stockAdjustment.png';
import iSupplier from '../../assets/images/supplier.png';
import iSubType from '../../assets/images/subtype.png';
import iProductType from '../../assets/images/productType.png';
import iProduct from '../../assets/images/products.png';
import iUnit from '../../assets/images/unit.png';
import iOrder from '../../assets/images/order.png';
import iBusinessUnit from '../../assets/images/businessunit.png';
import iCustomrDues from '../../assets/images/credit.png';
import iReceive from '../../assets/images/received.png';
import iReport from '../../assets/images/report.png';
import iExpire from '../../assets/images/expired.png';
import iReorder from '../../assets/images/reorder.png';
import routes, { outlet, warehouse } from '../../routes';
import { loadState } from '../../axios/storage';
import { LOGGED_IN_USER } from '../../axios/keys';
import { Roles } from '../../staticData';

const Dashboard = () => {
  useEffect(() => {
    var icons = document.getElementsByClassName("oms-icon");
    var user = loadState(LOGGED_IN_USER);
    for(var i = 0; i< icons.length; i++) {
      if(user?.permissions == Roles.Admin) {
        if(!routes.some(e => e.path.includes(icons[i].firstChild.href.split('#')[1]))) {
          icons[i].style.display = 'none';
        }
      }
      else if(user?.permissions == Roles.Warehouse) {
        if(!warehouse.some(e => e.path.includes(icons[i].firstChild.href.split('#')[1]))) {
          icons[i].style.display = 'none';
        }
      }
      else if(user?.permissions == Roles.Outlet) {
        if(!outlet.some(e => e.path.includes(icons[i].firstChild.href.split('#')[1]))) {
          icons[i].style.display = 'none';
        }
      }
    }
  }, [])
  
  return (
    // <CCard style={{ backgroundImage: `url(${iBgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", overflow: "hidden" }}>
    <CCard>
      <CCardBody className="dashboard">
        <CRow style={{ padding: "10px" }}>
          <CCol md="2" xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/branch">
              <CIcon className='mob-dashboard-img' src={iBusinessUnit} />
              <h6>Branch Information</h6>
            </CLink>
          </CCol>
          <CCol md="2" xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/product-type">
              <CIcon className='mob-dashboard-img' src={iSubType} />
              <h6>Product Type</h6>
            </CLink>
          </CCol>
          <CCol md="2" xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/product-sub-type">
              <CIcon className='mob-dashboard-img' src={iProductType} />
              <h6>Product Sub Type</h6>
            </CLink>
          </CCol>

          <CCol md="2" xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/product">
              <CIcon className='mob-dashboard-img' src={iProduct} />
              <h6>Product</h6>
            </CLink>
          </CCol>
          <CCol md="2" xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/unit">
              <CIcon className='mob-dashboard-img' src={iUnit} />
              <h6>Unit</h6>
            </CLink>
          </CCol>
          <CCol md="2" xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/customer">
              <CIcon className='mob-dashboard-img' src={iSupplier} />
              <h6>Customer</h6>
            </CLink>
          </CCol>
          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/opening-stock-entry">
              <CIcon className='mob-dashboard-img' src={iStock} />
              <h6>Opening Stock Entry</h6>
            </CLink>
          </CCol>
          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/product-purchase">
              <CIcon className='mob-dashboard-img' src={iReceive} />
              <h6>Product Purchase</h6>
            </CLink>
          </CCol>
          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/transfer">
              <CIcon className='mob-dashboard-img' src={iPurchase} />
              <h6>Transfer</h6>
            </CLink>
          </CCol>
          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/receive">
              <CIcon className='mob-dashboard-img' src={iOrder} />
              <h6>Transfer - Receive</h6>
            </CLink>
          </CCol>

          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/sale">
              <CIcon className='mob-dashboard-img' src={iSell} />
              <h6>Sale</h6>
            </CLink>
          </CCol>
          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/stock-list">
              <CIcon className='mob-dashboard-img' src={iStockShow} />
              <h6>Stock</h6>
            </CLink>
          </CCol>
          <CCol xs="2" sm="2" className="text-center oms-icon">
          <CLink to="/stock-adjustment">
            <CIcon className='mob-dashboard-img' src={iStockAdjustment} />
            <h6>Stock Adjustment</h6>
          </CLink>
        </CCol>
          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/customer-dues">
              <CIcon className='mob-dashboard-img' src={iCustomrDues} />
              <h6>Due Payment </h6>
            </CLink>
          </CCol>

          <CCol xs="2" sm="2" className="text-center oms-icon">
          <CLink to="/damage-declare">
            <CIcon className='mob-dashboard-img' src={iExpire} />
            <h6>Damage Declare</h6>
          </CLink>
        </CCol>

        <CCol xs="2" sm="2" className="text-center oms-icon">
        <CLink to="/reorder-alert">
          <CIcon className='mob-dashboard-img' src={iReorder} />
          <h6>Product Re-order Aleart</h6>
        </CLink>
      </CCol>

          <CCol xs="2" sm="2" className="text-center oms-icon">
            <CLink to="/admin-report">
              <CIcon className='mob-dashboard-img' src={iReport} />
              <h6>Report</h6>
            </CLink>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}
export default Dashboard
