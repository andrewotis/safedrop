import React from 'react';
import { useSelector } from "react-redux";
import { Container, Alert } from 'react-bootstrap';
import Authenticate from './Authenticate';
import { dismissLogMessage } from './../state/slices/system/systemDispatchers';
import CreateDropfile from './CreateDropfile';

export default function Content() {
    const system = useSelector(state => state.system);

    const componentMap = {
        'CreateDropfile' : <CreateDropfile />,
        'Authenticate' : <Authenticate />,
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
                    { system.log.map((alert, i) => <Alert key={i} variant={logTypeMap[alert.type]} className="m-auto w-75" onClose={() => dismissLogMessage(alert)} dismissible>{alert.message}</Alert>) }
                    { displayContent() }
                </Container>
            </Container>
        </>
    );
}

