import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout.jsx'
import './components/Style.css';
import Login from './components/login/login.jsx'
import Home from './components/Home/home.jsx'
import SignalR from './components/SignalR/SignalR.jsx'
import UserSetting from './components/UserSetting/UserSetting.jsx'
import Logindetails from './components/Master/Logindetails.jsx'
import UserMaster from './components/Master/UserMaster.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>} />
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route exact path="/home" element={<Layout><Home/></Layout>} />
      </Routes>
      <Routes>
        <Route exact path="/SignalR" element={<Layout><SignalR/></Layout>} />
      </Routes>
      <Routes>
        <Route exact path="/UserSetting" element={<Layout><UserSetting/></Layout>} />
      </Routes>
      <Routes>
        <Route exact path="/Logindetails" element={<Layout><Logindetails/></Layout>} />
      </Routes>
      <Routes>
        <Route exact path="/UserMaster" element={<Layout><UserMaster/></Layout>} />
      </Routes>
    </>
  );
}

export default App;
