    import React, { useState } from "react";
    import { Container, Row, Col, Button, Form } from "react-bootstrap";
    import { useUploader } from 'react-files-hooks';

    export default function Authenticate({ setPage }) {
        const [database, setDatabase] = useState(null);
        const { uploader, reset } = useUploader({
            onSelectFile: file => {},
            onError: error => {},
        });

        const handleChange = e => {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = e => {
                console.log("e.target.result", JSON.parse(e.target.result));
                setDatabase(JSON.parse(e.target.result));
            };
        }
        
        return (
            <Container fluid className="w-100">
                <Row>
                    <Col className="w-100 text-center fs-4">
                        Load encrypted database file
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col sm={4} md={4} lg={4} xl={4} className="m-auto">
                        <input {...uploader} 
                            className="form-control" 
                            id="input" 
                            disabled={database != null}
                            onChange={handleChange}
                        />
                        <Form.Group className="mb-3 mt-4" variant="dark">
                            <Form.Label>Passphrase</Form.Label>
                            <Form.Control type="texr" placeholder="Enter passphrase" />
                        </Form.Group>
                        <Row className="mt-4">
                            <Col>
                                <Button 
                                    onClick={reset}
                                    variant="light"
                                    className="w-100"
                                >
                                    Open Database
                                </Button>
                            </Col>
                            <Col>
                                <Button 
                                    onClick={reset}
                                    variant="secondary"
                                    className="w-100"
                                >
                                    Clear File Input
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }