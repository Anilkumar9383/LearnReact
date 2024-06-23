import { useLocation } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import Image from '../Images/AkLogo.png';
import { MdLogout } from "react-icons/md";
// import { FaRegCircleUser } from "react-icons/fa6";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiMenuAltLeft } from "react-icons/bi";
import Sidebar from './Sidebar'
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';

function NavbarComponent() {
  // const [activeMenu, setActiveMenu] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();
  const token = window.sessionStorage.getItem('JwtToken');

  useEffect(() => {
    if (!token) {
      window.sessionStorage.clear();
      //navigate('/login');
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

  return (
    <>
      <Navbar expand="lg" className="navdiv">
        <Container fluid>
          <div>
            <BiMenuAltLeft style={{ fontSize: '45px' }} id='MenuIcon' onClick={handleSidebar} />
            <Navbar.Brand href="#" className='logodiv'><img src={Image} className='logo' alt='Ak Logo' /></Navbar.Brand>
          </div>
          {initials !== '' ?
            <CiMenuKebab style={{ fontSize: '30px', display: 'none' }} id='menudots' onClick={handelUser} />
            :
            <div className='my-auto' id='menudots' ><Link to='/login' style={{ fontSize: '18px', color: 'black' }}>Login</Link></div>
          }
          <div className='d-flex justify-content-between' id='usersettig'>
            {initials !== '' ?
              <>
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
              </>
              :
              <div className='my-auto'><Link to='/login' style={{ fontSize: '18px', color: 'black' }}>Login</Link></div>
            }
          </div>
        </Container>
      </Navbar>
      <Sidebar />
    </>
  );
}

export default NavbarComponent;
