//React & CoreUI
import React from 'react';

//Material UI
import { Autocomplete } from '@material-ui/lab';
import { TextField as MaterialTextField } from '@material-ui/core';

//Formik & Yup lib
import { useField } from "formik";

/**
 * 
 * Custom props:
 * -------------
 * name (required): one must provde name of the component
 * options (required): provide array objects where each object must contain a property named 'title'
 * isRequired (required): provide isRequired=true when you have check this field validation in formik validationSchema-Yup
 * label (optional): provide label for input form title
 * helpText (optional): provide help text for showing text under input field
 * successMessage (optional): provide custom successMessage for valid input field message
 */

const SAAutoComplete = ({ label, options, formProps, helpText, successMessage, isRequired, ...props }) => {
    const [meta] = useField(props);
    let isR = (isRequired !== undefined && isRequired === "true");
    // let isInvalid = (meta.touched && meta.error && isR) ? true : false;
    // let isValid = isR ? !meta.touched ? false : true : false;

    return (
        <div style={{ marginTop: '0.85em' }}>
            <Autocomplete
                {...props}
                options={options}
                getOptionLabel={option => {
                    if (option.title === undefined)
                        return '';
                    else
                        return option.title;
                }}
                value={formProps.values[props.name]}
                onChange={(e, value) => {
                    formProps.setFieldValue(props.name, value);
                }}
                renderInput={params => (
                    <MaterialTextField
                        {...params}
                        name={props.name}
                        label={label}
                        fullWidth
                    />
                )}
            />
            {!meta.touched ?
                (<div style={{ color: '#768192', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{helpText}</div>)
                : null
            }
            { meta.touched ? meta.error ? (
                <div style={{ color: '#e55353', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{meta.error}</div>
            ) : (
                    <div style={{ color: '#2eb85c', fontSize: '80%', marginTop: '0.25em', width: '100%' }}>{successMessage}</div>
                ) : null}
        </div>
    );

}

export default SAAutoComplete;