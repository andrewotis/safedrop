import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as openpgp from "openpgp";

export default function AuthOrCreate({ setPage }) {
    return (
      <> 
        <Container fluid className="w-100">
            <Row>
                <Col className="w-100 text-center fs-4">
                    Have you already created an encrypted database?
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="text-right">
                    <Button 
                        size="sm" 
                        variant="light" 
                        className="w-50"
                        onClick={() => setPage('Authenticate')}
                    >
                        Yes
                    </Button>
                </Col>
                <Col>
                    <Button 
                        size="sm" 
                        variant="secondary" 
                        className="w-50"
                        onClick={() => setPage('Create')}
                    >
                            No
                    </Button>
                </Col>
            </Row>
        </Container>
      </>  
    );
}