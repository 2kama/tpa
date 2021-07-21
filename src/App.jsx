import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import {  } from '@fortawesome/free-brands-svg-icons'
import { faCheckCircle as farCheckCircle, faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import { faExclamationCircle, faCircle, faToggleOff, faToggleOn, faCheckCircle } from '@fortawesome/free-solid-svg-icons'




import Login from './pages/Login'
import Register from './pages/Register'
import DecipherPage from './pages/DecipherPage'
import Logout from './pages/Logout'



library.add(faExclamationCircle, farCheckCircle, faCircle, farCircle, faToggleOn, faToggleOff, faCheckCircle)



const App = () => {
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/hash" component={DecipherPage} />
                    <Route path="/logout" component={Logout} />
                </Switch>
            </BrowserRouter>
        </>
    )
}


export default App
