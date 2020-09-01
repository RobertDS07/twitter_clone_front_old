import React from 'react'
import {
    Route
} from "react-router-dom";

import Main from './components/Main'
import Header from './components/Header'


export default () => {
    
    
    return(
        <>
            <Header />
            
            <Route exact path='/'>
                <Main></Main>
            </Route>
        </>
    )
}