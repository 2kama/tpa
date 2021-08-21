import React, { useEffect } from 'react'
import lottie from 'lottie-web'
import { useRef } from 'react'



const EmailVerify = () => {

    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
            container : container.current,
            renderer: 'svg',
            loop : true,
            autoplay: true,
            animationData: require('./loader.json')
        })
    }, [])

    return(
            <div className="approvalWaiting" ref={container}></div>
    )
}


export default EmailVerify