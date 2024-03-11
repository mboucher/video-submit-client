/*************************************************************************
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

import { Flex, View, Heading, Switch, Image } from '@adobe/react-spectrum';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDarkMode } from '../../redux/app';
import FireFly from './Firefly.png'
import ChevronLeft from '@spectrum-icons/workflow/ChevronLeft';

const DEFAULT_PAGENAME = 'Video Submission Form';

const GlobalNav = () => {
  const dispatch = useDispatch();
  const pageName = useSelector((state) => state.app.currentPageName);
  const onModeChange = (value) => {
    dispatch(setDarkMode(value));
  }

  return(
    <Flex direction={'row'} alignItems={'center'} gap={'size-100'} width={'100%'}>
      <Flex direction={'row'} width={'80%'}>
        <View alignSelf="center" paddingStart="size-400" width='40px' height='300'>
          <Image src={FireFly}/>
        </View>
        <View alignSelf="center" paddingStart='size-150' width={'60%'}>
            {pageName === DEFAULT_PAGENAME ?
                <Heading level={2} id='app-heading'>{pageName}</Heading>
           : 
           <View>
                <Link to='/'>
                <Flex direction={'row'} gap={'size-100'} alignItems={'center'}>
                  <ChevronLeft/>
                  <Heading>{pageName}</Heading>
                </Flex>
              </Link>
            </View>
           }
        </View>  
      </Flex>
      <Flex direction={'row-reverse'} width={'20%'} gap={'size-300'}>
        <View>
            <Switch onChange={onModeChange}>Dark Mode</Switch>
        </View>
      </Flex>
    </Flex>
  )
}

export default GlobalNav;
