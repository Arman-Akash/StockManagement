import React, { useState } from 'react'
import {
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CTabs,
    CRow,
    CCol,
    CCard,
    CCardBody
} from '@coreui/react'
import SaleReport from './SaleReport'

const AdminReportContainer = () => {
    const [active, setActive] = useState(0)

    return (
        <CCard>
            <CCardBody>
                <CTabs activeTab={active}>
                    <CRow>
                        <CCol md="2">
                            <CNav vertical className="vertical-nav">
                                <CNavItem>
                                    <CNavLink>Purchase Report</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink>Transfer Report</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink>Sale Report</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink>Customer Due Report</CNavLink>
                                </CNavItem>
                            </CNav>
                        </CCol>
                        <CCol md="10">
                            <CTabContent className="mt-3">
                                <CTabPane>
                                    <SaleReport />
                                </CTabPane>
                                <CTabPane>
                                    <SaleReport />
                                </CTabPane>
                                <CTabPane>
                                    <SaleReport />
                                </CTabPane>
                                <CTabPane>
                                    <SaleReport />
                                </CTabPane>
                            </CTabContent>
                        </CCol>
                    </CRow>
                </CTabs>
            </CCardBody>
        </CCard>
    )
}

export default AdminReportContainer
