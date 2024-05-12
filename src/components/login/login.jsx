import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const router = useRouter()
  const navigate = useNavigate()
  useEffect(() => {
    //document.body.style.backgroundImage = 'conic-gradient(#ffd4d4, blue, blue, blue, #ffd4d4)';
    document.body.style.backgroundImage = 'linear-gradient(to bottom, white,blue)';
  }, []);

  function submitUser(e) {
    try {
      e.preventDefault();

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
            alert("You Have Login successfully");
          } else {
            alert("Invalid Username or Password");
          }
        })
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  const handelSignup = () => {
    navigate('/signup');
  };
  return (
    <div className='logindiv'>
      <div className='loginform'>
        <h3 className='font-bold text-center text-white'>Login</h3>
        <label className='text-white font-bold'>User Name<span className='text-danger'>*</span></label>
        <input value={username} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
        <label className='d-block text-danger' style={{visibility:"hidden"}}>Please Enter Username</label>
        <label className='text-white font-bold'>Password<span className='text-danger'>*</span></label>
        <input value={password} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
        <label className='d-block text-danger' style={{visibility:"hidden"}}>Please Enter Password</label>
        {loading && <p>Loading...</p>}
        <div className='text-end'>
        <label className='text-info'>Forget Password</label>
        </div>
        <div className='d-flex'>
          <button type="button" className="m-2 btnLogin" onClick={submitUser}>Login</button>
          <button type="button" className="m-2 btnSignUp" onClick={handelSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
