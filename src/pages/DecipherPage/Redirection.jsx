import React from 'react'
import { Redirect } from 'react-router-dom'



const Redirection = ({ role }) => {


    return(
        <>
         {role.isAdmin && <Redirect to="/admin/dashboard" />}
         {role.isUser && <Redirect to="/dashboard" />}
         {role.isTrader && <Redirect to="/trader/dashboard" />}
        </>
    )

  
}


export default Redirection