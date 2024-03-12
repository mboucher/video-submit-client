/* ************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
**************************************************************************/

import axios from 'axios';
import {PA_X_API_KEY, PA_ENDPPOINT} from '../utils/secrets';


export const initializeSubmission = async (params) => {
    console.log(params);
    const requestData = {
        "action": "exp.draftSubmit",
        "payload": null
    };
    
    requestData.payload = params;
    try {
        const requestConfig = {
            headers:{
                'x-api-key': PA_X_API_KEY,
                'content-type': 'application/json'
            }
        };

        const res = await axios.post(PA_ENDPPOINT, requestData, requestConfig);
        return res;

    } catch (err) {
        throw new Error(err);
    }
};

export const getSignedUrl = async (submissionId, file) => {
    const requestData = {
        "action": "exp.requestUrl",
        "payload": {
            "submissionId": submissionId,
            "file": {
                "fileName": file.name,
                "contentType": file.type
            }
        }
    }

    const requestConfig = {
        headers:{
            'x-api-key': PA_X_API_KEY,
            'content-type': 'application/json'
        }
    };
    
    try {
        const res = await axios.post(PA_ENDPPOINT, requestData, requestConfig);
        return res;
    } catch (e) {
        throw new Error(e);
    }
}

export const completeSubmission = async (submissionId) => {
    const requestData = {
        "action": "exp.complete",
        "payload": {
            "submissionId": submissionId
        }
    }

    const requestConfig = {
        headers:{
            'x-api-key': PA_X_API_KEY,
            'content-type': 'application/json'
        }
    };

    try {
        const res = await axios.post(PA_ENDPPOINT, requestData, requestConfig);
        return res;
    } catch (e) {
        throw new Error(e);
    }
}