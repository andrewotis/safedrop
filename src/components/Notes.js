import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useSelector } from "react-redux";
import Loading from "./Loading";
import {addNote} from "../state/slices/dropFile/dropFileDispatchers";

export default function Notes({ fileHandle, setFileHandle }) {
    const state = useSelector(state => state);
    const [ note, setNote ] = useState({
        title: '',
        content: '',
    });

    const handleSave = _ => {
        addNote(note)
    }

    return (
        <Container>
            <Loading />
            <Row className="w-100 mb-4">
                <Col xs={3} sm={3} md={3} xl={3} >
                    {
                        state.dropFile.data.notes.map(note => {
                            return (
                                <><div className="text-right pr-10px">
                                    {
                                       note.title
                                    }
                                </div></>
                            );
                        })
                    }
                </Col>
                <Col className="w-100 fs-6 m-auto" >
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" className="text-white bg-dark" placeholder="Title..." onChange={e => setNote({...note, title: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" placeholder="Note..." className="text-white bg-dark" rows={10} onChange={e => setNote({...note, content: e.target.value})} />
                        </Form.Group>
                    </Form>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="float-right"
                        onClick={() => handleSave()}
                    >
                        Save note
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}