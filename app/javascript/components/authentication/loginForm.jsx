import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { checkAuthenticationStatus } from '../../utility/authenticationStatus'

const loginForm = () => {
	useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await checkAuthenticationStatus('token');
            console.log('Authentication status:', response.authentication_status);
        } catch (error) {
            console.error('Error fetching authentication status:', error);
        }
        };
        fetchData();
    }, []);

  return(
	  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
	    <div className="jumbotron jumbotron-fluid bg-transparent" style={{marginTop: -250}}>
	      <div className="container secondary-color">
	        <h1 className="display-4 fw-bold">Sign In</h1>
	        <p className="lead small-font" style={{fontWeight: 400}}>
	          Enter your account details
	        </p>
            <p className="lead small-font fw-bold" style={{fontWeight: 400}}>
	          Email Address
	        </p>
            <input className="input-text fw-bold small-font" placeholder="Email Address" />
            <p className="lead small-font fw-bold mt-3" style={{fontWeight: 400}}>
	          Password
	        </p>
            <input className="input-text fw-bold small-font" placeholder="Password" />
            <div className="d-flex justify-content-between">
                <div className="mt-4 d-flex">
                    <input className="form-checkbox" type="checkbox" />
                    <label className="small-font fw-bold">
                        Remember me
                    </label>
                </div>
                <Link
                    to="/password/new"
                    className="small-font fw-bold recover-password mt-4"
                >
                    Recover Password
                </Link>
            </div>
	        <Link
	          to="/recipes"
	          className="btn d-block mt-4 fw-bold small-font input-text d-flex align-items-center justify-content-center button-style"
	          role="button"
	        >
	          Sign In
	        </Link>
	      </div>
	    </div>
	  </div>
  )
};

export default loginForm;
