import React from 'react';
import { NavItem } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { RiFolderUserFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";

function Sidebar() {
  const location = useLocation();

  return (
    <div id='Sidebar'>
      <div className='p-3'>
        <NavItem className={`menuitem ${location.pathname === '/home' ? 'activemenuitem' : ''}`}>
          <FaHome /><Link to='/home' className={`menulink ${location.pathname === '/home' ? 'activemenulink' : ''}`}>Home</Link>
        </NavItem>
        {window.sessionStorage.getItem('Username') === 'Admin' ?
          <NavItem className={`menuitem ${location.pathname === '/Usermaster' ? 'activemenuitem' : ''}`}>
            <FaUsersGear /><Link to='/Usermaster' className={`menulink ${location.pathname === '/Usermaster' ? 'activemenulink' : ''}`}>User Master</Link>
          </NavItem>
          : null}
        <NavItem className={`menuitem ${location.pathname === '/UserSetting' ? 'activemenuitem' : ''}`}>
          <FaUserCog /><Link to='/UserSetting' className={`menulink ${location.pathname === '/UserSetting' ? 'activemenulink' : ''}`}>User Setting</Link>
        </NavItem>
        <NavItem className={`menuitem ${location.pathname === '/SignalR' ? 'activemenuitem' : ''}`}>
          <MdSpaceDashboard /><Link to='/SignalR' className={`menulink ${location.pathname === '/SignalR' ? 'activemenulink' : ''}`}>Utilities</Link>
        </NavItem>
        <NavItem className={`menuitem ${location.pathname === '/About' ? 'activemenuitem' : ''}`}>
          <FaAddressCard /><Link to='/About' className={`menulink ${location.pathname === '/About' ? 'activemenulink' : ''}`}>About</Link>
        </NavItem>
        <NavItem className={`menuitem ${location.pathname === '/Contact' ? 'activemenuitem' : ''}`}>
          <RiFolderUserFill /><Link to='/Contact' className={`menulink ${location.pathname === '/Contact' ? 'activemenulink' : ''}`}>Contact</Link>
        </NavItem>
        <div id='copyrightdiv'>
          <label id='copyrightlbl'>© 2024 Copyright Admin. All Rights Reserved</label>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
