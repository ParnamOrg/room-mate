import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordForm from "../components/authentication/forgotPassword";
import Dashboard from "../components/dashboard/index";
import { AlertProvider } from '../components/context/alertContext';

export default (
  <Router>
    <AlertProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/forgot_password" element={<ForgotPasswordForm />} />
        {/*<Route path="/users/password/edit" element={<ResetPasswordForm />} />*/}
      </Routes>
    </AlertProvider>
  </Router>
);
