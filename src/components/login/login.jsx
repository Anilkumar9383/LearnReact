import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom'
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils.jsx';

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responce, setResponce] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [nusername, setNUsername] = useState('');
  const [npassword, setNpassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [txtfullName, setTxtFullName] = useState('');
  const [txtemailId, setTxtEmailId] = useState('');
  const [txtUsername, setTxtNUsername] = useState('');
  const [txtnpassword, setTxtNpassword] = useState('');
  const [txtcpassword, setTxtCpassword] = useState('');
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
      setFullName('');
      setEmailId('');
      setNUsername('');
      setNpassword('');
      setCpassword('');
      setTxtFullName('');
      setTxtEmailId('');
      setTxtNUsername('');
      setTxtNpassword('');
      setTxtCpassword('');
      setLoading(false);
      setResponce('');
    }
    else {
      let form1 = document.getElementById("SignUpForm")
      let form2 = document.getElementById(menuName)
      form1.style.display = 'none';
      form2.style.display = 'block';
      setUsername('');
      setPassword('');
      setLoading(false);
      setResponce('');
      document.getElementById('txtusername').style.visibility = 'hidden';
      document.getElementById('txtpassword').style.visibility = 'hidden';
    }
  };
  useEffect(() => {

  }, []);

  const submitUser = (e) => {
    debugger;
    setResponce('');
    try {
      e.preventDefault();
      if (checkfildes()) {
        setLoading(true);
        const inpObj = encryptJSON(JSON.stringify({ "username": username, "password": password }));
        fetch(apiURL + 'Login/Auth', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(inpObj),
        })
          .then((res) => res.text())
          .then((data) => {
            const result = JSON.parse(decryptJSON(JSON.stringify(data)));
            if (result.Status === 'Success') {
              setResponce(data.Status);
              window.sessionStorage.setItem('UserId', result.Id)
              window.sessionStorage.setItem('FullName', result.FullName)
              window.sessionStorage.setItem('EmailId', result.EmailId)
              window.sessionStorage.setItem('Username', result.Username)
              //window.sessionStorage.setItem('Password', result.Password)
              window.sessionStorage.setItem('LastLogin', result.LastLogin)
              window.sessionStorage.setItem('JwtToken', result.token)
              setUsername('')
              setPassword('')
              setLoading(false);
              navigate('/home')
            } else {
              setLoading(false);
              setResponce(result.Status);
            }
          })
          .catch((error) => {
            console.error('Error during login:', error);
            setLoading(false);
            setResponce('An error occurred. Please try again.');
          });
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }
  const checkfildes = () => {
    if (username.toString().trim() === "" || password.toString().trim() === "") {
      setResponce('');
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
    try {
      e.preventDefault();
      if (checkSignUpfildes()) {
        setLoading(true);
        const inpObj = encryptJSON(JSON.stringify({ "FullName": fullName, "EmailId": emailId.toLowerCase(), "Username": nusername, "Password": npassword, }));
        fetch(apiURL + 'SignUp/SignUpUser', {
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
            if (result[0].Responce === 'Success') {
              alert("You have successfully registered");
              setFullName('')
              setEmailId('')
              setNUsername('')
              setNpassword('')
              setCpassword('')
            } else if (result[0].Responce === 'Exist') {
              alert("you have already registered");
            }
            else if (result[0].Responce === 'ExistUser') {
              alert("Username already Exist");
            }
            else {
              alert("Something went wrong!");
            }
          })
          .catch((error) => {
            console.error('Error during login:', error);
            setLoading(false);
            setResponce('An error occurred. Please try again.');
          });
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
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

    if (nusername.toString().trim() === "") {
      setTxtNUsername("Please create username");
      isvalid = false;
    }
    else if (nusername.toString().trim().length < 3 || nusername.toString().trim().length > 20) {
      setTxtNUsername("Invalid Username");
      isvalid = false;
    }
    else {
      setTxtNUsername('');
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

  const handleKeyPress = (e) => {
    // Submit form on Enter key press
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeMenu === 'Loginform') {
        submitUser(e);
      } else {
        SignUpUser(e);
      }
    }
  };

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
            <form onKeyPress={handleKeyPress}>
              <label className='text-white font-bold d-block'>User Name<span className='text-danger'>*</span></label>
              <input value={username} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
              <label className='d-block text-danger' id='txtusername' style={{ visibility: "hidden" }}>Please Enter Username</label>
              <label className='text-white font-bold d-flex justify-content-between'><span>Password<span className='text-danger'>*</span></span><label className='text-info' id='btnforget'>Forget Password</label></label>
              <input value={password} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
              <label className='d-block text-danger' id='txtpassword' style={{ visibility: "hidden" }}>Please Enter Password</label>
              <label className='d-block text-danger' id='txtresponce'>{responce}</label>{loading && <span className='text-danger'>Loading...</span>}
              <div className='d-block d-flex justify-content-between align-items-center'>
                <button type="button" className="mx-auto my-3 btnLogin" style={{ width: '50%' }} onClick={submitUser}>Login</button>
              </div>
            </form>
          </div>
          <div id='SignUpForm' className={`${activeMenu === 'Loginform' ? 'SignUpForm' : ''}`}>
            <form onKeyPress={handleKeyPress}>
              <label className='text-white font-bold d-block'>Full Name<span className='text-danger'>*</span></label>
              <input value={fullName} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setFullName(e.target.value)} />
              <label className=' text-danger d-block' id='txtFullName'>{txtfullName}</label>

              <label className='text-white font-bold d-block'>Email Id<span className='text-danger'>*</span></label>
              <input value={emailId} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setEmailId(e.target.value)} />
              <label className=' text-danger d-block' id='txtEmailId'>{txtemailId}</label>

              <label className='text-white font-bold d-block'>Username<span className='text-danger'>*</span></label>
              <input value={nusername} type="text" className='form-control' placeholder="Enter Username" onChange={(e) => setNUsername(e.target.value)} />
              <label className=' text-danger d-block' id='txtEmailId'>{txtUsername}</label>

              <label className='text-white font-bold d-block'>Password<span className='text-danger'>*</span></label>
              <input value={npassword} type="password" className='form-control' placeholder="Enter Username" onChange={(e) => setNpassword(e.target.value)} />
              <label className=' text-danger d-block' id='txtNpassword'>{txtnpassword}</label>

              <label className='text-white font-bold d-block'>Confirm Password<span className='text-danger'>*</span></label>
              <input value={cpassword} type="password" className='form-control' placeholder="Enter Password" onChange={(e) => setCpassword(e.target.value)} />
              <label className='text-danger d-block' id='txtCpassword'>{txtcpassword}</label>
              <label className='d-block text-danger' id='txtresponce'>{responce}</label>{loading && <span className='text-danger'>Loading...</span>}
              <div className='d-flex justify-content-between align-items-center mt-3'>
                <button type="button" className="mx-auto my-1 btnLogin" style={{ width: '50%' }} onClick={SignUpUser}>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
