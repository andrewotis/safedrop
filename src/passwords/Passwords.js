import React, {useState } from "react";
import { Container, Table, Row, Col, Button, Form,} from "react-bootstrap";
import { Icon } from '@iconify/react';
import AddPasswordModal from './AddPasswordModal';
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { stars, } from "./passwordUtils";
import { deletePassword } from "../state/slices/dropFile/dropFileDispatchers";
import { saveDropfile } from "../state/slices/dropFile/dropFileUtils";
import { copyToClipBoard } from "../state/slices/system/systemUtils";
import Username from "./Username";
import QRModal from "./QRModal";
import CategoriesDropdown from "./CategoriesDropdown";

export default function Passwords({ fileHandle, setFileHandle }) {
    const state = useSelector(state => state);
    // const settings = state.dropFile.data.settings;
    const passwords = state.dropFile.data.passwords;
    const [showModal, setShowModal] = useState(false);
    const [usernameHover, setUsernameHover] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');
    const [qr, setQr] = useState('');
    const [showQrModal, setShowQrModal] = useState(false);

    const handleQrClick = value => {
        setQr(value);
        setShowQrModal(true)
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
                    <CategoriesDropdown fileHandle={fileHandle} setFileHandle={setFileHandle} />
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
                    <Table size="sm" striped bordered hover variant="dark" className="m-auto fs-6">
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
                                                <Username
                                                    isHovering={usernameHover === i}
                                                    userName={password.username}
                                                />
                                            </span>
                                            <Icon
                                                icon="clarity:qr-code-line"
                                                color="white"
                                                width="24"
                                                className="cursor-pointer"
                                                onClick={() => handleQrClick(password.username)}
                                                style={{marginLeft: '5px'}}
                                            />
                                        </td>
                                        <td>
                                            <span
                                                onClick={() => copyToClipBoard(password.password)}
                                                className="cursor-pointer"
                                            >
                                                { stars(password.password.length) }
                                            </span>
                                            <Icon
                                                icon="clarity:qr-code-line"
                                                color="white"
                                                width="24"
                                                className="cursor-pointer"
                                                onClick={() => handleQrClick(password.password)}
                                                style={{marginLeft: '5px'}}
                                            />
                                        </td>
                                        <td className="text-right">
                                            
                                            <Icon
                                                icon="bx:bxs-edit"
                                                color="white"
                                                width="24"
                                                className="cursor-pointer"
                                                style={{marginLeft: '5px'}}
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
            <QRModal
                show={showQrModal}
                setShow={(v) => setShowQrModal(v)}
                fileHandle={fileHandle}
                value={qr}
                setFileHandle={setFileHandle}
            />
        </Container>  
    );
}
