import React from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CImg,
  CListGroup,
  CLink,
} from '@coreui/react'

//Icons
import iStock from '../../assets/images/stock.png';
import iSell from '../../assets/images/sell.png';
import iPurchase from '../../assets/images/purchase.png';
import iBgImage from '../../assets/images/dashboard.gif';

const Dashboard = () => {

  return (
    <CCard style={{ backgroundImage: `url(${iBgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", overflow: "hidden" }}>
      <CRow md="12">
        {/* <CCol md="6" style={{ left: '-100px' }}>
              <DeskCard
                // roles={[Screens.budget]}
                link="/navy/india"
                icon={iIndia}
              // title="Indian Navy"
              />
            </CCol>
            <CCol md="6" style={{ right: '-100px' }}>
              <DeskCard
                // roles={[Screens.inventory]}
                link="/navy/myanmar"
                icon={iMayanmar}
              // title="Mayanmmar Navy"
              />
            </CCol> */}
        <CCol md="2">
          <CListGroup className="side-icon">
            <CLink to="/transfer">
              <CImg src={iPurchase} className="menu-icon"></CImg>
              <h6 className="icon-title">Transfer</h6>
            </CLink>

            <CLink to="/receive">
              <CImg src={iStock} className="menu-icon"></CImg>
              <h6 className="icon-title">Receive</h6>
            </CLink>
            <CLink to="/sale">
            <CImg src={iSell} className="menu-icon"></CImg>
            <h6 className="icon-title">Sale</h6>
          </CLink>
          </CListGroup>
        </CCol>
        <CCol md="10"></CCol>
      </CRow>
    </CCard>
  )
}
export default Dashboard
