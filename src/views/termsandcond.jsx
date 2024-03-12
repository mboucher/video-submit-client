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
import { Flex, TextField, Picker, Item, Button, Heading, Content, Divider, View, Switch, ProgressCircle, Text } from '@adobe/react-spectrum';
import { Dialog, DialogTrigger } from '@adobe/react-spectrum'


import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { initializeSubmission } from '../services/PAFlowService';
import React, { useState, useEffect } from 'react';
import {setFirstName, setLastName, setCertification, setCountry, setEmail, setState, setConsent} from '../redux/form';

import termsMd from '../content/termsandcond.md'


import { ToastQueue } from '@react-spectrum/toast';
import { setSignedUrl, setSubmissionId } from '../redux/app';


const TermsAndCondDialog = () => {

    const submissionId = useSelector((state) => state.app.submissionId);

    const firstName = useSelector((state) => state.form.firstName);
    const lastName = useSelector((state) => state.form.lastName);
    const email = useSelector((state) => state.form.email);
    const country = useSelector((state) => state.form.location.country);
    const state = useSelector((state) => state.form.location.state);
    const certification = useSelector((state) => state.form.certification);
    const consent = useSelector((state) => state.form.consent);


    const [isWorking, setIsWorking] = useState(false);

    const [terms, setTerms] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const validateFields = () => {
        if(!consent) {
            ToastQueue.negative('Consent is required.', {timeout:5000});
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
                // location: {
                //     country: country,
                //     state: state
                // },
                certification: certification,
                consent: consent
            }
            console.log(params);
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

    useEffect(() => {
        fetch(termsMd).then((response) => response.text()).then((text) => {
            setTerms(text)
        })
    }, []);

    return (
        <View padding={'size-400'} width={'100%'}>
            <Flex direction={'column'} width={'100%'} alignItems={'center'}>
                <Flex direction={'column'} gap={'size-250'} width={'60%'}>
                    <Heading>Terms and Conditions</Heading>
                    <Divider />
                    <Content>
                        <Text>
                            <div dangerouslySetInnerHTML={{ __html: terms }} />
                        </Text>
                    </Content>
                    <Switch isRequired onChange={(val) => dispatch(setConsent(val))} isSelected={consent}>I consent to these terms and conditions.</Switch>

                    <Button variant='cta' width={'size-1200'} onPress={handleContinue}>
                        {isWorking ?
                            <ProgressCircle isIndeterminate />
                            :
                            <Text>Continue</Text>
                        }
                    </Button>
                </Flex>
            </Flex>
        </View>
    );
}

export default TermsAndCondDialog;