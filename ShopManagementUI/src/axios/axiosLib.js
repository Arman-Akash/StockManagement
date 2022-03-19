import axios from 'axios';
// import { func } from 'prop-types';
import * as keys from './keys';
import * as storage from './storage';
import { NotificationManager } from 'react-notifications';

var DEVELOPMENT_URL;

fetch('manifest.json'
    , {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
)
    .then(function (response) {
        return response.json();
    })
    .then(function (menifest) {
        DEVELOPMENT_URL = menifest.api_url;
    });

const duration = 5000;

let createNotification = (type, message) => {
    if (type === 'info') {
        NotificationManager.info(message, 'Info', duration);
    } else if (type === 'success') {
        NotificationManager.success(message, 'Success', duration);
    } else if (type === 'warning') {
        NotificationManager.warning(message, 'Warning', duration);
    } else {
        NotificationManager.error(message, 'Error', duration);
    }
}

let getNotificationType = (response) => {
    return response.data.success === true ? 'success' : 'error';
}

const createConfig = () => {
    var data = storage.loadState(keys.LOGGED_IN_USER);
    if (data !== undefined) {
        return {
            headers: {
                "Authorization": `Bearer ${data.token}`,
                "Access-Control-Allow-Origin": "*",
                "access-control-expose-headers": "*",
                "access-control-allow-methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
            }
        };
    } else {
        return undefined;
    }
}

/**
 * This generic GET request.
 * @param {string} url
 */

export const filterNull = (data) => {
    if (data !== null && data !== undefined) {
        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                for (var property in data[i]) {
                    if (data[i][property] === "null" || data[i][property] === null) {
                        data[i][property] = "";
                    }
                }
            }
        }
        else {
            for (var property in data) {
                if (data[property] === "null" || data[property] === null) {
                    data[property] = "";
                }
            }
        }
    }
    return data;
}

