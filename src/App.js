import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import Content from './components/Content';

export default function App() {
  const [fileHandle, setFileHandle] = useState(null);
  return (
      <div className="App">
        <Menu fileHandle={fileHandle} setFileHandle={fh => setFileHandle(fh)}/>
        <Content fileHandle={fileHandle} setFileHandle={fh => setFileHandle(fh)}/>
      </div>
  );
}
