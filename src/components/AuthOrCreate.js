import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as dispatchers from './../state/dispatchers';
import Loading from "./Loading";

export default function AuthOrCreate() {
    const handleNo = () => {
        dispatchers.setCurrentPage('Create');
        dispatchers.setCreateStep(1);
    }

    return (
      <>
          <Loading />
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
                        onClick={() => dispatchers.setCurrentPage('Authenticate')}
                    >
                        Yes
                    </Button>
                </Col>
                <Col>
                    <Button 
                        size="sm" 
                        variant="secondary" 
                        className="w-50"
                        onClick={() => handleNo()}
                    >
                            No
                    </Button>
                </Col>
            </Row>
        </Container>
      </>  
    );
}