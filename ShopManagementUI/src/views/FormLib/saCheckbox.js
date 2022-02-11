import React from 'react';
import {
    CCol,
    CFormGroup,
    CLabel,
} from '@coreui/react';

import { Field } from "formik";

//Deprecated parameters -> helpText
//{ width: '13px', height: '13px', position: 'relative' }

const SACheckBox = ({ label, labelStyle, labelClassName, inputStyle, inputClassName, titleStyle, titleClassName,
    isInline, lSize, rSize, isRequired, options, ...props }) => {
    isInline = isInline === undefined ? "false" : isInline;
    let isR = (isRequired !== undefined && isRequired === "true");

    let star = <span className="text-danger">&nbsp;*</span>
    let space = <span>&nbsp;&nbsp;</span>

    const blockCheckbox = options.map((obj, index) => {
        let finalStyle = inputStyle !== undefined ? {...{verticalAlign: 'middle'}, ...inputStyle} : {verticalAlign: 'middle'};
        let finalTitleStyle = titleStyle !== undefined ? { ...{verticalAlign: 'middle', marginLeft: '5px'}, ...titleStyle } : {verticalAlign: 'middle', marginLeft: '5px'};
        
        return (
            <CFormGroup key={index} variant="checkbox" className="checkbox">
                <Field type="checkbox" id={obj.id} name={props.name} value={obj.id} style={finalStyle} className={inputClassName} onClick={() => { }} />
                <CLabel variant="checkbox" className={titleClassName} style={finalTitleStyle} htmlFor={obj.id}>{obj.title}</CLabel>
            </CFormGroup>
        );
    });

    const inlineCheckbox = options.map((obj, index) => {
        let finalStyle = inputStyle !== undefined ? {...{verticalAlign: 'middle'}, ...inputStyle} : {verticalAlign: 'middle'};
        let finalTitleStyle = titleStyle !== undefined ? { ...{verticalAlign: 'middle', marginLeft: '5px'}, ...titleStyle } : {verticalAlign: 'middle', marginLeft: '5px'};

        return (
            <CFormGroup key={index} variant="custom-checkbox" inline>
                <CLabel htmlFor={obj.id}>
                    <Field type="checkbox" id={obj.id} name={props.name} value={obj.value} style={finalStyle} className={inputClassName} onClick={() => { }} />
                    <span className={titleClassName} style={finalTitleStyle}>{obj.title}</span>
                </CLabel>
            </CFormGroup>
        );
    });

    return (
        <CFormGroup row>
            <CCol md={lSize}>
                <CLabel className={labelClassName} style={labelStyle}>{label}{isR ? star : space}</CLabel>
            </CCol>
            <CCol md={rSize}>
                {isInline === "true" ? inlineCheckbox : blockCheckbox}
            </CCol>
        </CFormGroup>
    );
}

export default SACheckBox;

//checked={isChecked(obj)}

//Deprecated code
/* {
        !meta.touched ? (<CFormText style={{ marginLeft: '4.5%' }}>{helpText}</CFormText>) : null
    }

    {
        meta.touched ? hasError ? (
            <label style={{ color: '#e55353', fontSize: '80%', marginLeft: '4.5%', marginTop: '0.25em', width: '100%' }}>{meta.error}</label>
        ) : (
                <label style={{ color: '#2eb85c', fontSize: '80%', marginLeft: '4.5%', marginTop: '0.25em', width: '100%' }}>{successMessage}</label>
            ) : null
    } */