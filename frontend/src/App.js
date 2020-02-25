import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Routes from './routes';

function App() {
  return (
    <>
      <Sidebar/>
      <Routes/>
    </> 
  );
}

export default App;
