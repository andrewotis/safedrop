import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Container, Alert } from 'react-bootstrap';
import Authenticate from './Authenticate';
import CreateDropfile from "./CreateDropfile";
import Home from "./Home";
import Passwords from './../passwords/Passwords';
import { dismissLogMessage } from './../state/slices/system/systemDispatchers';

export default function Content({ fileHandle, setFileHandle }) {
    const system = useSelector(state => state.system);
    const componentMap = {
        'CreateDropfile' : <CreateDropfile />,
        'Authenticate' : <Authenticate setFileHandle={setFileHandle} fileHandle={fileHandle} />,
        'Home' : <Home setFileHandle={setFileHandle} fileHandle={fileHandle} />,
        'Passwords' : <Passwords setFileHandle={setFileHandle} fileHandle={fileHandle} />
    }

    const logTypeMap = {
        'success': 'success',
        'error': 'danger',
        'info': 'info',
        'warning': 'warning',
    }

    const displayContent = () => {
        return componentMap[system.currentPage];
    }

    return (
        <>
            <Container fluid className="dark-safe-bg">
                <Container className="pt-4 text-light w-75 m-auto darkbg h-100">
                    { system.log.map((alert, i) => <Alert key={i} variant={logTypeMap[alert.type]} className="m-auto w-75 mb-1" onClose={() => dismissLogMessage(alert)} dismissible>{ alert.message }</Alert>) }
                    { displayContent() }
                </Container>
            </Container>
        </>
    );
}

