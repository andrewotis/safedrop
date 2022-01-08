import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';

export default function StepFour({next}) {
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
                        <ReactAudioPlayer
                            src="audio.ogg"
                            controls
                            onEnded={() => setAllowNext(true)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button 
                        variant="light"
                        size="sm"
                        disabled={!allowNext}
                        onClick={() => next()}
                    >
                        {allowNext ? 'Continue' : "Click the play button."}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}