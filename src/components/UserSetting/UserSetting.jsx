import React, { useState, useEffect } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import Loader from '../Common/Loder'

function UserSetting() {
    const [loading, setLoading] = useState(true);
    const [ dltAccount, setDltAccount] = useState(false);
    const [ editDetais, setEditDetais] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className='p-3 col-md-6 m-auto' style={{ background: 'aliceblue' }}>
            {loading ?
                <Loader />
                : null
            }
            <div className='d-flex justify-content-between align-items-center'>
                <h5>User Profile</h5>
                <div>
                    <FaUserEdit style={{ fontSize: '30px', cursor: 'pointer', display:(editDetais || dltAccount) ? 'none' : 'block'}} onClick={e => setEditDetais(true)}/>
                    <TiArrowBackOutline style={{ fontSize: '30px', cursor: 'pointer', display:(editDetais || dltAccount) ? 'block' : 'none'}} onClick={e => {setEditDetais(false);setDltAccount(false);}}/>
                </div>
            </div>
            <hr />
            <div className='col-md-12' Id="UserDetails" style={{display: editDetais ? 'block' : dltAccount ? 'none' : 'block'}}>
                <div className='col-md-12'>
                    <label className='d-block'>Username</label>
                    <input className='form-control' type='text' disabled={!editDetais}  value={window.sessionStorage.getItem('Username')} />
                </div>
                <div className='col-md-12'>
                    <label className='d-block'>Full name</label>
                    <input className='form-control' type='text' disabled={!editDetais} value={window.sessionStorage.getItem('FullName')} />
                </div>
                <div className='col-md-12'>
                    <label className='d-block'>Email</label>
                    <input className='form-control' type='text' disabled={!editDetais} value={window.sessionStorage.getItem('EmailId')} />
                </div>
            </div>
            <div className='col-md-12'>
                <div className='' style={{ display: 'none' }}>
                    <label className='d-block mt-2'>Old Password</label>
                    <input className='form-control' type='password' />
                    <label className='d-block mt-2'>New password</label>
                    <input className='form-control' type='password' />
                    <label className='d-block mt-2'>Confirm new password</label>
                    <input className='form-control' type='password' />
                </div>
            </div>
            <div className='' style={{ display: dltAccount ? 'block' : 'none' }}>
                <label className='d-block mt-2'>Enter Your Password</label>
                <input className='form-control' type='password' />
            </div>
            <div className='col-md-12 mt-3' style={{ display: editDetais ? 'none' : dltAccount ? 'none' : 'block'}}>
                <button className='btn btn-danger' onClick={e => setDltAccount(true)}>Delete Account</button>
            </div>
            <div className='col-md-12 mt-3' style={{ display: editDetais ? 'block' : dltAccount ? 'block' : 'none' }}>
                <button className='btn btn-primary'>Submit</button>
            </div>
        </div>
    )
}

export default UserSetting
