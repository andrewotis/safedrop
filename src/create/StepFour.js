import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {encryptAndStoreInSessionStorage, triedToPaste} from '../utilities';
import { setLoading, setCreateStep } from './../state/slices/system/systemDispatchers';
import * as utilities from '../utilities';

export default function StepFour() {
    const handleNext = _ => {
        setCreateStep(2)
    }
    return (
        <Container>
            <Row>
                <Col className="m-auto mt-3 mb-3 fs-5 color1">
                    generate user keypair
                </Col>
            </Row>
        </Container>
    );
}