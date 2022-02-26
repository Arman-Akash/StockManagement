import React from 'react'
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CSubheader,
  CBreadcrumbRouter
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
      <CHeaderBrand className="mx-auto d-lg-none" to="/dashboard">
        <CIcon className='mob-logo' src={logo} height="48px" alt="Logo" />
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
