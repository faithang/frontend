import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Clock from './components/Clock';
import NavigationBar from './components/NavigationBar';
import Todo from './screens/Todo';


function App():React.ReactElement {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
              </a>
            </header>
          </div>
        } />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;