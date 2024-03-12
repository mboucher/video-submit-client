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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  "firstName": null,
  "lastName": null,
  "email": null,
  "location": {
    "country": "US",
    "state": null
  },
  "consent":false,
  "certification": false
}

const appSlice = createSlice({
    name: 'formState',
    initialState: initialState,
    reducers: {
        setFirstName (state, action) {
            state.firstName = action.payload;
        },
        setLastName (state, action) {
          state.lastName = action.payload;
        },
        setEmail (state, action) {
          state.email = action.payload;
        },
        setCountry (state, action) {
          state.location.country = action.payload;
        },
        setState (state, action) {
          state.location.state = action.payload;
        },
        setConsent (state, action) {
          state.consent = action.payload;
        },
        setCertification (state, action) {
          state.certification = action.payload;
        }
    }
});

export const {
    setFirstName,
    setLastName,
    setEmail,
    setCountry,
    setState,
    setConsent,
    setCertification
} = appSlice.actions;

export default appSlice.reducer;
