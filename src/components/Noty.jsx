import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { timeAgo, TIME_ZONE } from '../utils/helperFunctions'
import { createCookie, readCookie } from '../utils/cookieFunc'
import { useState } from 'react'



const Noty = () => {


    const { uid, noty } = useSelector(state => ({
        noty : state.user.noty,
        uid : state.user.uid
    }), shallowEqual)

    const[unread, setUnread] = useState(0)
    const[show, toggleShow] = useState(false)


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
            
        }else {
            createCookie(`TPAnoty-${uid}`, `${noty.length}`)
        }
        

    }, [uid, noty.length]) 


    return(
        <>
            <div onClick={e => updateNoty()}>Noty {unread > 0 && `(${unread})`}</div>
            {show && <div>
                {
                    noty.reverse().map((nty, idx) => (
                        <div key={nty.time}>
                            <strong>{nty.title}</strong>
                            <p>{nty.message}</p>
                            <sub>{timeAgo(nty.time - TIME_ZONE)}</sub>
                        </div>
                    ))
                }
            </div>}
        </>
    )
}


export default Noty