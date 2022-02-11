import { Field } from "formik";
import React from 'react';
import {
    CCol,
    CFormGroup,
    CInputCheckbox,
    CLabel,
} from '@coreui/react';

export default function Checkbox({ id, name, label, labelStyle, inputStyle, className, lSize, rSize, labelClassName, checkboxGroupClass }) {
    return (
      <>
        <Field
          name={name}
          render={({ field, form }) => {
            return (
                <CFormGroup className={checkboxGroupClass} row>
                    <CCol md={lSize}>
                        <CLabel className={labelClassName} style={labelStyle}>{label}</CLabel>
                    </CCol>
                    <CCol md={rSize}>
                        <CInputCheckbox
                            type="checkbox"
                            id={id}
                            className={className}
                            style={inputStyle}
                            checked={field.value}
                            {...field}
                        />
                    </CCol>
                </CFormGroup>
            );
          }}
        />
      </>
    );
  }