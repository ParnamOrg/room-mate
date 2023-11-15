import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkAuthenticationStatus } from '../../utility/authenticationStatus'
import { extractToken } from '../../utility/authenticationStatus'
import Dashboard from './dashboard'
import LoginForm from '../authentication/loginForm'
import { csrfToken } from '../../config/variables';

import Cookies from 'js-cookie';
import axios from 'axios';

const index = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

	useEffect(() => {
    const token = extractToken(Cookies.get('authorization_token'));

    if (token) {
      fetch(`/api/v1/authentication_status?token=${token}`)
        .then(response => response.json())
        .then(data => {
          setLoggedIn(data.authorized);
        })
        .catch(error => {
          console.error('Error checking login:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
   }, []);

  return(
  	<div>
      {isLoading ? (
        <></>
      ) : isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginForm />
      )}
    </div>
  )
};

export default index;
