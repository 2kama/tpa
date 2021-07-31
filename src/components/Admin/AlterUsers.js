import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../Table/Table';
import { useState } from 'react';
import SelectedUserModal from './SelectedUserModal';
import { setSelectedAlterUser, deleteUnapprovedUser, setAlterUsers } from '../../store/reducers/adminQuery';
import { disableButton } from '../../store/reducers/buttonState';

const AlterUsers = ({approve}) => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { alterUsers, selectedAlterUser } = useSelector(state => ({
        selectedAlterUser: state.adminQuery.selectedAlterUser,
        alterUsers: state.adminQuery.alterUsers
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
                alterUsers.filter(u => u.id !== user.id)
            ))
        }
    }

    console.log(alterUsers)
    
    return (
        <Table
            headers={['firstName', 'lastName', 'email', 'phone', 'delete', approve ? 'approve' : 'edit']}
            data={alterUsers.map(user => {
                const data = {
                    ...user,
                    'delete': <button onClick={() => deleteUser(user)}>Delete</button>,
                }
                data[approve ? 'approve' : 'edit'] = <>
                    <button 
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
