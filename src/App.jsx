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
import UserDashboard from './pages/UserPages/UserDashboard'
import AdminDashboard from './pages/AdminPages/AdminDashboard'
import TraderDashboard from './pages/TraderPages/TraderDashboard'
import PageNotFound from './pages/PageNotFound'
import UnapprovedAccounts from './pages/AdminPages/UnapprovedAccounts'
import Account from './pages/Account'



library.add(faExclamationCircle, farCheckCircle, faCircle, farCircle, faToggleOn, faToggleOff, faCheckCircle)



const App = () => {
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/hash" component={DecipherPage} />
                    <Route path="/logout" component={Logout} />

                    <Route exact path="/dashboard" component={UserDashboard} />
                    <Route exact path="/admin/dashboard" component={AdminDashboard} />
                    <Route exact path="/trader/dashboard" component={TraderDashboard} />
                    <Route exact path="/admin/view/users/unapproved" component={UnapprovedAccounts} />
                    <Route exact path="/account" component={Account} />

                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </>
    )
}


export default App
