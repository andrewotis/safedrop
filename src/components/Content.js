import React from 'react';
import { Container } from 'react-bootstrap';
import GenerateKeys from './GenerateKeys';
import AuthOrCreate from './AuthOrCreate';
import Create from './create/Create';
import Authenticate from './Authenticate';

export default function Content({ page, setPage }) {
    const componentMap = {
        'GenerateKeys' : <GenerateKeys />,
        'AuthOrCreate' : <AuthOrCreate setPage={page => setPage(page)} />,
        'Create' : <Create setPage={page => setPage(page)}/>,
        'Authenticate' : <Authenticate />,
        'RevokeKey' : null,
        'ImportKey' : null,
        'ExportKey' : null,
    }

    const displayContent = () => {
        return componentMap[page];
    }

    return (
        <>
            <Container className="mt-4 text-light">
                { page !== null && displayContent() }
            </Container>
        </>
    );
}

