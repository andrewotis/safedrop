import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import Content from './components/Content';

export default function App() {

    return (
        <div className="App">
            <Menu />
            <Content />
        </div>
    );
}
