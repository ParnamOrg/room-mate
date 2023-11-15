import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "../components/authentication/loginForm";
import ForgotPasswordForm from "../components/authentication/forgotPassword";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/forgot_password" element={<ForgotPasswordForm />} />
    </Routes>
  </Router>
);
