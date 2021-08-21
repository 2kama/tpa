import React, { useState } from 'react'
import { Form, FormField, FormUpload, SubmitButton } from '../../../components/Form'
import BaseModal from '../../../components/Modal/BaseModal'
import { thousands_separators } from '../../../utils/helperFunctions'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { shallowEqual } from 'react-redux'
import { disableButton } from '../../../store/reducers/buttonState'
import { sendTransaction, updateWallet } from '../../../store/reducers/user'
import { Col } from 'react-bootstrap'





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
             
             {
                 (!receiptNeeded && wallet.available >= 1000) || receiptNeeded ? 
                 (

                    <Form
                        initialValues={{ amount : 1000, receipt : "" }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        <FormField
                            name="amount"
                            type="number"
                            placeholder="0.00"
                            label="Amount (no less than 1,000)"
                            icon="hashtag"
                        />

                        {receiptNeeded && <FormUpload 
                            name="receipt"
                            sizeLimit={204800}
                            fileDestination={`receipt/${uid}`}
                            fileType={['image/jpg', 'image/png', 'image/jpeg']}
                            icon="cloud-upload-alt"
                            label="Upload Receipt/Teller"
                        />}

                        <div className="spacer"></div>

                        <SubmitButton title="Send For Approval" disable={buttonDisable} />


                    </Form>

                 ) : (

                    <Col md={12} className="bg-danger text-white text-center p-2">
                        You don't have sufficient available funds for a withdrawal
                    </Col>

                 )
             }
                
            </BaseModal>


            <Col md={4}>
                <div className="bg-secondary text-white rounded p-3 mb-2">
                    <strong>Available</strong>
                    <p className="p-0 m-0 fs-4">
                        &#8358;{thousands_separators(wallet.available.toFixed(2))}
                    </p>
                </div>
            </Col>

            <Col md={4}>
                <div className="bg-success text-white rounded p-3 mb-2">
                    <strong>Pending Credit</strong>
                    <p className="p-0 m-0 fs-4">
                        &#8358;{thousands_separators(wallet.pendingCredit.toFixed(2))}
                        <span className="walletButton p-1 text-center rounded pointer" onClick={() => creditFunc()}>
                            +
                        </span>
                    </p>
                </div>
            </Col>

            <Col md={4}>
                <div className="bg-danger text-white rounded p-3 mb-2">
                    <strong>Pending Debit</strong>
                    <p className="p-0 m-0 fs-4">
                        &#8358;{thousands_separators(wallet.pendingDebit.toFixed(2))}
                        <span className="walletButton p-1 text-center rounded pointer" onClick={() => debitFunc()}>
                            -
                        </span>
                    </p>
                </div>
            </Col>

        </>
    )
}



export default Wallet