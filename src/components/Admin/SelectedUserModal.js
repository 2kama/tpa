import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import BaseModal from '../Modal/BaseModal'
import * as Yup from 'yup'
import { Form, FormField, FormSelect, SubmitButton } from '../Form'
import { superAdminSettableRoles, adminSettableRoles } from '../../utils/userRoles'
import { alterUser as alterUserReducer, setAlterUsers, setSelectedAlterContent } from '../../store/reducers/adminQuery';
import { getIndexOfK } from '../../utils/helperFunctions'
import { disableButton } from '../../store/reducers/buttonState';

const SelectedUserModal = ({showModal, closeModal, removeEntry=false, selectedAlterContent, traders }) => {

    const dispatch = useDispatch()
    const { buttonDisable, alterUsers, role } = useSelector(state => ({
        alterUsers: state.adminQuery.alterUsers,
        buttonDisable : state.buttonState.buttonDisable,
        role : state.user.role
    }), shallowEqual)

    const getTraders = [["Select Trader", ""], ...traders.map(trader => [`${trader.firstName} ${trader.lastName}`, trader.uid])]


    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label("Email"),
        firstName: Yup.string().required().min(3).label("First Name"),
        lastName: Yup.string().required().min(3).label("Last Name"),
        phone: Yup.string().required().label("Phone Number"),
        ROI: selectedAlterContent.role && selectedAlterContent.role.isUser && Yup.number().required().min(1).max(100).label("ROI"),
        affiliateCode: selectedAlterContent.role && selectedAlterContent.role.isAffiliate && Yup.string().required().length(6).label("Affiliate Code"),
        assignedTrader: selectedAlterContent.role && selectedAlterContent.role.isUser && Yup.string().required().label("Assigned Trader"),
    })

    const update = (newValue) => {
        dispatch(setSelectedAlterContent({
            ...selectedAlterContent,
            role : JSON.parse(newValue)
        }))
    }

    const alterUser = ({affiliateCode, ROI, assignedTrader, role, referralCode}) => {
        try {
            role = JSON.parse(role)
        } catch (error) {
            // do nothing
        }
        const updatedUser = {
            ...selectedAlterContent,
            ROI,
            affiliateCode,
            assignedTrader,
            role: role,
            referralCode
        }
        dispatch(disableButton())
        dispatch(alterUserReducer(updatedUser))
        dispatch(setAlterUsers(
            alterUsers.map(user => user.uid === selectedAlterContent.uid ? updatedUser : user)
        ))
        if(removeEntry) {
            dispatch(setAlterUsers(
                alterUsers.filter(user => user.uid !== selectedAlterContent.uid)
            ))
        }
        closeModal()
    }


    const initialFormValues = {
        firstName: selectedAlterContent.firstName,
        lastName: selectedAlterContent.lastName,
        email: selectedAlterContent.email,
        phone: selectedAlterContent.phone,
        affiliateCode: selectedAlterContent.affiliateCode,
        ROI: selectedAlterContent.ROI,
        role: selectedAlterContent.role,
        assignedTrader: selectedAlterContent.assignedTrader,
        referralCode: selectedAlterContent.referralCode
    }

    console.log(getTraders)

    return (
        <BaseModal 
            title={`Update ${selectedAlterContent.email}'s account`}
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

               {selectedAlterContent.role && <FormSelect 
                    name="role" 
                    index={getIndexOfK(role.isSuperAdmin ? superAdminSettableRoles : adminSettableRoles, JSON.stringify({
                        isAdmin : selectedAlterContent.role.isAdmin,
                        isAffiliate : selectedAlterContent.role.isAffiliate,
                        isSuperAdmin : selectedAlterContent.role.isSuperAdmin,
                        isTrader : selectedAlterContent.role.isTrader,
                        isUser : selectedAlterContent.role.isUser
                    }))[0]} 
                    options={role.isSuperAdmin ? superAdminSettableRoles : adminSettableRoles} 
                    update={update}
                />}

                

                {selectedAlterContent.role && selectedAlterContent.role.isUser && <>
                    <FormField name="ROI" placeholder="ROI" type="number" />
                    <FormSelect 
                        name="assignedTrader" 
                        index={getIndexOfK(getTraders, selectedAlterContent.assignedTrader)[0]} 
                        options={getTraders}
                    /> 
                </>
                }

                {selectedAlterContent.role && selectedAlterContent.role.isAffiliate && 
                    <FormField name="affiliateCode" placeholder="Affiliate Code" type="text" />
                }
                {!removeEntry && <FormField name="referralCode" placeholder="Referral Code" type="text" />}
                <div>
                    <SubmitButton disable={buttonDisable} title={removeEntry ? "Approve": "Update"} />
                </div>
            </Form>
        </BaseModal>
    )
}

export default SelectedUserModal
