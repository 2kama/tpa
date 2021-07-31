import React from 'react'
import { useSelector } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { useHistory } from 'react-router-dom';


const AdminDashboard = () => {
    const history = useHistory()
    const { role, isLoading } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading
    }))
        

    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && role && (
                
                role.isAdmin ? (
                    <>

                        This is the Admin Dashboard Page
                        <hr />
                        <button onClick={() => history.push("/admin/view/users/unapproved")}>View Unapproved Accounts</button> <br />
                        <button onClick={() => history.push("/admin/users/view")}>View User Accounts</button> <br />
                        <button onClick={() => history.push("/admin/affiliates/view")}>View Affiliate Accounts</button> <br />
                        <button onClick={() => history.push("/admin/traders/view")}>View Traders Accounts</button> <br />
                        <button onClick={() => history.push("/admin/admins/view")}>View Admin Accounts</button> <br />
                        <button onClick={() => history.push("/admin/super-admins/view")}>View Super Admin Accounts</button> <br />

                    </>
                ) : <PageNotFound />)


            }
            
            
        </>
    )
}


export default AdminDashboard