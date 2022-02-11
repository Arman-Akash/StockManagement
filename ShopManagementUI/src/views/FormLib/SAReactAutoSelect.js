//React & CoreUI
import {
    CCol, CFormGroup,
    CLabel
} from '@coreui/react';
//Formik & Yup lib
import { useField } from "formik";
import React from 'react';
import Select from 'react-select';




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

const manipulateSelectStyle = (height) => {
    height = height !== undefined ? height : '25px';

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: '#fff',
            //borderColor: '#9e9e9e',
            minHeight: height,
            height: height,
            boxShadow: state.isFocused ? null : null,
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            height: height,
            padding: '0 6px'
        }),

        input: (provided, state) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: height,
        }),
    };

    return customStyles;
}


const SAReactAutoSelect = ({ isRequired, labelStyle, inlineLabelStyle, formProps, label, options, successMessage, labelClassName,
    helpText, isInline, lSize, rSize, fieldStyle, isDisabled, onChangeHandle, boxHeight, initialLabelName, isMulti, ...props }) => {
    const [field, meta] = useField(props);
    let isR = (isRequired !== undefined && isRequired === "true");
    let isInvalid = (meta.touched && meta.error && isR) ? true : false;
    let isValid = isR ? !meta.touched ? false : true : false;
    isInline = isInline === undefined ? "false" : isInline;
    initialLabelName = initialLabelName !== undefined ? initialLabelName : 'Select option...';

    options = [{ label: initialLabelName, value: '' }].concat(options);

    const onChangeHandler = (name, value) => {
        formProps.setFieldValue(name, value);
        if (onChangeHandle !== undefined) {
            onChangeHandle(name, value);
        }
    }

    let star = <span className="text-danger">*</span>
    let space = <span>&nbsp;&nbsp;</span>

    let cLabelBlock = (label == undefined || label == '') ? null :
        (<CLabel className={labelClassName} style={labelStyle} htmlFor={props.id || props.name}>{label} {isR ? star : space}</CLabel>);

    const blockCode = (
        <CFormGroup className="mb-1">
            { cLabelBlock}
            <Select
                options={options}
                name={props.name}
                value={field.value !== '' ? options.find(option => option.value === field.value) : 0}
                onChange={(option) => {
                    if (option !== null) {
                        if (isMulti !== undefined && isMulti) {
                            var selectedValues = option.map(item => {
                                return item.value;
                            })
                            onChangeHandler(props.name, selectedValues);
                        } else {
                            onChangeHandler(props.name, option.value);
                        }
                    }
                }}
                className={isMulti !== undefined && isMulti ? "basic-multi-select" : ""}
                onBlur={field.onBlur}
                isMulti={isMulti !== undefined ? isMulti : false}
                isDisabled={isDisabled}
                styles={manipulateSelectStyle(boxHeight)}
            />
            {!meta.touched ?
                (<div style={{ color: '#768192', fontSize: '80%', width: '100%' }}>{helpText}</div>)
                : null
            }
            { meta.touched ? meta.error ? (
                <div style={{ color: '#e55353', fontSize: '80%', width: '100%' }}>{meta.error}</div>
            ) : (
                    <div style={{ color: '#2eb85c', fontSize: '80%', width: '100%' }}>{successMessage}</div>
                ) : null}
        </CFormGroup>
    );

    let cLabelInline = (label == undefined || label == '') ? null :
        (<CLabel style={inlineLabelStyle} className={labelClassName} htmlFor={props.id || props.name}>{label} {isR ? star : space}</CLabel>);

    const inlineCode = (
        <CFormGroup row className="mb-1">
            <CCol md={lSize} style={labelStyle}>
                {cLabelInline}
            </CCol>
            <CCol md={rSize} style={fieldStyle}>
                <Select
                    options={options}
                    name={props.name}
                    value={options ? options.find(option => option.value === field.value) : 0}
                    onChange={(option) => {
                        if (option !== null) {
                            if (isMulti !== undefined && isMulti) {
                                var selectedValues = option.map(item => {
                                    return item.value;
                                })
                                onChangeHandler(props.name, selectedValues);
                            } else {
                                onChangeHandler(props.name, option.value);
                            }
                        }
                    }}
                    className={isMulti !== undefined && isMulti ? "basic-multi-select" : ""}
                    onBlur={field.onBlur}
                    isMulti={isMulti !== undefined ? isMulti : false}
                    isDisabled={isDisabled}
                    styles={manipulateSelectStyle(boxHeight)}
                />
                {!meta.touched ?
                    (<div style={{ color: '#768192', fontSize: '80%', width: '100%' }}>{helpText}</div>)
                    : null
                }
                {meta.touched ? meta.error ? (
                    <div style={{ color: '#e55353', fontSize: '80%', width: '100%' }}>{meta.error}</div>
                ) : (
                        <div style={{ color: '#2eb85c', fontSize: '80%', width: '100%' }}>{successMessage}</div>
                    ) : null}
            </CCol>
        </CFormGroup>
    );

    return (
        <>
            {isInline === "true" ? inlineCode : blockCode}
        </>
    );
}

export default SAReactAutoSelect;