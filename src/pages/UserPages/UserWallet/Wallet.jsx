import React, { useState } from 'react'
import { Form, FormField, FormUpload, SubmitButton } from '../../../components/Form'
import BaseModal from '../../../components/Modal/BaseModal'
import { thousands_separators } from '../../../utils/helperFunctions'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { shallowEqual } from 'react-redux'
import { disableButton } from '../../../store/reducers/buttonState'
import { sendTransaction, updateWallet } from '../../../store/reducers/user'





const Wallet = ({ wallet, uid, walletTransactions }) => {


    const[showTopUp, setShowTopUp] = useState(false)
    const[receiptNeeded, setReceiptNeeded] = useState(true)

    const{ buttonDisable } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)

    const dispatch = useDispatch()

    const creditFunc = () => {
        setShowTopUp(true)
        setReceiptNeeded(true)
    }

    const debitFunc = () => {
        setShowTopUp(true)
        setReceiptNeeded(false)
    }


    const validationSchema = Yup.object().shape({
        amount: receiptNeeded ? Yup.number().min(1000).max(1000000).required().label("Credit Amount") : Yup.number().min(1000).max(wallet.available).required().label("Debit Amount"),
        receipt: receiptNeeded && Yup.string().required().label("Receipt/Teller Image")
    })


    const submitForm = ({ amount, receipt }) => {

        dispatch(disableButton())
        setShowTopUp(false)

        const transactionData = {
            txType : receiptNeeded ? "credit" : "debit",
            uid,
            amount,
            receipt : receiptNeeded ? receipt : "",
            walletTransactions
        }

        const newWallet = {
            pendingCredit : receiptNeeded ? wallet.pendingCredit + amount : wallet.pendingCredit,
            pendingDebit : receiptNeeded ? wallet.pendingDebit : wallet.pendingDebit + amount,
            available : receiptNeeded ? wallet.available : wallet.available - amount
        }

        dispatch(sendTransaction(transactionData))       
        dispatch(updateWallet(newWallet))
    }

    return(
        <>



            <BaseModal
                title={ receiptNeeded ? `Top Up Wallet` : `Wallet Withdrawal`}
                show={showTopUp}
                close={() => setShowTopUp(false)}
                closeText="Close"
                size="md"
            >

                <Form
                    initialValues={{ amount : 1000, receipt : "" }}
                    onSubmit={submitForm}
                    validationSchema={validationSchema}
                >

                    <FormField
                        name="amount"
                        type="number"
                        placeholder="0.00"
                    />

                    {receiptNeeded && <FormUpload 
                        name="receipt"
                        sizeLimit={204800}
                        fileDestination={`receipt/${uid}`}
                        fileType={['image/jpg', 'image/png', 'image/jpeg']}
                    />}

                    <SubmitButton title="Send For Approval" disable={buttonDisable} />


                </Form>
            </BaseModal>


            <div>Available : {thousands_separators(wallet.available.toFixed(2))}</div>
            <div>Pending Credit : {thousands_separators(wallet.pendingCredit.toFixed(2))}</div>
            <div>Pending Debit : {thousands_separators(wallet.pendingDebit.toFixed(2))}</div>


            <button onClick={() => creditFunc()}>Top Up</button>
            <button onClick={() => debitFunc()}>Request Withdrawal</button>
        </>
    )
}



export default Wallet