import React from 'react'
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CImg,
    CLink,
    CTooltip,
    CCol,
    CRow,
    CCard,
    CCardBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ConfIcon from '../assets/config.png'
import iLayer from '../assets/icons/canvas.png';
import work from '../assets/icons/work.png';
import branch from '../assets/icons/branch.png';
import role from '../assets/icons/role.png';
import policeMan from '../assets/icons/policeman.png';
import state from '../assets/icons/state.png';
import map from '../assets/icons/map.png';
import policeStation from '../assets/icons/police-station.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBuilding, faUserTie, faGlobeAsia, faUsers, faTasks,
    faIndustry, faLanguage, faBasketballBall, faBullseye,
    faMedal, faLaptopCode, faUserShield, faIdCard, faIdCardAlt
} from '@fortawesome/free-solid-svg-icons';
const TheHeaderDropdownConf = () => {
    return (
        <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
        >

            {/* <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CTooltip content="Settings">
                        <CImg
                            src={ConfIcon}
                            className="c-avatar-img"
                            alt="avatar"
                        />
                    </CTooltip>
                </div>
            </CDropdownToggle> */}

            <CDropdownMenu id="sidebar-menu" className="pt-0" placement="bottom-end">
                {/* <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem> */}
                <CCard>
                    <CCardBody className="configuration">
                        <CRow>
                            <CCol className="text-center">
                                <CLink to="/configuration/office-layer">
                                    <CIcon id="sidebar-menu-icon" src={iLayer} />
                                    <span style={{ fontSize: "10px" }}>
                                        Office Layer
                                    </span>
                                </CLink>
                            </CCol>

                            <CCol className="text-center">
                                <CLink to="/configuration/office-type">
                                    <CIcon id="sidebar-menu-icon" src={work} />
                                    <span style={{ fontSize: "10px" }}>
                                        Office Type
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/office">
                                    <FontAwesomeIcon id="sidebar-menu-icon" color="#2B79C2" icon={faBuilding} />

                                    <span style={{ fontSize: "10px" }}>
                                        Office
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/branch">
                                    <CIcon id="sidebar-menu-icon" src={branch} />
                                    <span style={{ fontSize: "10px" }}>
                                        Branch
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/role">
                                    <CIcon id="sidebar-menu-icon" src={role} />
                                    <span style={{ fontSize: "12px" }}>
                                        Roles
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/rank">
                                    <CIcon id="sidebar-menu-icon" src={policeMan} />
                                    <span style={{ fontSize: "12px" }}>
                                        Rank
                                    </span>
                                </CLink>
                            </CCol>
                        </CRow>
                        {/* 2nd  */}
                        <CRow style={{ marginTop: "20px" }}>

                            <CCol className="text-center">
                                <CLink to="/configuration/designation">
                                    <FontAwesomeIcon color="#1DAEE4" icon={faUserTie} />
                                    <span style={{ fontSize: "10px" }}>
                                        Designation
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/country">
                                    <FontAwesomeIcon color="#01694E" icon={faGlobeAsia} />
                                    <span style={{ fontSize: "12px" }}>
                                        Country
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/division">
                                    <CIcon id="sidebar-menu-icon" src={state} />
                                    <span style={{ fontSize: "12px" }}>
                                        Division
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/district">
                                    <CIcon src={map} />
                                    <span style={{ fontSize: "10px" }}>
                                        District
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/thana">
                                    <CIcon src={policeStation} />
                                    <span style={{ fontSize: "12px" }}>
                                        Thana
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/employee-type">
                                    <FontAwesomeIcon color="#484848" icon={faUsers} />
                                    <span style={{ fontSize: "12px" }}>
                                        Employee Type
                                    </span>
                                </CLink>
                            </CCol>
                        </CRow>
                        {/* 3rd  */}
                        <CRow style={{ marginTop: "20px" }}>

                            <CCol className="text-center">
                                <CLink to="/configuration/district">
                                    <CIcon src={map} />
                                    <span style={{ fontSize: "10px" }}>
                                        Unit
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/thana">
                                    <CIcon src={policeStation} />
                                    <span style={{ fontSize: "12px" }}>
                                        Item Category
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/division">
                                    <CIcon id="sidebar-menu-icon" src={state} />
                                    <span style={{ fontSize: "12px" }}>
                                        Item
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/district">
                                    <CIcon src={map} />
                                    <span style={{ fontSize: "10px" }}>
                                        Relation
                                    </span>
                                </CLink>
                            </CCol>

                            <CCol className="text-center">
                                <CLink to="/configuration/thana">
                                    <CIcon src={policeStation} />
                                    <span style={{ fontSize: "12px" }}>
                                        Budget Head
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/division">
                                    <CIcon id="sidebar-menu-icon" src={state} />
                                    <span style={{ fontSize: "12px" }}>
                                        Supplier
                                    </span>
                                </CLink>
                            </CCol>
                        </CRow>


                        {/* 6th */}
                        <CRow style={{ marginTop: "20px" }}>

                            <CCol className="text-center">
                                <CLink to="/configuration/district">
                                    <CIcon src={map} />
                                    <span style={{ fontSize: "10px" }}>
                                        Language
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/district">
                                    <CIcon src={map} />
                                    <span style={{ fontSize: "10px" }}>
                                        Sports
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/district">
                                    <CIcon src={map} />
                                    <span style={{ fontSize: "10px" }}>
                                        Mission
                                    </span>
                                </CLink>
                            </CCol>

                            <CCol className="text-center">
                                <CLink to="/configuration/thana">
                                    <CIcon src={policeStation} />
                                    <span style={{ fontSize: "12px" }}>
                                        Medal
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/division">
                                    <CIcon id="sidebar-menu-icon" src={state} />
                                    <span style={{ fontSize: "12px" }}>
                                        Course Type
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/division">
                                    <CIcon id="sidebar-menu-icon" src={state} />
                                    <span style={{ fontSize: "12px" }}>
                                        Security Clear Type
                                    </span>
                                </CLink>
                            </CCol>
                        </CRow>
                        {/* 7th */}
                        <CRow style={{ marginTop: "20px" }}>
                            <CCol className="text-center">
                                <CLink to="/configuration/id-card-type">
                                    <FontAwesomeIcon color="#2B79C2" icon={faIdCard} />
                                    <span style={{ fontSize: "12px" }}>
                                        Id Card Type
                                    </span>
                                </CLink>
                            </CCol>
                            <CCol className="text-center">
                                <CLink to="/configuration/sticker-type">
                                    <FontAwesomeIcon color="#2B79C2" icon={faIdCardAlt} />
                                    <span style={{ fontSize: "12px" }}>
                                        Sticker Type
                                    </span>
                                </CLink>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>




            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderDropdownConf
