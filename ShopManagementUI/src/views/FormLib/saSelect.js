//React & CoreUI
import React from 'react';
import {
    CFormGroup,
    CLabel,
    CSelect,
    CCol
} from '@coreui/react';

//Formik & Yup lib
import { useField } from "formik";


/**
 * 
 * Custom props:
 * -------------
 * name (required): one must provde name of the component
 * isRequired (required): provide isRequired true/false for checking is the field is required or not
 * label (optional): provide label for input form title
 * helpText (optional): provide help text for showing text under input field
 * successMessage (optional): provide custom successMessage for valid input field message
 */

const SASelect = ({ isRequired, label, options, successMessage, helpText, isInline, lSize, rSize, labelStyle, isDisabled, labelClassName, ...props }) => {
    const [field, meta] = useField(props);
    let isR = (isRequired !== undefined && isRequired === "true");
    let isInvalid = (meta.touched && meta.error && isR) ? true : false;
    let isValid = isR ? !meta.touched ? false : true : false;
    isDisabled = isDisabled != undefined && isDisabled ? true : false;
    isInline = isInline === undefined ? "false" : isInline;

    let star = <span className="text-danger">*</span>
    let space = <span>&nbsp;</span>

    let cLabelBlock = (label == undefined || label == '')?null:
            (<CLabel className={labelClassName} style={labelStyle} htmlFor={props.id || props.name}>{label} {isR?star:space}</CLabel>);

    const blockCode = (
        <CFormGroup>
            {cLabelBlock}
            <CSelect invalid={isInvalid} valid={isValid} disabled={isDisabled} custom {...field} {...props}>
                <option value="">Please select</option>
                {
                    options.map((obj, index) => {
                        return (<option key={index} value={obj.value}>{obj.title}</option>);
                    })
                }
            </CSelect>
            {!meta.touched ?
                (<div style={{ color: '#768192', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{helpText}</div>)
                : null
            }
            {/* { meta.touched ? meta.error ? (
                <div style={{ color: '#e55353', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{meta.error}</div>
            ) : (
                    <div style={{ color: '#2eb85c', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{successMessage}</div>
                ) : null} */}
        </CFormGroup>
    );

    const inlineCode = (
        <CFormGroup row>
            <CCol md={lSize} style={labelStyle}>
                {cLabelBlock}
            </CCol>
            <CCol md={rSize}>
                <CSelect custom invalid={isInvalid} disabled={isDisabled} valid={isValid} custom {...field} {...props}>
                    <option value="">Please select</option>
                    {
                        options.map((obj, index) => {
                            return (<option key={index} value={obj.value}>{obj.title}</option>);
                        })
                    }
                </CSelect>
                {/* {!meta.touched ?
                    (<div style={{ color: '#768192', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{helpText}</div>)
                    : null
                }
                {meta.touched ? meta.error ? (
                    <div style={{ color: '#e55353', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{meta.error}</div>
                ) : (
                        <div style={{ color: '#2eb85c', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{successMessage}</div>
                    ) : null} */}
            </CCol>
        </CFormGroup>
    );

    return (
        <>
            {isInline === "true" ? inlineCode : blockCode}
        </>
    );
}

export default SASelect;