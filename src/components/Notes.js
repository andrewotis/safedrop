import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button, Dropdown, DropdownButton, InputGroup, FormControl} from 'react-bootstrap';
import { useSelector } from "react-redux";
import Loading from "./Loading";
import {addNote, deleteNote} from "../state/slices/dropFile/dropFileDispatchers";
import { v4 as uuidv4 } from 'uuid';
import {saveDropfile,getFormattedDate} from "../state/slices/dropFile/dropFileUtils";
export default function Notes({ fileHandle }) {
    const state = useSelector(state => state);
    const [filter, setFilter] = useState('');
    const [ note, setNote ] = useState({
        id: '',
        title: '',
        content: '',
        created: null
    });

    useEffect(() => {
        setNote({...note,
            id: uuidv4(),
            created: getFormattedDate()
        })
    },[]);

    const handleSave = _ => {
        addNote(note);
    }

    const handleAddNewNote = _ => {
        console.log("handleAddNewNote")
        const newNote = {
            id: uuidv4(),
            content: '',
            title: '',
            created: getFormattedDate()
        };
        console.log(newNote)
        setNote(newNote);
    }

    const handleNoteClick = noteObj => setNote({ id: noteObj.id, title: noteObj.title, content: noteObj.content, created: noteObj.created });
    const handleDeleteClick = _ => {
        deleteNote(note);
        saveDropfile(fileHandle);
    }

    return (
        <Container className="">
            <Loading />
            <Row className="w-100 mb-4">
                <Col className="w-100 text-center fs-3 m-auto">
                    Notes
                </Col>
            </Row>
            <Row className="w-100 mb-4">
                <Col xs={3} sm={3} md={3} xl={3} className="">
                    <InputGroup className="mb-3" >
                        <FormControl
                            value={filter}
                            className="v-dark"
                            placeholder="Filter files..."
                            onChange={e => setFilter(e.target.value)}
                        />
                    </InputGroup>
                    {
                        state.dropFile.data.notes.filter(note => {
                            if(filter === '') return true;
                            return note.title.toLowerCase().includes(filter.toLowerCase());
                        }).map((note, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="text-right pr-10px fw-lighter cursor-pointer m-5px border-bottom"
                                        onClick={() => handleNoteClick(note)}
                                    >
                                        { note.title }
                                    </div>
                                );
                            })
                    }
                </Col>
                <Col className="w-100 fs-6 m-auto">
                    <Row>
                        <Col xs={2} sm={2} md={2} xl={2} >
                            <DropdownButton
                                variant="outline-light"
                                title="File"
                                className="full-width-child-btn rounded-corners"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item
                                    onClick={() => handleAddNewNote()}
                                >
                                    New
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleSave()}
                                >
                                    Save
                                </Dropdown.Item>
                                <Dropdown.Item>Duplicate</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleDeleteClick()}
                                >
                                    Delete
                                </Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col xs={5} sm={5} md={5} xl={5} >
                            <InputGroup className="mb-3" >
                                <InputGroup.Text id="basic-addon2" className="v-dark">id:</InputGroup.Text>
                                <FormControl
                                    value={note.id}
                                    disabled
                                    className="v-dark"
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3" >
                                <InputGroup.Text id="basic-addon2" className="v-dark">created:</InputGroup.Text>
                                <FormControl
                                    value={note.hasOwnProperty('created') && note.created !== undefined && note.created !== '' ? note.created : 'undefined'}
                                    disabled
                                    className="v-dark"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" size="sm" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" className="v-dark" value={note.title} placeholder="Title..." onChange={e => setNote({...note, title: e.target.value})}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" value={note.content} placeholder="Note..." className="v-dark" rows={20} onChange={e => setNote({...note, content: e.target.value})} />
                        </Form.Group>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}