import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import BaseModal from '../../../components/Modal/BaseModal'
import * as Yup from 'yup'
import { Form, FormField, SubmitButton } from '../../../components/Form'
import { setSelectedUnApprovedUser } from '../../../store/reducers/adminQuery';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    firstName: Yup.string().required().min(3).label("First Name"),
    lastName: Yup.string().required().min(3).label("Last Name"),
    phone: Yup.string().required().label("Phone Number")
})

const SelectedUnapprovedUserModal = ({showModal, closeModal}) => {

    const dispatch = useDispatch()
    const { role, selectedUnapprovedUser, traders } = useSelector(state => ({
        selectedUnapprovedUser: state.adminQuery.selectedUnapprovedUser,
        role : state.user.role,
        traders: state.adminQuery.traders,
    }), shallowEqual)

    const approveUser = ({firstName, lastName, email, phone, affiliateCode, roi}) => {
        if (!selectedUnapprovedUser.role.isAffiliate) affiliateCode=""
        if (!selectedUnapprovedUser.role.isAffiliate && !selectedUnapprovedUser.role.isUser) {
            roi=""
            selectedUnapprovedUser.assignedTrader=""
        }
        console.log(roi)
        dispatch(setSelectedUnApprovedUser(
            {
                ...selectedUnapprovedUser, 
                affiliateCode, roi
            }
        ))
        console.log(selectedUnapprovedUser)        
    }

    const setRole = e => {
        let user = {...selectedUnapprovedUser}
        if (e.target.value === 'admin') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : true,
                isSuperAdmin : false,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            }}
        }
        if (e.target.value === 'superadmin') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : true,
                isSuperAdmin : true,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            }}
        }
        if (e.target.value === 'user') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : false,
                isTrader : false
            }, assignedTrader: traders[0].id}
        }
        if (e.target.value === 'affiliate') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : true,
                isTrader : false
            }}
        }
        if (e.target.value === 'trader') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : false,
                isAffiliate : false,
                isTrader : true
            }}
        }
        dispatch(setSelectedUnApprovedUser(user))
    }

    const setAssignedTrader = (e) => {
        dispatch(setSelectedUnApprovedUser(
            {
                ...selectedUnapprovedUser, 
                assignedTrader: e.target.value
            }
        ))
        console.log(selectedUnapprovedUser)
    }

    const initialFormValues = {
        firstName: selectedUnapprovedUser.firstName,
        lastName: selectedUnapprovedUser.lastName,
        email: selectedUnapprovedUser.email,
        phone: selectedUnapprovedUser.phone,
        affiliateCode: selectedUnapprovedUser.affiliateCode,
        roi: "",
    }

    return (
        <BaseModal 
            title={`Approve ${selectedUnapprovedUser.email}'s account`}
            show={showModal}
            close={closeModal}
            closeText="Cancel"
        >
            <Form
                initialValues={initialFormValues}
                onSubmit={approveUser}
                validationSchema={validationSchema}
             >
                <FormField  name="firstName" ype="text" disabled />
                <FormField name="lastName" type="text" disabled />
                <FormField name="email" type="email" disabled />
                <FormField name="phone" type="text" disabled />
                <select onChange={setRole}>
                    <option defaultChecked value="user">User</option>
                    <option value="affiliate">Affiliate</option>
                    <option value="trader">Trader</option>
                    {role.isSuperAdmin && <>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </>}
                </select>
                {selectedUnapprovedUser.role && (selectedUnapprovedUser.role.isUser || selectedUnapprovedUser.role.isAffiliate) && <>
                    <FormField name="roi" placeholder="ROI" type="number" />
                    <select onChange={setAssignedTrader}>
                        <option defaultChecked value="">Select</option>
                        {traders.map( trader =><option 
                            key={trader.id} 
                            value={trader.id}>{trader.firstName} {trader.lastName}
                            </option>)}
                    </select>
                </>}
                {
                    selectedUnapprovedUser.role && selectedUnapprovedUser.role.isAffiliate && 
                    <FormField name="affiliateCode" placeholder="Affiliate Code" type="text" />
                }
                <div>
                    <button onClick={() => {}}>Delete Account</button>
                    <SubmitButton title="Approve" />
                </div>
            </Form>
        </BaseModal>
    )
}

export default SelectedUnapprovedUserModal
