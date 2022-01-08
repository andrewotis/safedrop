import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export default function Menu({ setPage }) {
    return (
        <>
            <Navbar style={{background: '#0d0d0d'}} variant="dark">
                <Container>
                    <Navbar.Brand href="#">
                        <Icon icon="bi:shield-lock-fill" color="#335681" width="50"/>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link disabled href="#"></Nav.Link>
                            <NavDropdown title="Keys" id="nav-dropdown-keys">
                                <NavDropdown.Item onClick={() => setPage('GenerateKeys')} href="#">Generate</NavDropdown.Item>
                                <NavDropdown.Item disabled href="#">Import</NavDropdown.Item>
                                <NavDropdown.Item disabled href="#">Export</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Coming soon..." id="nav-dropdown-keys">
                                <NavDropdown.Item disabled href="#">New features...</NavDropdown.Item>
                                <NavDropdown.Item disabled href="#">Passwords</NavDropdown.Item>
                                <NavDropdown.Item disabled href="#">Notes</NavDropdown.Item>
                                <NavDropdown.Item disabled href="#">Calendar</NavDropdown.Item>
                                <NavDropdown.Item disabled href="#">Mobile App</NavDropdown.Item>
                                <NavDropdown.Item disabled href="#">SecureSync (sync from desktop to mobile)</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

