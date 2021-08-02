import React from 'react'
import { useSelector } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { role, isLoading } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading
    }), shallowEqual)
        
    return(
        <>
            <Authenticate inside={true} />

            {
                role && (
                
                !isLoading && role.isAdmin ? (
                    <>

                        This is the Admin Dashboard Page
                        <hr />
                        <Link to="/admin/dashboard/view/approved">View Approved Accounts</Link> <br />
                        <Link to="/admin/dashboard/view/unapproved">View Unapproved Accounts</Link> <br />
                        <hr />
                    </>
                ) : <PageNotFound />)


            }
            
            
        </>
    )
}


export default AdminDashboard