import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import Image from '../Images/AkLogo.png';
import { MdLogout } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function NavbarComponent() {

  const [activeMenu, setActiveMenu] = useState('Home');

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("JwtToken");
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbg">
      <Container fluid>
        <Navbar.Brand href="#" className='logodiv'><img src={Image} className='logo' alt='Ak Logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 navmenu" navbarScroll>
            <NavItem className={`py-2 px-4 ${activeMenu === 'Home' ? 'Active' : ''}`}>
              <Link to="/home" className='text-white text-decoration-none' onClick={() => handleMenuClick('Home')}>Home</Link>
            </NavItem>
            <NavItem className={`py-2 px-4 ${activeMenu === 'About' ? 'Active' : ''}`}>
              <Link to="#" className='text-white text-decoration-none' onClick={() => handleMenuClick('About')}>About</Link>
            </NavItem>
            <NavItem className={`py-2 px-4 ${activeMenu === 'Portfolio' ? 'Active' : ''}`}>
              <Link to="#" className='text-white text-decoration-none' onClick={() => handleMenuClick('Portfolio')}>Portfolio</Link>
            </NavItem>
            <NavItem className={`py-2 px-4 ${activeMenu === 'Blog' ? 'Active' : ''}`}>
              <Link to="#" className='text-white text-decoration-none' onClick={() => handleMenuClick('Blog')}>Blog</Link>
            </NavItem>
            <NavItem className={`py-2 px-4 ${activeMenu === 'Contact' ? 'Active' : ''}`}>
              <Link to="#" className='text-white text-decoration-none' onClick={() => handleMenuClick('Contact')}>Contact</Link>
            </NavItem>
          </Nav>
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              <div className='m-auto'><FaRegCircleUser size={30} style={{ margin: "0px 5px" ,cursor: "pointer"}} className='pointer'/></div>
              <div style={{ padding: "0px 10px" }}>
                <label className='d-flex'>Anil Kumar</label>
                <label className='d-flex'>Last Login: - 07:00 PM</label>
              </div>
            </div>
            <div className='my-auto'><MdLogout size={30} onClick={handleLogout} style={{cursor: "pointer"}} className='pointer'/></div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
