import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import {  } from '@fortawesome/free-brands-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-solid-svg-icons'




import Login from './pages/Login'



library.add()



const App = () => {
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        </>
    )
}


export default App
