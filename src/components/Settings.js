import React, { useState } from "react";
import {Container, Row, Col, Button, Form, InputGroup, DropdownButton, Dropdown, FormControl} from "react-bootstrap";
import Loading from './Loading';
import { useSelector } from "react-redux";
import { updateSetting } from './../state/slices/dropFile/dropFileDispatchers';
import {saveDropfile} from "../state/slices/dropFile/dropFileUtils";

export default function Settings({ fileHandle, setFileHandle }) {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(false);

    const handleUpdateSetting = setting => {
        updateSetting(setting);
        saveDropfile(fileHandle);
    }

    return (
        <Container fluid className="w-75">
            <Loading />
            <Row className="w-100 mb-4">
                <Col className="w-100 text-center fs-3 m-auto">
                    Settings
                </Col>
            </Row>
            <Row>
                <Col className="mb-4">
                    <Dropdown>
                        <Dropdown.Toggle size="sm" id="dropdown-button-dark-example1" variant="outline-light">Actions</Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item onClick={() => saveDropfile(fileHandle)}>Save Dropfile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3">
                    <InputGroup className="mb-3" size="sm">
                        <FormControl placeholder="Page to display after successful login (defaults to Home)" />

                        <DropdownButton size="sm" variant="dark" id="dropdown-basic-button" title="Select a page">
                            <Dropdown.Item>Home</Dropdown.Item>
                            <Dropdown.Item>Passwords</Dropdown.Item>
                            <Dropdown.Item>Password Generator</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={state.dropFile.data.settings.autoSaveDropFile}
                            onClick={() => handleUpdateSetting({
                                setting: 'autoSaveDropFile',
                                value: !state.dropFile.data.settings.autoSaveDropFile
                            })}
                        />
                        <label className="form-check-label">
                            Automatically save dropfile after every event (adding, removing, or updating any value)
                        </label>
                    </div>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={state.dropFile.data.settings.maskUsername}
                            onClick={() => handleUpdateSetting({
                                setting: 'maskUsername',
                                value: !state.dropFile.data.settings.maskUsername
                            })}
                        />
                        <label className="form-check-label">
                            Mask usernames with stars in passwords list
                        </label>
                    </div>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={state.dropFile.data.settings.unmaskUsernameOnHover}
                            onClick={() => handleUpdateSetting({
                                setting: 'unmaskUsernameOnHover',
                                value: !state.dropFile.data.settings.unmaskUsernameOnHover
                            })}
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