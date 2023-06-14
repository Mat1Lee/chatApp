import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate,Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function ProtectedRoute({children}) {
  
const {currentuser} = useContext(AuthContext);
if(!currentuser){
  console.log('navigate')
  return <Navigate to='/login'/>
}
return children;
}
