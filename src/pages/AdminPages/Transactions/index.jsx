import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import BaseModal from '../../../components/Modal/BaseModal'
import { getPendingTransactions, getProcessedTransactions} from '../../../store/reducers/adminQuery'
import PendingTransactions from './PendingTransactions'
import ProcessedTransactions from './ProcessedTransactions'
import PageWrapper from '../../../components/PageWrapper'
import { Container, Row, Tab, Tabs } from 'react-bootstrap'



const Transactions = () => {


    const { role, isLoading, pendingTransactions, processedTransactions, selectedAlterContent, buttonDisable, isApproved } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        pendingTransactions : state.adminQuery.pendingTransactions,
        processedTransactions : state.adminQuery.processedTransactions,
        selectedAlterContent : state.adminQuery.selectedAlterContent,
        buttonDisable : state.buttonState.buttonDisable,
        isApproved : state.user.isApproved
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
        {dataKey:"reference", headerText:"Tx"},
        {dataKey:"name", headerText:"Name"}, 
        {dataKey:"txType", headerText:"txType"},
        {dataKey:"amount", headerText:"Amount"}, 
        {dataKey:"receipt", headerText:"Receipt"}
    ]
        
    return(
        <PageWrapper 
            inside={true} 
            role={role} 
            account="isAdmin" 
            onPage="11"
            isLoading={isLoading}
            isApproved={isApproved}
        >


            <BaseModal
                title={modalContent.title}
                show={show}
                close={() => setShow(false)}
                closeText="Close"
                size={modalContent.size}
            >
                {modalContent.content}
            </BaseModal>


            <Container fluid className="wall">
                <Row>

                <Tabs defaultActiveKey="pending" id="uncontrolled-tab-example" className="mb-3">

                    <Tab eventKey="pending" title="Pending Transactions">

                        <PendingTransactions 
                            pendingTransactions={pendingTransactions}
                            processedTransactions={processedTransactions}
                            selectedAlterContent={selectedAlterContent}
                            buttonDisable={buttonDisable}
                            header={header}
                            setContent={setContent}
                        />
                        
                    </Tab>

                    <Tab eventKey="processed" title="Processed Transactions">

                        <ProcessedTransactions 
                            processedTransactions={processedTransactions}
                            header={header}
                            setContent={setContent}
                        />
                        
                    </Tab>

                </Tabs>


                </Row>
            </Container>

                       


                        
        </PageWrapper>
    )
}


export default Transactions