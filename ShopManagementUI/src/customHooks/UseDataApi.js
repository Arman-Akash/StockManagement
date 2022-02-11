import React, { useState, useEffect } from 'react';
import * as axios from '../axios/axiosLib';

export const useDataApi = (url, initialData, handleOther) => {

    if (initialData === undefined) {
        initialData = {};
    }

    let [data, setData] = useState(initialData);
    let [commandCount, setCommandCount] = useState(0);

    const refresh = () => {
        let count = commandCount + 1;
        setCommandCount(count);
    }

    useEffect(() => {
        if (!url.includes('undefined')) {
            axios.fetchGetData(url, data, setData, (obj) => {
                if (handleOther !== undefined) {
                    handleOther(obj);
                }
            });
        }
    }, [commandCount]);

    return {
        data: data,
        setData: setData,
        refresh: refresh
    };
}