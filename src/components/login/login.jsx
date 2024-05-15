import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeMenu, setActiveMenu] = useState('Loginform');
  //const router = useRouter()
  const navigate = useNavigate()
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    if (menuName === "SignUpForm") {
      let form1 = document.getElementById(menuName)
      let form2 = document.getElementById("Loginform")
      form1.style.display = 'block';
      form2.style.display = 'none';
    }
    else {
      let form1 = document.getElementById("SignUpForm")
      let form2 = document.getElementById(menuName)
      form1.style.display = 'none';
      form2.style.display = 'block';
    }
  };
  useEffect(() => {
    //document.body.style.backgroundImage = 'conic-gradient(#ffd4d4, blue, blue, blue, #ffd4d4)';
    //document.body.style.backgroundImage = 'linear-gradient(to bottom, white,blue)';
  }, []);

  function submitUser(e) {
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
            if (data.message === 'success') {
              localStorage.setItem('JwtToken', data.token)
              setUsername('')
              setPassword('')
              navigate('/home')
            } else {
              alert("Invalid Username or Password");
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
  // const handelSignup = () => {
  //   navigate('/signup');
  // };
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
            <label className='text-white font-bold'>User Name<span className='text-danger'>*</span></label>
            <input value={username} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
            <label className='d-block text-danger' id='txtusername' style={{ visibility: "hidden" }}>Please Enter Username</label>
            <label className='text-white font-bold'>Password<span className='text-danger'>*</span></label>
            <input value={password} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            <label className='d-block text-danger' id='txtpassword' style={{ visibility: "hidden" }}>Please Enter Password</label>
            {loading && <p>Loading...</p>}
            <div className='d-flex justify-content-between align-items-center'>
              <button type="button" className="mx-auto my-3 btnLogin" style={{ width: '50%' }} onClick={submitUser}>Login</button>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <Link to="/home" >Direct Open</Link>
              <label className='text-info' id='btnforget'>Forget Password</label>
            </div>
          </div>
          <div id='SignUpForm' className={`${activeMenu === 'Loginform' ? 'SignUpForm' : ''}`}>
            <label className='text-white font-bold mt-2'>Full Name<span className='text-danger'>*</span></label>
            <input value={username} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
            <label className=' text-danger' id='txtusername' style={{ display:'none' }}>Please Enter Username</label>

            <label className='text-white font-bold mt-2'>Email Id<span className='text-danger'>*</span></label>
            <input value={username} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
            <label className=' text-danger' id='txtusername' style={{ display:'none' }}>Please Enter Username</label>

            <label className='text-white font-bold mt-2'>Password<span className='text-danger'>*</span></label>
            <input value={username} type="password" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
            <label className=' text-danger' id='txtusername' style={{ display:'none' }}>Please Enter Username</label>

            <label className='text-white font-bold mt-2'>Conform Password<span className='text-danger'>*</span></label>
            <input value={password} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            <label className=' text-danger' id='txtpassword' style={{ display:"none" }}>Please Enter Password</label>

            <div className='d-flex justify-content-between align-items-center mt-3'>
              <button type="button" className="mx-auto my-1 btnLogin" style={{ width: '50%' }} onClick={submitUser}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
