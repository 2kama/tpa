import React from 'react'
import { Redirect } from 'react-router-dom'



const Redirection = ({ role }) => {

   const redirectRule = () => {

        if(role.isAdmin) {
            return <Redirect to="/admin/dashboard" />
        }

        if(role.isUser) {
            return <Redirect to="/dashboard" />
        }

        if(role.isTrader) {
            return <Redirect to="/trader/dashboard" />
        }

    }


    return(
        <>
        {redirectRule()}
        </>
    )

  
}


export default Redirection