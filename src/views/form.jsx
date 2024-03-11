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

import { Flex, TextField,Picker, Item, Button, Heading, View } from '@adobe/react-spectrum';
import { useNavigate } from "react-router-dom";
import React from 'react';


const SubmissionForm = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/upload');
    }
    return(
        <View padding={'size-400'}>
        <Flex direction={'column'} gap={'size-250'}>
            <Heading>Enter your information</Heading>
            <TextField label='First Name' isRequired></TextField>
            <TextField label='Last Name' isRequired></TextField>
            <TextField label='Email' isRequired></TextField>
            <Picker label='Region' isRequired>
                <Item>North America</Item>
            </Picker>
            <Button variant='cta' width={'size-1200'} onPress={handleContinue}>Continue</Button>

        </Flex>
        </View>
    );
}

export default SubmissionForm;