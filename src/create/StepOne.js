import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { setLoading, setCreateStep } from './../state/slices/system/systemDispatchers';
import { generateSystemKeypair } from "../filesystem-encryption/openPgpUtilsKeypair";

export default function StepOne() {
    const clickHandler = async() => {
        setLoading(true);
        const { privateKey, publicKey } = await generateSystemKeypair();
        setLoading(false);
        setCreateStep(2);
    }

    return (
        <Container>
            <Row>
                <Col className="m-auto mt-3 mb-3 fs-5 color1">
                    generate system keypair
                </Col>
            </Row>
            <Row>
                <Col>
                    This is a keypair used by the system to encrypt various things including your keypair you'll be creating shortly. <br />
                    You do not need to know or remember the password for this.
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        variant="outline-light"
                        size="sm"
                        className="mt-4"
                        onClick={() => clickHandler()}
                    >
                        Generate
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}