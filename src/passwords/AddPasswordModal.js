import React, { useState, useRef } from "react";
import { Container, Tooltip, OverlayTrigger, InputGroup, FormControl, Row, Col, Button, Form, Spinner, Alert, Modal } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { useSelector } from "react-redux";
import * as utilities from '../utilities';
import Loading from '../components/Loading';

export default function AddPasswordModal({ show, setShow }) {
    const state = useSelector(state => state);

    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [metas, setMetas] = useState([]);
    const [metaKey, setMetaKey] = useState('');
    const [metaValue, setMetaValue] = useState('');
    const [passwordInputType, setPasswordInputType] = useState('password');
    
    const [showTooltip, setShowTooltip] = useState(null);
    const target = useRef(null);

    const clearInputs = _ => {
        setTitle('');
        setUsername('');
        setPassword('');
        setConfirm('');
        setMetas([]);
        setMetaKey('');
        setMetaValue('');
    }
    
    const handleAddMetaButton = _ => {
        if(metaKey === '' || metaValue === '') {
            alert('please add both a key and value first!');   
            return false;
        } else {
            setMetas([...metas, { key: metaKey, val: metaValue }]);
            setMetaKey('');
            setMetaValue('');
        }
    }

    const handleGeneratePassword = _ => {
        const pass = utilities.generateRandomPassword(12);
        setPassword(pass);
        setConfirm(pass);
        setPasswordInputType('text');
        setTimeout(() => setPasswordInputType('password'), 300);
    }

    const handleSavePassword = async () => {
        if(metaKey !== '' && metaValue !== '')
            handleAddMetaButton();

        if(password !== confirm) {
            dispatchers.logMessage({type: 'error', message: 'Passwords do not match!'});
            return false;
        }
        console.debug('saving password. calling utilities.addPassword with');
        console.debug('state.dropFile', state.dropFile);
        console.debug('passwordObject', {
            title: title,
            username: username,
            password: password,
            metas: metas
        });

        await utilities.addPassword(state.dropFile, {
            title: title,
            username: username,
            password: password,
            metas: metas
        });

        clearInputs();
        setShow(false);
    }

    return (
        <>
            <Loading />
            <Modal
                size="md"
                centered
                show={show} 
                backdrop="static"
                onHide={() => setShow(false)}
            >
                <Modal.Header 
                    closeButton
                    className="text-secondary bg-black"
                    closeVariant="white"
                >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="text-white bg-dark"
                >
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text
                            style={{width:'90px'}}
                        >
                            Title
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Enter title"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text
                            style={{width:'90px'}}
                        >
                            Username
                        </InputGroup.Text>
                        <FormControl
                            value={username}
                            placeholder="Enter username"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text
                            style={{width:'90px'}}
                        >
                            Password
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Enter password"
                            type={passwordInputType}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button 
                            variant="secondary" 
                            id="button-addon1"
                            onClick={() => handleGeneratePassword()}
                        >
                            Generate
                        </Button>
                    </InputGroup>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text
                            style={{width:'90px'}}
                        >
                            Confirm
                        </InputGroup.Text>
                        <FormControl
                            value={confirm}
                            placeholder="Confirm password"
                            type={passwordInputType}
                            onChange={e => setConfirm(e.target.value)}
                        />
                    </InputGroup>
                    {   
                        metas.map((meta, index) => {
                            return (
                                <div key={index}>
                                    <InputGroup className="mb-3" size="sm">
                                        <InputGroup.Text
                                            style={{width:'90px'}}
                                        >
                                            Meta
                                        </InputGroup.Text>
                                        <FormControl 
                                            placeholder="Key"
                                            defaultValue={meta.key}
                                        />
                                        <FormControl 
                                            placeholder="Value"
                                            defaultValue={meta.val}
                                        />
                                    </InputGroup>
                                </div>
                            );
                        })
                    }
                        <InputGroup className="mb-3" size="sm">
                            <InputGroup.Text
                                style={{width:'90px'}}
                            >
                                Meta
                            </InputGroup.Text>
                            <FormControl 
                                placeholder="Key"
                                value={metaKey}
                                onChange={e => setMetaKey(e.target.value)}
                            />
                            <FormControl 
                                placeholder="Value"
                                value={metaValue}
                                onChange={e => setMetaValue(e.target.value)}
                            />
                        </InputGroup>
                    <Row>
                        <Col xs="3" md="3" lg="3" xl="3">
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                style={{width:'90px'}}
                                onClick={() => handleAddMetaButton()}
                            >
                                Add Meta
                            </Button>
                        </Col>
                        <Col className="fs-8">
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-top`} className="text-left">
                                        <div className="text-left">
                                            <p>Meta can be added for anything related to this item you wish to store.</p>
                                            <p>Examples: login URLs, onionsite mirrors, wallet seeds, etc.</p>
                                            <p>Add as many meta entries as you wish. Also note that certain meta keys will have special consequences in the application. Setting a meta record with a valid URL and a keyword of "link" will create a hyperlink on the passwords listing that you can click to go to the site.</p>
                                            <p>For something more versitile, check out Notes.</p>
                                        </div>
                                    </Tooltip>
                                }
                            >
                                <Icon icon="bi:question-square" color="white" width="32" />
                            </OverlayTrigger>
                        </Col>
                    </Row>                    
                </Modal.Body>
                <Modal.Footer className="text-secondary bg-black">
                    <Button variant="secondary" size="sm" onClick={() => handleSavePassword()}>Save</Button>
                    <Button variant="dark" size="sm" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}