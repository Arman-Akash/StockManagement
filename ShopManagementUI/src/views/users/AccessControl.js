import React, { useState, useEffect, useRef } from 'react'
import {
  CButton,
  CCardBody,
  CCol,
  CRow,
  CCard,
  CCardTitle,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CModalTitle
} from '@coreui/react'
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from "formik";
import SACheckBox from '../FormLib/saCheckbox';

const AccessControl = () => {
  const handlePermissionChange = (obj, prop, val) => {

  }
  return (
    <CCard>
      <CCardBody>
        <Formik>
          {
            formProps => {
              return (
                <>
                  <Form>
                    <CRow>
                      <CCol md="6" className="mb-4">
                        <SAReactAutoSelect
                          id="userId"
                          name="userId"
                          label="User"
                          isRequired="true"
                          isInline="true"
                          // lSize="3"
                          // rSize="9"
                          labelClassName="float-right"
                          formProps={formProps}
                          options={[]}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="4">
                        <CCardTitle>OMS</CCardTitle>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Accounts</CLabel>
                        </CFormGroup>

                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Budget</CLabel>
                        </CFormGroup>

                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Inventory</CLabel>
                        </CFormGroup>

                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Passport</CLabel>
                        </CFormGroup>

                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Complain</CLabel>
                        </CFormGroup>

                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Event</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Returns</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">MSIR</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Security Clearance</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Nou Prokroma</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Procurement</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">BN helicopter & MPA</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Surveillance & Monitoring</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Journal/publication</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">ISPR</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">ID Card & sticker</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Archive</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Secretariate work</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Sourcs desk</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Foreign Intelligence</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">FIS</CLabel>
                        </CFormGroup>
                      </CCol>

                      {/*---------------- PIIS-------------------- */}
                      <CCol md="4">
                        <CCardTitle>PIIS</CCardTitle>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">PIIS</CLabel>
                        </CFormGroup>

                      </CCol>

                      {/*---------------- RPIS-------------------- */}
                      <CCol md="4">
                        <CModalTitle>RPIS</CModalTitle>
                        <CFormGroup variant="checkbox" className="checkbox">
                          <CInputCheckbox
                            id="accounts"
                            name="accounts"
                            value="accounts"
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">RPIS</CLabel>
                        </CFormGroup>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol md="12" className="text-center mt-4">
                        <CButton size="sm" style={{ marginLeft: "20px" }} color="success" type="submit"><FontAwesomeIcon icon={faSave} />&nbsp;Save</CButton>
                        <CButton size="sm" style={{ marginLeft: "20px" }} color="secondary"
                          onClick={() => { }}
                        ><FontAwesomeIcon icon={faTimes} />&nbsp;Cancel</CButton>
                      </CCol>
                    </CRow>
                  </Form>
                </>
              );
            }
          }
        </Formik>
      </CCardBody>
    </CCard>
  )
}

export default AccessControl