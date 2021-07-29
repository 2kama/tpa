import React, {  } from 'react'
import { useSelector } from 'react-redux'
import Authenticate from '../../components/Authenticate'
import Footer from '../../components/Footer'
import PageNotFound from '../PageNotFound'
import BankDetails from './BankDetails'
import ChangePassword from './ChangePassword'
import NextOfKin from './NextOfKin'
import Profile from './Profile'



const Account = () => {

    const { role, isLoading, isApproved, user } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        isApproved : state.user.isApproved,
        user : state.user
    }))



    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && role && (
                
                isApproved ? (
                    <>

                        <h2>Accounts Page</h2>

                        <Profile user={user} />

                        {role.isUser && (
                            <>
                                <NextOfKin user={user} />
                                <BankDetails user={user} />
                            </>
                            
                        )}

                        <ChangePassword />

                    </>
                ) : <PageNotFound />)


            }
            
            
            <Footer />
        </>
    )
}


export default Account