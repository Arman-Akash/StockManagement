import React from 'react'
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from '../assets/mansurtraders.png'
import routes from '../routes'
import {
  TheHeaderDropdown,
} from './index'

const TheHeader = () => {

  return (
    <CHeader withSubheader>
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon src={logo} height="48px" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CIcon src={logo} />
        </CHeaderNavItem>
        {/*<h1 style={{ fontWeight: "bold", color: 'darkblue', fontStyle: 'italic' }}>Laa Tahzan</h1>*/}
      </CHeaderNav>
      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          {/* <div className="thread-header">
          <span>Laa Tahzan</span>
        </div> */}
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNavItem style={{ listStyle: 'none' }}>
        <CTooltip content="Configuration">
          <CLink style={{ textDecoration: "none" }} to="/configuration">
            <CIcon style={{ width: "3rem", height: '3rem', marginTop: '12px' }} name="cil-settings" />
          </CLink>
        </CTooltip>
      </CHeaderNavItem>

      <CHeaderNav className="mr-2">
        <TheHeaderDropdown />
      </CHeaderNav>
      <CSubheader className=" justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
