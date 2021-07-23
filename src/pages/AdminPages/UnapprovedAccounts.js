import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../components/Authenticate'
import PageNotFound from '../PageNotFound'
import { getUnapprovedUsers } from "../../store/reducers/unapprovedUser";
import { Table } from '../../components/Table/Table';
import BaseModal from '../../components/Modal/BaseModal';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const [selectedUser, setSelectedUser] = useState({})
    const [selectedRole, setSelectedRole] = useState({
        isAdmin : false,
        isSuperAdmin : false,
        isUser : true,
        isAffiliate : false,
        isTrader : false
    })
    const [showModal, setShowModal] = useState(false)
    const { role, isLoading, unapprovedUsers } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        unapprovedUsers: state.unapprovedUsers
    }), shallowEqual)

    const setRole = e => {
        if (e.target.value === 'admin') {
            setSelectedRole({
                isAdmin : true,
                isSuperAdmin : false,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            })
        }
        if (e.target.value === 'superadmin') {
            setSelectedRole({
                isAdmin : true,
                isSuperAdmin : true,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            })
        }
        if (e.target.value === 'user') {
            setSelectedRole({
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : false,
                isTrader : false
            })
        }
        if (e.target.value === 'affiliate') {
            setSelectedRole({
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : true,
                isTrader : false
            })
        }
        if (e.target.value === 'trader') {
            setSelectedRole({
                isAdmin : false,
                isSuperAdmin : false,
                isUser : false,
                isAffiliate : false,
                isTrader : true
            })
        }
    }

    useEffect(() => {
        dispatch(getUnapprovedUsers())
        // eslint-disable-next-line
    },[unapprovedUsers])

    const approveAccount = (user, role) => {
        setSelectedUser({...user, role: selectedRole})
        // dispatch(approveUser(selectedUser))
        console.log(selectedUser)
    }

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
                            headers={['firstName', 'lastName', 'email', 'phone', 'approve']}
                            data={unapprovedUsers.map(user => (
                                {
                                    ...user,
                                    'approve':  <>
                                        <button onClick={() => {setShowModal(true); setSelectedUser(user)}}>Approve</button>
                                        <BaseModal 
                                            title={`Approve ${selectedUser.email}'s account`}
                                            show={showModal}
                                            close={() => {setShowModal(false)}}
                                            doneText="Approve" 
                                            closeText="Cancel"
                                            onDone={() => approveAccount(user, selectedRole)}
                                        >
                                        <p>Are you sure you want to approve {user.email}'s account?</p>
                                        <p>First Name: {selectedUser.firstName}</p>
                                        <p>Last Name: {selectedUser.lastName}</p>
                                        <p>Email: {selectedUser.email}</p>
                                        <p>Phone Number: {selectedUser.phone}</p>
                                        role: <select onChange={setRole}>
                                            <option defaultChecked value="select">select</option>
                                            <option value="user">User</option>
                                            <option value="affiliate">Affiliate</option>
                                            <option value="trader">Trader</option>
                                            <option value="admin">Admin</option>
                                            <option value="superadmin">Super Admin</option>
                                        </select>
                                        </BaseModal>
                                        
                                    </>
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
