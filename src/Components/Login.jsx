import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TrackerCreatContext } from "../Context/TrackerContext";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { setRows, itemName, itemPrice } = useContext(TrackerCreatContext);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !pass) {
        return toast.error("All fields are required");
      }

      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailRegex.test(email)) {
        return toast.error("Invalid email format");
      }

      if (pass.length < 4) {
        return toast.error("Password must be at least 4 characters long");
      }

      const response = await axios.get("http://localhost:8000/users");
      const users = response.data;

      const userIsValid = users.find(
        (user) => user.email === email && user.pass === pass
      );

      if (userIsValid) {
        localStorage.setItem("login", true);
        localStorage.setItem("useremail", email);
        toast.success("Successfully Logged In");
        navigate("/dashboard");

        const itemdeleteget =await axios.get("http://localhost:8000/items");
        const items = itemdeleteget.data;
        for (const item of items) {
          await axios.delete(`http://localhost:8000/items/${item.id}`);
        }
        setRows([])
        localStorage.setItem("Amount", 0);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="p-8 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
