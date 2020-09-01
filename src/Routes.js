import React, { useState } from 'react'
import {
    Route, Switch
} from "react-router-dom";

import { Context } from './components/Context'

import Main from './components/Main'
import Header from './components/Header'
import Feed from './components/Feed'
import NotFound from './components/NotFound';


export default () => {
    const [logged, setLogged] = useState(localStorage.getItem('authorization'))

    return (
        <>
            <Context.Provider value={{ logged, setLogged }}>
                <Header />

                <Switch>

                    <Route exact path='/'>
                        <Main />
                    </Route>

                    <Route exact path='/register'>
                        <Main register={true} />
                    </Route>

                    <Route path='/home'>
                        <Feed />
                    </Route>

                    <Route component={NotFound} />
                    
                </Switch>
            </Context.Provider>

        </>
    )
}