import React, { useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'


import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, FormSelect, SubmitButton } from '../../components/Form'
import { updateUserBank } from '../../store/reducers/user'
import { BANKS, getIndexOfK } from '../../utils/helperFunctions'



const validationSchema = Yup.object().shape({
    bankName: Yup.string().required().label("Bank Name"),
    accountName: Yup.string().required().min(3).label("Account Name"),
    accountNumber: Yup.string().required().min(10).max(10).label("Account Number")
})


const BankDetails = ({ user }) => {

    const {bankName, accountName, accountNumber} = user

    const[editable, toggleEdit] = useState(false)



    const { buttonDisable } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)



    const dispatch = useDispatch()



    const submitForm = ({ accountName, accountNumber, bankName }) => {

        const userData = {
            bankName,
            accountName,
            accountNumber
        }

        dispatch(disableButton())
        dispatch(updateUserBank(userData))

    }


    

    return(
        <>
            <h4>Banking Details</h4>


                <Form
                        initialValues={{ 
                            bankName,
                            accountName,
                            accountNumber
                        }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        
                        <FormSelect 
                            name="bankName"
                            options={BANKS}
                            index={getIndexOfK(BANKS, bankName)[0]}
                            disabled={!editable}
                        />

                        <FormField 
                            type="text"
                            name="accountName"
                            placeholder="Name of Account"
                            disabled={!editable}
                        />

                        <FormField 
                            type="text"
                            name="accountNumber"
                            placeholder="Bank Account Number"
                            disabled={!editable}
                        />


                        {editable && <SubmitButton title="Submit Update" disable={buttonDisable} />}
                        {editable && <span onClick={e => toggleEdit(false)}>Cancel</span>}
                        {!editable && <span onClick={e => toggleEdit(true)}>Update Bank Info</span>}

                    </Form>


        </>
    )
}


export default BankDetails