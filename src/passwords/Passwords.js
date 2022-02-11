import React, {useState } from "react";
import {Container, Modal, Table, Row, Col, Button, Form, Dropdown, InputGroup} from "react-bootstrap";
import { Icon } from '@iconify/react';
import AddPasswordModal from './AddPasswordModal';
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { innerStars, stars, } from "./passwordUtils";
import { addCategory, deleteCategory, deletePassword } from "../state/slices/dropFile/dropFileDispatchers";
import { saveDropfile } from "../state/slices/dropFile/dropFileUtils";
import {copyToClipBoard} from "../state/slices/system/systemUtils";

export default function Passwords({ fileHandle, setFileHandle }) {
    const state = useSelector(state => state);
    const passwords = state.dropFile.data.passwords;
    const [showModal, setShowModal] = useState(false);
    const [usernameHover, setUsernameHover] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');
    const [addCategoryActive, setAddCategoryActive] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const handleCategoryAdd = async() => {
        if(newCategory !== '') {
            addCategory(newCategory);
            setNewCategory('');
            await saveDropfile(fileHandle);
        }
    }

    const handleCategoryDelete = async(category) => {
        deleteCategory(category);
        await saveDropfile(fileHandle);
    }

    const handlePasswordDelete = async(password) => {
        deletePassword(password);
        await saveDropfile(fileHandle);
    }

    return (
        <Container>
            <Loading />
            <Row className="mb-4">
                <Col sm="2" md="2" lg="2" xl="2">
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Filter data..."
                        value={ filterQuery }
                        onChange={e => setFilterQuery(e.target.value)}
                    />
                </Col>
                <Col sm="6" md="6" lg="6" xl="6" />
                <Col sm="2" md="2" lg="2" xl="2">
                    <Dropdown autoClose="outside">
                        <Dropdown.Toggle
                            size="sm"
                            id="dropdown-button-dark-example1"
                            className="w-100"
                            variant="outline-light"
                        >
                            Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="light" className="w-100">
                            <Dropdown.Item onClick={() => setAddCategoryActive(!addCategoryActive)} >Add Category</Dropdown.Item>
                            { addCategoryActive &&
                                <Dropdown.Item>
                                    <InputGroup size="sm" className="mb-3">
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            placeholder="Add category..."
                                            value={ newCategory }
                                            onChange={e => setNewCategory(e.target.value)}
                                        />
                                        <InputGroup.Text
                                            onClick={() => handleCategoryAdd()}
                                        >
                                            add
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Dropdown.Item>
                            }
                            <Dropdown.Divider />
                            {
                                state.dropFile.data.settings.passwordCategories
                                    .map((category, index) => <Dropdown.Item key={index} href="#/action-4">{category} <span onClick={() => handleCategoryDelete(category)} style={{float: 'right'}}>X</span></Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="text-right" sm="2" md="2" lg="2" xl="2">
                    <Button  
                        variant="secondary"
                        size="sm"
                        className="w-100"
                        onClick={() => setShowModal(true)}
                    >
                        Add Password
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table size="sm" striped bordered hover striped variant="dark" className="m-auto fs-6">
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>item</th>
                                <th style={{ width: '25%' }}>username</th>
                                <th style={{ width: '25%' }}>password</th>
                                <th style={{ width: '25%' }} className="text-right">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            passwords.filter(item => {
                                if(filterQuery === '') {
                                    return true;
                                } else if(filterQuery !== '' && item.title.toLowerCase().includes(filterQuery.toLowerCase())) {
                                    return true;
                                } else if(filterQuery !== '' && item.username.toLowerCase().includes(filterQuery.toLowerCase())) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }).map((password, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            { password.title }
                                        </td>
                                        <td>
                                            <span
                                                className="cursor-pointer"
                                                onMouseEnter={e => setUsernameHover(i)}
                                                onMouseLeave={e => setUsernameHover(null)}
                                                onClick={() => copyToClipBoard(password.username)}
                                            >
                                                { usernameHover === i ? password.username : innerStars(password.username, 1) }
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                onClick={() => copyToClipBoard(password.password)}
                                                className="cursor-pointer"
                                            >
                                                { stars(password.password.length) }
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <Icon
                                                icon="clarity:copy-to-clipboard-line"
                                                color="white"
                                                width="23"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px', marginTop: '-1px'}}
                                            />
                                            <Icon
                                                icon="bx:bxs-edit"
                                                color="white"
                                                width="24"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px'}}
                                            />
                                            <Icon
                                                icon="ic:baseline-qr-code-scanner"
                                                color="white"
                                                width="23"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px', marginTop: '-1px'}}
                                            />
                                            <Icon
                                                icon="la:skull-crossbones"
                                                color="white"
                                                width="24"
                                                className="cursor-pointer"
                                                onClick={() => handlePasswordDelete(password)}
                                                style={{marginLeft: '5px'}}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddPasswordModal 
                show={showModal} 
                setShow={(v) => setShowModal(v)}
                fileHandle={fileHandle}
                setFileHandle={setFileHandle}
            />
        </Container>  
    );
}
