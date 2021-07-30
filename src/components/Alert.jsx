import React from 'react'
import { shallowEqual } from 'react-redux'
import { useSelector } from 'react-redux'



const Alert = () => {


    const { alerts } = useSelector(state => ({
        alerts : state.alerts
    }), shallowEqual)

    return(
        <>
            {
                alerts.map(alert => <div key={alert.id}>[{alert.alertType}] : {alert.msg}</div>)
            }
        </>
    )
}


export default Alert