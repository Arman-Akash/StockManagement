
//React & CoreUI
import React from 'react';
import {
    CFormGroup,
    CValidFeedback,
    CInvalidFeedback,
    CLabel,
    CFormText,
    CCol,
    CTextarea
} from '@coreui/react';

//Formik & Yup lib
import { useField } from "formik";

const SATextArea = ({ isRequired, label, isInline, successMessage, helpText, labelClassName,
    labelStyle, fieldStyle, lSize, rSize, ...props }) => {

    const [field, meta] = useField(props);
    let isR = (isRequired !== undefined && isRequired === "true");
    let isInvalid = (meta.touched && meta.error && isR) ? true : false;
    let isValid = isR ? !meta.touched ? false : true : false;
    isInline = isInline === undefined ? "false" : isInline;

    let star = <span className="text-danger">*</span>
    let space = <span>&nbsp;</span>

    let cLabelBlock = (label === undefined || label === '') ? null :
        (<CLabel className={labelClassName} style={labelStyle} htmlFor={props.id || props.name}>{label} {isR ? star : space}</CLabel>);

    const blockCode = (
        <CFormGroup>
            {cLabelBlock}
            <CTextarea invalid={isInvalid} valid={isValid} {...field} {...props} />
            {!meta.touched ? (<CFormText>{helpText}</CFormText>) : null}
            {meta.touched && meta.error ? (
                <CInvalidFeedback>{meta.error}</CInvalidFeedback>
            ) : (<CValidFeedback>{successMessage}</CValidFeedback>)}
        </CFormGroup>
    );

    const inlineCode = (
        <CFormGroup row className="mb-0">
            <CCol md={lSize} style={labelStyle}>
                {cLabelBlock}
            </CCol>
            <CCol md={rSize} style={fieldStyle}>
                <CTextarea invalid={isInvalid} valid={isValid} {...field} {...props} />
                {!meta.touched ? (<CFormText>{helpText}</CFormText>) : null}
                {meta.touched && meta.error ? (
                    <CInvalidFeedback>{meta.error}</CInvalidFeedback>
                ) : (<CValidFeedback>{successMessage}</CValidFeedback>)}
            </CCol>
        </CFormGroup>
    );

    return (
        <>
            {isInline === "true" ? inlineCode : blockCode}
        </>
    );
}

export default SATextArea;

