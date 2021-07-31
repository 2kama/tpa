import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import BaseModal from '../Modal/BaseModal'
import * as Yup from 'yup'
import { Form, FormField, FormSelect, SubmitButton } from '../Form'
import { superAdminSettableRoles, adminSettableRoles } from '../../utils/userRoles'
import { alterUser as alterUserReducer, setAlterUsers, setSelectedAlterUser } from '../../store/reducers/adminQuery';
import { getIndexOfK } from '../../utils/helperFunctions'

const SelectedUserModal = ({showModal, closeModal, removeEntry=false, selectedAlterUser }) => {

    const dispatch = useDispatch()
    const {  traders, alterUsers, role } = useSelector(state => ({
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
        role : state.user.role
    }), shallowEqual)

    const getTraders = [["Select Trader", ""], ...traders.map(trader => [`${trader.firstName} ${trader.lastName}`, trader.uid])]


    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label("Email"),
        firstName: Yup.string().required().min(3).label("First Name"),
        lastName: Yup.string().required().min(3).label("Last Name"),
        phone: Yup.string().required().label("Phone Number"),
        roi: selectedAlterUser.role && selectedAlterUser.role.isUser && Yup.number().required().min(0).max(100).label("ROI"),
        affiliateCode: selectedAlterUser.role && selectedAlterUser.role.isAffiliate && Yup.string().required().length(6).label("Affiliate Code"),
        assignedTrader: selectedAlterUser.role && selectedAlterUser.role.isUser && Yup.string().required().label("Assigned Trader"),
    })

    const update = (newValue) => {
        dispatch(setSelectedAlterUser({
            ...selectedAlterUser,
            role : JSON.parse(newValue)
        }))
    }

    const alterUser = ({affiliateCode, ROI, assignedTrader, role, referralCode}) => {
        dispatch(alterUserReducer({
            ...selectedAlterUser,
            ROI,
            affiliateCode,
            assignedTrader,
            role: JSON.parse(role),
            referralCode
        }))
        if(removeEntry) {
            dispatch(setAlterUsers(
                alterUsers.filter(user => user.uid !== selectedAlterUser.uid)
            ))
        }
        closeModal()
    }


    const initialFormValues = {
        firstName: selectedAlterUser.firstName,
        lastName: selectedAlterUser.lastName,
        email: selectedAlterUser.email,
        phone: selectedAlterUser.phone,
        affiliateCode: selectedAlterUser.affiliateCode,
        ROI: selectedAlterUser.ROI,
        role: selectedAlterUser.role,
        assignedTrader: selectedAlterUser.assignedTrader,
        referralCode: selectedAlterUser.referralCode,
    }

    return (
        <BaseModal 
            title={`Update ${selectedAlterUser.email}'s account`}
            show={showModal}
            close={closeModal}
            closeText="Cancel"
            size="lg"
        >
            <Form
                initialValues={initialFormValues}
                onSubmit={alterUser}
                validationSchema={validationSchema}
             >


                <FormField  name="firstName" type="text" disabled />
                <FormField name="lastName" type="text" disabled />
                <FormField name="email" type="email" disabled />
                <FormField name="phone" type="text" disabled />

               {selectedAlterUser.role && <FormSelect 
                    name="role" 
                    index={getIndexOfK(role.isSuperAdmin ? superAdminSettableRoles : adminSettableRoles, JSON.stringify({
                        isAdmin : selectedAlterUser.role.isAdmin,
                        isAffiliate : selectedAlterUser.role.isAffiliate,
                        isSuperAdmin : selectedAlterUser.role.isSuperAdmin,
                        isTrader : selectedAlterUser.role.isTrader,
                        isUser : selectedAlterUser.role.isUser
                    }))[0]} 
                    options={role.isSuperAdmin ? superAdminSettableRoles : adminSettableRoles} 
                    update={update}
                />}

                

                {selectedAlterUser.role && selectedAlterUser.role.isUser && <>
                    <FormField name="ROI" placeholder="ROI" type="number" />
                    <FormSelect 
                        name="assignedTrader" 
                        index={getIndexOfK(getTraders, selectedAlterUser.assignedTrader)[0]} 
                        options={getTraders}
                    /> 
                </>
                }

                {selectedAlterUser.role && selectedAlterUser.role.isAffiliate && 
                    <FormField name="affiliateCode" placeholder="Affiliate Code" type="text" />
                }

                {!removeEntry && <FormField name="referralCode" placeholder="Referral Code" type="text" />}
             
                <div>
                    <SubmitButton title={removeEntry ? "Approve": "Update"} />
                </div>
            </Form>
        </BaseModal>
    )
}

export default SelectedUserModal
