import React from 'react'
import { Table } from '../../../components/Table'
import { thousands_separators, timeAgo, TIME_ZONE } from '../../../utils/helperFunctions'
import { Col } from 'react-bootstrap'

const ProcessedTransactions = ({
    processedTransactions,
    header,
    setContent
}) => {


    return(
        <>
                    
                        {
                            processedTransactions && (
                                processedTransactions.length > 0 ?

                                <Table 
                                    headers={[...header, {dataKey:"status", headerText:"Status"} ]}
                                    data={processedTransactions.map(trans => ({
                                            ...trans,
                                            'time' : timeAgo(trans.time - TIME_ZONE),
                                            'amount' :  `N${thousands_separators(trans.amount.toFixed(2))}`,
                                            'status' : trans.status === "declined" ? 
                                                <>
                                                    <div className="text-danger pointer" onClick={() => setContent("Reason for Decline", "sm", trans.reason)}>Declined ?</div>
                                                </> 
                                                
                                                : <div className="text-success">{trans.status}</div>,
                                            'name' : `${trans.firstName} ${trans.lastName}`,
                                            'receipt' : trans.txType === "credit" ?
                                                <>
                                                    <div className="text-secondary pointer" onClick={() => setContent("Uploaded Receipt", "md", <img style={{width:"100%"}} alt="reciept" src={trans.receipt} />)}>Reciept</div>
                                                </> 
                                                : "N/A"
                                        }
                                    ))}
                                /> 

                                : <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">No Processed Transactions</Col>
                            )
                        }
        </>
    )
}


export default ProcessedTransactions