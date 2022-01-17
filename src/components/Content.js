import React from 'react';
import { useSelector } from "react-redux";
import { Container, Alert } from 'react-bootstrap';
import GenerateKeys from './GenerateKeys';
import AuthOrCreate from './AuthOrCreate';
import Create from '../create-dropfile/Create';
import Authenticate from './Authenticate';
import Passwords from '../passwords/Passwords';
import Home from './Home';
import PasswordGenerator from "../passwords/PasswordGenerator";
import * as dispatchers from './../state/dispatchers';

export default function Content() {
    const state = useSelector(state => state);
    const componentMap = {
        'GenerateKeys' : <GenerateKeys />,
        'AuthOrCreate' : <AuthOrCreate />,
        'Create' : <Create />,
        'Authenticate' : <Authenticate />,
        'Passwords': <Passwords />,
        'Home': <Home />,
        'PasswordGenerator': <PasswordGenerator />,
    }

    const logTypeMap = {
        'success': 'success',
        'error': 'danger',
        'info': 'info',
        'warning': 'warning',
    }

    const displayContent = () => {
        return componentMap[state.currentPage];
    }

    return (
        <>
            <Container fluid className="dark-safe-bg">
                <Container className="pt-4 text-light w-75 m-auto darkbg h-100">
                    { state.log.map((alert, i) => <Alert key={i} variant={logTypeMap[alert.type]} className="m-auto w-75" onClose={() => dispatchers.dismissLogMessage(alert)} dismissible>{alert.message}</Alert>) }
                    { displayContent() }
                </Container>
            </Container>
        </>
    );
}

