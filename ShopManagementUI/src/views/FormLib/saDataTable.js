//React & CoreUI
import {
  CButton, CCardHeader,

  CCol, CRow
} from '@coreui/react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from "formik";
import React, { useEffect, useRef } from 'react';
import SADatePicker from '../FormLib/saDatePicker';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import './saDataTableStyle.css';

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
        console.log(props.hideAddRow)
        if (!props.hideAddRow) {
          var theArr = [...props.dataArr];
          theArr.push(props.dataObj);
          props.onSetDataArray(theArr);

          hasTriggred = true;
          indexI = props.indexI + 1;
        }
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

  let inputTag = (
    <input
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
      checked={props.checked}
      min={props.min !== undefined ? props.min : ''}
      max={props.max !== undefined ? props.max : ''}
      step="any"
      onChange={e => props.onChange(e, props.objProp, props.indexI, props.indexJ)}
      onKeyDown={(e) => {
        handleKeyDown(e, props);
      }}
    />);

  let inputField = props.cellLabel !== undefined ?
    (<label><span style={{ float: 'left', marginTop: '10px', paddingRight: '5px' }}>{props.cellLabel}</span>{inputTag}</label>) : inputTag;
  return (<td className="no-pad" style={{ textAlign: 'center', ...props.tdStyle }}>{inputField}</td>);
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
  return (<td className="no-pad" style={{ ...props.tdStyle }}>
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
      onChange={e => props.onChange(e, props.objProp, props.indexI, props.indexJ, props.dataArr)}
      onKeyDown={(e) => {
        handleKeyDown(e, props);
      }}>
      {options}
    </select>
  </td>);
}

const onChangeCheckBoxHandler = (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
  let newArr = [...dataArr];
  var selectedObj = JSON.parse(JSON.stringify(newArr[indexI]));
  selectedObj[objProp] = e.target.value === 'true';
  newArr[indexI] = selectedObj;
  onSetDataArray(newArr);
  return newArr;
}

