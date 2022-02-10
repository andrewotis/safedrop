import React, { useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
    logMessage,
    setAuthenticated,
    setCreateStep,
    setCurrentPage,
    setFileHandle,
    setLoading
} from "../state/slices/system/systemDispatchers";
import { Icon } from '@iconify/react';
import Loading from './Loading';
import {openExistingFileHandle, readFile} from "../filesystem-encryption/fsApiWrapper";
import {decryptString, getSystemPassphrase, getSystemPrivateKey} from "../filesystem-encryption/openPgpUtils";
import { setDropfile } from "./../state/slices/dropFile/dropFileDispatchers";

export default function Authenticate() {
    const state = useSelector(state => state);
    const [passphrase, setPassphrase] = useState('');
    const [disableAllInput, setDisableAllInput] = useState(false);


    const createClick = async() => {
        setCurrentPage('CreateDropfile');
        setCreateStep(1);
    }

    const chooseFileClick = async() => {
        const fh = await openExistingFileHandle();
        setLoading(true);
        setFileHandle(fh);
        const dropFileRaw = await readFile(fh);
        const encryptedDropfile = atob(JSON.parse(dropFileRaw.contents).data);
        setLoading(false);
    };

    const next = async() => {
        try {
            const decryptedRoundOne = await decryptString(encryptedDropfile, getSystemPassphrase(), getSystemPrivateKey());
            const decryptedRoundOneParsed = JSON.parse(decryptedRoundOne);
            const decryptedRoundTwo = await decryptString(decryptedRoundOneParsed.data, passphrase, decryptedRoundOneParsed.keys.privateKeyArmored);
            const decryptedRoundTwoParsed = JSON.parse(decryptedRoundTwo);

            if(decryptedRoundTwoParsed.passwords !== undefined) {
                logMessage({type: 'success', message: 'Passphrase is valid'});
                setDropfile({
                    data: decryptedRoundTwoParsed,
                    keys: decryptedRoundOneParsed.keys
                });
                setAuthenticated(true);
            }
        } catch (e) {
            logMessage({ type:'error', message: e.message });
        }
    }

    return (
        <Container fluid className="w-100">
            <Loading />
            <Row>
                <Col className="w-100 text-center fs-4">
                    Load safe
                    <Icon
                        icon="flat-ui:lock"
                        width="30"
                        style={{marginLeft: '20px', marginTop: '-15px'}}
                    />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto">
                    {
                        state.dropFile.fileName !== null &&
                        <>
                            <Form.Label htmlFor="basic-url">Load Dropfile</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text
                                    id="basic-addon3"
                                    className="cursor-pointer file-input"
                                    onClick={() => chooseFileClick()}
                                >
                                    Choose File
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={`No file chosen`}
                                />
                            </InputGroup>
                        </>
                    }
                    <Form.Group className="mb-3 mt-4" variant="dark">
                        <Form.Control
                            type="password"
                            placeholder="Enter passpharse"
                            disabled={disableAllInput}
                            onChange={e => setPassphrase(e.target.value)}
                        />
                    </Form.Group>
                    <Row className="mt-4 text-center">
                        <Col>
                            <Button
                                onClick={() => null}
                                variant="light"
                                className="w-100"
                                disabled={ passphrase === "" || disableAllInput }
                            >
                                Open
                            </Button>
                            or
                            <Button
                                onClick={() => createClick()}
                                variant="outline-light"
                                className="w-100 cursor-pointer"
                            >
                                Create new
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
