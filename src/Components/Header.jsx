import React from "react";
import logo from "../Images/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate=useNavigate()
  function handlelogin() {
    localStorage.clear();
    navigate('/')
    
  }
  return (
    <div className="w-[100%] shadow-lg py-3">
      <div className="flex items-center  justify-between h-[8vh]   w-[1400px] mx-auto">
        <div className="image ">
          <Link to={"/"}>
            <img src={logo} alt="" className="w-[180px] mix-blend-multiply" />
          </Link>
        </div>
        <div className="content flex justify-between gap-7">
          <Link to="/register">Register</Link>
          {
            localStorage.getItem('login')?<button className="cursor-pointer " onClick={handlelogin}>Logout</button>:
            <Link to="/">Login</Link>
          }
          
          
        </div>
      </div>
    </div>
  );
}

export default Header;
