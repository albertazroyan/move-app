
import React from 'react'
import MainMenu from './components/main-manu'
import { BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {

  return (
    <div>
      <Router>
        <MainMenu />
        <Routes />
      </Router>
    </div>
  );
};

export default App;
