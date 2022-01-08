import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import Content from './components/Content';

export default function App() {
    const [page, setPage] = useState('AuthOrCreate');

    return (
        <div className="App">
            <Menu page={page} setPage={page => setPage(page)} />
            <Content page={page} setPage={page => setPage(page)} />
        </div>
    );
}
