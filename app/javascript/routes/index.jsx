import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordForm from "../components/authentication/forgotPassword";
import Dashboard from "../components/dashboard/index";
import ResetPasswordForm from "../components/authentication/resetPassword";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users/password/new" element={<ForgotPasswordForm />} />
      <Route path="/users/password/edit" element={<ResetPasswordForm />} />
    </Routes>
  </Router>
);
