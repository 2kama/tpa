import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Authenticate from '../../components/Authenticate'
import PageNotFound from '../PageNotFound'
import { getUnapprovedUsers } from "../../store/reducers/unapprovedUser";
import { Table } from '../../components/Table/Table';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const [selectedUsers, setSelectedUsers] = useState([])
    const { role, isLoading, unapprovedUsers } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        unapprovedUsers: state.unapprovedUsers
    }))

    const selectUser = (e, user) => {
        e.target.checked ?
            setSelectedUsers([...selectedUsers, user]) :
            setSelectedUsers(selectedUsers.filter(u => u.email !== user.email))
    }

    useEffect(() => {
        dispatch(getUnapprovedUsers())
        // eslint-disable-next-line
    },[unapprovedUsers])

    return(
        <>
            <Authenticate inside={true} />
            {
                !isLoading && role && (
                role.isAdmin ? (
                    <>
                        Unapproved Users
                        <hr />
                        {unapprovedUsers.length > 0 && <Table
                            headers={['firstName', 'lastName', 'email', 'phone', 'actions']}
                            data={unapprovedUsers.map(user => (
                                {
                                    ...user, 
                                    'actions': <input onChange={e => selectUser(e, user)} type="checkbox"  />
                                }
                            ))} 
                        />}
                    </>
                ) : <PageNotFound />)
            }
        </>
    )
}

export default UnapprovedAccounts
