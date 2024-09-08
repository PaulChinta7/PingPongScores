import React from 'react'
import {  NavDropdown } from 'react-bootstrap';


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Notification from './Notification';
import IMG from '../ttlogo.png'
import Search from './Search';

const NavBar = () => {
  return (
    <>
  

<Navbar expand="sm" className="Navbar_navbar bg-body-tertiary ">

        <Navbar.Brand className='Navbar_brand'><img src={IMG} alt="Logo" className='Navbar_logo' /></Navbar.Brand>


        <Navbar.Toggle aria-controls="basic-navbar-nav" className='Navbar_collapse'/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="Navbar_navlinks">
            <Nav.Link href="/home">How to Play</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/game">Game</Nav.Link>
            
            <NavDropdown title="Notifications" id="basic-nav-dropdown">
              <Notification/>
            </NavDropdown>

            <NavDropdown title="Search" id="basic-nav-dropdown">
              <Search />
            </NavDropdown>
               <Nav.Link href="/">Logout</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>


    
    </>
  )
}

export default NavBar