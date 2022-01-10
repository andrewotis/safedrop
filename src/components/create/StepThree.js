import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { generateKeypair } from './../../utilities';

export default function StepThree({setPublicKey, setPrivateKey, setRevokationCertificate, passphrase, next}) {
    const [loading, setLoading] = useState(false);
    const [allowNext, setAllowNext] = useState(false);
    
    const generateKeys = async () => {
        setLoading(true);
        const { privateKey, publicKey, revokationCertificate } = await generateKeypair(passphrase);
        setPublicKey(publicKey);
        setPrivateKey(privateKey);
        setLoading(false);
        setAllowNext(true);
        return true;
    };

    if(loading) {
        return (
            <div className="mt-5">
                <br /><br />
                <Spinner animation="border" variant="secondary">
                    Generating...
                </Spinner>
            </div>
        );
    }

    const determineButtonAction = _ => {
        if(allowNext) {
            return (
                () => next()
            ); 
        } 

        return (
            () => generateKeys()
        )
    }

    return (
        <Container>
            <Row>
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto mt-5">
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            Generate Keys
                        </Form.Label>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button 
                        variant="light"
                        size="sm"
                        onClick={determineButtonAction()}
                    >
                        {allowNext ? 'Continue' : "Generate Keys"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}