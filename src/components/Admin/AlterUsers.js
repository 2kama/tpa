import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../Table/Table';
import { useState } from 'react';
import SelectedUserModal from './SelectedUserModal';
import { setSelectedAlterUser, deleteUnapprovedUser, setAlterUsers } from '../../store/reducers/adminQuery';

const AlterUsers = ({users, approve}) => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { currentUser, selectedAlterUser } = useSelector(state => ({
        selectedAlterUser: state.adminQuery.selectedAlterUser,
        currentUser: state.user
    }), shallowEqual)

    const openModalAndAlterUser = (user)  => {
        dispatch(setSelectedAlterUser({...user}))
        setShowModal(true)
    }

    const deleteUser = (user) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            dispatch(disableButton())
            dispatch(deleteUnapprovedUser(user))
            dispatch(setAlterUsers(
                users.filter(u => u.uid !== user.uid)
            ))
        }
    }

    const getRole = role => {
        if (role.isAffiliate) return 'AFFILIATE'
        if (role.isUser) return 'USER'
        if (role.isTrader) return 'TRADER'
        if (role.isSuperAdmin) return 'SUPER ADMIN'
        if (role.isAdmin) return 'ADMIN'
    }

    const disableButton = user => (user.role.isSuperAdmin && selectedAlterUser.role && !selectedAlterUser.role.isSuperAdmin) || user.uid === currentUser.uid
    
    return (
        <Table
            headers={['firstName', 'lastName', 'email', 'phone', approve ? '' : 'ROLE', 'DELETE', approve ? 'APPROVE' : 'EDIT']}
            data={users.map(user => {
                const data = {
                    ...user,
                    'ROLE': getRole(user.role),
                    'DELETE': <button disabled={disableButton(user)} onClick={() => deleteUser(user)}>DELETE</button>,
                }
                data[approve ? 'APPROVE' : 'EDIT'] = <>
                    <button disabled={disableButton(user)}
                        onClick={() => {openModalAndAlterUser(user)}}
                    >
                        {approve ? 'APPROVE' : 'EDIT'}
                    </button>
                    <SelectedUserModal
                        showModal={showModal}
                        closeModal={() => {dispatch(setSelectedAlterUser({})); setShowModal(false)}}
                        selectedAlterUser={selectedAlterUser}
                        removeEntry={approve ? true : false}
                    />
                </>
                return data
            })} 
        />
    )
}

export default AlterUsers
