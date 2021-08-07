import React from 'react'



const Card = ({ className="", children, width }) => {

    return(
        <div className={`mainCard ${className}`} style={{ width }}>
            {children}
        </div>
    )
}


export default Card