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

import { Flex, TextField, Picker, Item, Button, Heading, View, Switch, ProgressCircle, Text } from '@adobe/react-spectrum';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { initializeSubmission } from '../services/PAFlowService';
import React, { useEffect, useState } from 'react';
import { ToastQueue } from '@react-spectrum/toast';
import { setCurrentPageName, setSignedUrl, setSubmissionId } from '../redux/app';
import {setFirstName, setLastName, setConsent, setCountry, setEmail, setState} from '../redux/form';
import { states } from '../utils/data';


const SubmissionForm = () => {
    const submissionId = useSelector((state) => state.app.submissionId);

    const firstName = useSelector((state) => state.form.firstName);
    const lastName = useSelector((state) => state.form.lastName);
    const email = useSelector((state) => state.form.email);
    const country = useSelector((state) => state.form.location.country);
    const state = useSelector((state) => state.form.location.state);
    const consent = useSelector((state) => state.form.consent);

    const [isWorking, setIsWorking] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const disabledStateKeys = ['IL', 'TX'];

    useEffect(() =>{
        dispatch(setCurrentPageName('Video Submission Form'))
    },[]);


    const validateFields = () => {
        if(firstName === null || lastName === null || email === null || state === null) {
            ToastQueue.negative('All fields are required.', {timeout:5000});
            return false;
        } else {
            return true;
        }
    }


    const handleContinue = async () => {
        
        if(validateFields() === false) {
            return;
        }
        
        if(submissionId) {
            navigate('/upload');
        }

        try {
            setIsWorking(true);
            const params = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                location: {
                    country: country,
                    state: state
                },
                consent: consent
            }
            const response = await initializeSubmission(params);
            if(response.status === 200) {
                dispatch(setSignedUrl(response.data.uploadUrl));
                dispatch(setSubmissionId(response.data.submissionId));
                navigate('/upload');
            } else {
                throw new Error('Unable to initialize submission');
            }
        } catch (e) {
            console.error(e);
            ToastQueue.negative(`Form Error: ${e.message}`, {timeout: 5000})
        } finally {
            setIsWorking(false);
        }
       
    }
    return(
        <View padding={'size-400'} width={'100%'}>
            <Flex direction={'column'} width={'100%'} alignItems={'center'}>
            <Flex direction={'column'} gap={'size-250'} width={'40%'}>
                <Heading>Enter your information</Heading>
                <Text>This is place holder text to explain whay we're asking for video submissions. What the submissions will be used for etc.</Text>
                <Flex direction={'row'} wrap gap={'size-100'}>
                    <TextField label='First Name' isRequired onChange={(val) => dispatch(setFirstName(val))} defaultValue={firstName}></TextField>
                    <TextField label='Last Name' isRequired onChange={(val) => dispatch(setLastName(val))} defaultValue={lastName}></TextField>
                    <TextField label='Email' isRequired onChange={(val) => dispatch(setEmail(val))} defaultValue={email}></TextField>
                    <Picker label='State' isRequired onSelectionChange={(val) => dispatch(setState(val))} items={states} defaultSelectedKey={state} disabledKeys={disabledStateKeys}>
                        {(item) => <Item key={item.id}>{item.name}</Item>}
                    </Picker>
                    <Switch isRequired onChange={(val) => dispatch(setConsent(val))} isSelected={consent}>I consent to everything I am asked.</Switch>
                </Flex>
                
                <Button variant='cta' width={'size-1200'} onPress={handleContinue}>
                    {isWorking ?
                        <ProgressCircle isIndeterminate size='S'/>
                    : 
                        <Text>Continue</Text>
                    }
                
                </Button>
            </Flex>
            </Flex>
        </View>
    );
}

export default SubmissionForm;