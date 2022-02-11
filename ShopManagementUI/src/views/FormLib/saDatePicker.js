//React & CoreUI
import {
    CCol, CFormGroup,
    CLabel
} from '@coreui/react';
import React, { useEffect } from 'react';
//Formik & Yup lib
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './saDatePickerStyle.css';
import moment from 'moment';
import * as formConstraints from '../../functionalLib/FormConstraints';

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

//successMessage, helpText, --> deprecated parameters

const SADatePicker = ({ isRequired, label, labelStyle, labelClassName, fieldStyle, fieldClass, inlineFieldStyle, isInline, lSize, rSize, formProps, onChangeHandle, isDisabled, hasDefaultDate, timeLabel, showTime, ...props }) => {
    let isR = (isRequired !== undefined && isRequired === "true");
    isInline = isInline === undefined ? "false" : isInline;

    let defaultInlineFieldStyle = {
        width: '105%'
    };

    fieldClass = fieldClass != undefined ? `form-control ${fieldClass}` : 'form-control';

    let star = <span className="text-danger">&nbsp;*</span>
    let space = <span>&nbsp;&nbsp;</span>

    showTime = showTime !== undefined ? showTime : false;
    timeLabel = timeLabel !== undefined && showTime ? timeLabel : "Time:";

    let selectedDateValue = null;
    if (typeof hasDefaultDate !== 'undefined' && hasDefaultDate === true) {
        selectedDateValue = formConstraints.getSADateTimeValue(formProps?.values[props.name]) !== null ? moment(formConstraints.getSADateTimeValue(formProps.values[props.name])).toDate() : new Date();
    } else {
        var test = formConstraints.getSADateTimeValue(formProps?.values[props.name]) !== null ? moment(formConstraints.getSADateTimeValue(formProps?.values[props.name]))?.toDate() : null;
        selectedDateValue = formConstraints.getSADateTimeValue(formProps?.values[props.name]) !== null ? moment(formConstraints.getSADateTimeValue(formProps.values[props.name])).toDate() : null;
    }


    let cLabelBlock = (label === undefined || label === '') ? null :
        (<CLabel className={labelClassName} style={labelStyle} htmlFor={props.id || props.name}>{label}{isR ? star : space}</CLabel>);

    const blockCode = (
        <CFormGroup>
            {cLabelBlock}
            <DatePicker
                selected={selectedDateValue}
                className={fieldClass}
                name={props.name}
                disabled={isDisabled !== undefined ? isDisabled : false}
                timeInputLabel={timeLabel}
                showTimeInput={showTime}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                onChange={date => {
                    if (showTime) {
                        formProps.setFieldValue(props.name, moment(date).toDate());
                    }
                    else {
                        formProps.setFieldValue(props.name, formConstraints.getDashedDateTime(moment(date).toDate()));
                    }
                    if (onChangeHandle !== undefined) {
                        onChangeHandle(props.name, moment(date).toDate());
                    }
                }}
                autoComplete="off"
                {...props}
            />
        </CFormGroup>
    );


    let cLabelInline = (label === undefined || label === '') ? null :
        (<CLabel className={labelClassName} htmlFor={props.id || props.name}>{label}{isR ? star : space}</CLabel>);

    const inlineCode = (
        <CFormGroup row className="mb-1">
            <CCol md={lSize} style={labelStyle}>
                {cLabelInline}
            </CCol>
            <CCol md={rSize} style={fieldStyle}>
                <DatePicker
                    selected={selectedDateValue}
                    className={fieldClass}
                    name={props.name}
                    disabled={isDisabled !== undefined ? isDisabled : false}
                    timeInputLabel={timeLabel}
                    showTimeInput={showTime}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    onChange={date => {
                        if (showTime) {
                            formProps.setFieldValue(props.name, moment(date).toDate());
                        }
                        else {
                            formProps.setFieldValue(props.name, formConstraints.getDashedDateTime(moment(date).toDate()));
                        }
                        if (onChangeHandle !== undefined) {
                            onChangeHandle(props.name, moment(date).toDate());
                        }
                    }}
                    autoComplete="off"
                    {...props}
                    style={{
                        width: '105%'
                    }}
                />
            </CCol>
        </CFormGroup>
    );


    return (
        <>
            {isInline === "true" ? inlineCode : blockCode}
        </>
    );
}

export default SADatePicker;

//Deprecated code. This can be used under 'CLabel' if needed.
{/* {!meta.touched ? (<CFormText>{helpText}</CFormText>) : null}
    {meta.touched && meta.error ? (
        <CInvalidFeedback>{meta.error}</CInvalidFeedback>
    ) : ( <CValidFeedback>{successMessage}</CValidFeedback> )} */}
