import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import Loader from '../Common/Loder'
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils.jsx';

function UserSetting() {
    const token = window.sessionStorage.getItem('JwtToken');
    const IpAddress = window.sessionStorage.getItem('IpAddress');
    const UserName = window.sessionStorage.getItem('Username');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dltAccount, setDltAccount] = useState(false);
    const [editDetais, setEditDetais] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const Id = window.sessionStorage.getItem('UserId');
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
    const [userPass, setUserPass] = useState('');
    const [txtfullName, setTxtFullName] = useState('');
    const [txtemailId, setTxtEmailId] = useState('');
    const [txtpassword, setTxtpassword] = useState('');
    const [txtnpassword, setTxtNpassword] = useState('');
    const [txtcpassword, setTxtCpassword] = useState('');
    const [txtuserPass, setTxtUserPass] = useState('');


    useEffect(() => {
        setLoading(false);
    }, []);

    const fetchData = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            if (token) {
                const inpObj = encryptJSON(JSON.stringify({ "Id": Id, "Username": UserName }));
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
                setMobileNo(result[0].MobileNo);
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
        setTxtFullName('');
        setTxtEmailId('');
        setTxtUserPass('');
        setPassword('');
        setNewPass('');
        setConfirmPass('');
    }
    const SubmitData = async (e) => {
        if (editDetais) {
            EditUserDetails(e);
        }
        else if (changePass) {
            ChangePass(e);
        }
        else if (dltAccount) {
            DltAccount(e);
        }
    }
    const EditUserDetails = async (e) => {
        try {
            e.preventDefault();
            if (checkEditfildes()) {
                setLoading(true);

                const inpObj = encryptJSON(JSON.stringify({ "Id": Id, "FullName": fullname, "EmailId": emailId.toLowerCase(), "Username": username, "MobileNo": mobileNo, "IpAddress": IpAddress, "City": city, "Region": region, "Pincode": pincode }));
                await fetch(apiURL + 'SignUp/EditUser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(inpObj),
                })
                    .then((res) => res.text())
                    .then((data) => {
                        const result = JSON.parse(decryptJSON(JSON.stringify(data)));
                        setLoading(false);
                        debugger;
                        if (result[0].Responce === 'Success') {
                            alert("Your details has been updated.");
                        }
                        else {
                            alert("Something went wrong!");
                        }
                    })
                    .catch((error) => {
                        console.error('Error during login:', error);
                        setLoading(false);
                        alert('An error occurred. Please try again.');
                    });
            }
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    }
    const checkEditfildes = () => {
        let isvalid = true;

        if (fullname.toString().trim() === "") {
            setTxtFullName("Please Enter Full Name");
            isvalid = false;
        }
        else if (fullname.toString().trim().length < 3 || fullname.toString().trim().length > 20) {
            setTxtFullName("Name should be 3 to 20 charecters");
            isvalid = false;
        }
        else {
            setTxtFullName('');
        }

        if (emailId.toString().trim() === "") {
            setTxtEmailId("Please Enter Email Id");
            isvalid = false;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailId)) {
            setTxtEmailId("Invalid Email Id");
            isvalid = false;
        }
        else {
            setTxtEmailId('');
        }
        return isvalid;
    }
    const ChangePass = async (e) => {
        try {
            e.preventDefault();
            if (checkPasswords()) {
                setLoading(true);

                const inpObj = encryptJSON(JSON.stringify({ "Id": Id, "Username": UserName, "OldPassword": password, "NewPassword": newpass, "IpAddress": IpAddress }));
                await fetch(apiURL + 'ChangePassword/ChangePass', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(inpObj),
                })
                    .then((res) => res.text())
                    .then((data) => {
                        const result = JSON.parse(decryptJSON(JSON.stringify(data)));
                        setLoading(false);
                        debugger;
                        if (result[0].Responce === 'Success') {
                            alert("Your password has been changed. Please Relogin your Account!");
                            window.sessionStorage.clear();
                            navigate('/login');
                        }
                        else if (result[0].Responce === 'NotMatch') {
                            setTxtpassword("Wrong Password!");
                        }
                        else {
                            alert("Something went wrong!");
                        }
                    })
                    .catch((error) => {
                        console.error('Error during login:', error);
                        setLoading(false);
                        alert('An error occurred. Please try again.');
                    });
            }
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    }
    const checkPasswords = () => {
        let isvalid = true;
        if (password.toString().trim() === "") {
            setTxtpassword("Please Enter Old Password");
            isvalid = false;
        }
        else {
            setTxtpassword('');
        }
        if (newpass.toString().trim() === "") {
            setTxtNpassword("Please Enter New Password");
            isvalid = false;
        }
        else if (!/^[A-Za-z0-9]{2,5}[@#]{1}[A-Za-z0-9]{3,13}$/.test(newpass)) {
            setTxtNpassword("Password should be Ex:- Abcd@123");
            isvalid = false;
        }
        else {
            setTxtNpassword('');
        }

        if (confirmPass.toString().trim() === "") {
            setTxtCpassword("Please Enter Confirm Password");
            isvalid = false;
        }
        else if (newpass.toString().trim() !== confirmPass.toString().trim()) {
            setTxtCpassword("Password not matched");
            isvalid = false;
        }
        else {
            setTxtCpassword('');
        }
        return isvalid;
    }
    const DltAccount = async (e) => {
        try {
            e.preventDefault();
            if (checkDlt()) {
                setLoading(true);

                const inpObj = encryptJSON(JSON.stringify({ "Id": Id, "Username": UserName, "Password": userPass, "IpAddress": IpAddress }));
                await fetch(apiURL + 'SignUp/DeteleUser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(inpObj),
                })
                    .then((res) => res.text())
                    .then((data) => {
                        const result = JSON.parse(decryptJSON(JSON.stringify(data)));
                        setLoading(false);
                        debugger;
                        if (result[0].Responce === 'Success') {
                            alert("Your Account has been deleted.");
                            window.sessionStorage.clear();
                            navigate('/login');
                        }
                        else if (result[0].Responce === 'NotMatch') {
                            setTxtUserPass("Wrong Password!");
                        }
                        else {
                            alert("Something went wrong!");
                        }
                    })
                    .catch((error) => {
                        console.error('Error during login:', error);
                        setLoading(false);
                        alert('An error occurred. Please try again.');
                    });
            }
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    }
    const checkDlt = () => {
        let isvalid = true;
        if (userPass.toString().trim() === "") {
            setTxtUserPass("Please Enter Password");
            isvalid = false;
        }
        else {
            setTxtUserPass('');
        }
        return isvalid;
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
                        <label className='d-block'>Full name<span className='text-danger'>* {txtfullName}</span></label>
                        <input className='form-control' type='text' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Email<span className='text-danger'>* {txtemailId}</span></label>
                        <input className='form-control' type='text' value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    </div>
                    <div className='col-md-12'>
                        <label className='d-block'>Mobile No.</label>
                        <input className='form-control' type='text' maxlength='10' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
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
                    <label className='d-block mt-2'>Old Password<span className='text-danger'>* {txtpassword}</span></label>
                    <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className='d-block mt-2'>New password<span className='text-danger'>* {txtnpassword}</span></label>
                    <input className='form-control' type='password' value={newpass} onChange={(e) => setNewPass(e.target.value)} />
                    <label className='d-block mt-2'>Confirm new password<span className='text-danger'>* {txtcpassword}</span></label>
                    <input className='form-control' type='password' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                </div>
                : null}
            {dltAccount ?
                <div className='' style={{ display: dltAccount ? 'block' : 'none' }}>
                    <label className='d-block mt-2'>Enter Your Password<span className='text-danger'>* {txtuserPass}</span></label>
                    <input className='form-control' type='password' value={userPass} onChange={(e) => setUserPass(e.target.value)} />
                </div>
                : null}
            {(!editDetais && !dltAccount && !changePass) ?
                <div className='col-md-12' style={{ display: editDetais ? 'none' : dltAccount ? 'none' : changePass ? 'none' : 'block' }}>
                    <button className='btn btn-primary my-3' onClick={e => setChangePass(true)}>Change Password</button>
                    <button className='btn btn-danger m-3' onClick={e => setDltAccount(true)}>Delete Account</button>
                </div> :
                <div className='col-md-12 mt-3' style={{ display: editDetais ? 'block' : dltAccount ? 'block' : changePass ? 'block' : 'none' }}>
                    <button className='btn btn-primary' onClick={(e) => SubmitData(e)}>Submit</button>
                </div>
            }
        </div>
    )
}

export default UserSetting
