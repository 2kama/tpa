import React, { useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'


import { disableButton, enableButton } from '../../store/reducers/buttonState'
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


            <BaseModal 
                title={`Is this Bank Information Correct?`}
                show={showVerify}
                close={() => {dispatch(removeVerify()); dispatch(enableButton())}}
                closeText="No"
                size="sm"
            >

                <p>
                    <strong>Bank Name: </strong>{BANKS[getIndexOfK(BANKS, bankVerification.bankName)[0]][0]}
                </p>

                <p>
                    <strong>Account Number: </strong>{bankVerification.accountNumber}
                </p>

                <p>
                    <strong>Account Holder: </strong>{bankVerification.accountName}
                </p>
                <button className="submitButton" onClick={e => dispatch(updateBank({
                    bankName : bankVerification.bankName,
                    accountNumber : bankVerification.accountNumber,
                    accountName : bankVerification.accountName
                }))}>Yes, update</button>
            </BaseModal>


                <Form
                        initialValues={{ 
                            bankName,
                            accountNumber,
                            accountName
                        }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        
                        <FormSelect 
                            name="bankName"
                            options={BANKS}
                            index={getIndexOfK(BANKS, bankName)[0]}
                            disabled={!editable}
                            label="Bank Name"
                            icon="university"
                        />

                        <FormField 
                            name="accountNumber"
                            placeholder="Bank Account Number"
                            disabled={!editable}
                            label="Account Number"
                            icon="hashtag"
                        />

                        {!editable && <FormField 
                            name="accountName"
                            placeholder="Account Holder"
                            disabled={true}
                            label="Account Holder"
                            icon={["far", "user"]}
                        />}

                        <div className="spacer"></div>

                        {editable && <SubmitButton title="Verify Bank Account" disable={showVerify} />}
                        <div className="spacer"></div>
                        {editable && <span className="pointer text-danger" onClick={e => toggleEdit(false)}>Cancel</span>}
                        {!editable && <span className="pointer text-success" onClick={e => toggleEdit(true)}>Update Bank Info</span>}
                    </Form>


        </>
    )
}


export default BankDetails