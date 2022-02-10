import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { specific } from 'react-files-hooks';
import { Icon } from '@iconify/react';
import { setCurrentPage } from "../state/slices/system/systemDispatchers";

export default function Menu() {
    const state = useSelector(state => state);
    const { download } = specific.useJSONDownloader();

    const handleDownload = async () => {
        download({
            data: JSON.stringify(state.dropFile),
            name: 'safedrop.json'
        });
    }

    return (
        <>
            <Navbar style={{background: '#0d0d0d'}} variant="dark">
                <Container className="w-75 m-auto">
                    <Navbar.Brand>
                        <div className={state.unsavedDropFile ? 'pulse-animation' : ''}>
                            <Icon
                                icon="bi:shield-lock-fill"
                                color="#335681"
                                width="50"
                                className={state.authenticated ? "cursor-pointer" : ""}
                                onClick={state.authenticated ? () => handleDownload() : null}
                            />
                        </div>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav fill={state.authenticated} justify={state.authenticated} className="me-auto w-100">
                            {
                                !state.authenticated &&
                                    <Nav.Link
                                        onClick={
                                            () => setCurrentPage('PasswordGenerator')
                                        }
                                        className="cursor-pointer"
                                    >
                                        Password Generator
                                    </Nav.Link>
                            }
                            {
                                state.authenticated &&
                                    <>
                                        <NavDropdown title="Passwords" id="nav-dropdown-keys">
                                            <NavDropdown.Item
                                                onClick={() => setCurrentPage('Passwords')}
                                                className="cursor-pointer"
                                            >
                                                View/Manage
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() => setCurrentPage('PasswordGenerator')}
                                            >
                                                Generator
                                            </NavDropdown.Item>
                                            <NavDropdown.Item disabled href="#">
                                                Update Reminder
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link onClick={() => setCurrentPage('Notes')} className="cursor-pointer">Notes</Nav.Link>
                                        <Nav.Link onClick={() => setCurrentPage('Calendar')} className="cursor-pointer">Calendar</Nav.Link>
                                        <Nav.Link onClick={() => setCurrentPage('Files')} className="cursor-pointer">Files</Nav.Link>
                                        <NavDropdown title="Keys" id="nav-dropdown-keys">
                                            <NavDropdown.Item onClick={() => setCurrentPage('GenerateKeys')} href="#">Generate</NavDropdown.Item>
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

