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
import CustomerDue from './CustomerDue'
import CustomerDueReport from './CustomerDueReport'

const CustomerDueContainer = () => {
    const [active, setActive] = useState(0)

    return (
        <CCard>
            <CCardBody>
                <CTabs activeTab={active}>
                    <CRow>
                        <CCol md="2">
                            <CNav vertical className="vertical-nav">
                                <CNavItem>
                                    <CNavLink>Customer Dues</CNavLink>
                                </CNavItem>

                                <CNavItem>
                                    <CNavLink>Report</CNavLink>
                                </CNavItem>
                            </CNav>
                        </CCol>
                        <CCol md="10">
                            <CTabContent className="mt-3">
                                <CTabPane>
                                    <CustomerDue />
                                </CTabPane>
                                <CTabPane>
                                    <CustomerDueReport />
                                </CTabPane>
                            </CTabContent>
                        </CCol>
                    </CRow>
                </CTabs>
            </CCardBody>
        </CCard>
    )
}

export default CustomerDueContainer
