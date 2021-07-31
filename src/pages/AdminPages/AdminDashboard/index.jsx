import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { useDispatch, shallowEqual } from 'react-redux';
import { 
    getTraders, getUsers, getAdmins,
    getAffiliates, setAlterUsers, getUnapprovedUsers
} from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';
import { setIsLoading } from '../../../store/reducers/user';

const AdminDashboard = () => {
    const [removeEntry, setRemoveEntry] = useState(false)
    const dispatch = useDispatch()
    const { role, isLoading, alterUsers, traders } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
    }), shallowEqual)

    useEffect(() => {
        dispatch(setIsLoading());
        dispatch(getUsers())
        dispatch(getTraders())
        // eslint-disable-next-line
    }, [])

    const update = (remove, dispatchFunc) => {
        dispatch(setIsLoading());
        setRemoveEntry(remove)
        dispatch(dispatchFunc())
    }
        

    return(
        <>
            <Authenticate inside={true} />

            {
                role && (
                
                role.isAdmin ? (
                    <>

                        This is the Admin Dashboard Page
                        <hr />
                        <button disabled={alterUsers[0] && !alterUsers[0].isApproved && true} onClick={() => {update(true, getUnapprovedUsers)}}>View Unapproved Accounts</button> <br />
                        <button disabled={alterUsers[0] && alterUsers[0].role.isUser && !alterUsers[0].role.isAffiliate  && false} onClick={() => {update(false, getUsers)}}>View User Accounts</button> <br />
                        <button disabled={alterUsers[0] && alterUsers[0].role.isAffiliate  && true} onClick={() => {update(false, getAffiliates)}}>View Affiliate Accounts</button> <br />
                        <button disabled={alterUsers[0] && alterUsers[0].role.isTrader  && true} onClick={() => {setRemoveEntry(false); dispatch(setAlterUsers(traders))}}>View Traders Accounts</button> <br />
                        <button disabled={alterUsers[0] && alterUsers[0].role.isAdmin  && true} onClick={() => {update(false, getAdmins);}}>View Admin Accounts</button> <br />

                        <hr />
                        {
                        isLoading ? 
                        <>Loading...</>:
                            alterUsers.length > 0 ? <AlterUsers users={alterUsers} approve={removeEntry} /> : <>No User Found For This Category</>
                        }
                    </>
                ) : <PageNotFound />)


            }
            
            
        </>
    )
}


export default AdminDashboard