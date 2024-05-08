import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{Component} from 'react';
import { Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout.jsx'
import Login from './components/login/login.jsx'
import Navbar from './components/navbar.jsx'
import Home from './components/Home/home.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Layout><Home/></Layout>} />
      </Routes>
      <Routes>
        <Route exact path="/home" element={<Layout><Home/></Layout>} />
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Layout><Login/></Layout>} />
      </Routes>
    </>
  );
}

export default App;
