import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { 
    getTraders, getUsers, getAdmins,
    getAffiliates, setAlterUsers 
} from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';
import { setIsLoading } from '../../../store/reducers/user';

const ApprovedAccounts = () => {
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
                        <button disabled={alterUsers[0] && alterUsers[0].role.isUser && !alterUsers[0].role.isAffiliate  && true} onClick={() => {update(getUsers)}}>View User Accounts</button> <br />
                        <button disabled={alterUsers[0] && alterUsers[0].role.isAffiliate  && true} onClick={() => {update(getAffiliates)}}>View Affiliate Accounts</button> <br />
                        <button disabled={alterUsers[0] && alterUsers[0].role.isTrader  && true} onClick={() => {dispatch(setAlterUsers(traders))}}>View Traders Accounts</button> <br />
                        <button disabled={alterUsers[0] && alterUsers[0].role.isAdmin  && true} onClick={() => {update(getAdmins);}}>View Admin Accounts</button> <br />
                        <hr />
                        {!isLoading ? alterUsers.length > 0 ? <AlterUsers users={alterUsers} approve={false} /> : <>No Approved Accounts For this category</>: <>Loading...</>}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default ApprovedAccounts