const onChangeHandler = (e, objProp, indexI, indexJ, dataArr, onSetDataArray) => {
  let newArr = [...dataArr];
  var selectedObj = JSON.parse(JSON.stringify(newArr[indexI]));
  selectedObj[objProp] = e.target.value;
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

const isChecked = (dataArr, objProp, indexI, indexJ) => {
  let newArr = [...dataArr];
  var selectedObj = newArr[indexI];
  return selectedObj[objProp];

  // if (cellProps !== undefined) {
  //   let cellObj = cellProps.filter(e => e.indexI === indexI && e.indexJ === indexJ);

  //   if (cellProps.filter(e => e.indexI === indexI && e.indexJ === indexJ).length == 0) { return undefined; }

  //   if (cellObj !== undefined && cellObj[0].cellLabel !== undefined) {
  //     return cellObj[0].checked;
  //   } else {
  //     return undefined;
  //   }
  // } else {
  //   return undefined;
  // }
}

const renderCells = (fields, dataArr, onSetDataArray, readOnlyArr, scopedSlots, fieldsTypeWithValue, dataObj, hideAddRow, cellProps, tableResponsive, tdStyle) => { //Remarks
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
              options={fieldProp.options} //Remarks->Pass item[].options
              dataObj={dataObj}
              dataArr={dataArr}
              onSetDataArray={onSetDataArray}
              onChange={(e, objProp, indexI, indexJ) => {
                (function (indexI, indexJ) {
                  onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                  if (fieldProp.onOptionChangeHandler !== undefined) {
                    fieldProp.onOptionChangeHandler(e, field, indexI, indexJ, dataArr, onSetDataArray)
                  }
                })(indexI, indexJ)
              }} />
          );
        } else if (fieldProp !== undefined && (fieldProp.fieldType.toLowerCase() === "REACT-SELECT".toLowerCase())) {
          return (
            <Formik key={indexJ}
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
                        usedInTable={true}
                        options={fieldProp.options?.map(selectObj => {
                          return { label: selectObj.name, value: selectObj.value }
                        })}
                        isDisabled={fieldProp.isDisabled != undefined ? fieldProp.isDisabled : false}
                        onChangeHandle={(name, value) => {
                          let e = {
                            target: {
                              value: value
                            }
                          };

                          (function (indexI, indexJ) {
                            let newArr = onChangeHandler(e, field, indexI, indexJ, dataArr, onSetDataArray);
                            if (fieldProp.onOptionChangeHandler !== undefined) {
                              fieldProp.onOptionChangeHandler(e, field, indexI, indexJ, newArr, onSetDataArray)
                            }
                          })(indexI, indexJ)
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
            <Formik key={indexJ}
              enableReinitialize
              initialValues={{
                reactDatePicker: item[field]
              }}
            >
              {
                formProps => {
                  return (
                    <td>
                      <SADatePicker
                        // id="reactDatePicker"
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
                          console.log(value);
                          (function (indexI, indexJ) {
                            onChangeHandler(e, fieldProp.fieldName, indexI, indexJ, dataArr, onSetDataArray);
                            if (fieldProp.onOptionChangeHandler !== undefined) {
                              fieldProp.onOptionChangeHandler(e, name, indexI, indexJ, dataArr, onSetDataArray);
                            }
                          })(indexI, indexJ)
                        }}
                      />
                    </td>
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
            <Cell key={indexJ}
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
              checked={isChecked(dataArr, field, indexI, indexJ)}
              fieldClassName={fieldProp !== undefined && fieldProp.fieldClassName !== undefined ? fieldProp.fieldClassName : null}
              fieldStyle={fieldProp !== undefined && fieldProp.fieldStyle !== undefined ? fieldProp.fieldStyle : null}
              cellLabel={findCellLabel(cellProps, indexI, indexJ)}
              disabled={checkCellIsDisabled(cellProps, indexI, indexJ)}
              tdStyle={fieldProp.tdStyle}
              onChange={(e, objProp, indexI, indexJ) => {
                if (fieldProp.fieldType.toLowerCase() === "CHECKBOX".toLowerCase()) {
                  e.target.value = e.target.checked;
                  // fieldProp.onChecked(e, objProp, indexI, indexJ);
                }

                (function (indexI, indexJ) {

                  if (fieldProp.fieldType.toLowerCase() === "CHECKBOX".toLowerCase()) {
                    onChangeCheckBoxHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray)
                  } else {
                    onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                  }

                  if (fieldProp.onChange !== undefined) {
                    fieldProp.onChange(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                  }
                })(indexI, indexJ)
                
              }}
              hideAddRow={hideAddRow}
            />
          );
        } else {
          return (
            <Cell key={indexJ}
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
                (function (indexI, indexJ) {
                  onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                  if (fieldProp !== undefined && fieldProp.onChange !== undefined) {
                    fieldProp.onChange(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
                  }
                })(indexI, indexJ)
              }}
              hideAddRow={hideAddRow}
            />
          );
        }
      } else {
        return (
          <Cell key={indexJ}
            indexI={indexI}
            indexJ={indexJ}
            objProp={field}
            value={item[field]}
            readOnlyArr={readOnlyArr}
            dataObj={dataObj}
            dataArr={dataArr}
            tdStyle={fieldProp?.tdStyle}
            onSetDataArray={onSetDataArray}
            fieldClassName={fieldProp !== undefined && fieldProp.fieldClassName !== undefined ? fieldProp.fieldClassName : null}
            fieldStyle={fieldProp !== undefined && fieldProp.fieldStyle !== undefined ? fieldProp.fieldStyle : null}
            cellLabel={findCellLabel(cellProps, indexI, indexJ)}
            disabled={checkCellIsDisabled(cellProps, indexI, indexJ)}
            onChange={(e, objProp, indexI, indexJ) => {
              (function (indexI, indexJ) {
                onChangeHandler(e, objProp, indexI, indexJ, dataArr, onSetDataArray);
              })(indexI, indexJ)
            }}
            hideAddRow={hideAddRow}
          />
        );
      }
    });

    if (scopedSlots !== undefined) {
      result.push(scopedSlots(i));
    }

    finalResult.push(result);
  });

  if (tableResponsive !== true) {
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
            Add Row
          </CButton>
        </td>
      </>));
    }
  }

  return finalResult.map((res, index) => {
    return (<tr key={index}>
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
      {props.actionButton != undefined ? (
        <CCardHeader style={props.style != undefined ? props.style : null}>
          <CRow>
            <CCol md="9">
              {props.tableName}
            </CCol>
            <CCol md="3">
              {props.actionButton != undefined ? (props.actionButton) : null}
            </CCol>
          </CRow>
        </CCardHeader>
      ) : (
        <CCardHeader style={props.style != undefined ? props.style : null}>
          <CRow>
            <CCol md="12">
              {props.tableName}
            </CCol>
          </CRow>
        </CCardHeader>
      )}

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
      <th key={index}
        className={className}
        style={styles}>{item}
      </th>
    )
  }) : null;

  var scrollWidth = (0.09230769 * props.columns.length);
  var result = `calc(100%  - ${scrollWidth}em) !important`;

  var addBtn = "";

  if (props.tableResponsive === true) {
    props.hideAddRow = props.hideAddRow != undefined ? props.hideAddRow : false;
    if (props.scopedSlots !== undefined && !props.hideAddRow) {
      addBtn = (<>
        <CButton
          className="btn-success btn-sm float-right"
          onClick={() => {
            if (props.dataObj !== undefined) {
              var theArr = [...props.dataArr];
              theArr.push(props.dataObj);
              props.onSetDataArray(theArr);
            }
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Row
        </CButton>
      </>)
    }
  }

  return (
    <CCol md={props.md != undefined && props.md != 0 ? props.md : 12} style={props.colStyle} className={props.hasScroll !== undefined && props.hasScroll ? "search-table-outter" : ""}>
      {tableName}
      {addBtn}
      <table id={props.id} className={`table table-bordered table-striped input-table search-table${props.tableResponsive == true ? " table-responsive" : ""}`} style={props.tableStyle}>
        <thead style={{ width: result }}>
          <tr style={props.headerStyle}>
            {columns}
          </tr>
        </thead>
        <tbody>
          {renderCells(props.fields, props.dataArr, props.onSetDataArray, props.readOnlyArr, props.scopedSlots,
            props.fieldsTypeWithValue, props.dataObj, props.hideAddRow, props.cellProps, props.tableResponsive, props.tdStyle)}
          {props.extraRow}
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