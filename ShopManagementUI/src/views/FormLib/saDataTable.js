//React & CoreUI
import React, { useEffect, useRef } from 'react';
import {
    CCardHeader,
    CRow,
    CCol,
    CButton
} from '@coreui/react';
import './saDataTableStyle.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SADatePicker from '../FormLib/saDatePicker';

import { Formik } from "formik";

let allRefs = [];
let indexI = 0;
let hasTriggred = false;

const handleKeyDown = (e, props) => {
    if (e.key === 'Enter' && props.dataObj !== undefined
        && props.dataArr !== undefined
        && props.onSetDataArray !== undefined) {


        let index = props.indexI * Object.keys(props.dataObj).length + props.indexJ;
        if (index > -1 && index < allRefs.length) {
            if ((index % Object.keys(props.dataObj).length) < Object.keys(props.dataObj).length - 1) {
                var obj = allRefs[index + 1];
                if (obj !== undefined && obj.current !== undefined && obj.current !== null) {
                    obj.current.focus();
                }
            } else {
                //Adding a new row
                var theArr = [...props.dataArr];
                theArr.push(props.dataObj);
                props.onSetDataArray(theArr);

                hasTriggred = true;
                indexI = props.indexI + 1;
            }
        } else {
            var theArr = [...props.dataArr];
            theArr.push(props.dataObj);
            props.onSetDataArray(theArr);
        }

    }
}

const Cell = (props) => {
    let className = `form-control editor edit-text ${props.fieldClassName}`;
    let dataObjLength = props.dataObj !== undefined ? Object.keys(props.dataObj).length : 0;
    let index = props.indexI * dataObjLength + props.indexJ;

    let inputTag = (<input
        className={className}
        style={props.fieldStyle}
        type={props.type !== undefined ? props.type : 'text'}
        disabled={props.disabled !== undefined ? props.disabled : false}
        ref={input => {
            if (allRefs[index] !== undefined) {
                allRefs[index].current = input;
            }
        }}
        readOnly={props.readOnlyArr != undefined ? props.readOnlyArr.includes(props.objProp) : false}
        value={props.value}
        checked={props.value}
        onChange={e => props.onChange(e, props.objProp, props.indexI, props.indexJ)}
        onKeyDown={(e) => {
            handleKeyDown(e, props);
        }} />);

    let inputField = props.cellLabel !== undefined ?
        (<label><span style={{ float: 'left', marginTop: '10px', paddingRight: '5px' }}>{props.cellLabel}</span>{inputTag}</label>) : inputTag;

    return (<td className="no-pad" style={{ textAlign: 'center' }}>{inputField}</td>);
}

const SelectCell = (props) => {
    let options = [];
    options.push((<option
        value="">Select...</option>));
    if (props.options) {
        let mapOptions = props.options.map((item, index) => {
            return (<option value={item.value}>{item.name}</option>);
        });
        options = options.concat(mapOptions);
    }

    let dataObjLength = props.dataObj !== undefined ? Object.keys(props.dataObj).length : 0;
    let index = props.indexI * dataObjLength + props.indexJ;
    return (<td className="no-pad">
        <select
            className="form-control editor edit-text"
            ref={input => {
                if (allRefs[index] !== undefined) {
                    allRefs[index].current = input;
                }
            }}
            disabled={props.readOnlyArr != undefined ? props.readOnlyArr.includes(props.objProp) : false}
            readOnly={props.readOnlyArr != undefined ? props.readOnlyArr.includes(props.objProp) : false}
            value={props.value}
            onChange={e => props.onChange(e, props.objProp, props.indexI, props.indexJ)}
            onKeyDown={(e) => {
                handleKeyDown(e, props);
            }}>
            {options}
        </select>
    </td>);
}

const onChangeHandler = (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
    let newArr = [...dataArr]; // copying the old datas array
    var selectedObj = { ...newArr[indexI] };
    selectedObj[objProp] = e.target.value; // replace e.target.value with whatever you want to change it to
    newArr[indexI] = selectedObj;
    onSetDataArray(newArr);
    return newArr;
}

