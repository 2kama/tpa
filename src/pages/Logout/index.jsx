import React, { useEffect } from 'react'
import Authenticate from '../../components/Authenticate'
import firebase from '../../utils/Firebase'



const Logout = () => {

    const auth = firebase.auth()

    useEffect(() => {

        auth.signOut()
        // eslint-disable-next-line
    },[])

    return(
        <>
            <Authenticate inside={true} />
        </>
    )
}



export default Logout