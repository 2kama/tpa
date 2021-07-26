import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../../../components/Table/Table';
import { useState } from 'react';
import SelectedUserModal from './SelectedUserModal';
import { setSelectedAlterUser } from '../../../store/reducers/adminQuery';

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

    return (
        <Table
            headers={['firstName', 'lastName', 'email', 'phone', 'action']}
            data={alterUsers.map(user => (
                {
                    ...user,
                    'action':  <>
                        <button 
                            onClick={() => {openModalAndSetUnapprovedUser(user)}}
                        >
                            Action
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
