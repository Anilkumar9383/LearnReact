import { useLocation } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import Image from '../Images/AkLogo.png';
import { MdLogout } from "react-icons/md";
// import { FaRegCircleUser } from "react-icons/fa6";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiMenuAltLeft } from "react-icons/bi";
import Sidebar from './Sidebar'
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';
import apiURL from '../components/Common/ApiUrl.jsx';
//import axios from 'axios';
import { encryptJSON, decryptJSON } from '../components/Common/cryptoUtils.jsx';
import { AiFillMessage } from "react-icons/ai";


function NavbarComponent() {
  // const [activeMenu, setActiveMenu] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();
  const token = window.sessionStorage.getItem('JwtToken');
  const Username = window.sessionStorage.getItem('Username');

  useEffect(() => {
    if (!token) {
      window.sessionStorage.clear();
      navigate('/login');
    }
    if (window.innerWidth < 768) {
      document.getElementById('Sidebar').classList.add('activsidebar');
      document.getElementById('maincontainar').classList.add('activemaindiv');
    }
    if (window.innerWidth < 520) {
      document.getElementById('menudots').style.display = 'block';
      document.getElementById('usersettig').style.cssText = 'display:none!important; width: 100%;';
    }
    else {
      document.getElementById('menudots').style.display = 'none';
      document.getElementById('usersettig').style.cssText = 'display:flex!important; width: auto;';
    }
  }, [location.pathname]);
  if (location.pathname !== ('/' || '/login')) {
    window.addEventListener('resize', function (event) {
      if (window.innerWidth < 768) {
        document.getElementById('Sidebar').classList.add('activsidebar');
        document.getElementById('maincontainar').classList.add('activemaindiv');
      }
      else {
        document.getElementById('Sidebar').classList.remove('activsidebar');
        document.getElementById('maincontainar').classList.remove('activemaindiv');
      }
      if (window.innerWidth < 520) {
        document.getElementById('menudots').style.display = 'block';
        document.getElementById('usersettig').style.cssText = 'display:none!important; width: 100%;';
      }
      else {
        document.getElementById('menudots').style.display = 'none';
        document.getElementById('usersettig').style.cssText = 'display:flex!important; width: auto;';
      }
    }, true);
  }
  const handleLogout = () => {
    logoutTimeUpdate('Logout');
    window.sessionStorage.clear();
    navigate('/login');
  };

  const handleSidebar = () => {
    let sidebar = document.getElementById('Sidebar').classList;
    let maindiv = document.getElementById('maincontainar').classList;
    sidebar.contains('activsidebar') ? sidebar.remove('activsidebar') : sidebar.add('activsidebar');
    maindiv.contains('activemaindiv') ? maindiv.remove('activemaindiv') : maindiv.add('activemaindiv');
  }
  const handelUser = () => {
    let user = document.getElementById('usersettig');
    if (user.style.display === 'none') {
      user.style.cssText = 'display:flex!important; width: 100%;';
    }
    else {
      user.style.cssText = 'display:none!important; width: 100%;';
    }
  }
  const handelUsersetting = () => {
    if (window.innerWidth < 520) {
      document.getElementById('menudots').style.display = 'block';
      document.getElementById('usersettig').style.cssText = 'display:none!important; width: 100%;';
    }
    else {
      document.getElementById('menudots').style.display = 'none';
      document.getElementById('usersettig').style.cssText = 'display:flex!important; width: auto;';
    }
    navigate('/UserSetting');
  }
  let initials = '';
  if (window.sessionStorage.getItem('FullName')) {
    let name = window.sessionStorage.getItem('FullName').split(" ");
    if (name.length < 2) {
      initials = name[0].charAt(0).toUpperCase()
    }
    else {
      initials = name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase();
    }
  }

  const [wasPageCleanedUp, setWasPageCleanedUp] = useState(false);

  const logoutTimeUpdate = async (e) => {
    if (!wasPageCleanedUp) {
      try {
        const inpObj = encryptJSON(JSON.stringify({ "username": Username, "flag": e }));
        await fetch(apiURL + "Login/Logout", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inpObj),
        });
        setWasPageCleanedUp(true);
      } catch (error) {
        console.error('Error updating logout time:', error);
      }
    }
  };

  useEffect(() => {
    const handleUnload = () => {
      logoutTimeUpdate('Update');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [wasPageCleanedUp]);

  const handelMessage = () => {
    console.log('Message Click')
  }


  return (
    <>
      <Navbar expand="lg" className="navdiv">
        <Container fluid>
          <div>
            <BiMenuAltLeft style={{ fontSize: '45px' }} id='MenuIcon' onClick={handleSidebar} />
            <Navbar.Brand href="#" className='logodiv'><img src={Image} className='logo' alt='Ak Logo' /></Navbar.Brand>
          </div>
          {/* {initials !== '' ?
            <CiMenuKebab style={{ fontSize: '30px', display: 'none' }} id='menudots' onClick={handelUser} />
            :
            <div className='my-auto' id='menudots' ><Link to='/login' style={{ fontSize: '18px', color: 'black' }}>Login</Link></div>
            } */}
          {initials !== '' ?
            <>
              <div id='menudots'>
                <div style={{margin:'auto'}}>
                  <AiFillMessage className='messageicon' onClick={handelMessage}/>
                  <span className='messageCnt' onClick={handelMessage}>0</span>
                </div>
                <CiMenuKebab style={{ fontSize: '30px' }} onClick={handelUser} />
              </div>
              <div className='d-flex justify-content-between' id='usersettig'>
                <div style={{margin:'auto'}}>
                  <AiFillMessage className='messageicon' onClick={handelMessage}/>
                  <span className='messageCnt' onClick={handelMessage}>0</span>
                </div>
                <div className='d-flex'>
                  <div className='m-auto' onClick={handelUsersetting}>
                    <div className='userimg'>
                      <div className=''>{initials}</div>
                    </div>
                  </div>
                  <div style={{ padding: "0px 10px" }}>
                    <label className='d-flex' style={{ fontWeight: 'bold' }}>{window.sessionStorage.getItem('FullName')}</label>
                    <label className='d-flex'>{window.sessionStorage.getItem('Username')}</label>
                  </div>
                </div>
                <div className='my-auto'><MdLogout size={30} onClick={handleLogout} style={{ cursor: "pointer", marginLeft: '20px' }} className='pointer' /></div>
              </div>
            </>
            :
            <div className='my-auto'><Link to='/login' style={{ fontSize: '18px', color: 'black' }}>Login</Link></div>
          }
        </Container>
      </Navbar>
      <Sidebar />
    </>
  );
}

export default NavbarComponent;
