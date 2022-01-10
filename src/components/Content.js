import React from 'react';
import { Container } from 'react-bootstrap';
import GenerateKeys from './GenerateKeys';
import AuthOrCreate from './AuthOrCreate';
import Create from './create/Create';
import Authenticate from './Authenticate';
import Passwords from './Passwords';
import Home from './Home';

export default function Content({ page, setPage, authenticate, database, setDatabase, passphrase, setPassphrase }) {
    const componentMap = {
        'GenerateKeys' : <GenerateKeys />,
        'AuthOrCreate' : <AuthOrCreate setPage={page => setPage(page)} />,
        'Create' : <Create setPage={page => setPage(page)}/>,
        'Authenticate' : <Authenticate database={database} setDatabase={db => setDatabase(db)} passphrase={passphrase} setPassphrase={p => setPassphrase(p)} authenticate={() => authenticate()} setPage={page => setPage(page)}/>,
        'Passwords': <Passwords passphrase={passphrase} database={database} setDatabase={db => setDatabase(db)} setPage={page => setPage(page)}/>,
        'Home': <Home setPage={page => setPage(page)}/>,
        'RevokeKey' : null,
        'ImportKey' : null,
        'ExportKey' : null,
    }

    const displayContent = () => {
        return componentMap[page];
    }

    return (
        <>
            <Container className="mt-4 text-light w-75 m-auto">
                { page !== null && displayContent() }
            </Container>
        </>
    );
}

