import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { triedToPaste } from './../../utilities';

export default function StepOne({passphrase, setPassphrase, next}) {
    
    return (
        <Container>
            <Row>
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto mt-5">
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
                <p>
                    This passphrase is used to encrypt your private key file and will never be stored on our end.
                </p> 
                <p className="h2 fw-bold">
                    <span className="text-decoration-underline color3">YOU</span> are responsible for remembering this!
                </p>
                <p>
                    Once your key is encrypted, there are no options to reset or retrieve your password. 
                </p>
                <div className="text-muted text-left fs-7 m-4">
                    <Row>
                        <Col as='span' sm={6} md={6} lg={6} xl={6} className="text-left m-auto">
                            If you ever forget it, you're <span className="text-danger fw-bolder text-decoration-underline text-uppercase">fucked!</span>
                            {` `} Please take the necessary precautions and follow the tips below...<br />
                            - do not make your passphrase easy for anyone to guess!<br />
                            - practice, practice, practice! the more you type something, the more you will remember it<br />
                            - build muscle memory<br />
                            - NEVER WRITE DOWN YOUR PASSPHRASE!
                        </Col>
                    </Row>
                </div>            
            </Row>
            <Row>
                <Col>
                    <Button 
                        variant="light"
                        size="sm"
                        disabled={passphrase === ''}
                        onClick={() => next()}
                    >
                        {passphrase === '' ? 'Type a passphrase!' : "Continue"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}