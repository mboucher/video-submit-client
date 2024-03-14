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
import { Flex, Button, Heading, Content, Divider, View, Switch, ProgressCircle, Text } from '@adobe/react-spectrum';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { initializeSubmission } from '../services/PAFlowService';
import React, { useState, useEffect } from 'react';
import {setConsent} from '../redux/form';

import introMd from '../content/intro.md'


import { ToastQueue } from '@react-spectrum/toast';


const Intro = () => {

    const submissionId = useSelector((state) => state.app.submissionId);

    const [isWorking, setIsWorking] = useState(false);

    const [intro, setIntro] = useState('');

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
        navigate('/collect');
    }

    useEffect(() => {
        fetch(introMd).then((response) => response.text()).then((text) => {
            setIntro(text)
        })
    }, []);

    return (
        <View padding={'size-400'} width={'100%'}>
            <Flex direction={'column'} width={'100%'} alignItems={'center'}>
                <Flex direction={'column'} gap={'size-250'} width={'60%'}>
                    <Heading>Welcome</Heading>
                    <Divider />
                    <Content>
                        <Text>
                            <div dangerouslySetInnerHTML={{ __html: intro }} />
                        </Text>
                    </Content>

                    <Button variant='cta' width={'size-1600'} onPress={handleContinue}>
                            <Text>Get started</Text>
                    </Button>
                </Flex>
            </Flex>
        </View>
    );
}

export default Intro;