const checkCellIsDisabled = (cellProps, indexI, indexJ) => {
    if (cellProps !== undefined) {
        let cellObj = cellProps.filter(e => e.indexI === indexI && e.indexJ === indexJ);

        if (cellProps.filter(e => e.indexI === indexI && e.indexJ === indexJ).length == 0) { return false; }

        if (cellObj !== undefined && cellObj[0].isDisabled !== undefined) {
            return cellObj[0].isDisabled;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const findCellLabel = (cellProps, indexI, indexJ) => {
    if (cellProps !== undefined) {
        let cellObj = cellProps.filter(e => e.indexI === indexI && e.indexJ === indexJ);

        if (cellProps.filter(e => e.indexI === indexI && e.indexJ === indexJ).length == 0) { return undefined; }

        if (cellObj !== undefined && cellObj[0].cellLabel !== undefined) {
            return cellObj[0].cellLabel;
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

const renderCells = (fields, dataArr, onSetDataArray, readOnlyArr, scopedSlots, fieldsTypeWithValue, dataObj, hideAddRow, cellProps) => {
    var finalResult = [];
    let i = -1;
    allRefs.splice(0, allRefs.length);

    dataArr.forEach((item, indexI) => {
        i++;
        var result = fields.map((field, indexJ) => {
            const theRef = React.createRef();
            allRefs.push(theRef);

            if (fieldsTypeWithValue !== undefined) {
                var fieldProp = fieldsTypeWithValue.find(x => x.fieldName === field);
                if (fieldProp !== undefined && fieldProp.fieldType.toLowerCase() === "SELECT".toLowerCase()) {
                    return (
                        <SelectCell
                            indexI={indexI}
                            indexJ={indexJ}
                            objProp={field}
                            value={item[field]}
                            readOnlyArr={readOnlyArr}
                            options={fieldProp.options}
                            dataObj={dataObj}
                            dataArr={dataArr}
                            onSetDataArray={onSetDataArray}
                            onChange={(e, objProp, indexI, indexJ) => {
                                onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                                if (fieldProp.onOptionChangeHandler !== undefined) {
                                    fieldProp.onOptionChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                                }
                            }} />
                    );
                } else if (fieldProp !== undefined && (fieldProp.fieldType.toLowerCase() === "REACT-SELECT".toLowerCase())) {
                    let dataObjLength = dataObj !== undefined ? Object.keys(dataObj).length : 0;
                    let index = indexI * dataObjLength + indexJ;
                    return (
                        <Formik
                            enableReinitialize
                            initialValues={{
                                reactSelect: item[field]
                            }}
                        >
                            {
                                formProps => {
                                    return (
                                        <td className="no-pad">
                                            <SAReactAutoSelect
                                                id="reactSelect"
                                                name="reactSelect"
                                                formProps={formProps}
                                                options={fieldProp.options.map(selectObj => {
                                                    return { label: selectObj.name, value: selectObj.value }
                                                })}
                                                isDisabled={fieldProp.isDisabled != undefined ? fieldProp.isDisabled : false}
                                                onChangeHandle={(name, value) => {
                                                    let e = {
                                                        target: {
                                                            value: value
                                                        }
                                                    };

                                                    let newArr = onChangeHandler(e, field, indexI, indexJ, dataArr, onSetDataArray);
                                                    if (fieldProp.onOptionChangeHandler !== undefined) {
                                                        fieldProp.onOptionChangeHandler(e, field, indexI, indexJ, newArr, onSetDataArray);
                                                    }
                                                }}
                                            />
                                        </td>
                                    )
                                }
                            }
                        </Formik>
                    );
                } else if (fieldProp !== undefined && (fieldProp.fieldType.toLowerCase() === "REACT-DATEPICKER".toLowerCase())) {
                    return (
                        <Formik
                            enableReinitialize
                            initialValues={{
                                reactDatePicker: item[field]
                            }}
                        >
                            {
                                formProps => {
                                    return (
                                        <CRow>
                                            <CCol>
                                                <SADatePicker
                                                    id="reactDatePicker"
                                                    name="reactDatePicker"
                                                    formProps={formProps}
                                                    dateFormat={fieldProp.dateFormat != undefined ? fieldProp.dateFormat : "dd/MM/yyyy"}
                                                    placeholderText={fieldProp.datePlaceholderText != undefined ? fieldProp.datePlaceholderText : "dd/MM/yyyy"}
                                                    onChangeHandle={(name, value) => {
                                                        let e = {
                                                            target: {
                                                                value: value
                                                            }
                                                        };

                                                        onChangeHandler(e, name, indexI, indexJ, dataArr, onSetDataArray);
                                                        if (fieldProp.onOptionChangeHandler !== undefined) {
                                                            fieldProp.onOptionChangeHandler(e, name, indexI, indexJ, dataArr, onSetDataArray);
                                                        }
                                                    }}
                                                />
                                            </CCol>
                                        </CRow>
                                    )
                                }
                            }
                        </Formik>
                    );
                } else if (fieldProp !== undefined && (fieldProp.fieldType.toLowerCase() === "TEXT".toLowerCase()
                    || fieldProp.fieldType.toLowerCase() === "NUMBER".toLowerCase()
                    || fieldProp.fieldType.toLowerCase() === "CHECKBOX".toLowerCase()
                    || fieldProp.fieldType.toLowerCase() === "DATE".toLowerCase()
                    || fieldProp.fieldType.toLowerCase() === "TIME".toLowerCase()
                    || fieldProp.fieldType.toLowerCase() === "DATETIME-LOCAL".toLowerCase())) {

                    return (
                        <Cell
                            indexI={indexI}
                            indexJ={indexJ}
                            objProp={field}
                            value={item[field]}
                            readOnlyArr={readOnlyArr}
                            type={fieldProp.fieldType.toLowerCase()}
                            dataObj={dataObj}
                            dataArr={dataArr}
                            onSetDataArray={onSetDataArray}
                            min={fieldProp.min !== undefined ? fieldProp.min : null}
                            max={fieldProp.max !== undefined ? fieldProp.max : null}
                            fieldClassName={fieldProp !== undefined && fieldProp.fieldClassName !== undefined ? fieldProp.fieldClassName : null}
                            fieldStyle={fieldProp !== undefined && fieldProp.fieldStyle !== undefined ? fieldProp.fieldStyle : null}
                            cellLabel={findCellLabel(cellProps, indexI, indexJ)}
                            disabled={checkCellIsDisabled(cellProps, indexI, indexJ)}
                            onChange={(e, objProp, indexI, indexJ) => {
                                if (fieldProp.fieldType.toLowerCase() === "CHECKBOX".toLowerCase()) {
                                    e.target.value = e.target.checked;
                                }
                                onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                                if (fieldProp.onChange !== undefined) {
                                    fieldProp.onChange(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                                }
                            }} />
                    );
                } else {
                    return (
                        <Cell
                            indexI={indexI}
                            indexJ={indexJ}
                            objProp={field}
                            value={item[field]}
                            readOnlyArr={readOnlyArr}
                            dataObj={dataObj}
                            dataArr={dataArr}
                            onSetDataArray={onSetDataArray}
                            fieldClassName={fieldProp !== undefined && fieldProp.fieldClassName !== undefined ? fieldProp.fieldClassName : null}
                            fieldStyle={fieldProp !== undefined && fieldProp.fieldStyle !== undefined ? fieldProp.fieldStyle : null}
                            cellLabel={findCellLabel(cellProps, indexI, indexJ)}
                            disabled={checkCellIsDisabled(cellProps, indexI, indexJ)}
                            onChange={(e, objProp, indexI, indexJ) => {
                                onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                                if (fieldProp !== undefined && fieldProp.onChange !== undefined) {
                                    fieldProp.onChange(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                                }
                            }} />
                    );
                }
            } else {
                return (
                    <Cell
                        indexI={indexI}
                        indexJ={indexJ}
                        objProp={field}
                        value={item[field]}
                        readOnlyArr={readOnlyArr}
                        dataObj={dataObj}
                        dataArr={dataArr}
                        onSetDataArray={onSetDataArray}
                        fieldClassName={fieldProp !== undefined && fieldProp.fieldClassName !== undefined ? fieldProp.fieldClassName : null}
                        fieldStyle={fieldProp !== undefined && fieldProp.fieldStyle !== undefined ? fieldProp.fieldStyle : null}
                        cellLabel={findCellLabel(cellProps, indexI, indexJ)}
                        disabled={checkCellIsDisabled(cellProps, indexI, indexJ)}
                        onChange={(e, objProp, indexI, indexJ) => {
                            onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                        }} />
                );
            }
        });

        if (scopedSlots !== undefined) {
            result.push(scopedSlots(i));
        }

        finalResult.push(result);
    });

    hideAddRow = hideAddRow != undefined ? hideAddRow : false;
    if (scopedSlots !== undefined && !hideAddRow) {
        finalResult.push((<>
            <td colSpan={fields.length}></td>
            <td>
                <CButton
                    className="btn background-secondary btn-sm"
                    style={{ display: 'inline-block', width: '100%', borderRadius: '0px' }}
                    onClick={() => {
                        if (dataObj !== undefined) {
                            var theArr = [...dataArr];
                            theArr.push(dataObj);
                            onSetDataArray(theArr);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </CButton>
            </td>
        </>));
    }


    return finalResult.map((res, index) => {
        return (<tr>
            {res}
        </tr>);
    });
}

/**
 * @param {
 *      md: optional, 
 *      style: optional,
 *      dataTableStyle: optional,
 *      tableName: optional,
 *      columns: optional,
 *      actionButton: optional,
 *      readOnlyArr: optional,
 *      scrollWidth: optional,
 *      fields: mandatory,
 *      dataArr: mandatory,
 *      onSetDataArray: mandatory
 * } param0 
 */

const SADataTable = ({ ...props }) => {

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (hasTriggred) {
                let dataObjLength = props.dataObj !== undefined ? Object.keys(props.dataObj).length : 0;
                let index = indexI * dataObjLength;
                var obj = allRefs[index];
                if (obj !== undefined && obj.current !== undefined && obj.current !== null) {
                    obj.current.focus();
                }
                hasTriggred = false;
            }
        }
    });

    var tableName = props.tableName != undefined && props.tableName != "" ? (
        <>
            <CRow>
                <CCol md="12">
                    <CCardHeader style={props.style != undefined ? props.style : null}>
                        {props.tableName}
                        {props.actionButton != undefined ? (props.actionButton) : null}
                    </CCardHeader>
                </CCol>
            </CRow>
        </>
    ) : null;

    var columns = props.columns != undefined && props.columns.length != 0 ? props.columns.map((item, index) => {
        var className = "text-center align-middle";
        var styles = {};
        if (props.fieldsTypeWithValue !== undefined) {
            var field = props.fields[index];
            var selectedFieldType = props.fieldsTypeWithValue.find(x => x.fieldName === field);
            if (selectedFieldType !== undefined) {
                className += ` ${selectedFieldType.thClassName !== undefined ? selectedFieldType.thClassName : ''}`;
                styles = selectedFieldType.thStyle !== undefined ? selectedFieldType.thStyle : null;
            }
        }

        return (
            <th
                className={className}
                style={styles}>{item}</th>
        )
    }) : null;

    var scrollWidth = (0.09230769 * props.columns.length);
    var result = `calc(100%  - ${scrollWidth}em) !important`;

    return (
        <CCol md={props.md != undefined && props.md != 0 ? props.md : 12} className={props.hasScroll !== undefined && props.hasScroll ? "search-table-outter" : ""}>
            {tableName}
            <table className="table table-bordered table-striped input-table search-table" style={props.tableStyle}>
                <thead style={{ width: result }}>
                    <tr>
                        {columns}
                    </tr>
                </thead>
                <tbody>
                    {renderCells(props.fields, props.dataArr, props.onSetDataArray, props.readOnlyArr, props.scopedSlots,
                        props.fieldsTypeWithValue, props.dataObj, props.hideAddRow, props.cellProps)}
                </tbody>
            </table>
        </CCol>
    );
}

export default SADataTable;

{/*Notes:
========
1. Don't use height in tableStyle.


*/}
