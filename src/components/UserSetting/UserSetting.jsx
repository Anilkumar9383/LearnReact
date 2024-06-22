import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import Loader from '../Common/Loder'
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils.jsx';

function UserSetting() {
    const token = window.sessionStorage.getItem('JwtToken');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dltAccount, setDltAccount] = useState(false);
    const [editDetais, setEditDetais] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [pincode, setPincode] = useState('');
    const [password, setPassword] = useState('');
    const [newpass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');


    useEffect(() => {
        setLoading(false);
    }, []);

    const fetchData = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            if (token) {
                const inpObj = encryptJSON(JSON.stringify({ "Id": window.sessionStorage.getItem('UserId'), "Username": window.sessionStorage.getItem('Username') }));
                const response = await fetch(apiURL + "GetUser/GetUserDetails", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inpObj),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.text();
                const result = JSON.parse(decryptJSON(JSON.stringify(data)));
                setUsername(result[0].Username);
                setFullname(result[0].FullName);
                setEmailId(result[0].EmailId);
                setMobileNo('');
                setCity(result[0].City);
                setRegion(result[0].Region);
                setPincode(result[0].Pincode);

            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        setLoading(false);
    };
    const ClearAll = (e) => {
        e.preventDefault();
        setEditDetais(false);
        setDltAccount(false);
        setChangePass(false);
        setUsername('');
        setFullname('');
        setEmailId('');
        setMobileNo('');
        setCity('');
        setRegion('');
        setPincode('');
    }

    return (
        <div className='p-3 col-md-6 m-auto' style={{ background: 'aliceblue' }}>
            {loading ?
                <Loader />
                : null
            }
            <div className='d-flex justify-content-between align-items-center'>
                <h5>User Profile</h5>
                <div>
                    <FaUserEdit style={{ fontSize: '30px', cursor: 'pointer', display: (editDetais || dltAccount || changePass) ? 'none' : 'block' }} onClick={e => { setEditDetais(true); fetchData(e) }} />
                    <TiArrowBackOutline style={{ fontSize: '30px', cursor: 'pointer', display: (editDetais || dltAccount || changePass) ? 'block' : 'none' }} onClick={e => ClearAll(e)} />
                </div>
            </div>
            <hr />
            {(!editDetais && !dltAccount && !changePass) ?
                <div className='col-md-12' Id="UserDetails">
                    <div className='col-md-12'>
                        <label className='d-block'>Username</label>
                        <input className='form-control' type='text' disabled={true} value={window.sessionStorage.getItem('Username')} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Full name</label>
                        <input className='form-control' type='text' disabled={true} value={window.sessionStorage.getItem('FullName')} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Email</label>
                        <input className='form-control' type='text' disabled={true} value={window.sessionStorage.getItem('EmailId')} />
                    </div>
                </div>
                : null}
            {editDetais ?
                <div className='col-md-12' Id="EditUserDetails">
                    <div className='col-md-12'>
                        <label className='d-block'>Username<span className='text-danger'>*</span></label>
                        <input className='form-control' type='text' disabled={true} value={username} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Full name<span className='text-danger'>*</span></label>
                        <input className='form-control' type='text' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Email<span className='text-danger'>*</span></label>
                        <input className='form-control' type='text' value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Mobile No.</label>
                        <input className='form-control' type='text' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>City</label>
                        <input className='form-control' type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>State</label>
                        <input className='form-control' type='text' value={region} onChange={(e) => setRegion(e.target.value)} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Pincode</label>
                        <input className='form-control' type='text' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                    </div>
                </div>
                : null}
            {changePass ?
                <div className='col-md-12'>
                    <label className='d-block mt-2'>Old Password</label>
                    <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className='d-block mt-2'>New password</label>
                    <input className='form-control' type='password' value={newpass} onChange={(e) => setNewPass(e.target.value)} />
                    <label className='d-block mt-2'>Confirm new password</label>
                    <input className='form-control' type='password' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                </div>
                : null}
            {dltAccount ?
                <div className='' style={{ display: dltAccount ? 'block' : 'none' }}>
                    <label className='d-block mt-2'>Enter Your Password</label>
                    <input className='form-control' type='password' />
                </div>
                : null}
            {(!editDetais && !dltAccount && !changePass) ?
                <div className='col-md-12' style={{ display: editDetais ? 'none' : dltAccount ? 'none' : changePass ? 'none' : 'block' }}>
                    <button className='btn btn-primary my-3' onClick={e => setChangePass(true)}>Change Password</button>
                    <button className='btn btn-danger m-3' onClick={e => setDltAccount(true)}>Delete Account</button>
                </div> :
                <div className='col-md-12 mt-3' style={{ display: editDetais ? 'block' : dltAccount ? 'block' : changePass ? 'block' : 'none' }}>
                    <button className='btn btn-primary'>Submit</button>
                </div>
            }
        </div>
    )
}

export default UserSetting
