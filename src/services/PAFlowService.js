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

const requestData = {
    "action": "exp.requestUrl",
    "payload": null
};

export const initializeSubmission = async (params) => {
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
        throw new Error(`Form Error: ${err.message}`);
    }
}