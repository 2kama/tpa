import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Table } from '../Table';
import { useState } from 'react';
import SelectedUserModal from './SelectedUserModal';
import { setSelectedAlterContent, deleteUserData, setAlterUsers } from '../../store/reducers/adminQuery';

const AlterUsers = ({users, approve, traders}) => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { currentUser, selectedAlterContent } = useSelector(state => ({
        selectedAlterContent: state.adminQuery.selectedAlterContent,
        currentUser: state.user
    }), shallowEqual)

    const openModalAndAlterUser = (user)  => {
        dispatch(setSelectedAlterContent({...user}))
        setShowModal(true)
    }

    const deleteUser = (user) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            dispatch(disableButton())
            dispatch(deleteUserData(user))
            dispatch(setAlterUsers(
                users.filter(u => u.uid !== user.uid)
            ))
        }
    }

    const getRole = role => {
        if (role.isAffiliate) return 'AFFILIATE'
        if (role.isUser) return 'NORMAL USER'
        if (role.isTrader) return 'TRADER'
        if (role.isSuperAdmin) return 'SUPER ADMIN'
        if (role.isAdmin) return 'ADMIN'
    }

    const disableButton = user =>  (user.role.isSuperAdmin && !currentUser.role.isSuperAdmin) || user.uid === currentUser.uid
    
    const headers = [
        {dataKey: "firstName", headerText: "First Name"},
        {dataKey: "lastName", headerText: "Last Name"},
        {dataKey: "email", headerText: "Email"},
        {dataKey: "phone", headerText: "Phone"},
        {dataKey: approve ? '' : 'role', headerText: approve ? '' : 'Role'},
        {dataKey: 'delete', headerText: 'Delete'},
        {dataKey: approve ? 'approve' : 'edit', headerText: approve ? 'Approve' : 'Edit'},
    ]
    
    return (
        <Table
            headers={headers}
            data={users.map(user => {
                const data = {
                    ...user,
                    'role': getRole(user.role),
                    'delete': <button disabled={disableButton(user)} onClick={() => deleteUser(user)}>DELETE</button>,
                }
                data[approve ? 'approve' : 'edit'] = <>
                    <button disabled={disableButton(user)}
                        onClick={() => {openModalAndAlterUser(user)}}
                    >
                        {approve ? 'APPROVE' : 'EDIT'}
                    </button>
                    <SelectedUserModal
                        showModal={showModal}
                        traders={traders}
                        closeModal={() => {dispatch(setSelectedAlterContent({})); setShowModal(false)}}
                        selectedAlterContent={selectedAlterContent}
                        removeEntry={approve ? true : false}
                    />
                </>
                return data
            })} 
        />
    )
}

export default AlterUsers
