import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    Spinner,
    Alert,
} from "react-bootstrap";
import { useUploader } from "react-files-hooks";
import { verifyPassphrase } from "./../utilities";
import { useSelector } from "react-redux";
import * as dispatchers from './../state/dispatchers';

export default function Authenticate({
    setPage,
    authenticate,
    database,
    setDatabase,
    passphrase,
    setPassphrase,
}) {
    const state = useSelector(state => state);

    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [disableAllInput, setDisableAllInput] = useState(false);
    const { uploader, reset } = useUploader({
        onSelectFile: (file) => {},
        onError: (error) => {},
    });

    const handleFileChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const parsedCryptFile = JSON.parse(e.target.result);
            setDatabase(parsedCryptFile);
        };
    };

    const checkPassphrase = async () => {
        dispatchers.setLoading(true);
        const verified = await verifyPassphrase(
            database.keys.private,
            passphrase,
            (msg) => setError(msg)
        );

        if (verified === true) {
            setDisableAllInput(true);
            setShowSuccess(true);
            setTimeout(() => {
                authenticate();
                setPage("Home");
            }, 1000);
        }
        dispatchers.setLoading(false);
    };

    if (state.loading) {
        return (
            <div className="mt-5">
                <br />
                <br />
                <Spinner animation="border" variant="secondary" />
                Loading...
            </div>
        );
    }

    return (
        <Container fluid className="w-100">
            {error !== "" && (
                <Alert
                    variant="danger"
                    className="w-50 m-auto mb-4 text-center"
                >
                    {error}
                </Alert>
            )}
            {showSuccess && (
                <Alert
                    variant="success"
                    className="w-50 m-auto mb-4 fs-7 text-center"
                >
                    Successfully decrypted private key. <br />
                    It seems as though you really are who you really say you
                    really are. Really.
                </Alert>
            )}
            <Row>
                <Col className="w-100 text-center fs-4">
                    Load encrypted database file
                </Col>
            </Row>
            <Row className="mt-4">
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto">
                    <input
                        {...uploader}
                        className="form-control"
                        id="input"
                        disabled={database != null || disableAllInput}
                        onChange={handleFileChange}
                    />
                    <Form.Group className="mb-3 mt-4" variant="dark">
                        <Form.Label>Passphrase</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter passphrase"
                            onChange={(e) => setPassphrase(e.target.value)}
                            disabled={disableAllInput}
                        />
                    </Form.Group>
                    <Row className="mt-4">
                        <Col>
                            <Button
                                onClick={() => checkPassphrase()}
                                variant="light"
                                className="w-100"
                                disabled={
                                    passphrase === "" ||
                                    database === null ||
                                    disableAllInput
                                }
                            >
                                Open Database
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={reset}
                                variant="secondary"
                                className="w-100"
                                disabled={disableAllInput}
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
