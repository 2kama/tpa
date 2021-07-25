import React from 'react'
import { useSelector } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'


const UserDashboard = () => {

    const { role, isLoading, isApproved } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        isApproved : state.user.isApproved
    }))

    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && role && (
                
                role.isUser && isApproved ? (
                    <>

                        This is the User Dashboard Page

                    </>
                ) : <PageNotFound />)


            }
            
            
        </>
    )
}


export default UserDashboard