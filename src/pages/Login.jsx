import React, { useState } from "react";
import {  Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import './login.css'

import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
// import { setMaxIdleHTTPParsers } from "http";

const Login = () => {
  const [err, setErr] = useState(false);
  const [eye,setEye] = useState(true);
  const [pass,setPass] = useState('password')
  const navigate = useNavigate();
  const GgProvider = new GoogleAuthProvider();
  const FbProvider = new FacebookAuthProvider();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    navigate('/')
    } catch (err) {
      setErr(true);
    }
  };
  const handleLogin = async (provider)=>{
    try {
    const res =  await signInWithPopup(auth,provider);
    console.log(res);
    navigate('/');
    } catch (err) {
      setErr(true)
    }
    
    }
    const Eye =()=>{
      if(pass=='password'){
        setPass('text');
        setEye(false)
      }else{
        setPass('password')
        setEye(true)
      }
    }
  return (
    
    <>
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Fun Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <div className="input-text">
          <input type={pass} placeholder="password" />
          <FontAwesomeIcon onClick={Eye} icon={eye ? faEyeSlash : faEye}/>
          </div>
        
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <a href="/register">Register</a></p>

        <div className="or">
                            <p>or signin with</p>
                        </div>
                        <div className="boxes">
                            <span onClick={()=>handleLogin(GgProvider)} ><img src="https://imgur.com/XnY9cKl.png" /></span>
                            <span><img src="https://imgur.com/ODlSChL.png" /></span>
                            <span onClick={()=>handleLogin(FbProvider)}><img src="https://imgur.com/mPBRdQt.png" /></span>
                        </div>
      </div>
     
    </div>
    </>
  );
};

export default Login;
