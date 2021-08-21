import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { timeAgo, TIME_ZONE } from '../../utils/helperFunctions'
import { createCookie, readCookie } from '../../utils/cookieFunc'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'



const Noty = () => {


    const { uid, noty } = useSelector(state => ({
        noty : state.user.noty.reverse(),
        uid : state.user.uid
    }), shallowEqual)

    const[unread, setUnread] = useState(0)
    const[show, toggleShow] = useState(false)
    const[UIunRead, setUIunRead] = useState(0)


    const updateNoty = () => {
        toggleShow(!show)
        createCookie(`TPAnoty-${uid}`, `${noty.length}`)
        setUnread(0)
    }


    useEffect(() => {

        const viewedNoty = readCookie(`TPAnoty-${uid}`)

        if(viewedNoty !== null) {
            const unRead = noty.length - parseInt(viewedNoty)
            setUnread(unRead)
            setUIunRead(unRead)
            
        }else {
            createCookie(`TPAnoty-${uid}`, `${noty.length}`)
        }
        

    }, [uid, noty.length]) 


    return(
        <>
            <div className="notyToggle pointer position-fixed position-relative" onClick={e => updateNoty()}>
                <FontAwesomeIcon icon={["far", "bell"]} />
                {
                    unread > 0 && (
                        <span className="position-absolute top-12 start-70 translate-middle p-1 bg-danger badge rounded-pill">
                            {UIunRead}
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    )
                }
                
            </div>

            
            <div className={`notification position-fixed ${show ? " show" : ""}`}>
                <h5 className="text-center pt-2 pb-2">Notifications</h5>
                { noty && noty.length > 0 ? 
                    noty.map((nty, idx) => (
                        <div className={`notyTab p-2 mb-2${UIunRead >= (idx + 1) ? " unRead" : ""}`} key={idx}>
                           {
                               nty.link ? 
                               (
                                <Link to={nty.link}>
                                    <strong>{nty.title}</strong>
                                    <p className="p-0 m-0">{nty.message}</p>
                                    <span className="font-monospace">{timeAgo(nty.time - TIME_ZONE)}</span>
                                </Link>
                               ) : (
                                <>
                                    <strong>{nty.title}</strong>
                                    <p className="p-0 m-0">{nty.message}</p>
                                    <span className="font-monospace">{timeAgo(nty.time - TIME_ZONE)}</span>
                                </>
                               )
                           } 
                            
                        </div>
                    )) : <Col md={12} className="btn-secondary rounded p-2 text-center">There are no notifications</Col>
                }
            </div>

        </>
    )
}


export default Noty