import React, { useState } from "react";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { triedToPaste } from './../../utilities';

export default function StepFive({next, passphrase}) {
    const [confirmed, setConfirmed] = useState(0);
    const [inputDisabled, setInputDisabled] = useState(false);

    const increment = _ => setConfirmed(confirmed + 1);
    const typingHandler = cursor => {
        if(cursor === passphrase) {
            setInputDisabled(true)
            increment()
            setTimeout(setInputDisabled(false), 1000)
        }
    }  

    return (
        <Container>
            <Row>
                <Col sm={8} md={8} lg={8} xl={8} className="m-auto mt-5">
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            Confirm your understanding
                        </Form.Label>
                        <br /><br />
                        Enter your encryption passphrase under each item to confirm<br />
                        <span className="text-muted fs-7">...and reinforce your muscle memory for your passphrase</span>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6} md={6} lg={6} xl={6} className="m-auto mt-2 mb-4 fs-7">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            My passphrase should be something no one but me knows and no one else can guess
                            <Form.Control
                                size="sm"
                                type="password"
                                placeholder="Enter passphrase"
                                className="mt-1"
                                disabled={inputDisabled || confirmed > 0}
                                onChange={ e => typingHandler(e.target.value) }
                                onPaste={ e => triedToPaste(e) }                      
                            />
                        </ListGroup.Item>
                        <ListGroup.Item style={{background: "#000", color: "#7fa2cc"}} className="fs-6" >
                            On the next screen I will be downloading my database
                        </ListGroup.Item>
                        <ListGroup.Item>
                            I understand that I am fully responsible for keeping track of my database file
                            <Form.Control
                                size="sm"
                                className="mt-1"
                                disabled={inputDisabled || confirmed == 0 || confirmed > 1}
                                type="password"
                                placeholder="Enter passphrase"
                                onChange={ e => typingHandler(e.target.value) }
                                onPaste={ e => triedToPaste(e) }
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            I understand that my encrypted database should be treated (probably) with more importance than keys to a vehicle
                            <Form.Control
                                size="sm"
                                className="mt-1"
                                disabled={inputDisabled || confirmed < 2 || confirmed > 2}
                                type="password"
                                placeholder="Enter passphrase"
                                onChange={ e => typingHandler(e.target.value) }
                                onPaste={ e => triedToPaste(e) }
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            One more time for good measure
                            <Form.Control
                                size="sm"
                                className="mt-1"
                                disabled={inputDisabled || confirmed < 3 || confirmed > 3}
                                type="password"
                                placeholder="Enter passphrase"
                                onChange={ e => typingHandler(e.target.value) }
                                onPaste={ e => triedToPaste(e) }
                            />
                        </ListGroup.Item>
                        { confirmed >= 4 &&
                            <ListGroup.Item>
                                Haha, sike. Really tho, this is the last time, I promise...
                                <Form.Control
                                    size="sm"
                                    className="mt-1"
                                    disabled={confirmed == 5}
                                    type="password"
                                    placeholder="Enter passphrase"
                                    onChange={ e => typingHandler(e.target.value) }
                                    onPaste={ e => triedToPaste(e) }
                                />
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Col>                
            </Row>
            <Row>
                <Col>
                    <Button 
                        variant="light"
                        size="sm"
                        disabled={confirmed < 5}
                        onClick={() => next()}
                    >
                        { confirmed < 5 ? 'Type passphrases above' : 'Continue' }
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}