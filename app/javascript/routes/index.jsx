import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordForm from "../components/authentication/forgotPassword";
import Dashboard from "../components/dashboard/index";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/forgot_password" element={<ForgotPasswordForm />} />
    </Routes>
  </Router>
);
