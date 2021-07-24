import React, { useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'


import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, FormSelect, SubmitButton } from '../../components/Form'
import { removeVerify, updateBank, verifyBank } from '../../store/reducers/bankVerification'
import { BANKS, getIndexOfK } from '../../utils/helperFunctions'
import BaseModal from '../../components/Modal/BaseModal'



const validationSchema = Yup.object().shape({
    bankName: Yup.string().required().label("Bank Name"),
    accountNumber: Yup.string().required().length(10).label("Account Number")
})


const BankDetails = ({ user }) => {

    const {bankName, accountName, accountNumber} = user
    const[editable, toggleEdit] = useState(false)
    const dispatch = useDispatch()

    const { bankVerification, showVerify } = useSelector(state => ({
        bankVerification : state.bankVerification,
        showVerify : state.bankVerification.bankVerificationAPI
    }), shallowEqual)


    const submitForm = ({ accountNumber, bankName }) => {

        const bankData = {
            bankName,
            accountNumber
        }

        dispatch(disableButton())
        dispatch(verifyBank(bankData))

    }

    return(
        <>
            <h4>Banking Details</h4>


            <BaseModal 
                title={`Is this Bank Information Correct`}
                show={showVerify}
                close={() => dispatch(removeVerify())}
                closeText="No"
                size="sm"
            >

                Bank Name : {BANKS[getIndexOfK(BANKS, bankVerification.bankName)[0]][0]} <br />
                Account Number : {bankVerification.accountNumber} <br />
                Account Name : {bankVerification.accountName}

                <button onClick={e => dispatch(updateBank({
                    bankName : bankVerification.bankName,
                    accountNumber : bankVerification.accountNumber,
                    accountName : bankVerification.accountName
                }))}>Yes, update</button>
            </BaseModal>


                <Form
                        initialValues={{ 
                            bankName,
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
                            name="accountNumber"
                            placeholder="Bank Account Number"
                            disabled={!editable}
                        />
                        {!editable && <div>{accountName}</div>}



                        {editable && <SubmitButton title="Verify Bank Account" disable={showVerify} />}
                        {editable && <span onClick={e => toggleEdit(false)}>Cancel</span>}
                        {!editable && <span onClick={e => toggleEdit(true)}>Update Bank Info</span>}
                    </Form>


        </>
    )
}


export default BankDetails