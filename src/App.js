import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Style.css';

import Login from './components/login/login.jsx';
import Home from './components/Home/home.jsx';
import SignalR from './components/SignalR/SignalR.jsx';
import UserSetting from './components/UserSetting/UserSetting.jsx';
import Logindetails from './components/Master/Logindetails.jsx';
import UserMaster from './components/Master/UserMaster.jsx';
import Loder from './components/Common/Loder.jsx';
import Contact from './components/Contacts/Contact.jsx';
import About from './components/About/About.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Loder" element={<Loder />} />
        <Route exact path="/home" element={<Layout><Home /></Layout>} />
        <Route exact path="/SignalR" element={<Layout><SignalR /></Layout>} />
        <Route exact path="/UserSetting" element={<Layout><UserSetting /></Layout>} />
        <Route exact path="/Logindetails" element={<Layout><Logindetails /></Layout>} />
        <Route exact path="/UserMaster" element={<Layout><UserMaster /></Layout>} />
        <Route exact path="/Contact" element={<Layout><Contact /></Layout>} />
        <Route exact path="/About" element={<Layout><About /></Layout>} />
      </Routes>
    </>
  );
}

export default App;
