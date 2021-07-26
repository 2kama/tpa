import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../../../components/Table/Table';
import { useState } from 'react';
import SelectedUnapprovedUserModal from './SelectedUserModal';
import { setSelectedUnApprovedUser, deleteUnapprovedUser, setUnapprovedUsers } from '../../../store/reducers/adminQuery';
import { disableButton } from '../../../store/reducers/buttonState';

const UnapprovedUsers = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { unapprovedUsers } = useSelector(state => ({
        selectedUnapprovedUser: state.adminQuery.selectedUnapprovedUser,
        unapprovedUsers: state.adminQuery.unapprovedUsers
    }), shallowEqual)

    const deleteUser = (user) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            dispatch(disableButton())
            dispatch(deleteUnapprovedUser(user))
            dispatch(setUnapprovedUsers(
                unapprovedUsers.filter(u => u.id !== user.id)
            ))
        }
    }

    const openModalAndSetUnapprovedUser = (user)  => {
        dispatch(setSelectedUnApprovedUser(
            {...user, 
                role:{
                    isAdmin : false,
                    isSuperAdmin : false,
                    isUser : true,
                    isAffiliate : false,
                    isTrader : false
                },
                assignedTrader: "",
                roi: "",
                affiliateCode: ""
            }
        ))
        setShowModal(true)
    }

    return (
        <Table
            headers={['firstName', 'lastName', 'email', 'phone', 'approve', 'delete']}
            data={unapprovedUsers.map(user => (
                {
                    ...user,
                    'approve':  <>
                        <button 
                            onClick={() => {openModalAndSetUnapprovedUser(user)}}
                        >
                            Approve
                        </button>
                        <SelectedUnapprovedUserModal
                            showModal={showModal}
                            closeModal={() => {setShowModal(false); dispatch(setSelectedUnApprovedUser({}))}} 
                        />
                        
                    </>,
                    'delete': <button onClick={() => {deleteUser(user)}}>Delete</button>
                }
            ))} 
        />
    )
}

export default UnapprovedUsers
