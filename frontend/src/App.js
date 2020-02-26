import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Routes from './routes';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/jquery/dist/jquery.min.js";

function App() {
  return (
    <div className="interface">
      <Sidebar/>
      <Routes/>
    </div> 
  );
}

export default App;
