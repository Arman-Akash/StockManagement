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
import PurchaseReport from './PurchaseReport'
import TransferReport from './TransferReport'
import SaleReport from './SaleReport'
import DueReport from './DueReport'

const AdminReportContainer = () => {
    return (
        <CCard>
            <CCardBody>
                <CTabs activeTab={0}>
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
                                    <PurchaseReport />
                                </CTabPane>
                                <CTabPane>
                                    <TransferReport />
                                </CTabPane>
                                <CTabPane>
                                    <SaleReport />
                                </CTabPane>
                                <CTabPane>
                                    <DueReport />
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

