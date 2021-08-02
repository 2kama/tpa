import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { 
    getTraders, getUsers, getAdmins,
    getAffiliates, setAlterUsers, setIsLoading 
} from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';

const ApprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, alterUsers, traders } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.adminQuery.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
    }), shallowEqual)

    useEffect(() => {
        dispatch(setIsLoading());
        dispatch(getUsers())
        dispatch(getTraders())
        // eslint-disable-next-line
    }, [])

    const update = (dispatchFunc) => {
        dispatch(setIsLoading());
        dispatch(dispatchFunc())
    }

    return(
        <>
            <Authenticate inside={true} />
            {
                role && (
                    role.isAdmin ? (
                    <>
                        <button onClick={() => {update(getUsers)}}>View User Accounts</button> <br />
                        <button onClick={() => {update(getAffiliates)}}>View Affiliate Accounts</button> <br />
                        <button onClick={() => {dispatch(setAlterUsers(traders))}}>View Traders Accounts</button> <br />
                        <button onClick={() => {update(getAdmins);}}>View Admin Accounts</button> <br />
                        <hr />
                        {!isLoading ? alterUsers.length > 0 ? <AlterUsers 
                            traders={traders} 
                            users={alterUsers} 
                            approve={false} /> : <>No Approved Accounts For this category</>: <>Loading...</>}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default ApprovedAccounts

