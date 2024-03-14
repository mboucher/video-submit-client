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

import { Flex, TextField, Picker, Item, Button, Heading, View, Switch, ProgressCircle, Text, ContextualHelp, Content } from '@adobe/react-spectrum';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ToastQueue } from '@react-spectrum/toast';
import { setCurrentPageName } from '../redux/app';
import {setFirstName, setLastName, setCertification, setCountry, setEmail, setState, setLang} from '../redux/form';
import { states, countries, languages } from '../utils/data';

const SubmissionForm = () => {
    const submissionId = useSelector((state) => state.app.submissionId);

    const firstName = useSelector((state) => state.form.firstName);
    const lastName = useSelector((state) => state.form.lastName);
    const email = useSelector((state) => state.form.email);
    const country = useSelector((state) => state.form.location.country);
    const state = useSelector((state) => state.form.location.state);
    const lang = useSelector((state) => state.form.lang);
    const certification = useSelector((state) => state.form.certification);

    const [content, setContent] = useState('');

    const [isWorking, setIsWorking] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const disabledStateKeys = ['IL', 'TX'];

    const validateFields = () => {
        if(firstName === null || lastName === null || email === null || country === null || state === null || !certification) {
            ToastQueue.negative('All fields and certification are required.', {timeout:5000});
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

        navigate('/terms');       
    }

    return(
        <View padding={'size-400'} width={'100%'}>
            <Flex direction={'column'} width={'100%'} alignItems={'center'}>
            <Flex direction={'column'} gap={'size-250'} width={'40%'}>
                <Heading>Enter your information</Heading>
                <Flex direction={'row'} wrap gap={'size-100'}>
                    <TextField label='First Name' isRequired onChange={(val) => dispatch(setFirstName(val))} defaultValue={firstName}></TextField>
                    <TextField label='Last Name' isRequired onChange={(val) => dispatch(setLastName(val))} defaultValue={lastName}></TextField>
                    <TextField label='Adobe Email' isRequired onChange={(val) => dispatch(setEmail(val))} defaultValue={email} type='email'
                        contextualHelp={
                            <ContextualHelp>
                              <Content>
                                In order for your submission to be valid, we will need to verify that you are an Adobe employee.
                              </Content>
                            </ContextualHelp>
                          }
                    
                    ></TextField>
                    <Picker label='Country' isRequired isDisabled onSelectionChange={(val) => dispatch(setCountry(val))} items={countries} defaultSelectedKey={country}>
                        {(item) => <Item key={item.id}>{item.name}</Item>}
                    </Picker>
                    <Picker label='State' isRequired onSelectionChange={(val) => dispatch(setState(val))} items={states} defaultSelectedKey={state} disabledKeys={disabledStateKeys}
                        contextualHelp={
                            <ContextualHelp>
                              <Content>
                                Submissions are not currently accepted in {disabledStateKeys.join(', ')}. Thank you for your interest.
                              </Content>
                            </ContextualHelp>
                          }
                    >
                        {(item) => <Item key={item.id}>{item.name}</Item>}
                    </Picker>
                    <Picker label='Video Language' isRequired onSelectionChange={(val) => dispatch(setLang(val))} items={languages} defaultSelectedKey={lang}
                        contextualHelp={
                            <ContextualHelp>
                              <Content>
                                What language will you use to record the video? Please select a supported language.
                              </Content>
                            </ContextualHelp>
                          }
                    >
                        {(item) => <Item key={item.id}>{item.name}</Item>}
                    </Picker>
                    <Switch isRequired onChange={(val) => dispatch(setCertification(val))} isSelected={certification} width={'100%'}>I certify that the information provided is accurate.</Switch>
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