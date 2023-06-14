import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import { AuthContextProvider } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AuthLayout = ({children}) => {
  return (
    <AuthContextProvider>
      {/* {children}  */}
      <Outlet/>
    </AuthContextProvider>
  );
};

export default createBrowserRouter ([
{
  element:<AuthLayout/>,
  errorElement:<ErrorPage/>,
  children:[
    {
      element:<Login/>,
      path:'/login'
    },
    {
      element:<Register/>,
      path:'/register'
    },
    {
      element:<ProtectedRoute/>,
      children:[
        {
          element: <Home />,
          path: '/',
        },

      ]
    }
  ]
}

]) 
  

