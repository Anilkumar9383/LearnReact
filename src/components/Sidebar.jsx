import React from 'react';
import { NavItem } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <div id='Sidebar'>
      <div className='p-3'>
        <NavItem className={`menuitem ${location.pathname === '/home' ? 'activemenuitem' : ''}`}>
          <Link to='/home' className={`menulink ${location.pathname === '/home' ? 'activemenulink' : ''}`}>Home</Link>
        </NavItem>
        {window.sessionStorage.getItem('Username') === 'Admin' ?
          <NavItem className={`menuitem ${location.pathname === '/Usermaster' ? 'activemenuitem' : ''}`}>
            <Link to='/Usermaster' className={`menulink ${location.pathname === '/Usermaster' ? 'activemenulink' : ''}`}>User Master</Link>
          </NavItem>
          : null}
        <NavItem className={`menuitem ${location.pathname === '/SignalR' ? 'activemenuitem' : ''}`}>
          <Link to='/SignalR' className={`menulink ${location.pathname === '/SignalR' ? 'activemenulink' : ''}`}>SignalR</Link>
        </NavItem>
        <NavItem className={`menuitem ${location.pathname === '/About' ? 'activemenuitem' : ''}`}>
          <Link to='/home' className={`menulink ${location.pathname === '/About' ? 'activemenulink' : ''}`}>About</Link>
        </NavItem>
        <NavItem className={`menuitem ${location.pathname === '/Contact' ? 'activemenuitem' : ''}`}>
          <Link to='/home' className={`menulink ${location.pathname === '/About' ? 'activemenulink' : ''}`}>Contact</Link>
        </NavItem>
      </div>
    </div>
  );
}

export default Sidebar;
