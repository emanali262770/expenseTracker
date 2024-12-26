import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate=useNavigate();
  const login=localStorage.getItem("login")
  useEffect(() => {
    if (!login) {
      navigate('/')
     }
   
  }, [])
  
 
  return <>{children}</>;
};

export default ProtectedRoute;
