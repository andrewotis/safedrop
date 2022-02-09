import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useUploader } from "react-files-hooks";
import { useSelector } from "react-redux";
import { setCreateStep, setCurrentPage } from "../state/slices/system/systemDispatchers";
import * as utilities from './../utilities';
import { Icon } from '@iconify/react';
import Loading from './Loading';

export default function Authenticate() {
    const state = useSelector(state => state);
    const [passphrase, setPassphrase] = useState('');
    const [disableAllInput, setDisableAllInput] = useState(false);
    
// file upload stuff
    const { uploader, reset } = useUploader({
        onSelectFile: (file) => {},
        onError: (error) => {},
    });

    const createClick = _ => {
        setCurrentPage('CreateDropfile');
        setCreateStep(1);
    }

    const handleFileChange = (e) => {/*
        setLoading(true);
        const fileReader = new FileReader();
        const filename = e.target.files[0].name;
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const dropFile = JSON.parse(e.target.result);
            dispatchers.setDropFile(dropFile, filename);
            setLoading(false);
        };*/
    };

    const checkPassphrase = async () => {
        /*const temp = passphrase;
        setPassphrase('');
        setLoading(true);
        dispatchers.verifyPassphrase({
            key: state.dropFile.keys.privateKeyArmored, 
            passphrase: temp
        });
        const encryptedPassphrase = await utilities.encryptWithHouseKey(temp);
        sessionStorage.setItem('asephrassp', encryptedPassphrase);
        await utilities.loadSettings(state.dropFile);
        const decryptedPassphrase = await utilities.decryptWithHouseKey(encryptedPassphrase);
        setLoading(false);*/
    };

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
                    {state.dropFile.fileName === null && <input
                        {...uploader}
                        className="form-control"
                        id="input"
                        disabled={disableAllInput}
                        onChange={handleFileChange}
                    />}
                    {
                        state.dropFile.fileName !== null && 
                            <Form.Control
                                type="text"
                                disabled
                                value={`loaded in memory: ${state.dropFile.fileName}`}
                            />
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
                                onClick={() => checkPassphrase()}
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
