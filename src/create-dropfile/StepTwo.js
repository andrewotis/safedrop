import React, {useEffect, useState} from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { triedToPaste } from '../utilities';
import * as dispatchers from '../state/dispatchers';
import { useSelector } from "react-redux";
import * as utilties from '../utilities';
import * as utilities from "../utilities";

export default function StepTwo() {
    const [confirm, setConfirm] = useState('')
    const [passphrase, setPassphrase] = useState(null);

    useEffect(async () => {
        const decrypted = await utilities.retrieveAndDecryptFromSessionStorage('asephrassp');
        setPassphrase(decrypted);
    },[]);

    return (
        <Container>
            <Row>
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto mt-5">
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            Confirm Passphrase
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={confirm}
                            placeholder="Enter passphrase again"
                            onChange={ e => setConfirm(e.target.value) }
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
                        disabled={passphrase !== confirm}
                        onClick={() => dispatchers.setCreateStep(3)}
                    >
                        {passphrase !== confirm ? 'Passphrases do not match!' : "Continue"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}