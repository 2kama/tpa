import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { nav } from './nav'



const LeftNav = ({ onPage, role }) => {

    const[navIn, setNav] = useState(true)


    return(
        <>
            <div className="navToggle pointer position-fixed" onClick={() => setNav(!navIn)}>
                { navIn ? <FontAwesomeIcon icon="bars" /> : <FontAwesomeIcon icon="times" /> }
            </div>

            
            <div className={`leftNav position-fixed pt-3${navIn ? " navIn" : ""}`}>
                <ul>

                    {
                        nav.map(list => (
                            
                            (role[list.authorized] || list.authorized === "isGeneral") &&
                            
                            <li 
                                key={list.onPage} 
                                className={`p-3${onPage === list.onPage ? " onPage" : ""}`} 
                                data-bs-toggle="tooltip" 
                                data-bs-placement="left" 
                                title={list.title}
                            >
                                <Link to={list.link} className="d-flex flex-row">
                                    <FontAwesomeIcon icon={list.icon} />
                                    <span>{list.title}</span>
                                </Link>
                            </li>

                        ))
                    }

                    
                            <li 
                                className={`p-3`} 
                                data-bs-toggle="tooltip" 
                                data-bs-placement="left" 
                                title="Logout"
                            >
                                <a href="/logout" className="d-flex flex-row">
                                    <FontAwesomeIcon icon="sign-out-alt" />
                                    <span>Logout</span>
                                </a>
                            </li>

                </ul>
            </div>
        </>
    )
}


export default LeftNav