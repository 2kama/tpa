import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import BaseModal from '../../../components/Modal/BaseModal'
import * as Yup from 'yup'
import { Form, FormField, FormSelect, SubmitButton } from '../../../components/Form'
import { setSelectedUnApprovedUser } from '../../../store/reducers/adminQuery';
import { superAdminSettableRoles, adminSettableRoles } from '../../../utils/userRoles'
import { approveUser as approveUserReducer, setUnapprovedUsers } from '../../../store/reducers/adminQuery';
import { disableButton } from '../../../store/reducers/buttonState'

const SelectedUnapprovedUserModal = ({showModal, closeModal}) => {

    const dispatch = useDispatch()
    const { role, selectedUnapprovedUser, traders, buttonState, unapprovedUsers } = useSelector(state => ({
        selectedUnapprovedUser: state.adminQuery.selectedUnapprovedUser,
        unapprovedUsers: state.adminQuery.unapprovedUsers,
        role : state.user.role,
        traders: state.adminQuery.traders,
        buttonState: state.buttonState.buttonDisable
    }), shallowEqual)

    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label("Email"),
        firstName: Yup.string().required().min(3).label("First Name"),
        lastName: Yup.string().required().min(3).label("Last Name"),
        phone: Yup.string().required().label("Phone Number"),
        roi: selectedUnapprovedUser.role && (selectedUnapprovedUser.role.isUser || selectedUnapprovedUser.role.isAffiliate) &&  Yup.number().required().label("ROI"),
        affiliateCode: selectedUnapprovedUser.role && selectedUnapprovedUser.role.isAffiliate && Yup.string().required().length(6).label("Affiliate Code"),
        assignedTrader: selectedUnapprovedUser.role && (selectedUnapprovedUser.role.isUser || selectedUnapprovedUser.role.isAffiliate) && Yup.string().required().label("Assigned Trader")
    })

    const approveUser = ({firstName, lastName, email, phone, affiliateCode, roi, assignedTrader}) => {
        if (!(selectedUnapprovedUser.role.isAffiliate || selectedUnapprovedUser.role.isUser)) {
            roi=""
            assignedTrader=""
        }
        if (!selectedUnapprovedUser.role.isAffiliate) {
            affiliateCode=""
        }
        dispatch(disableButton())
        dispatch(approveUserReducer({...selectedUnapprovedUser, roi, affiliateCode, assignedTrader}))
        dispatch(setUnapprovedUsers(
            unapprovedUsers.filter(user => user.id !== selectedUnapprovedUser.id)
        ))
        closeModal()
    }

    const setRole = role => {
        let user = {...selectedUnapprovedUser}
        if (role === 'admin') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : true,
                isSuperAdmin : false,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            }}
        }
        if (role === 'superadmin') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : true,
                isSuperAdmin : true,
                isUser : false,
                isAffiliate : false,
                isTrader : false
            }}
        }
        if (role === 'user') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : false,
                isTrader : false
            }}
        }
        if (role === 'affiliate') {
            user = {...selectedUnapprovedUser, role:{
                isAdmin : false,
                isSuperAdmin : false,
                isUser : true,
                isAffiliate : true,
                isTrader : false
            }}
        }
        if (role === 'trader') {
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
            size="lg"
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
                <FormSelect name="role" index={0} 
                    updateStuff={(role) => setRole(role)}
                    options={role.isSuperAdmin ? 
                        superAdminSettableRoles : adminSettableRoles} />
                {selectedUnapprovedUser.role && (selectedUnapprovedUser.role.isUser || selectedUnapprovedUser.role.isAffiliate) && <>
                    <FormField name="roi" placeholder="ROI" type="number" />
                    <FormSelect name="assignedTrader" index={0} 
                        options={[{id: "", firstName: "Select", lastName: ""}, ...traders].map(trader => 
                            [`${trader.firstName} ${trader.lastName}`, trader.id])} />
                </>}
                {
                    selectedUnapprovedUser.role && selectedUnapprovedUser.role.isAffiliate && 
                    <FormField name="affiliateCode" placeholder="Affiliate Code" type="text" />
                }
                <div>
                    <button onClick={() => {}}>Delete Account</button>
                    <SubmitButton title="Approve" disable={buttonState} />
                </div>
            </Form>
        </BaseModal>
    )
}

export default SelectedUnapprovedUserModal
