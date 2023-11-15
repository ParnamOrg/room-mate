import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkAuthenticationStatus } from '../../utility/authenticationStatus'
import Dashboard from './dashboard'
import LoginForm from '../authentication/loginForm'

const index = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		console.log("SSD")
    fetch('/api/v1/authentication_status')
      .then(response => response.json())
      .then(data => {
        setLoggedIn(data.isLoggedIn);
      })
      .catch(error => {
        console.error('Error checking login:', error);
      });
   }, []);

  return(
  	<div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginForm />
      )}
    </div>
  )
};

export default index;
