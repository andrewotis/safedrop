import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {
    dismissLogMessage,
    logMessage,
    setAuthenticated,
    setCreateStep,
    setCurrentPage,
    setLoading
} from "../state/slices/system/systemDispatchers";
import Loading from './Loading';
import { openExistingFileHandle, readFile } from "../filesystem-encryption/fsApiWrapper";
import { decryptString, getSystemPassphrase, getSystemPrivateKey } from "../filesystem-encryption/openPgpUtils";
import { setDropfile } from "./../state/slices/dropFile/dropFileDispatchers";

export default function Authenticate({ fileHandle, setFileHandle }) {
    const [passphrase, setPassphrase] = useState('');
    const [pin, setPin] = useState('');
    const [screen, setScreen] = useState('loadOrCreateDropfile');
    const [filename, setFilename] = useState('');

    const createClick = async() => {
        setCurrentPage('CreateDropfile');
        setCreateStep(1);
    }

    const chooseFileClick = async() => {
        const fh = await openExistingFileHandle();
        setLoading(true);
        setFileHandle(fh);
        setFilename(fh.name);
        setScreen('passphrase');
        setLoading(false);
    };

    const verifyPassphraseClick = async() => {
        setLoading(true);
        try {
            const dropFileRaw = await readFile(fileHandle);
            const encryptedDropfile = atob(JSON.parse(dropFileRaw.contents).data);
            const decryptedRoundOne = await decryptString(encryptedDropfile, getSystemPassphrase(), getSystemPrivateKey());
            const decryptedRoundOneParsed = JSON.parse(decryptedRoundOne);
            const decryptedRoundTwo = await decryptString(decryptedRoundOneParsed.data, passphrase, decryptedRoundOneParsed.keys.privateKeyArmored);
            const decryptedRoundTwoParsed = JSON.parse(decryptedRoundTwo);

            if(decryptedRoundTwoParsed.passwords !== undefined) {
                if(decryptedRoundTwoParsed.settings.pin === pin) {
                    const msgObj = {
                        type: 'success', message: 'Passphrase is valid',
                    };
                    logMessage(msgObj);
                    setTimeout(() => dismissLogMessage(msgObj), 1000);
                    setDropfile({
                        data: decryptedRoundTwoParsed,
                        keys: decryptedRoundOneParsed.keys
                    });
                    setAuthenticated(true);
                    setTimeout(() => setCurrentPage('Home'), 1000);
                } else {
                    const msgObj = {
                        type: 'error', message: 'Passphrase or pin was valid',
                    };
                    logMessage(msgObj);
                }
            }
        } catch (e) {
            logMessage({ type:'error', message: e.message });
        }
        setLoading(false);
    }

    return (
        <Container fluid className="w-100">
            <Loading />
            <Row>
                <Col className="w-100 text-center fs-4">
                    <img
                        src="img/lockskull3.jpg"
                        alt=""
                        style={{
                            height: '200px'
                        }}
                    />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto">
                    { screen === "loadOrCreateDropfile" &&
                        <Container>
                            <Row>
                                <Col sm={5} md={5} lg={5} xl={5} className="m-auto">
                                    <Button
                                        variant="dark"
                                        className="w-100"
                                        onClick={() => chooseFileClick()}
                                    >
                                        Open Dropfile
                                    </Button>
                                </Col>
                                <Col sm={1} md={1} lg={1} xl={1} className="m-auto">
                                    or
                                </Col>
                                <Col sm={5} md={5} lg={5} xl={5} className="m-auto">
                                    <Button
                                        onClick={() => createClick()}
                                        variant="outline-light"
                                        className="w-100 cursor-pointer"
                                    >
                                        Create new
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    }
                    {
                        screen === "passphrase" &&
                        <Container>
                            <Row>
                                <Col className="text-center mb-2">
                                    {
                                        filename ?
                                            `Safe: ${filename}` :
                                                null
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3 mt-1 m-auto" variant="dark">
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter passphrase"
                                            onChange={e => setPassphrase(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3 mt-1 m-auto" variant="dark">
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter pin"
                                            onChange={e => setPin(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button
                                        variant="dark"
                                        className="m-auto"
                                        onClick={ () => verifyPassphraseClick() }
                                        disabled={ !(passphrase !== '' && pin !== '') }
                                    >
                                        { !(passphrase !== '' && pin !== '') && 'Please enter passphrase and pin' }
                                        { passphrase !== '' && pin !== '' && 'Log in' }
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Col>
            </Row>
        </Container>
    );
}
