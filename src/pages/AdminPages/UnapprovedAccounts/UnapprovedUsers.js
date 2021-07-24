import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../../../components/Table/Table';
import { useState } from 'react';
import SelectedUnapprovedUserModal from './SelectedUserModal';
import { setSelectedUnApprovedUser } from '../../../store/reducers/adminQuery';

const UnapprovedUsers = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { unapprovedUsers } = useSelector(state => ({
        selectedUnapprovedUser: state.adminQuery.selectedUnapprovedUser,
        unapprovedUsers: state.adminQuery.unapprovedUsers
    }), shallowEqual)

    const openModalAndSetUnapprovedUser = (user)  => {
        dispatch(setSelectedUnApprovedUser(
            {...user, 
                role:{
                    isAdmin : false,
                    isSuperAdmin : false,
                    isUser : true,
                    isAffiliate : false,
                    isTrader : false
                }
            }
        ))
        setShowModal(true)
    }

    return (
        <Table
            headers={['firstName', 'lastName', 'email', 'phone', 'approve']}
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
                        
                    </>
                }
            ))} 
        />
    )
}

export default UnapprovedUsers
