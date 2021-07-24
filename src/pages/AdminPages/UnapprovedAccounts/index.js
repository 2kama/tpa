import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import PageNotFound from '../../PageNotFound'
import { getUnapprovedUsers, getTraders } from "../../../store/reducers/adminQuery";
import { Table } from '../../../components/Table/Table';
import BaseModal from '../../../components/Modal/BaseModal';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const [selectedUser, setSelectedUser] = useState({})
    const [showModal, setShowModal] = useState(false)
    const { role, isLoading, unapprovedUsers, traders } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        unapprovedUsers: state.adminQuery.unapprovedUsers,
        traders: state.adminQuery.traders,
    }), shallowEqual)

    const setRole = e => {
        if (e.target.value === 'admin') {
            setSelectedUser({...selectedUser, role:{
                isAdmin : true,
                isSuperAdmin : false,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            }})
        }
        if (e.target.value === 'superadmin') {
            setSelectedUser({...selectedUser, role:{
                isAdmin : true,
                isSuperAdmin : true,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            }})
        }
        if (e.target.value === 'user') {
            setSelectedUser({...selectedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : false,
                isTrader : false
            }, assignedTrader: traders[0].id})
        }
        if (e.target.value === 'affiliate') {
            setSelectedUser({...selectedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : true,
                isTrader : false
            }})
        }
        if (e.target.value === 'trader') {
            setSelectedUser({...selectedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : false,
                isAffiliate : false,
                isTrader : true
            }})
        }
    }

    const setROI = (e) => {
        setSelectedUser({...selectedUser, roi: parseFloat(e.target.value)})
    }

    const setAssignedTrader = (e) => {
        setSelectedUser({...selectedUser, assignedTrader: e.target.value})
        console.log(selectedUser)
    }

    useEffect(() => {
        dispatch(getUnapprovedUsers())
        dispatch(getTraders())
        // eslint-disable-next-line
    },[])

    const approveAccount = (user) => {
        // dispatch(approveUser(selectedUser))
        if (!selectedUser.role.isAffiliate) {
            setSelectedUser({...selectedUser, affiliateCode: ""})
        }
        if (!selectedUser.role.isAffiliate) {
            setSelectedUser({...selectedUser, affiliateCode: ""})
        }
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
                                        <button onClick={() => {setShowModal(true); setSelectedUser({...user, role:{
                                            isAdmin : false,
                                            isSuperAdmin : false,
                                            isUser : true,
                                            isAffiliate : false,
                                            isTrader : false
                                        }})}}>Approve</button>
                                        <BaseModal 
                                            title={`Approve ${selectedUser.email}'s account`}
                                            show={showModal}
                                            close={() => {setShowModal(false)}}
                                            doneText="Approve" 
                                            closeText="Cancel"
                                            onDone={() => approveAccount(user)}
                                        >
                                        <p>Are you sure you want to approve {selectedUser.email}'s account?</p>
                                        <p>First Name: {selectedUser.firstName}</p>
                                        <p>Last Name: {selectedUser.lastName}</p>
                                        <p>Email: {selectedUser.email}</p>
                                        <p>Phone Number: {selectedUser.phone}</p>
                                        role: <select onChange={setRole}>
                                            <option defaultChecked value="user">User</option>
                                            <option value="affiliate">Affiliate</option>
                                            <option value="trader">Trader</option>
                                            {role.isSuperAdmin && <>
                                                <option value="admin">Admin</option>
                                                <option value="superadmin">Super Admin</option>
                                            </>}
                                        </select>
                                        {( selectedUser.role && (selectedUser.role.isUser || selectedUser.role.isAffiliate)) && <>
                                             <br /> ROI: <input placeholder="ROI" type="number" onChange={setROI} /> <br />
                                            assigned trader: <select onChange={setAssignedTrader}>
                                                {traders.map( trader =><option key={trader.id} value={trader.id}>{trader.firstName} {trader.lastName}</option>)}
                                            </select>
                                        </>}
                                        {
                                            selectedUser.role && selectedUser.role.isAffiliate && 
                                            (
                                                <><br /> Affiliate Code: <input type="text" placeholder="affiliate code" onChange={e => {setSelectedUser({...selectedUser, affiliateCode: selectedUser.role.isAffiliate ? e.target.value : null})}} /></>
                                            )
                                        }

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

