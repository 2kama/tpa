import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BaseModal from '../../../components/Modal/BaseModal'
import { Table } from '../../../components/Table'
import { setSelectedAlterContent, sendTransactionResponse } from '../../../store/reducers/adminQuery'
import { Form, SubmitButton, TextareaField } from '../../../components/Form'
import { disableButton } from '../../../store/reducers/buttonState'
import * as Yup from 'yup'
import { thousands_separators, timeAgo, TIME_ZONE } from '../../../utils/helperFunctions'
import { Col, Row } from 'react-bootstrap'


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

        dispatch(disableButton())

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
        

        closeShowResponse()

       
    }


    return(
        <>
                        {
                            pendingTransactions && (
                                pendingTransactions.length > 0 ?

                                <>

                                    <BaseModal
                                        title="Transaction Response"
                                        show={showResponse}
                                        close={() => closeShowResponse()}
                                        closeText="Close"
                                        size="md"
                                    >
                                        
                                        <Form
                                            initialValues={{ reason : "", status: "declined" }}
                                            onSubmit={processTransaction}
                                            validationSchema={validationSchema}
                                        >


                                            <TextareaField 
                                                name="reason"
                                                icon="paragraph"
                                                placeholder="Reason for Declination"
                                            />
                                            
                                            <Row>

                                                <Col md={6}>
                                                    <SubmitButton title="Decline" disable={buttonDisable} />
                                                </Col>

                                                <Col md={6}>
                                                    <button className="btn-success" onClick={() => processTransaction({ reason : "", status : "approved"})}>Approve</button>
                                                </Col>

                                            </Row>
                                            
                                            

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
                                                        <div className="text-secondary pointer" onClick={() => setContent("Uploaded Receipt", "md", <img alt="reciept" style={{width:"100%"}} src={trans.receipt} />) }>Reciept</div>
                                                    </> 
                                                    : "N/A",
                                                'action' : <button className="btn btn-secondary" onClick={() => {dispatch(setSelectedAlterContent({...trans})); setShowResponse(true)}}>Respond</button>

                                            }
                                        ))}
                                    /> 

                                </>
                                

                                : <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">No Pending Transactions</Col>
                            )
                        }

        </>
    )
}


export default PendingTransactions