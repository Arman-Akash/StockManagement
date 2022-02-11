
/**
 * Validate phone number for given input. 
 */
export const validatePhoneNumber = (event, propName, formProps) => {
    if ((event.keyCode >= 37 && event.keyCode <= 40) || event.keyCode == 8) {
        return;
    }

    if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
        let result = formProps.values[propName].substring(0, formProps.values[propName].length - 1);
        formProps.setFieldValue(propName, result);
    }

    if (formProps.values[propName].length > 11) {
        let result = formProps.values[propName].substring(0, 11);
        formProps.setFieldValue(propName, result);
    }
}

export const getSADateTimeValue = (dateValue) => {
    if (typeof dateValue === 'string' && (dateValue.includes('/') || dateValue.includes('-'))) { //For DateTime Format: dd/MM/yyyy
        let parts = [];

        if (dateValue.includes('T')) {
            dateValue = dateValue.includes('"') ? dateValue.replace('"', '') : dateValue;
            let tParts = dateValue.split('T');
            dateValue = tParts[0];
        }

        if (dateValue.includes('/')) {
            parts = dateValue.split('/');
        } else {
            parts = dateValue.split('-');
        }

        if (parts.length === 3) {
            if (parts[2].length === 4) { // For: dd/MM/yyyy or dd-MM-yyyy
                return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            } else if (parts[0].length === 4) { //For: yyyy/MM/dd or yyyy-MM-dd
                return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
            } else {
                return new Date()
            }
        } else {
            return new Date();
        }
    } else if (typeof dateValue === 'string' && dateValue.includes('T')) { //For DateTime Format: yyyy-MM-dd
        dateValue = dateValue.includes('"') ? dateValue.replace('"', '') : dateValue;
        let parts = dateValue.split('T');
        return parts.length == 2 ? new Date(parts[0]) : new Date();
    } else if (dateValue !== null && typeof dateValue === 'object') { // Type datetime object of javascript
        var resultDate = new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds());
        return resultDate;
    } else {
        return null;
    }
}

export const getDashedDate = (dateObj) => {
    if (dateObj === '') {
        return '';
    } else if (typeof dateObj !== null && dateObj !== null && typeof dateObj === 'object') {
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${dateObj.getFullYear()}-${month}-${day}`;
    } else if (typeof dateObj !== null && typeof dateObj === 'string' && (dateObj.includes('/') || dateObj.includes('-'))) { //For DateTime Format: dd/MM/yyyy
        let parts = [];

        if (dateObj.includes('T')) {
            dateObj = dateObj.includes('"') ? dateObj.replace('"', '') : dateObj;
            let tParts = dateObj.split('T');
            dateObj = tParts[0];
        }

        if (dateObj.includes('/')) {
            parts = dateObj.split('/');
        } else {
            parts = dateObj.split('-');
        }

        if (parts.length === 3) {
            if (parts[2].length === 4) { // For: dd/MM/yyyy or dd-MM-yyyy
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else if (parts[0].length === 4) { //For: yyyy/MM/dd or yyyy-MM-dd
                return `${parts[0]}-${parts[1]}-${parts[2]}`;
            } else {
                dateObj = new Date();
                return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
            }
        } else {
            dateObj = new Date();
            return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
        }
    } else if (typeof dateObj !== null && typeof dateObj === 'string' && dateObj.includes(' ')) {
        let tParts = dateObj.split(' ');
        return `${tParts[0]}T${tParts[1]}`;
    } else {
        dateObj = new Date();
        return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    }
}

export const getDashedDateTime = (dateObj) => {
    if (typeof dateObj !== null && typeof dateObj === 'object') {

        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        hour = hour < 10 ? `0${hour}` : hour;
        minute = minute < 10 ? `0${minute}` : minute;

        return `${dateObj.getFullYear()}-${month}-${day}T${hour}:${minute}:00`;
    } else {
        dateObj = new Date();
        return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}T${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
    }
}

//Note: Here, dataStr format is HH:MM
export const getTimeSpanTime = (dataStr) => {
    if (dataStr !== undefined && dataStr !== '') {
        var parts = dataStr.split(':');
        return `${parts[0]}:${parts[1]}:00`;
    } else {
        return "00:00:00";
    }
}

export const getYearMonthDayFormatedDate = (dateValue) => {
    if (typeof dateValue !== 'object' || dateValue === undefined) {
        dateValue = new Date();
    }
    return `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`;

}

export const processObjProperty = (obj, property, type) => {
    if (obj.data !== '' && obj.data !== undefined && obj.data !== null) {

        if (obj.data[property] !== undefined && obj.data[property] !== null) {

            if (type !== undefined && type === 'date') {
                if (obj.data[property].includes('T')) {
                    let parts = obj.data[property].split('T');
                    if (parts.length === 3) {
                        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T06:00:00`);
                    } else {
                        return new Date();
                    }
                } else if (obj.data[property].includes('/')) {
                    let parts = obj.data[property].split('/');
                } else {
                    return new Date();
                }
            }
            else {
                return `${obj.data[property]}`;
            }

        }
        else {
            return '';
        }

    } else {
        return '';
    }
}

//Note: fromDate, toDate should be in new Date() format
export const findDaysBetweenDates = (fromDate, toDate) => {
    let diffTime = Math.abs(toDate - fromDate);

    if (diffTime === 0) {
        return 1;
    }

    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
}

export const assignObj = (target, source) => {
    if (target !== undefined && source !== undefined
        && typeof target === 'object' && typeof source === 'object') {

        for (const property in target) {
            if (target[property] !== undefined && source[property] !== undefined) {
                target[property] = source[property];
            }
        }

        return target;
    } else {
        return target;
    }
}

export const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const orderObjectProperties = (theObject) => {
    if (theObject !== undefined) {
        theObject = Object.keys(theObject).sort().reduce(
            (obj, key) => {
                obj[key] = theObject[key];
                return obj;
            },
            {}
        );

        return theObject;
    } else {
        return theObject;
    }
}