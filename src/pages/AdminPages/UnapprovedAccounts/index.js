import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { getUnapprovedUsers, getTraders } from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, alterUsers, counter } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
        counter: state.adminQuery.counter,
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
                        {counter}
                        {alterUsers.length > 0 ? <AlterUsers approve={true} /> : <>No Unapproved Accounts</>}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default UnapprovedAccounts

