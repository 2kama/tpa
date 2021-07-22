import React from 'react'
import { useSelector } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'


const UserDashboard = () => {

    const { role, isLoading } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading
    }))

    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && role && (
                
                role.isUser ? (
                    <>

                        This is the User Dashboard Page

                    </>
                ) : <PageNotFound />)


            }
            
            
        </>
    )
}


export default UserDashboard