import React, { useState } from "react";
import { Container, Modal, Table, Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Icon } from '@iconify/react';
import AddPasswordModal from './AddPasswordModal';
import { addPassword } from './../utilities';

export default function Passwords({ setPage, passphrase, database, setDatabase }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
            <Row  className="mb-4">
                <Col sm="3" md="3" lg="3" xl="3">
                    <Form.Control  size="sm" type="text" placeholder="Filter data..." />
                </Col>
                <Col sm="6" md="6" lg="6" xl="6" />
                <Col className="text-right" sm="3" md="3" lg="3" xl="3">
                    <Button  
                        variant="secondary"
                        size="sm"
                        className="w-100"
                        onClick={() => setShowModal(true)}
                    >
                        Add Password
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table size="sm" striped bordered hover variant="dark" className="m-auto fs-6">
                        <thead>
                            <tr>
                                <th>item</th>
                                <th>notes</th>
                                <th className="text-right">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td className="text-right">
                                    <Icon 
                                        icon="la:skull-crossbones" 
                                        color="white" 
                                        width="24" 
                                        className="cursor-pointer"
                                    />     
                                    <Icon 
                                        icon="ic:baseline-qr-code-scanner" 
                                        color="white" 
                                        width="24" 
                                        className="cursor-pointer"
                                        style={{marginLeft: '5px'}}
                                    />                                         
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddPasswordModal 
                show={showModal} 
                setShow={(v) => setShowModal(v)} 
                setDatabse={db => setDatabase(db)}
                database={database}
                passphrase={passphrase}
            />
        </Container>  
    );
}