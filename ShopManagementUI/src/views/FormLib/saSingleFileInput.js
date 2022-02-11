//React & CoreUI
import React, { createRef } from 'react';
import {
    CCol,
    CFormGroup,
    CLabel,
    CButton
} from '@coreui/react';

import { Field } from "formik";

const SASingleFileInput = (props) => {
    let fileInput = createRef();

    const triggerFileInput = () => {
        if (fileInput.current !== undefined && fileInput.current.click !== undefined) {
            fileInput.current.click();
        }
    }

    let isR = (props.isRequired !== undefined && props.isRequired === "true");
    let star = <span className="text-danger">&nbsp;*</span>
    let space = <span>&nbsp;&nbsp;</span>

    let inlineBlock = (props.label == undefined || props.label == '') ? null :
        (<CLabel col md={props.lSize} className={props.labelClassName} style={props.labelStyle} htmlFor={props.id || props.name}>{props.label}{isR ? star : space}</CLabel>);

    let classNames = `btn btn-primary w-100 ${props.buttonClassName}`; 

    return (
        <Field name={props.name} component={({ form, field }) => {
            return (
                <>
                    <CFormGroup row>
                        {inlineBlock}
                        <CCol md={props.rSize}>
                            <CButton className={classNames} style={props.buttonStyle} onClick={() => {
                                triggerFileInput();
                            }}>
                                {props.buttonName !== undefined ? props.buttonName : "Upload a file"}
                            </CButton>
                            <input
                                name={field.name}
                                style={{ display: 'none' }}
                                type="file"
                                accept={props.accept}
                                ref={fileInput}
                                disabled={props.isDisabled !== undefined ? props.isDisabled : false}
                                onChange={e => {
                                    form.setFieldValue(field.name, e.target.files[0]);
                                    if (props.handleChanges !== undefined) {
                                        props.handleChanges(e.target.files[0]);
                                    }
                                }}
                            />
                        </CCol>
                    </CFormGroup>
                </>
            );
        }} />
    );
}

export default SASingleFileInput;

//Will need later

//form.setFieldValue(field.name, URL.createObjectURL(e.target.files[0]));

//e.currentTarget.files[0]

/* <CLabel htmlFor="custom-file-input" variant="custom-file" style={props.inputFieldStyle}>
    Foobar...
    {props.formProps.values[field.name] !== null ? props.formProps.values[field.name].name : 'Choose file...'}
</CLabel> */