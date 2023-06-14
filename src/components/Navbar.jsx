import React, { useContext } from 'react';
import {signOut} from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)
  if(!currentUser){
    return <Navigate to='/login'/>
  }
  return (
    <div className='navbar'>
      <span className="logo">
       Fun Chat</span>
      <div className="user">
        <img src={currentUser?.photoURL} alt="" />
        <span>{currentUser?.displayName}</span>
        <button onClick={()=> signOut(auth)
        }
          
       ><FontAwesomeIcon style={{fontSize:'15px'}} icon={faRightFromBracket}/></button>
      </div>
    </div>
  )
}

export default Navbar