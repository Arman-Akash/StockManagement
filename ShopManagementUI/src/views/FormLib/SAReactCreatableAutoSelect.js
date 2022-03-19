//React & CoreUI
import {
    CCol, CFormGroup,
    CLabel
} from '@coreui/react';
//Formik & Yup lib
import { useField } from "formik";
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

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


const SAReactCreatableAutoSelect = ({ isRequired, labelStyle, inlineLabelStyle, formProps, label, options, successMessage, labelClassName,
    helpText, isInline, lSize, rSize, isDisabled, onChangeHandle, onHandleCreate, boxHeight, initialLabelName, ...props }) => {

    const [field, meta] = useField(props);
    const [isLoading, setIsLoading] = useState(false);
    let isR = (isRequired !== undefined && isRequired === "true");
    isInline = isInline === undefined ? "false" : isInline;
    initialLabelName = initialLabelName !== undefined ? initialLabelName : 'Select option...';
    options = [{ label: initialLabelName, value: 0 }].concat(options);


    const onChangeHandler = (name, value) => {
        formProps.setFieldValue(name, value);
        if (onChangeHandle !== undefined) {
            onChangeHandle(name, value);
        }
    }

    let star = <span className="text-danger">*</span>

    let cLabelBlock = (label == undefined || label == '') ? null :
        (<CLabel className={labelClassName} style={labelStyle} htmlFor={props.id || props.name}>{label} {isR ? star : null}</CLabel>);

    const handleCreate = (inputValue) => {
        setIsLoading(true);

        if (onHandleCreate !== undefined) {
            onHandleCreate(inputValue, isLoading, setIsLoading);
        }
    };

    const blockCode = (
        <CFormGroup className="mb-1">
            {cLabelBlock}
            <CreatableSelect
                name={props.name}
                styles={manipulateSelectStyle(boxHeight)}
                onBlur={field.onBlur}
                //isClearable -> Not Working
                isDisabled={isDisabled || isLoading}
                isLoading={isLoading}
                onChange={(option) => {
                    if (onChangeHandler !== undefined) {
                        onChangeHandler(props.name, option.value)
                    }
                }}
                onCreateOption={handleCreate}
                options={options}
                value={field.value !== '' ? options.find(option => option.value === field.value) : 0}
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
        </CFormGroup>
    );

    let cLabelInline = (label == undefined || label == '') ? null :
        (<CLabel style={inlineLabelStyle} className={labelClassName} htmlFor={props.id || props.name}>{label} {isR ? star : null}</CLabel>);

    const inlineCode = (
        <CFormGroup row className="mb-1">
            <CCol md={lSize} style={labelStyle}>
                {cLabelInline}
            </CCol>
            <CCol md={rSize}>
                <CreatableSelect
                    name={props.name}
                    styles={manipulateSelectStyle(boxHeight)}
                    onBlur={field.onBlur}
                    //isClearable -> Not Working
                    isDisabled={isDisabled || isLoading}
                    isLoading={isLoading}
                    onChange={(option) => {
                        if (option !== null) {
                            onChangeHandler(props.name, option.value)
                        }
                    }}
                    onCreateOption={handleCreate}
                    options={options}
                    value={field.value !== '' ? options.find(option => option.value === field.value) : 0}
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

export default SAReactCreatableAutoSelect;