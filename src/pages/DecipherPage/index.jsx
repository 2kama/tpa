import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import firebase from '../../utils/Firebase'

import Authenticate from '../../components/Authenticate'
import ApprovalMessage from './ApprovalMessage'
import VerifyEmail from './VerifyEmail'
import Redirection from './Redirection'
import Footer from '../../components/PageWrapper/Footer'
import PageLoading from '../../components/Lottie/PageLoading'


const DecipherPage = () => {

    
    let isVerified 


    const { isAuthenticated, isApproved, isLoading, role } = useSelector(state => ({
        isAuthenticated : state.user.isAuthenticated,
        isApproved : state.user.isApproved,
        isLoading : state.isLoading,
        role : state.user.role
    }), shallowEqual)

    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && isAuthenticated ? (

                    isVerified = firebase.auth().currentUser.emailVerified,
                    isApproved ? isVerified ?  <Redirection role={role} /> : <VerifyEmail /> : <ApprovalMessage /> 
                    
                ) : <PageLoading />
            }

            <Footer />
            
        </>
    )
}


export default DecipherPage