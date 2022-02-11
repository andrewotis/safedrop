import React, {useState } from "react";
import { Container, Modal, Table, Row, Col, Button, Form } from "react-bootstrap";
import { Icon } from '@iconify/react';
import AddPasswordModal from './AddPasswordModal';
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { innerStars, stars, } from "./passwordUtils";

export default function Passwords({ fileHandle, setFileHandle }) {
    const state = useSelector(state => state);
    const passwords = state.dropFile.data.passwords;
    const [showModal, setShowModal] = useState(false);
    const [usernameHover, setUsernameHover] = useState(null);

    return (
        <Container>
            <Loading />
            <Row className="mb-4">
                <Col sm="3" md="3" lg="3" xl="3">
                    <Form.Control size="sm" type="text" placeholder="Filter data..." />
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
                    <Table size="sm" striped bordered hover striped variant="dark" className="m-auto fs-6">
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>item</th>
                                <th style={{ width: '25%' }}>username</th>
                                <th style={{ width: '25%' }}>password</th>
                                <th style={{ width: '25%' }} className="text-right">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            passwords.map((password, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            { password.title }
                                        </td>
                                        <td>
                                            <span
                                                className="cursor-pointer"
                                                onMouseEnter={e => setUsernameHover(i)}
                                                onMouseLeave={e => setUsernameHover(null)}
                                                onClick={() => null}
                                            >
                                                { usernameHover === i ? password.username : innerStars(password.username, 1) }
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                onClick={() => null}
                                                className="cursor-pointer"
                                            >
                                                { stars(password.password.length) }
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <Icon
                                                icon="clarity:copy-to-clipboard-line"
                                                color="white"
                                                width="23"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px', marginTop: '-1px'}}
                                            />
                                            <Icon
                                                icon="bx:bxs-edit"
                                                color="white"
                                                width="24"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px'}}
                                            />
                                            <Icon
                                                icon="ic:baseline-qr-code-scanner"
                                                color="white"
                                                width="23"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px', marginTop: '-1px'}}
                                            />
                                            <Icon
                                                icon="la:skull-crossbones"
                                                color="white"
                                                width="24"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px'}}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddPasswordModal 
                show={showModal} 
                setShow={(v) => setShowModal(v)}
            />
        </Container>  
    );
}