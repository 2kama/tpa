import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../Table/Table';
import { useState } from 'react';
import SelectedUserModal from './SelectedUserModal';
import { setSelectedAlterUser, deleteUnapprovedUser, setAlterUsers } from '../../store/reducers/adminQuery';
import { disableButton } from '../../store/reducers/buttonState';

const AlterUsers = ({users, approve}) => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { selectedAlterUser } = useSelector(state => ({
        selectedAlterUser: state.adminQuery.selectedAlterUser
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
    
    return (
        <Table
            headers={['firstName', 'lastName', 'email', 'phone', 'delete', approve ? 'approve' : 'edit']}
            data={users.map(user => {
                const data = {
                    ...user,
                    'delete': <button disabled={user.role.isSuperAdmin && selectedAlterUser.role && !selectedAlterUser.role.isSuperAdmin} onClick={() => deleteUser(user)}>Delete</button>,
                }
                data[approve ? 'approve' : 'edit'] = <>
                    <button disabled={user.role.isSuperAdmin && selectedAlterUser.role && !selectedAlterUser.role.isSuperAdmin}
                        onClick={() => {openModalAndAlterUser(user)}}
                    >
                        {approve ? 'approve' : 'edit'}
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
