import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { useDispatch, shallowEqual } from 'react-redux';
import { getTraders } from "../../../store/reducers/adminQuery";
import { setIsLoading } from '../../../store/reducers/user';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { role, isLoading } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
    }), shallowEqual)

    useEffect(() => {
        dispatch(setIsLoading());
        dispatch(getTraders())
        // eslint-disable-next-line
    }, [])
        

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