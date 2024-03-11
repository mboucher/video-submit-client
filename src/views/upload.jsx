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


import React from 'react';
import {  
    Flex, 
    Heading, 
    IllustratedMessage, 
    Text, 
    Image,
    View
} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Upload';
import { DropZone } from '@react-spectrum/dropzone';

const DragAndDrop = ({onImageDrop}) => {
    const [filledSrc, setFilledSrc] = React.useState(null);

    const handleObjectDrop = (images) => {
        images.items.find(async (item) => {
            if(item.kind === 'file') {
                if(item.type === 'image/jpeg' || item.type === 'image/png') {
                    const file = await item.getFile();
                    setFilledSrc(URL.createObjectURL(file));
                    onImageDrop(file);
                } 
            } else {
                return;
            }
        });
    }

    return (
        <View padding={'size-450'} >
            <Flex direction={'column'} gap={30} height={'100%'}>
                <Heading level={2}>Upload your Video Files</Heading>
                <DropZone
                    isFilled={!!filledSrc}
                    getDropOperation={(types) => {
                        return types.has('image/jpeg') || types.has('image/png') ? 'copy' : 'cancel';
                    }}
                    onDrop={(e)=> handleObjectDrop(e)}>
                        {filledSrc
                        ? <Image src={filledSrc}/>
                        : (<IllustratedMessage>
                            <Upload />
                            <Heading level={3}>
                                <Text>Drag and drop your videos here.</Text>
                            </Heading>
                        </IllustratedMessage>
                        )}
                    </DropZone>
            </Flex>
        </View>
    );
}

export default DragAndDrop;