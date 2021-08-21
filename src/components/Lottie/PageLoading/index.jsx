import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import lottie from 'lottie-web'
import { useRef } from 'react'



const PageLoading = () => {

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
        <Container fluid className="pageLoader">
            <div className="ani position-absolute top-50 start-50 translate-middle" ref={container}></div>
        </Container>
    )
}


export default PageLoading