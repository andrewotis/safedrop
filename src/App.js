import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import Content from './components/Content';

export default function App() {
    const [page, setPage] = useState('AuthOrCreate');
    const [authenticated, setAuthenticated] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [database, setDatabase] = useState(null);

    return (
        <div className="App">
            <Menu 
                page={page} 
                authenticated={authenticated} 
                setPage={page => setPage(page)} 
            />
            <Content 
                page={page}
                authenticate={() => setAuthenticated(true)}
                setPage={page => setPage(page)}
                database={database}
                setDatabase={db => setDatabase(db)}
                passphrase={passphrase}
                setPassphrase={p => setPassphrase(p)}
            />
        </div>
    );
}
