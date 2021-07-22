import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { getUnapprovedUsers } from "../../../store/reducers/unapprovedUser";
import { Redirect } from 'react-router-dom';


const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { role, isLoading, unapprovedUsers } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        unapprovedUsers: state.unapprovedUsers
    }))
    console.log(unapprovedUsers)
    useEffect(() => {
        dispatch(getUnapprovedUsers())
        // eslint-disable-next-line
    },[])
        console.log(unapprovedUsers)
        

    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && role && (
                
                role.isAdmin ? (
                    <>

                        This is the Admin Dashboard Page
                        <hr />
                        <button onClick={() => <Redirect to="/admin/view/users/unapproved" />}>View Unapprove Accounts</button>

                    </>
                ) : <PageNotFound />)


            }
            
            
        </>
    )
}


export default AdminDashboard