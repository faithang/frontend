import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import CONFIG from './config';

export type msgType = {
  title: string
};

function App() {
  const [msg, setMsg] = useState('')

  const fetchMsg = useCallback(async () => {
    await fetch(`${CONFIG.API_ENDPOINT}/hello`)
      .then((response: Response) => response.json())
      .then((data: msgType) => setMsg(data.title))
  }, []);

  useEffect(() => {
    fetchMsg();
  }, [fetchMsg])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. {msg}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
