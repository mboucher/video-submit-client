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


import React, {useEffect} from 'react';
import {  
    Flex, 
    Heading, 
    IllustratedMessage, 
    Text, 
    View,
    ProgressBar,
    Button,
    Image
} from '@adobe/react-spectrum';
import { useNavigate } from "react-router-dom";
import Upload from '@spectrum-icons/illustrations/Upload';
import { DropZone } from '@react-spectrum/dropzone';
import { ToastQueue } from '@react-spectrum/toast';
import { uploadVideoFile } from '../services/BlobStorageService';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPageName, setSignedUrl, setSubmissionId } from '../redux/app';
import {setConsent, setCertification} from '../redux/form';
import { completeSubmission, getSignedUrl } from '../services/PAFlowService';
import ThankYou from '../../public/ThankYou.svg';

const DragAndDrop = () => {
    const signedUrl = useSelector((state) => state.app.signedUrl);
    const submissionId = useSelector((state) => state.app.submissionId);
    const dispatch = useDispatch();

    const [filledSrc, setFilledSrc] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [uploadComplete, setUploadComplete] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setCurrentPageName('Video Upload'));
    },[]);


    const handleFileUpload = async (file) => {
        try {
            const result = await getSignedUrl(submissionId, file);
            const url = result.data.uploadUrl;
            dispatch(setSignedUrl(url));
            await uploadVideoFile(file,url,onProgressEvent);
        } catch (err) {
            setFilledSrc(null);
            ToastQueue.negative(`Upload ERROR: ${err.message}`);
        }
    }

    const handleObjectDrop = (images) => {
        images.items.find(async (item) => {
            if(item.kind === 'file') {
                if(item.type === 'video/mp4') {
                    const file = await item.getFile();
                    setFilledSrc(URL.createObjectURL(file));
                    handleFileUpload(file);
                } 
            } else {
                ToastQueue.negative('You can only uploads video files.')
                return;
            }
        });
    }

    const goHome = async () => {
        dispatch(setSubmissionId(''));
        dispatch(setConsent(false));
        dispatch(setCertification(false));

        navigate('/');     
    }

    const onProgressEvent = async (progressEvent) => {
        const currentProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setProgress(currentProgress);
        if(currentProgress === 100) {
            await completeSubmission(submissionId);
            setUploadComplete(true);
        }

    }

    return (
        <View padding={'size-450'} >
            {uploadComplete ? 
                <Flex direction={'column'} alignItems={'center'}>
                    <Image src={ThankYou} width={'50%'}/>
                    <Heading level={1}>Your file has been successfully saved.</Heading>
                    <Button variant='cta' onPress={goHome}>Submit another file</Button>
                </Flex>
            
            :
                
            <Flex direction={'column'} width={'100%'} alignItems={'center'}>
                <Flex direction={'column'} gap={30} height={'100%'} width={'40%'}>
                    <Heading level={2}>Upload your Video File</Heading>
                    <DropZone
                        isFilled={!!filledSrc}
                        getDropOperation={(types) => {
                            return types.has('video/mp4')  ? 'copy' : 'cancel';
                        }}
                        onDrop={(e)=> handleObjectDrop(e)}>
                            {filledSrc
                            ? 
                            <Flex direction={'column'} gap={'size-100'} alignItems={'center'}>
                                <Heading>Uploading your file. Please wait...</Heading>
                                <ProgressBar size='L' value={progress}/>
                            </Flex>
                            
                            : (<IllustratedMessage>
                                <Upload />
                                <Heading level={3}>
                                    <Text>Drag and drop your video here.</Text>
                                </Heading>
                            </IllustratedMessage>
                            )}
                        </DropZone>
                </Flex>
                </Flex>
            }
            
        </View>
    );
}

export default DragAndDrop;