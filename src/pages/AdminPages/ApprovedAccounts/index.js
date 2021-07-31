import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { 
    getTraders, getUsers, getAdmins, getSuperAdmins,
    getAffiliates, setAlterUsers 
} from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';
import { useParams } from 'react-router-dom';

const ApprovedAccounts = () => {
    const dispatch = useDispatch()
    const {path} = useParams()
    const { role, isLoading, alterUsers, traders } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
    }), shallowEqual)

    useEffect(() => {
        if (path === 'users') {
            dispatch(getUsers())
        } else if (path === 'traders') {
            dispatch(setAlterUsers(traders))
        } else if (path === 'admins') {
            dispatch(getAdmins())
        } else if (path === 'super-admins') {
            dispatch(getSuperAdmins())
        } else if (path === 'affiliates') {
            dispatch(getAffiliates())
        } else {
            // do nothing
        }
        dispatch(getTraders())
        // eslint-disable-next-line
    },[])

    return(
        <>
            <Authenticate inside={true} />
            {
                !isLoading && role && (
                    ['admins', 'super-admins', 'users', 'affiliates', 'traders'].includes(path) && role.isAdmin ? (
                    <>
                        {path.charAt(0).toUpperCase()+path.replace('-', ' ').substr(1)}
                        <hr />
                        {alterUsers.length > 0 ? <AlterUsers approve={false} /> : <>No {path.charAt(0).toUpperCase()+path.replace('-', ' ').substr(1)} Found</>}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default ApprovedAccounts

