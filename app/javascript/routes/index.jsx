import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "../components/authentication/loginForm";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
  </Router>
);
