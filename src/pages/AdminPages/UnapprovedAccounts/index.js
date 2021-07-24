import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { getUnapprovedUsers, getTraders } from "../../../store/reducers/adminQuery";
import Users from './UnapprovedUsers';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, unapprovedUsers } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        unapprovedUsers: state.adminQuery.unapprovedUsers,
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
                        {unapprovedUsers.length > 0 && <Users />}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default UnapprovedAccounts

