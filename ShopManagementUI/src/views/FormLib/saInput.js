//React & CoreUI
import React from 'react';
import {
    CFormGroup,
    CInput,
    CLabel,
    CCol
  } from '@coreui/react';

//Formik & Yup lib
import { useField } from "formik";

/**
 * 
 * Custom props:
 * -------------
 * name (required): one must provde name of the component
 * isRequired (required): provide isRequired=true when you have check this field validation in formik validationSchema->Yup
 * label (optional): provide label for input form title
 * helpText (optional): provide help text for showing text under input field
 * successMessage (optional): provide custom successMessage for valid input field message
 */

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const SAInput = ({ isRequired, label, isInline, successMessage, helpText, labelClassName,
     labelStyle, fieldStyle, lSize, rSize,  ...props }) => {
    const [field, meta] = useField(props);
    let isR = (isRequired !== undefined && isRequired === "true");
    let isInvalid = (meta.touched && meta.error && isR) ? true : false;
    let isValid =  isR ? !meta.touched ? false : true : false;
    isInline = isInline === undefined ? "false" : isInline;  

    if(props.type==="date" && field.value !== undefined && field.value !== ''){
        field.value = formatDate(field.value);
    }

    if(props.type==="number" && field.value !== undefined && field.value !== ''){
        field.value = parseFloat(field.value?.toString().replace(/[^0-9.]/g, ""), 0);
    }

    let star = <span className="text-danger">&nbsp;*</span>
    let space = <span>&nbsp;&nbsp;</span>

    let cLabelBlock = (label === undefined || label === '')?null:
            (<CLabel className={labelClassName} style={labelStyle} htmlFor={props.id || props.name}>{label}{isR?star:space}</CLabel>);

    const blockCode = (
        <CFormGroup>
            {cLabelBlock}
            <CInput invalid={isInvalid} valid={isValid} style={props.inputstyle} {...field} {...props} />
            {/* {!meta.touched ? (<CFormText>{helpText}</CFormText>) : null}
            {meta.touched && meta.error ? (
                <CInvalidFeedback>{meta.error}</CInvalidFeedback>
            ) : ( <CValidFeedback>{successMessage}</CValidFeedback> )} */}
        </CFormGroup>
    );
    

    let cLabelInline = (label === undefined || label === '')?null:
        (<CLabel className={labelClassName} htmlFor={props.id || props.name}>{label}{isR?star:space}</CLabel>);

    const inlineCode = (
        <CFormGroup row className="mb-1">
            <CCol md={lSize} style={labelStyle}>
                {cLabelInline}
            </CCol>
            <CCol md={rSize} style={fieldStyle}>
                <CInput invalid={isInvalid} valid={isValid} style={props.inputstyle} {...field} {...props} />
                {/* {!meta.touched ? (<CFormText>{helpText}</CFormText>) : null}
                {meta.touched && meta.error ? (
                    <CInvalidFeedback>{meta.error}</CInvalidFeedback>
                ) : ( <CValidFeedback>{successMessage}</CValidFeedback> )} */}
            </CCol>
        </CFormGroup>
    );


    return (
        <>
            {isInline === "true"? inlineCode : blockCode }
        </>
    );
}

export default SAInput;