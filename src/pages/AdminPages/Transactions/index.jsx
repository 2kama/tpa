import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import Authenticate from '../../../components/Authenticate'
import Footer from '../../../components/Footer'
import BaseModal from '../../../components/Modal/BaseModal'
import { getPendingTransactions, getProcessedTransactions} from '../../../store/reducers/adminQuery'
import PageNotFound from '../../PageNotFound'
import PendingTransactions from './PendingTransactions'
import ProcessedTransactions from './ProcessedTransactions'




const Transactions = () => {


    const { role, isLoading, pendingTransactions, processedTransactions, selectedAlterContent, buttonDisable } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        pendingTransactions : state.adminQuery.pendingTransactions,
        processedTransactions : state.adminQuery.processedTransactions,
        selectedAlterContent : state.adminQuery.selectedAlterContent,
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)

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
        dispatch(getPendingTransactions())
        dispatch(getProcessedTransactions())
        // eslint-disable-next-line
    }, [])





    const header = [
        {dataKey:"time", headerText:"Time"}, 
        {dataKey:"name", headerText:"Name"}, 
        {dataKey:"txType", headerText:"txType"},
        {dataKey:"amount", headerText:"Amount"}, 
        {dataKey:"receipt", headerText:"Receipt"}
    ]
        
    return(
        <>
            <Authenticate inside={true} />

            {
                role && (
                
                !isLoading && role.isAdmin ? (
                    <>



                        <BaseModal
                            title={modalContent.title}
                            show={show}
                            close={() => setShow(false)}
                            closeText="Close"
                            size={modalContent.size}
                        >
                            {modalContent.content}
                        </BaseModal>


                        <PendingTransactions 
                            pendingTransactions={pendingTransactions}
                            processedTransactions={processedTransactions}
                            selectedAlterContent={selectedAlterContent}
                            buttonDisable={buttonDisable}
                            header={header}
                            setContent={setContent}
                        />


                        <ProcessedTransactions 
                            processedTransactions={processedTransactions}
                            header={header}
                            setContent={setContent}
                        />


                        
                    </>
                ) : <PageNotFound />)


            }


            <Footer />
            
            
        </>
    )
}


export default Transactions