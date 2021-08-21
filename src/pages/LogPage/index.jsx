import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLog } from '../../store/reducers/user'

import { Table } from '../../components/Table'
import { exactTime, TIME_ZONE } from '../../utils/helperFunctions'
import PageWrapper from '../../components/PageWrapper'
import { Container, Col } from 'react-bootstrap'


const LogPage = () => {


    const { uid, isLoading, isApproved, log, role } = useSelector(state => ({
        isLoading : state.isLoading,
        isApproved : state.user.isApproved,
        uid : state.user.uid,
        log : state.user.log,
        role : state.user.role
    }))

    const dispatch = useDispatch()


    useEffect(() => {

        if(!isLoading) {
            dispatch(getLog(uid))
        }

    }, [dispatch, uid, isLoading])


    return(
        <PageWrapper 
            inside={true} 
            role={role} 
            account="general" 
            onPage="03"
            isLoading={isLoading}
            isApproved={isApproved}
        >
                <Container fluid className="wall">

                    <h4 className="sectionH4">Recent Activity Log</h4>

                    {
                        log && (
                            log.length > 0 ? 
                            <Table 
                                headers={[{dataKey: "time", headerText: "Time"}, {dataKey: "info", headerText: "Info"}]}
                                data={log.reverse().map(lg => (
                                    {
                                        ...lg,
                                        "time" : exactTime(lg.time - TIME_ZONE)
                                    }
                                    ))}
                            />

                            : <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">No log data</Col>
                        )
                    }
                    

                </Container>
                        
        </PageWrapper>
    )
}



export default LogPage