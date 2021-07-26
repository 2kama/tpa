import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { getUnapprovedUsers, getTraders } from "../../../store/reducers/adminQuery";
import AlterUsers from './AlterUsers';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, alterUsers } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
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
                        {alterUsers.length > 0 ? <AlterUsers /> : <>No Unapproved Accounts</>}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default UnapprovedAccounts

