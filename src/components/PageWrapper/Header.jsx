import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Header = () => {


    return(
        <Navbar fixed="top" bg="white">
            <Container fluid>
                <Link to="./hash" className="navbar-brand">LG</Link>

                    <Nav className="me-auto"> </Nav>
                    <Nav>


                    <NavDropdown title={<FontAwesomeIcon icon="user" />} id="collasible-nav-dropdown">
                        <Link to="./account" className="dropdown-item">Profile</Link>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="./logout">Logout</NavDropdown.Item>
                    </NavDropdown>

                    </Nav>
            </Container>
        </Navbar>
    )
}


export default Header