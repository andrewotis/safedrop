import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {encryptAndStoreInSessionStorage, triedToPaste} from '../utilities';
import * as dispatchers from '../../dispatchers';
import * as utilities from '../utilities';

export default function StepOne() {
    const [passphrase, setPassphrase] = useState('');
    const handleNext = _ => {
        utilities.encryptAndStoreInSessionStorage('asephrassp', passphrase);
        dispatchers.setCreateStep(2)
    }

    return (
        <Container>
            <Row>
                <Col className="m-auto mt-5">
                    <p>
                        The passphrase you are about to create will be used to encrypt your private key file and will never be stored on our end.
                    </p>
                    <p className="h2 fw-bold">
                        <span className="text-decoration-underline color3">YOU</span> are responsible for remembering this!
                    </p>
                    <p>
                        Once your key is encrypted, there are no options to reset or retrieve your password.
                    </p>
                    <div className="text-muted text-left fs-7">
                        <Row>
                            <Col as='span' sm={8} md={8} lg={8} xl={8} className="text-left m-auto">
                                <ul>
                                    <li>If you ever forget it, you're <span className="text-danger fw-bolder text-decoration-underline text-uppercase">fucked!</span></li>
                                    <li><span className="fw-bold">Please take the necessary precautions and follow these tips...</span></li>
                                    <li>do not make your passphrase easy for anyone to guess!</li>
                                    <li>practice, practice, practice! the more you type something, the more you will remember it</li>
                                    <li>build muscle memory</li>
                                    <li>NEVER WRITE DOWN YOUR PASSPHRASE!</li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto mt-1">
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            Passphrase
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={passphrase}
                            placeholder="Enter passphrase"
                            onChange={ e => setPassphrase(e.target.value) }
                            onPaste={() => triedToPaste()}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button 
                        variant="light"
                        size="sm"
                        disabled={passphrase === ''}
                        onClick={() => handleNext()}
                    >
                        {passphrase === '' ? 'Type a passphrase!' : "Continue"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}