import React, {useEffect, useState} from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import * as dispatchers from '../state/dispatchers';
import { useSelector } from "react-redux";
import * as utilities from '../utilities';

export default function StepThree() {
    const [passphrase, setPassphrase] = useState(null);

    useEffect(async () => {
        let unmounted = false;

        const decrypted = await utilities.retrieveAndDecryptFromSessionStorage('asephrassp');
        if(!unmounted) {
            setPassphrase(decrypted);
        }

        return () => {
            unmounted = true;
        }
    },[]);

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
                        onClick={() => dispatchers.generateKeypair(passphrase)}
                    >
                        Generate Keys
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}