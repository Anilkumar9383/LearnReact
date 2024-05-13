import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeMenu, setActiveMenu] = useState('Login');
  //const router = useRouter()
  const navigate = useNavigate()
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
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
  const handelSignup = () => {
    navigate('/signup');
  };
  return (
    <div className='logindiv'>
      <div className='loginform'>
        <div className='d-flex loginsignup justify-content-between'>
          <button type="button" className={`btns ${activeMenu === 'Login' ? 'Activelog' : ''}`} onClick={() => handleMenuClick('Login')}>Login</button>
          <button type="button" className={`btns ${activeMenu === 'SignUp' ? 'Activelog' : ''}`} onClick={() => handleMenuClick('SignUp')}>Sign Up</button>
        </div>
        <br />
        <label className='text-white font-bold'>User Name<span className='text-danger'>*</span></label>
        <input value={username} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
        <label className='d-block text-danger' id='txtusername' style={{ visibility: "hidden" }}>Please Enter Username</label>
        <label className='text-white font-bold'>Password<span className='text-danger'>*</span></label>
        <input value={password} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
        <label className='d-block text-danger' id='txtpassword' style={{ visibility: "hidden" }}>Please Enter Password</label>
        {loading && <p>Loading...</p>}
        <div className='d-flex justify-content-between align-items-center'>
          <button type="button" className="mx-auto my-3 btnLogin" style={{ width: '50%' }} onClick={submitUser}>Login</button>
          <button type="button" style={{ display: 'none', width: '50%' }} className="m-auto btnSignUp" onClick={handelSignup}>Sign Up</button>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <Link to="/home" >Direct Open</Link>
          <label className='text-info' id='btnforget'>Forget Password</label>
        </div>
      </div>
    </div>
  );
}

export default Login;
