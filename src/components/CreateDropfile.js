import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { createNewFileHandle, writeFile } from "../filesystem-encryption/fsApiWrapper";
import { triedToPaste } from "./../state/slices/system/systemUtils";
import { generateKeypair } from "../filesystem-encryption/openPgpWrapper";
import { encryptString, getSystemPublicKey } from './../filesystem-encryption/openPgpUtils';
import { initialStateDropfileData } from './../state/initialStateDropfileData';
import {setCurrentPage} from "../state/slices/system/systemDispatchers";

export default function CreateDropfile() {
    const [passphrase, setPassphrase] = useState('');
    const [confirmPassphrase, setConfirmPassphrase] = useState('');
    const [doubleCheck, setDoubleCheck] = useState('');

    const handleDownload = async() => {
        // generate user keypair
        const { privateKey, publicKey, revocationCertificate } = await generateKeypair(passphrase);

        // encrypt the dropfile's data value with the users keys
        const dropfile = {
            data: await encryptString(JSON.stringify(initialStateDropfileData), publicKey),
            keys: {
                privateKeyArmored: privateKey,
                publicKeyArmored: publicKey,
                revocationCertificate: revocationCertificate
            }
        }

        // encrypt the entire dropfile with the system keys
        const encrypted = await encryptString(JSON.stringify(dropfile), getSystemPublicKey());

        const fh = await createNewFileHandle();
        await writeFile(fh, JSON.stringify({ data: btoa(encrypted) }));
        setCurrentPage('Home');
    }

    const buttonText = _ => {
        if(passphrase !== confirmPassphrase || passphrase !== doubleCheck) {
            return 'Passphrases do not match!';
        }
        if(passphrase === '') {
            return 'Please enter a passphrase';
        }
        return 'Download file'
    }

    return (
        <Container>
            <Row>
                <Col sm={4} md={4} lg={4} xl={4} className="m-auto">
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            Passphrase
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={passphrase}
                            placeholder="Enter passphrase"
                            onChange={ e => setPassphrase(e.target.value) }
                            onPaste={() => triedToPaste()}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            Confirm Passphrase
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={confirmPassphrase}
                            placeholder="Enter passphrase again"
                            onChange={ e => setConfirmPassphrase(e.target.value) }
                            onPaste={() => triedToPaste()}
                        />
                    </Form.Group>
                    <Form.Group className={passphrase !== '' && confirmPassphrase !== '' && passphrase === confirmPassphrase ? `mb-4` : "mb-4 d-none"}>
                        <Form.Label>
                            Practice makes perfect
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            value={doubleCheck}
                            placeholder="Please enter passphrase one more time"
                            onChange={ e => setDoubleCheck(e.target.value) }
                            onPaste={() => triedToPaste()}
                        />
                    </Form.Group>
                    <Button
                        variant="light"
                        size="sm"
                        disabled={passphrase !== confirmPassphrase || passphrase === '' || passphrase !== doubleCheck}
                        onClick={() => handleDownload()}
                    >
                        { buttonText() }
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}