import React, { useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import Loading from './Loading';
import { useSelector } from "react-redux";

export default function Settings({ fileHandle, setFileHandle }) {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(false);

    return (
        <Container fluid className="w-75">
            <Loading />
            <Row className="w-100 mb-4">
                <Col className="w-100 text-center fs-3 m-auto">
                    Settings
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={() => null}
                        />
                        <label className="form-check-label">
                            Automatically save dropfile after every event (adding, removing, or updating any value)
                        </label>
                    </div>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={() => null}
                        />
                        <label className="form-check-label">
                            Mask usernames with stars in passwords list
                        </label>
                    </div>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={() => null}
                        />
                        <label className="form-check-label">
                            Unmask username on hover-over
                        </label>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}