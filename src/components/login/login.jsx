import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responce, setResponce] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [npassword, setNpassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [txtfullName, setTxtFullName] = useState('');
  const [txtemailId, setTxtEmailId] = useState('');
  const [txtnpassword, setTxtNpassword] = useState('');
  const [txtcpassword, setTxtCpassword] = useState('');
  const [activeMenu, setActiveMenu] = useState('Loginform');
  //const router = useRouter()
  const navigate = useNavigate()
  const handleMenuClick = (menuName) => {
    debugger;
    setActiveMenu(menuName);
    if (menuName === "SignUpForm") {
      let form1 = document.getElementById(menuName)
      let form2 = document.getElementById("Loginform")
      form1.style.display = 'block';
      form2.style.display = 'none';
      setFullName('');
      setEmailId('');
      setNpassword('');
      setCpassword('');
      setTxtFullName('');
      setTxtEmailId('');
      setTxtNpassword('');
      setTxtCpassword('');
    }
    else {
      let form1 = document.getElementById("SignUpForm")
      let form2 = document.getElementById(menuName)
      form1.style.display = 'none';
      form2.style.display = 'block';
      setUsername('');
      setPassword('');
      document.getElementById('txtusername').style.visibility = 'hidden';
      document.getElementById('txtpassword').style.visibility = 'hidden';
    }
  };
  useEffect(() => {
  }, []);

  const submitUser = (e) => {
    try {
      e.preventDefault();
      if (checkfildes()) {
        setLoading(true);
        fetch(apiURL + 'Login/Auth', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.Status === 'Success') {
              localStorage.setItem('JwtToken', data.token)
              setResponce(data.Status);
              setUsername('')
              setPassword('')
              navigate('/home')
            } else {
              setResponce(data.Status);
            }
          })
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  const checkfildes = () => {
    if (username.toString().trim() === "" || password.toString().trim() === "") {
      document.getElementById('txtusername').style.visibility = username.toString().trim() === "" ? 'visible' : 'hidden';
      document.getElementById('txtpassword').style.visibility = password.toString().trim() === "" ? 'visible' : 'hidden';
      return false;
    }
    else {
      document.getElementById('txtusername').style.visibility = 'hidden';
      document.getElementById('txtpassword').style.visibility = 'hidden';
      return true;
    }
  }
  const SignUpUser = (e) => {
    debugger;
    try {
      e.preventDefault();
      if (checkSignUpfildes()) {
        setLoading(true);
        fetch(apiURL + 'SignUp/SignUpUser', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ fullName: fullName, emailId: emailId.toLowerCase(), password: npassword, }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data[0].Responce === 'Success') {
              alert("You have successfully registered");
              setFullName('')
              setEmailId('')
              setNpassword('')
              setCpassword('')
            } else if (data[0].Responce === 'Exist') {
              alert("you have already registered");
            }
            else {
              alert("Something went wrong!");
            }
          })
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  const checkSignUpfildes = () => {
    let isvalid = true;

    if (fullName.toString().trim() === "") {
      setTxtFullName("Please Enter Full Name");
      isvalid = false;
    }
    else if (fullName.toString().trim().length < 3 || fullName.toString().trim().length > 20) {
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

    if (npassword.toString().trim() === "") {
      setTxtNpassword("Please Enter Password");
      isvalid = false;
    }
    else if (!/^[A-Za-z0-9]{2,5}[@#]{1}[A-Za-z0-9]{3,13}$/.test(npassword)) {
      setTxtNpassword("Password should be Ex:- Abcd@123");
      isvalid = false;
    }
    else {
      setTxtNpassword('');
    }

    if (cpassword.toString().trim() === "") {
      setTxtCpassword("Please Enter Confirm Password");
      isvalid = false;
    }
    else if (npassword.toString().trim() !== cpassword.toString().trim()) {
      setTxtCpassword("Password not matched");
      isvalid = false;
    }
    else {
      setTxtCpassword('');
    }
    return isvalid;
  }
  return (
    <div className='logindiv'>
      <div id='loginpage'>
        <div className='d-flex loginsignup justify-content-between'>
          <button type="button" className={`btns ${activeMenu === 'Loginform' ? 'Activelog' : ''}`} onClick={() => handleMenuClick('Loginform')}>Login</button>
          <button type="button" className={`btns ${activeMenu === 'SignUpForm' ? 'Activelog' : ''}`} onClick={() => handleMenuClick('SignUpForm')}>Sign Up</button>
        </div>
        <br />
        <div id='maindiv'>
          <div id='Loginform' className={`${activeMenu === 'SignUpForm' ? 'LoginformOff' : 'LoginformOn'}`}>
            <label className='text-white font-bold d-block'>User Name<span className='text-danger'>*</span></label>
            <input value={username} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
            <label className='d-block text-danger' id='txtusername' style={{ visibility: "hidden" }}>Please Enter Username</label>
            <label className='text-white font-bold d-block'>Password<span className='text-danger'>*</span></label>
            <input value={password} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            <label className='d-block text-danger' id='txtpassword' style={{ visibility: "hidden" }}>Please Enter Password</label>
            <label className='d-block text-danger' id='txtresponce'>{responce}</label>{loading && <p>Loading...</p>}
            <div className='d-flex justify-content-between align-items-center'>
              <button type="button" className="mx-auto my-3 btnLogin" style={{ width: '50%' }} onClick={submitUser}>Login</button>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <Link to="/home" >Direct Open</Link>
              <label className='text-info' id='btnforget'>Forget Password</label>
            </div>
          </div>
          <div id='SignUpForm' className={`${activeMenu === 'Loginform' ? 'SignUpForm' : ''}`}>
            <label className='text-white font-bold d-block'>Full Name<span className='text-danger'>*</span></label>
            <input value={fullName} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setFullName(e.target.value)} />
            <label className=' text-danger d-block' id='txtFullName'>{txtfullName}</label>

            <label className='text-white font-bold d-block'>Email Id<span className='text-danger'>*</span></label>
            <input value={emailId} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setEmailId(e.target.value)} />
            <label className=' text-danger d-block' id='txtEmailId'>{txtemailId}</label>

            <label className='text-white font-bold d-block'>Password<span className='text-danger'>*</span></label>
            <input value={npassword} type="password" className='form-control' placeholder="Enter Username" onChange={(e) => setNpassword(e.target.value)} />
            <label className=' text-danger d-block' id='txtNpassword'>{txtnpassword}</label>

            <label className='text-white font-bold d-block'>Confirm Password<span className='text-danger'>*</span></label>
            <input value={cpassword} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setCpassword(e.target.value)} />
            <label className=' text-danger d-block' id='txtCpassword'>{txtcpassword}</label>

            <div className='d-flex justify-content-between align-items-center mt-3'>
              <button type="button" className="mx-auto my-1 btnLogin" style={{ width: '50%' }} onClick={SignUpUser}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
