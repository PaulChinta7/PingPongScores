import React from 'react'
import { Button, NavDropdown } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Notification from './Notification';
import { Form } from 'react-router-dom';
import Search from './Search';

const NavBar = () => {
  return (
    <>

<Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Table Tennis</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/home">How to Play</Nav.Link>
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
      </Container>
    </Navbar>
    </>
  )
}

export default NavBar