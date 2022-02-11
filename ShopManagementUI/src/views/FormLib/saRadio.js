import React from 'react';

import { useField } from "formik";
import {
    CCol,
    CFormGroup,
    CFormText,
    CInputRadio,
    CLabel,
  } from '@coreui/react';

  

const SARadio = ({ isRequired, label, options, labelStyle, radioStyle, successMessage, helpText, formProps, labelClassName, radioClassName, ...props }) => {
    const [field, meta] = useField(props);
    let hasError = meta.touched && (meta.error !== undefined);
    props.isInline = props.isInline === undefined ? "false" : props.isInline;  

    const isChecked = (obj) => {
        var final = 0;
        if (formProps.values[props.name] === obj.value) {
            final = 1;
        }
    
        return final;
    }

    const blockRadio = options.map((obj, index)=>{
        return (
            <CFormGroup variant="checkbox" key={index}>
                <CInputRadio className="form-check-input" {...field} id={obj.id} checked={isChecked(obj)} name={props.name} value={obj.value} />
                <CLabel variant="checkbox" htmlFor={obj.id}>{obj.title}</CLabel>
            </CFormGroup>
        );
    });

    const inlineRadio = options.map((obj, index) => {
        return (
            <CFormGroup variant="custom-radio" key={index} inline>
                <CInputRadio custom {...field} id={obj.id} checked={isChecked(obj)} name={props.name} value={obj.value} />
                <CLabel variant="custom-checkbox" htmlFor={obj.id}>{obj.title}</CLabel>
            </CFormGroup>
        );
    });

    return (
        <CFormGroup row>
            <CCol md={props.lSize} className={labelClassName} style={labelStyle}>
                <CLabel>{label}</CLabel>
            </CCol>
            <CCol md={props.rSize} className={radioClassName} style={radioStyle}>
                { props.isInline === "true"? inlineRadio : blockRadio}
            </CCol>

            {
                !meta.touched ? (<CFormText style={{marginLeft: '4.5%'}}>{helpText}</CFormText>) : null
            }
            
            { 
                meta.touched ? hasError ? (
                    <div style={{color: '#e55353', fontSize: '80%',  marginLeft: '4.5%', marginTop: '0.25em', width: '100%'}}>{meta.error}</div>
                ) : ( 
                    <div style={{color: '#2eb85c', fontSize: '80%',  marginLeft: '4.5%', marginTop: '0.25em', width: '100%'}}>{successMessage}</div> 
                ) : null
            }

        </CFormGroup>
    );
}

export default SARadio;