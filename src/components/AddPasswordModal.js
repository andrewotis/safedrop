import React, { useState, useRef } from "react";
import { Container, Tooltip, OverlayTrigger, InputGroup, FormControl, Row, Col, Button, Form, Spinner, Alert, Modal } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { generateRandomPassword, addPassword } from './../utilities';

export default function AddPasswordModal({ show, setShow, database, setDatabase, passphrase }) {
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [metas, setMetas] = useState([]);
    const [metaKey, setMetaKey] = useState('');
    const [metaValue, setMetaValue] = useState('');
    const [passwordInputType, setPasswordInputType] = useState('password');
    
    const [showTooltip, setShowTooltip] = useState(null);
    const target = useRef(null);
    
    const handleAddMetaButton = _ => {
        if(metaKey === '' || metaValue === '') {
            alert('please add both a key and value first!');
            return false;
        } else {
            setMetas([...metas, { key: metaKey, val: metaValue }]);
            setMetaKey('');
            setMetaValue('');
        }
        return true;
    }

    const handleGeneratePassword = _ => {
        const pass = generateRandomPassword(12);
        setPassword(pass);
        setConfirm(pass);
        setPasswordInputType('text');
        setTimeout(() => setPasswordInputType('password'), 300);
    }

    const handleSavePassword = _ => {
       const obj = {
           title: title,
           password: password,
           metas: metas
       }
       addPassword(database, passphrase, setDatabase, obj);
    }

    return (
        <>
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
                                            value={meta.key}
                                        />
                                        <FormControl 
                                            placeholder="Value"
                                            value={meta.val}
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