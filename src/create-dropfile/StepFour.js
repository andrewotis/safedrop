import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import * as dispatchers from '../state/dispatchers';

export default function StepFour() {
    const [allowNext, setAllowNext] = useState(false);

    return (
        <Container>
            <Row>
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto mt-5">
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            Play the audio file.
                        </Form.Label>
                        <br />
                        <img src="anonymous.jpg" style={{height:'200px', marginBottom:"20px"}}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button 
                        variant="light"
                        size="sm"
                        disabled={!allowNext}
                        onClick={() => dispatchers.setCreateStep(5)}
                    >
                        {allowNext ? 'Continue' : "Click the play button."}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}