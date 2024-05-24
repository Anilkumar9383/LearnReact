import React, { useState, useEffect } from 'react';
import { FaUserEdit } from "react-icons/fa";
import Loader from '../Common/Loder'

function UserSetting() {
    const [loading, setLoading] = useState(true);

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
                    <FaUserEdit style={{ fontSize: '30px', cursor: 'pointer' }} />
                </div>
            </div>
            <hr />
            <div className='col-md-12'>
                <label className='d-block'>Username</label>
                <input className='form-control' type='text' disabled value={window.sessionStorage.getItem('Username')} />
            </div>
            <div className='col-md-12'>
                <label className='d-block'>Full name</label>
                <input className='form-control' type='text' disabled value={window.sessionStorage.getItem('FullName')} />
            </div>
            <div className='col-md-12'>
                <label className='d-block'>Enail</label>
                <input className='form-control' type='text' disabled value={window.sessionStorage.getItem('EmailId')} />
            </div>
            <div className='col-md-12'>
                <label className='d-block'>Password</label>
                <input className='form-control' type='password' disabled value={window.sessionStorage.getItem('Password')} />
                <div className='' style={{ display: 'none' }}>
                    <label className='d-block mt-2'>New password</label>
                    <input className='form-control' type='password' />
                    <label className='d-block mt-2'>Confirm new password</label>
                    <input className='form-control' type='password' />
                </div>
            </div>
        </div>
    )
}

export default UserSetting
