import React, { useState } from "react";
import axios from "axios";
import { csrfToken, currentDomainUrl } from '../../config/variables';
import { useLocation, useNavigate } from 'react-router-dom';

const resetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const location = useLocation();
    const navigate = useNavigate();

    const handlePasswordReset = async () => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email')

        try {
            const response = await axios.put(`${currentDomainUrl}/api/v1/users/reset_password`, {
                password: password,
                email: email
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': csrfToken,
                },
            }
            );

            if (response.status === 200){
                navigate('/');
            }

        } catch (error) {
          console.error('Login failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
    	    <div className="jumbotron jumbotron-fluid bg-transparent mt-5">
    	      <div className="container secondary-color">
                <form>
        	        <h2 className="fw-bold">Change your password</h2>
                    <p className="lead small-font fw-bold mt-5" style={{fontWeight: 400}}>
        	          New Password
        	        </p>
                    <input className="input-text fw-bold small-font" placeholder="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                    <p className="lead small-font fw-bold mt-3" style={{fontWeight: 400}}>
                      Confirm Password
                    </p>
                    <input className="input-text fw-bold small-font" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
        	        <button type="button" onClick={handlePasswordReset}
        	          className="btn btn-lg d-block mt-4 fw-bold small-font input-text d-flex align-items-center justify-content-center button-style"
        	        >
        	          Reset Password
        	        </button>
                </form>
    	      </div>
    	    </div>
	    </div>
    )
}

export default resetPassword;
