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
import { useDispatch } from 'react-redux';
import { initializeSubmission } from '../services/PAFlowService';
import React, { useState, useEffect } from 'react';
import termsMd from '../content/termsandcond.md'


import { ToastQueue } from '@react-spectrum/toast';
import { setSignedUrl, setSubmissionId } from '../redux/app';


const TermsAndCondDialog = () => {
    const [isWorking, setIsWorking] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [country, setCountry] = useState('USA');
    const [state, setState] = useState(null);
    const [consent, setConsent] = useState(false);

    const [terms, setTerms] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleContinue = async () => {

        // try {
        //     setIsWorking(true);
        //     const params = {
        //         firstName: firstName,
        //         lastName: lastName,
        //         email: email,
        //         location: {
        //             country: country,
        //             state: state
        //         },
        //         consent: consent
        //     }
        //     const response = await initializeSubmission(params);
        //     if(response.status === 200) {
        //         dispatch(setSignedUrl(response.data.uploadUrl));
        //         dispatch(setSubmissionId(response.data.submissionId));
        //         navigate('/upload');
        //     } else {
        //         throw new Error('Unable to initialize submission');
        //     }
        // } catch (e) {
        //     ToastQueue.negative(`Form Error: ${e}`)
        // } finally {
        //     setIsWorking(false);
        // }

    }

    useEffect(() => {
        fetch(termsMd).then((response) => response.text()).then((text) => {
            setTerms(text)
        })
    }, []);

    return (
        <View padding={'size-400'}>
            <Flex direction={'column'} gap={'size-250'}>
                <Dialog flex={'grow'} isDismissable={false} >
                    <Heading>Terms and Conditions</Heading>
                    <Divider />
                    <Content>
                        <Text>
                            <div dangerouslySetInnerHTML={{ __html: terms }} />
                        </Text>
                    </Content>
                </Dialog>
                <Button variant='cta' width={'size-1200'} onPress={handleContinue}>
                    {isWorking ?
                        <ProgressCircle isIndeterminate />
                        :
                        <Text>Continue</Text>
                    }

                </Button>
            </Flex>
        </View>
    );
}

export default TermsAndCondDialog;