export const fetchGetData = (url, data, func, handleOther) => {
    // console.log(url);
    // console.log(handleOther);
    if (typeof url !== 'string' || url === undefined) {
        func({
            ...data,
            data: {},
            success: false,
            message: '',
            statusCode: ''
        });
    }

    axios.get(`${DEVELOPMENT_URL}/${url}`, createConfig())
        .then(response => {
            // console.log(response);
            if (func !== undefined && data !== undefined && data.data !== undefined && JSON.stringify(data.data) !== JSON.stringify(response.data.data)) {
                func({
                    ...data,
                    data: filterNull(response.data.data),
                    pageconfig: response.data.pageconfig,
                    success: response.data.success,
                    message: response.data.message,
                    statusCode: response.data.statusCode
                });
            }
            if (handleOther !== undefined) {
                handleOther({
                    ...data,
                    data: response.data.data,
                    pageconfig: response.data.pageconfig,
                    success: response.data.success,
                    message: response.data.message,
                    statusCode: response.data.statusCode
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * This generic POST request.
 * @param {string} url
 * @param {obj} postData
 */
export const fetchPostData = (url, postData, func, handleOther) => {
    console.log(url, postData);
    if (typeof url !== 'string' || url === undefined) {
        func({
            ...postData,
            data: {},
            success: false,
            message: '',
            statusCode: ''
        });
    }

    axios.post(`${DEVELOPMENT_URL}/${url}`, postData, createConfig())
        .then(response => {
            if (func !== undefined) {
                func({
                    ...postData,
                    data: response.data.data,
                    success: response.data.success,
                    message: response.data.message,
                    statusCode: response.data.statusCode
                });
            }

            if (handleOther !== undefined) {
                handleOther(response);
            }

            if (response.data.message != undefined && 
                response.data.message !== null && response.data.message !== '') {
                createNotification(getNotificationType(response), response.data.message);
            }
        })
        .catch(error => {
            if (func !== undefined) {
                func({
                    ...postData,
                    data: {},
                    success: false,
                    message: error,
                    statusCode: ''
                });
            }
        });

}

/**
 * This generic PUT request.
 * @param {string} url
 * @param {obj} putData
 */
export const fetchPutData = (url, putData, func, handleOther) => {
    console.log(url, putData);
    if (typeof url !== 'string' || url === undefined) {
        if (func !== undefined) {
            return func({
                ...putData,
                data: {},
                success: false,
                message: '',
                statusCode: ''
            });
        }
    }

    axios.put(`${DEVELOPMENT_URL}/${url}`, putData, createConfig())
        .then(response => {
            if (func !== undefined) {
                func({
                    ...putData,
                    data: response.data.data,
                    success: response.data.success,
                    message: response.data.message,
                    statusCode: response.data.statusCode
                });
            }

            if (handleOther !== undefined) {
                handleOther();
            }

            if (response.data.message !== null && response.data.message !== '') {
                createNotification(getNotificationType(response), response.data.message);
            }
        })
        .catch(error => {
            if (func !== undefined) {
                func({
                    ...putData,
                    data: {},
                    success: false,
                    message: error,
                    statusCode: ''
                });
            }
        });
}

/**
 * This generic  DELETE request.
 * @param {string} url
 */
export const fetchDeleteData = (url, handleOther) => {
    axios.delete(`${DEVELOPMENT_URL}/${url}`, createConfig())
        .then(response => {
            if (handleOther !== undefined) {
                handleOther();
            }

            if (response.data.message !== null && response.data.message !== '') {
                createNotification(getNotificationType(response), response.data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * This generic POST request if for fileUpload.
 * @param {string} url
 * @param {obj} postData
 * TODO: Need to check uploadFile.
 */
export const uploadFile = (url, postData, func, handleOther) => {
    if (typeof url !== 'string' || url === undefined) {
        func({
            ...postData,
            data: {},
            success: false,
            message: '',
            statusCode: ''
        });
    }
    let config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.create(config).post(`${DEVELOPMENT_URL}/${url}`, postData, func)
        .then(response => {
            if (func !== undefined) {
                func({
                    ...postData,
                    data: response.data.data,
                    success: response.data.success,
                    message: response.data.message,
                    statusCode: response.data.statusCode
                });
            }
            if (handleOther !== undefined) {
                handleOther();
            }

            if (response.data.message !== null && response.data.message !== '') {
                createNotification(getNotificationType(response), response.data.message);
            }
        })
        .catch(error => {
            if (func !== undefined) {
                func({
                    ...postData,
                    data: {},
                    success: false,
                    message: error,
                    statusCode: ''
                });
            }
        });
}

/**
 * This generic patch request.
 * @param {string} url
 * @param {[{op, path, value}]} patchData
 */
export const fetchPatchData = (url, patchData, func, handleOther) => {
    if (typeof url !== 'string' || url === undefined) {
        if (func !== undefined) {
            return func({
                ...patchData,
                data: {},
                success: false,
                message: '',
                statusCode: ''
            });
        }
    }
    axios.patch(`${DEVELOPMENT_URL}/${url}`, patchData, createConfig())
        .then(response => {
            if (func !== undefined) {
                func({
                    ...patchData,
                    data: response.data.data,
                    success: response.data.success,
                    message: response.data.message,
                    statusCode: response.data.statusCode
                });
            }
            if (handleOther !== undefined) {
                handleOther();
            }

            if (response.data.message !== null && response.data.message !== '') {
                createNotification(getNotificationType(response), response.data.message);
            }
        })
        .catch(error => {
            if (func !== undefined) {
                func({
                    ...patchData,
                    data: {},
                    success: false,
                    message: error,
                    statusCode: ''
                });
            }
        });
}

export const postFormData = (url, postData, list, files, handleOther) => {
    const formData = new FormData()

    postData['createdTime'] = null;
    postData['updatedTime'] = null;

    // [{"name":"propertyName", "array":list}]
    if (list !== undefined && list !== null) {
        list.forEach(obj => {
            if (postData.hasOwnProperty(obj.name)) {
                delete postData[obj.name]
            }
            for (var i = 0; i < obj.array?.length; i++) {
                for (var property in obj.array[i]) {
                    if (Array.isArray(obj.array[i][property])) {
                        for (let j = 0; j < obj.array[i][property].length; j++) {
                            let element = obj.array[i][property][j];
                            if (element instanceof File) {
                                formData.append(
                                    `${obj.name}[${i}].${property}`,
                                    element
                                )
                            }
                        }
                    } else {
                        formData.append(`${obj.name}[${i}].${property}`, obj.array[i][property]);
                    }
                }
            }
        });
    }

    if (files !== undefined && files !== null && files.length > 0) {
        files.forEach(file => {
            if (file.attachment !== null) {
                if (file.attachment.length !== undefined) {
                    for (var i = 0; i < file.attachment.length; i++) {
                        formData.append(
                            file.name,
                            file.attachment[i]
                        )
                    }
                } else {
                    formData.append(
                        file.name,
                        file.attachment
                    )
                }
            }
        });
    }

    for (var property in postData) {
        formData.append(
            property,
            postData[property] == null ? "" : postData[property]
        )
    }

    axios.post(`${DEVELOPMENT_URL}/${url}`, formData, createConfig())
        .then(response => {
            if (handleOther !== undefined) {
                handleOther(response);
            }

            if (response.data.message !== null && response.data.message !== '') {
                createNotification(getNotificationType(response), response.data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const putFormData = (url, postData, list, files, handleOther) => {
    const formData = new FormData()

    // postData['createdTime'] = formConstraints.getDashedDate(new Date());
    // postData['updatedTime'] = formConstraints.getDashedDate(new Date());

    if (list !== undefined && list !== null) {
        list.forEach(obj => {
            if (postData.hasOwnProperty(obj.name)) {
                delete postData[obj.name]
            }
            for (var i = 0; i < obj.array?.length; i++) {
                delete obj.array[i].createdTime;
                delete obj.array[i].updatedTime;

                for (var property in obj.array[i]) {
                    if (Array.isArray(obj.array[i][property])) {
                        for (let j = 0; j < obj.array[i][property].length; j++) {
                            let element = obj.array[i][property][j];
                            if (element instanceof File) {
                                formData.append(
                                    `${obj.name}[${i}].${property}`,
                                    element
                                )
                            }
                        }
                    } else {
                        formData.append(`${obj.name}[${i}].${property}`, obj.array[i][property] == null ? "" : obj.array[i][property]);
                    }
                }
            }
        });
    }

    if (files !== undefined && files !== null) {
        files.forEach(file => {
            if (file.attachment !== undefined && file.attachment !== null) {
                if (file.attachment.length !== undefined) {
                    for (var i = 0; i < file.attachment.length; i++) {
                        formData.append(
                            file.name,
                            file.attachment[i]
                        )
                    }
                } else {
                    formData.append(
                        file.name,
                        file.attachment
                    )
                }
            }
        });
    }

    delete postData.createdTime;
    delete postData.updatedTime;
    for (var property in postData) {
        formData.append(
            property,
            postData[property] == null ? "" : postData[property]
        )
    }

    axios.put(`${DEVELOPMENT_URL}/${url}`, formData, createConfig())
        .then(response => {
            if (handleOther !== undefined) {
                handleOther(response);
            }

            if (response.data.message !== null && response.data.message !== '') {
                createNotification(getNotificationType(response), response.data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * This generic login request.
 * @param {obj} postData
 */
export const fetchLogin = (postData, success, failed) => {

    axios.post(`${DEVELOPMENT_URL}/api/account/authenticate`, postData, {
        headers: {
            "access-control-allow-headers": "*",
            "access-control-allow-methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Origin": "*",
            "access-control-expose-headers": "*",
        }
    })
        .then(response => {
            storage.removeState(keys.LOGGED_IN_USER);
            storage.saveState(keys.LOGGED_IN_USER, response.data);
            if (success !== undefined) {
                success(response);
            }
        })
        .catch(error => {

            if (failed !== undefined) {
                failed(error.response);
            }
        });
}

export const fetchLogout = () => {
    storage.removeState(keys.LOGGED_IN_USER);

    // createNotification(getNotificationType({
    //     data: {
    //         success: true
    //     }
    // }), "Logout successful");
}

/**
* This generic POST request.
* @param {string} url
* @param {obj} postData
*/
export const fetchReportData = (url, postData, func, handleOther) => {
    if (typeof url !== 'string' || url === undefined) {
        func({
            ...postData,
            data: {},
            success: false,
            message: '',
            statusCode: ''
        });
    }

    axios.post(`${DEVELOPMENT_URL}/${url}`, postData, createConfig())
        .then(response => {
            if (func !== undefined) {
                func({
                    ...postData,
                    data: filterNull(response.data.data),
                    success: response.data.success,
                    message: response.data.message,
                    statusCode: response.data.statusCode
                });
            }

            if (handleOther !== undefined) {
                handleOther(response);
            }

            //if (response.data.message !== null && response.data.message !== '') {
            // createNotification(getNotificationType(response), response.data.message);
            //}
        })
        .catch(error => {
            if (func !== undefined) {
                func({
                    ...postData,
                    data: {},
                    success: false,
                    message: error,
                    statusCode: ''
                });
            }
        });
}

