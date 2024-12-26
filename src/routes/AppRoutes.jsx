import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Register from "../Components/Register";
import Login from "../Components/Login";

import Error from "../Components/Error";
import Dashboard from "../Components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
