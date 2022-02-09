import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Dropdown, Container, Row, Button, Col} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import * as dispatchers from './../state/dispatchers';
import * as utilities from './../utilities';
import Loading from "../components/Loading";

export default function PasswordGenerator() {
    const [filter, setFilter] = useState([]);
    const state = useSelector(state => state);
    const [tags, setTags] = useState([]);
    const settings = utilities.settingsHelper.get();
    const characters = settings.passwordGenerator.characterMap;

    const getTags = _ => {
        const values = characters
            .map(c => {
            if(c !== null)
                return c.tags
            })
            .join()
            .split(',')
            .filter(a => a !== '');
        setTags([...new Set(values)])
    }

    useEffect(() => getTags(), [])

    const styles = {
        button: {
            height: '45px',
            width: '45px',
            fontWeight: 'bolder',
            fontSize: '1.5em',
            border: '1px solid #fff',
            margin: '1px',
            lineHeight: '20px'
        },
        filterDropdown: {
            maxHeight: "150px",
            overflowY: 'scroll'
        }
    }

    return (
        <Container fluid className="w-100">
            <Loading />
            <Row>
                <Col className="w-100 text-center fs-4">
                    Password Generator
                </Col>
            </Row>
            <Row className="g-0">
                <Row className="mb-2 mt-2">
                    <Col>
                        Allowed Characters <span className="text-muted">(click to toggle)</span>
                    </Col>
                    <Col style={{marginTop: '-10px'}} className="text-right mb-4">
                        <Dropdown value={filter} defaultValue={0}>
                            <Dropdown.Toggle size="sm" variant="dark" id="dropdown-basic">
                                {filter.length === 0 ? 'Filter' : filter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu value={filter} style={styles.filterDropdown}>
                                {
                                    tags.length > 0 &&
                                    tags.map(tag => {
                                        return (
                                            <Dropdown.Item onClick={() => setFilter(tag)}>{tag}</Dropdown.Item>
                                        );
                                    })
                                }

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                {
                    characters
                        .filter(char => char !== null)
                        .filter(char => {
                            if(filter.length === 0) {
                                return true;
                            }
                            return char.tags.includes(filter);
                        })
                        .map((char, index) => {
                            console.log('index', index);
                            if(index % 12 === 0) {
                                console.log('row')
                            }
                            return (
                                <Col key={index}>
                                    <Button
                                        style={styles.button}
                                        variant="dark"
                                        size="sm"
                                    >
                                        { char.char }
                                    </Button>
                                </Col>
                            );
                        }
                    )
                }
            </Row>
        </Container>
    );
}