import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

//Source: https://www.npmjs.com/package/react-export-excel

{/* 
    Example:
    --------
    Data preparing:
    ---------------
    const [dataset, setDataset] = useState([]);

    const excelFields = [
        { value: 'employeeId', label: 'Employee Id' },
        { value: 'name', label: 'Name' },
        { value: 'designation', label: 'Designation' },
        { value: 'leaveType', label: 'LeaveType' },
        { value: 'balance', label: 'Balance' },
        { value: 'office', label: 'Office' },
        { value: 'department', label: 'Department' },
    ];

    reference.data.forEach(item => {
        let obj = {
            employeeId: item.employeeId,
            name: item.name,
            designation: item.designation,
            leaveType: item.leaveType,
            balance: item.balance,
            office: item.office,
            department: item.department
        };
        dataset.push(obj);
    });
    setDataset(dataset);

    <ExportToExcel
        element={<CButton style={{ marginTop: '23px', marginLeft: '10px' }} className="btn btn-info btn-sm"><FontAwesomeIcon icon={faFileExport} /> Export</CButton>}
        dataset={dataset}
        fields={excelFields}
        fileName="Leave Status"
    /> 
*/}

const ExportToExcel = (props) => {
    let dataset = props.dataset !== undefined ? props.dataset : [];
    let element = props.element !== undefined ? props.element : (<button>Download</button>);
    let excelColumn = props.fields !== undefined ? props.fields.map(item => {
        return (<ExcelColumn key={item.value} label={item.label} value={item.value} />)
    }) : (<></>);

    return (
        <ExcelFile element={element} filename={props.fileName !== undefined ? props.fileName : 'exportedFile'}>
            <ExcelSheet data={dataset} name="Employees">
                {excelColumn}
            </ExcelSheet>
        </ExcelFile>
    )
}

export default ExportToExcel;