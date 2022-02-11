import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarMinimizer,
  CImg,
  CLink,
  CListGroup,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import logo from '../assets/navy.png'
import iOms from '../assets/icons/oms3.jpg'
import iPiis from '../assets/icons/piis.png'
import iRpis from '../assets/icons/rpis.jpg'

// sidebar nav config
const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      // style={{ islideNav }}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full navy-logo"
          src={logo}
        // height={35}
        />
        <span className="c-sidebar-brand-full">Bangladesh Navy</span>
        <CIcon
          className="c-sidebar-brand-minimized navy-logo"
          src={logo}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        {/* <CCreateElement 
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        /> */}
        {/* <CImg src={iSideBarNav} className="side-bar-image"></CImg> */}
        <CListGroup className="side-icon">
          <CLink to="/oms">
            <CImg src={iOms} className="piis-icon"></CImg>
            OMS
          </CLink>
          <CLink to="/piis">
            <CImg src={iPiis} className="piis-icon"></CImg>
            PIIS
          </CLink>
          <CLink to="/rpis">
            <CImg src={iRpis} className="piis-icon"></CImg>
            RPIS
          </CLink>
        </CListGroup>
        {/* <CImg src={iOms} className="oms-icon"></CImg>
          <CImg src={iPiis} className="piis-icon"></CImg>
          <CImg src={iRpis} className="rpis-icon"></CImg> */}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
