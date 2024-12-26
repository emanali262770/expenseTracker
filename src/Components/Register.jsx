import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (!email || !name || !pass)
        return toast.error("Some field are missing");

      const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regex.test(email)) {
        return toast.error("Email is invalid");
      }
      if (name.length < 4) {
        return toast.error("Username lenght is less");
      }
      if (pass.length < 4) {
        return toast.error("password lenght is less");
      }

      await axios.post("http://localhost:8000/users", { name, email, pass });
      toast.success("succesfully Registerd");
      setemail("");
      setname("");
      setpass("");
      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="h-[70vh] flex items-end justify-center ">
      <div className="bg-white p-8 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl  w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Register
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
