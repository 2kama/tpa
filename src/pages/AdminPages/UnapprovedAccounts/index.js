import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { getUnapprovedUsers, getTraders } from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, alterUsers, traders } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUnapprovedUsers())
        dispatch(getTraders())
        // eslint-disable-next-line
    },[])

    return(
        <>
            <Authenticate inside={true} />
            {
                !isLoading && role && (
                role.isAdmin ? (
                    <>
                        Unapproved Users
                        <hr />
                        {traders && alterUsers ? alterUsers.length > 0 ? <AlterUsers 
                            users={alterUsers} 
                            approve={true} 
                            traders={traders} /> : <>No Unapproved Accounts</>: <>Loading...</>}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default UnapprovedAccounts

