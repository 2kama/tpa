import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransaction } from '../../../store/reducers/user'
import Wallet from './Wallet'
import { Table } from '../../../components/Table'
import { thousands_separators, timeAgo, TIME_ZONE } from '../../../utils/helperFunctions'
import BaseModal from '../../../components/Modal/BaseModal'
import { useState } from 'react'
import PageWrapper from '../../../components/PageWrapper'
import { Container, Row, Col } from 'react-bootstrap'


const UserWallet = () => {

    const { role, isLoading, isApproved, wallet, uid, walletTransactions } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        isApproved : state.user.isApproved,
        wallet : state.user.wallet,
        uid : state.user.uid,
        walletTransactions : state.user.walletTransactions
    }))

    const [show, setShow] = useState(false)
    const [modalContent, setModalContent] = useState({})

    const dispatch = useDispatch()

    const setContent = (title, size, content) => {
        setModalContent({
            title,
            size,
            content
        })

        setShow(true)
    }


    useEffect(() => {

        dispatch(getTransaction(uid))

    }, [uid, dispatch])

    return(
        <PageWrapper 
            inside={true} 
            role={role} 
            account="isUser" 
            onPage="04"
            isLoading={isLoading}
            isApproved={isApproved}
        >


                <Container fluid className="wall">
                    <Row className="pt-3">

                    

                        <Wallet wallet={wallet} uid={uid} walletTransactions={walletTransactions} />

                        <h4 className="sectionH4">Recent Transactions</h4>

                        <BaseModal
                            title={modalContent.title}
                            show={show}
                            close={() => setShow(false)}
                            closeText="Close"
                            size={modalContent.size}
                        >
                            {modalContent.content}
                        </BaseModal>

                        {
                            walletTransactions && (
                                walletTransactions.length > 0 ? 
                                    
                                    <Table
                                        headers={[
                                            {dataKey : "time", headerText : "Time"}, 
                                            {dataKey : "reference", headerText : "Tx"}, 
                                            {dataKey : "txType", headerText : "Tx Type"}, 
                                            {dataKey:"amount", headerText:"Amount"}, 
                                            {dataKey:"receipt", headerText: "Receipt"}, 
                                            {dataKey:"status", headerText:"Status"}
                                        ]}
                                        data={walletTransactions.map(trans => ({

                                            ...trans,
                                            'time' : timeAgo(trans.time - TIME_ZONE),
                                            'amount' :  `N${thousands_separators(trans.amount.toFixed(2))}`,
                                            'status' : trans.status === "declined" ? 
                                                <>
                                                    <div className="text-danger pointer" onClick={() => setContent("Reason for Decline", "sm", trans.reason)}>Declined ?</div>
                                                </> 
                                                
                                                : trans.status === "sending" ? 

                                                    new Date().getTime() - (trans.time - TIME_ZONE) > 3600000 ? <div className="text-danger">failed</div> : <div className="text-warning">{trans.status}</div>

                                                : <div className={trans.status === "inProgress" ? "text-primary" : "text-success"}>{trans.status}</div>,
                                            'receipt' : trans.txType === "credit" ?
                                                <>
                                                    <div className="text-secondary pointer" onClick={() => setContent("Uploaded Receipt", "md", <img style={{width:"100%"}} alt="reciept" src={trans.receipt} />)}>Reciept</div>
                                                </> 
                                                : "N/A"

                                        }))}
                                    />

                                :

                                <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">There are no transactions</Col>
                            )
                        }

                </Row>
                </Container>

        </PageWrapper>
    )
}


export default UserWallet