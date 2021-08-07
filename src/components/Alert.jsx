import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { shallowEqual } from 'react-redux'
import { useSelector } from 'react-redux'



const Alert = () => {


    const { alerts } = useSelector(state => ({
        alerts : state.alerts
    }), shallowEqual)

    return(
        <>
            {
                alerts && 
                alerts.length > 0 && 
                <div className="position-absolute errorPlate">
                    <Row>
                        {
                            alerts.map(alert => <Col md={{ span:6, offset:3}} className={`alert alert-${alert.alertType}`} key={alert.id}>{alert.msg}</Col>)
                        }
                    </Row>
                </div>
                
                
                
            }
        </>
    )
}


export default Alert