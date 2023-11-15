import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../components/authentication/loginForm";
import ForgotPasswordForm from "../components/authentication/forgotPassword";
import Dashboard from "../components/dashboard/index";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/forgot_password" element={<ForgotPasswordForm />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </Router>
);
