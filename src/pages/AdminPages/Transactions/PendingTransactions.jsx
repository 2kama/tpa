import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BaseModal from '../../../components/Modal/BaseModal'
import { Table } from '../../../components/Table'
import { setSelectedAlterContent, sendTransactionResponse } from '../../../store/reducers/adminQuery'
import { Form, SubmitButton, TextareaField } from '../../../components/Form'
import { disableButton } from '../../../store/reducers/buttonState'
import * as Yup from 'yup'
import { thousands_separators, timeAgo, TIME_ZONE } from '../../../utils/helperFunctions'


const validationSchema = Yup.object().shape({
    reason: Yup.string().required().min(3).label("Declination Reason")
})


const PendingTransactions = ({ 
    pendingTransactions,
    processedTransactions,
    selectedAlterContent,
    buttonDisable,
    header,
    setContent
}) => {


    const [showResponse, setShowResponse] = useState(false)

    const dispatch = useDispatch()

    const closeShowResponse = () => {
        dispatch(setSelectedAlterContent({}))
        setShowResponse(false)
    }


    const processTransaction = ({ reason, status }) => {

        const transactionResponse = {
            processedTransactions,
            pendingTransactions,
            data : {
                ...selectedAlterContent,
                reason,
                status
            }
        }

        dispatch(sendTransactionResponse(transactionResponse))
        dispatch(disableButton())

        closeShowResponse()

       
    }


    return(
        <>


                        <div>Pending Transactions</div>
                        {
                            pendingTransactions && (
                                pendingTransactions.length > 0 ?

                                <>

                                    <BaseModal
                                        title="Transaction Response"
                                        show={showResponse}
                                        close={() => closeShowResponse()}
                                        closeText="Close"
                                        size="sm"
                                    >
                                        
                                        <Form
                                            initialValues={{ reason : "", status: "declined" }}
                                            onSubmit={processTransaction}
                                            validationSchema={validationSchema}
                                        >


                                            <TextareaField 
                                                name="reason"
                                            />

                                            <SubmitButton title="Decline" disable={buttonDisable} />

                                            <button onClick={() => processTransaction({ reason : "", status : "approved"})}>Approve</button>

                                        </Form>


                                    </BaseModal>


                                    <Table 
                                        headers={[ ...header, {dataKey:"action", headerText:"Action"} ]}
                                        data={pendingTransactions.map(trans => ({
                                                ...trans,
                                                'time' : timeAgo(trans.time - TIME_ZONE),
                                                'amount' :  `N${thousands_separators(trans.amount.toFixed(2))}`,
                                                'status' : "Pending",
                                                'name' : `${trans.firstName} ${trans.lastName}`,
                                                'receipt' : trans.txType === "credit" ? 
                                                    <>
                                                        <span onClick={() => setContent("Uploaded Receipt", "md", <img alt="reciept" src={trans.receipt} />) }>REciept</span>
                                                    </> 
                                                    : "N/A",
                                                'action' : <button onClick={() => {dispatch(setSelectedAlterContent({...trans})); setShowResponse(true)}}>Respond</button>

                                            }
                                        ))}
                                    /> 

                                </>
                                

                                : <div>No Pending Transactions</div>
                            )
                        }

        </>
    )
}


export default PendingTransactions