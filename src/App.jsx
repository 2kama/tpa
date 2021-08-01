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
import UnapprovedAccounts from './pages/AdminPages/UnapprovedAccounts/index';
import ApprovedAccounts from './pages/AdminPages/ApprovedAccounts/index';
import TraderDashboard from './pages/TraderPages/TraderDashboard'
import PageNotFound from './pages/PageNotFound'
import Account from './pages/Account'
import ForgotPassword from './pages/ForgotPassword'
import LogPage from './pages/LogPage'



library.add(faExclamationCircle, farCheckCircle, faCircle, farCircle, faToggleOn, faToggleOff, faCheckCircle)



const App = () => {
    return(
        <>
            <BrowserRouter>
                <Switch>
                    {/* Auth Pages */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/hash" component={DecipherPage} />
                    <Route exact path="/logout" component={Logout} />

                    {/* User Pages */}
                    <Route exact path="/dashboard" component={UserDashboard} />

                    {/* Admin Pages */}
                    <Route exact path="/admin/dashboard" component={AdminDashboard} />
                    <Route exact path="/admin/dashboard/view/approved" component={ApprovedAccounts} />
                    <Route exact path="/admin/dashboard/view/unapproved" component={UnapprovedAccounts} />

                    <Route exact path="/trader/dashboard" component={TraderDashboard} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/log" component={LogPage} />

                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </>
    )
}


export default App
