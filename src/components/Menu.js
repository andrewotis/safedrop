import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export default function Menu({ authenticated, setPage }) {
    return (
        <>
            <Navbar style={{background: '#0d0d0d'}} variant="dark">
                <Container className="w-75 m-auto">
                    <Navbar.Brand>
                        <Icon 
                            icon="bi:shield-lock-fill" 
                            color="#335681" 
                            width="50"
                            className={authenticated ? "cursor-pointer" : ""}
                            onClick={authenticated ? () => setPage('Home') : null}
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav fill justify className="me-auto w-100">
                            {
                                authenticated &&
                                    <>
                                        <NavDropdown title="Passwords" id="nav-dropdown-keys">
                                            <NavDropdown.Item 
                                                onClick={() => setPage('Passwords')} 
                                                className="cursor-pointer"
                                            >
                                                View/Manage
                                            </NavDropdown.Item>
                                            <NavDropdown.Item disabled href="#">
                                                Generator
                                            </NavDropdown.Item>
                                            <NavDropdown.Item disabled href="#">
                                                Update Reminder
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link onClick={() => setPage('Notes')} className="cursor-pointer">Notes</Nav.Link>
                                        <Nav.Link onClick={() => setPage('Calendar')} className="cursor-pointer">Calendar</Nav.Link>
                                        <Nav.Link onClick={() => setPage('Files')} className="cursor-pointer">Files</Nav.Link>
                                        <NavDropdown title="Keys" id="nav-dropdown-keys">
                                            <NavDropdown.Item onClick={() => setPage('GenerateKeys')} href="#">Generate</NavDropdown.Item>
                                            <NavDropdown.Item disabled href="#">Import</NavDropdown.Item>
                                            <NavDropdown.Item disabled href="#">Export</NavDropdown.Item>
                                        </NavDropdown>
                                        <Icon icon="ci:settings-filled" className="color2" width="40" style={{float: 'right'}} />
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

