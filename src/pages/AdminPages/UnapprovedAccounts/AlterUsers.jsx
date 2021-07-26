import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../../../components/Table/Table';
import { useState } from 'react';
import SelectedUserModal from './SelectedUserModal';
import { setSelectedAlterUser, deleteUnapprovedUser, setAlterUsers } from '../../../store/reducers/adminQuery';
import { disableButton } from '../../../store/reducers/buttonState';

const AlterUsers = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { alterUsers, selectedAlterUser } = useSelector(state => ({
        selectedAlterUser: state.adminQuery.selectedAlterUser,
        alterUsers: state.adminQuery.alterUsers
    }), shallowEqual)

    const openModalAndSetUnapprovedUser = (user)  => {
        dispatch(setSelectedAlterUser({...user}))
        setShowModal(true)
    }

    const deleteUser = (user) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            dispatch(disableButton())
            dispatch(deleteUnapprovedUser(user))
            dispatch(setAlterUsers(
                alterUsers.filter(u => u.id !== user.id)
            ))
        }
    }

    return (
        <Table
            headers={['firstName', 'lastName', 'email', 'phone', 'delete', 'approve']}
            data={alterUsers.map(user => (
                {
                    ...user,
                    'delete': <button onClick={() => deleteUser(user)}>Delete</button>,
                    'approve':  <>
                        <button 
                            onClick={() => {openModalAndSetUnapprovedUser(user)}}
                        >
                            Approve
                        </button>
                        <SelectedUserModal
                            showModal={showModal}
                            closeModal={() => {setShowModal(false); dispatch(setSelectedAlterUser({}))}}
                            selectedAlterUser={selectedAlterUser}
                            removeEntry
                        />
                        
                    </>
                }
            ))} 
        />
    )
}

export default AlterUsers
