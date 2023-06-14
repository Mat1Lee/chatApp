import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import Routers from "./router/Routers";
import ErrorPage from "./pages/ErrorPage";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  return (
    <>
    {/* <RouterProvider router={Routers} /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
          
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
