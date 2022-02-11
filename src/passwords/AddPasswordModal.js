import React, { useState, useRef } from "react";
import {
    Container,
    Tooltip,
    OverlayTrigger,
    InputGroup,
    FormControl,
    Row,
    Col,
    Button,
    Form,
    Spinner,
    Alert,
    Modal,
    DropdownButton,
    Dropdown
} from "react-bootstrap";
import { Icon } from '@iconify/react';
import { useSelector } from "react-redux";
import Loading from '../components/Loading';
import { generateRandomPassword } from "./passwordUtils";
import { logMessage } from "../state/slices/system/systemDispatchers";
import { addPassword } from "../state/slices/dropFile/dropFileDispatchers";
import {saveDropfile} from "../state/slices/dropFile/dropFileUtils";

export default function AddPasswordModal({ show, setShow, fileHandle, setFileHandle }) {
    const state = useSelector(state => state);
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [category, setCategory] = useState('');
    const [metas, setMetas] = useState([]);
    const [metaKey, setMetaKey] = useState('');
    const [metaValue, setMetaValue] = useState('');
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [showTooltip, setShowTooltip] = useState(null);

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
        const pass = generateRandomPassword(12);
        setPassword(pass);
        setConfirm(pass);
        setPasswordInputType('text');
        setTimeout(() => setPasswordInputType('password'), 300);
    }

    const handleSavePassword = async() => {
        let localMetas;
        if(metaKey !== '' || metaValue !== '') {
            localMetas = [...metas, { key: metaKey, val: metaValue }];
            console.log(localMetas)
            setMetas(localMetas);
        }

        if(password !== confirm) {
            logMessage({type: 'error', message: 'Passwords do not match!'});
            return false;
        }

        const passwordObject = {
            title: title,
            username: username,
            password: password,
            metas: localMetas
        };

        await addPassword(passwordObject);
        saveDropfile(fileHandle);
        clearInputs();
        setShow(false);
    }

    const handleAddCategoryButton = _ => {
        setMetaKey('Category');
        setMetaValue('');
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
                    <InputGroup className="mb-3 w-100" size="sm">
                        <InputGroup.Text
                            style={{width:'90px'}}
                        >
                            Category
                        </InputGroup.Text>
                        <DropdownButton
                            title={category === '' ? "Select a category" : category}
                            variant="light"
                            className="w-75"
                        >
                            {
                                state.dropFile.data.settings.passwordCategories.map((category, i) => <Dropdown.Item key={i}>{category}</Dropdown.Item>)

                            }
                        </DropdownButton>
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
                        <Col xs="4" md="4" lg="4" xl="4">
                            <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => handleAddMetaButton()}
                                className="w-100"
                            >
                                Add Meta
                            </Button>
                        </Col>
                        <Col xs="4" md="4" lg="4" xl="4">
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={() => handleAddCategoryButton()}
                                className="w-100"
                            >
                                Add Category
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
                                            <p>For something more versatile, check out Notes.</p>
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