import React from 'react'
import Authenticate from '../Authenticate'

import Header from './Header'
import Footer from './Footer'
import LeftNav from './LeftNav'
import Noty from './Noty'
import PageLoading from '../Lottie/PageLoading'
import PageNotFound from '../../pages/PageNotFound'
import firebase from '../../utils/Firebase'


const PageWrapper = (
    { 
        children, 
        inside, 
        role="", 
        account="", 
        onPage="", 
        isLoading, 
        isApproved="",
        isAuthenticated="" 
    }) => {


    return(
        <>
             <Authenticate inside={inside} />

                {

                    inside ? (

                        !isLoading && role ? (
                    
                            (role[account] || account==="general") && isApproved && firebase.auth().currentUser.emailVerified ? (
                                <>
                                    <Header />
                                    <LeftNav onPage={onPage} role={role} />
                                    <Noty />
        
                                    {children}
                                    
                                </>
                            ) : <PageNotFound />
                            
                            ) : <PageLoading />

                    ) : (

                        !isLoading && !isAuthenticated ? (

                           children
        
                        ) : <PageLoading />


                    )
                    
                }

                <Footer />
        </>
    )
}


export default PageWrapper