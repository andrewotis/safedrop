import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Loading from "./Loading";
import {triedToPaste} from "../state/slices/system/systemUtils";
import { useSelector } from "react-redux";
import {logMessage} from "../state/slices/system/systemDispatchers";
import {resetPrivateKeyPassphrase} from "../filesystem-encryption/openPgpWrapper";

export default function ChangePassphrase({fileHandle, setFileHandle}) {
    const state = useSelector(state => state);
    const [oldPassphrase, setOldPassphrase] = useState('');
    const [newPassphrase, setNewPassphrase] = useState('');
    const [confirmNewPassphrase, setConfirmNewPassphrase] = useState('');
    const [pin, setPin] = useState('');

    const handleClick = async() => {
        if(pin !== parseInt(state.dropFile.data.settings.pin)) {
            logMessage({type:'error', message: 'Incorrect pin or passphrase entered.'})
            return false;
        } else {
            await resetPrivateKeyPassphrase(state.dropFile.keys.privateKeyArmored, oldPassphrase, newPassphrase);
        }
    }

    const determineDisabled = _ => {
        // if the new PASSPHRASE is filled in and matches the old PASSPHRASE, disabled
        if(newPassphrase !== '' && newPassphrase === oldPassphrase) {
            return true;
            // if any of the fields are empty
        } else if(oldPassphrase === '' || newPassphrase === '' || confirmNewPassphrase === '' || pin === '') {
            return true;
            // if the new PASSPHRASE does not have at least 10 characters
        } else if(newPassphrase.length < 11) {
            return true;
        } else {
            return false;
        }
    }

    const determineButtonText = _ => {
        if(newPassphrase !== confirmNewPassphrase)
            return "Passphrase and Confirm Passphrase do not match";
        else
            return "Verify identity and update passphrase"
    }

    const determineButtonActive = _ => {

    }

    console.log('determineDisabled', determineDisabled());

    return (
        <Container>
            <Loading />
            <Row className="w-100 mb-4">
                <Col className="w-100 text-center fs-3 m-auto">
                    Change Passphrase
                </Col>
            </Row>
            <Row>
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto">
                    <Form.Group className="mb-3" >
                        <Form.Label>Old Passphrase</Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={ oldPassphrase }
                            placeholder="Enter passphrase"
                            onChange={ e => setOldPassphrase(e.target.value) }
                            onPaste={ () => triedToPaste() }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Pin</Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={ pin }
                            placeholder="Enter pin"
                            onChange={ e => setPin(e.target.value) }
                            onPaste={ () => triedToPaste() }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>New Passphrase</Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={ newPassphrase }
                            placeholder="Enter new passphrase"
                            onChange={ e => setNewPassphrase(e.target.value) }
                            onPaste={ () => triedToPaste() }
                        />
                    </Form.Group>
                    <Form.Group className="mb-5" >
                        <Form.Label>Confirm New Passphrase</Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={ confirmNewPassphrase }
                            placeholder="Enter new passphrase again"
                            onChange={ e => setConfirmNewPassphrase(e.target.value) }
                            onPaste={ () => triedToPaste() }
                        />
                    </Form.Group>
                    <Button
                        variant="light"
                        size="sm"
                        disabled={determineDisabled()}
                        onClick={() => handleClick()}
                    >
                        {(oldPassphrase === '' || newPassphrase === '' || pin === '' || confirmNewPassphrase === '') && "Please enter all values"}

                    </Button>
                </Col>
            </Row>
        </Container>
    );
}