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
import { useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import {
    Grid,
    Flex,
    View,
} from '@adobe/react-spectrum';
import { ToastContainer } from '@react-spectrum/toast';
import GlobalNav from './components/nav-bar';
import './styles.css';
import SubmissionForm from './views/form';
import DragAndDrop from './views/upload';


const App = () => {
    const darkMode = useSelector((state) => state.app.darkMode);
    return (
        <BrowserRouter>
        <Provider theme={defaultTheme} colorScheme={darkMode ? 'dark' : 'light'}>
            <div className="applicationContentWrapper">
                <ToastContainer/>
                <Grid
                    areas={['header header', 'content content']}
                    columns={['1fr']}
                    rows={['size-800', 'auto']}
                    gap='size-10'height='100%'>
                        <View gridArea='header' paddingTop='size-10' borderBottomColor='gray-200' borderBottomWidth='thin'>
                            <GlobalNav/>
                        </View>
                        <View gridArea='content' min-height='100%'>
                            <Routes>
                                <Route path="/" element={<SubmissionForm />} /> 
                                <Route path="/upload" element={<DragAndDrop/>} />
                            </Routes>
                        </View>
                </Grid>
            </div>
        </Provider>
        </BrowserRouter>
    );
}

export default App;