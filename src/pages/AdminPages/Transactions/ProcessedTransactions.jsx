import React from 'react'
import { Table } from '../../../components/Table'
import { thousands_separators, timeAgo, TIME_ZONE } from '../../../utils/helperFunctions'

const ProcessedTransactions = ({
    processedTransactions,
    header,
    setContent
}) => {


    return(
        <>
                    <div>Processed Transactions</div>
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
                                                    <span onClick={() => setContent("Reason for Decline", "sm", trans.reason)}>Declined ?</span>
                                                </> 
                                                
                                                : <span>{trans.status}</span>,
                                            'name' : `${trans.firstName} ${trans.lastName}`,
                                            'receipt' : trans.txType === "credit" ?
                                                <>
                                                    <span onClick={() => setContent("Uploaded Receipt", "md", <img alt="reciept" src={trans.receipt} />)}>REciept</span>
                                                </> 
                                                : "N/A"
                                        }
                                    ))}
                                /> 

                                : <div>No Processed Transactions</div>
                            )
                        }
        </>
    )
}


export default ProcessedTransactions