import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Authenticate from '../../../components/Authenticate'
import { getTransaction } from '../../../store/reducers/user'
import PageNotFound from '../../PageNotFound'
import Wallet from './Wallet'
import Footer from '../../../components/Footer'
import { Table } from '../../../components/Table'
import { thousands_separators, timeAgo, TIME_ZONE } from '../../../utils/helperFunctions'
import BaseModal from '../../../components/Modal/BaseModal'
import { useState } from 'react'


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
        <>
            <Authenticate inside={true} />

            {
                !isLoading && role && (
                
                role.isUser && isApproved ? (
                    <>

                        <Wallet wallet={wallet} uid={uid} walletTransactions={walletTransactions} />

                        <div>Recent Transactions</div>

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
                                                    <span onClick={() => setContent("Reason for Decline", "sm", trans.reason)}>Declined ?</span>
                                                </> 
                                                
                                                : trans.status === "sending" ? 

                                                    new Date().getTime() - (trans.time - TIME_ZONE) > 3600000 ? <span>failed</span> : <span>{trans.status}</span>

                                                : <span>{trans.status}</span>,
                                            'receipt' : trans.txType === "credit" ?
                                                <>
                                                    <span onClick={() => setContent("Uploaded Receipt", "md", <img alt="reciept" src={trans.receipt} />)}>REciept</span>
                                                </> 
                                                : "N/A"

                                        }))}
                                    />

                                :

                                "There are no Transactions"
                            )
                        }

                    </>
                ) : <PageNotFound />)


            }
            
            <Footer />
            
        </>
    )
}


export default UserWallet