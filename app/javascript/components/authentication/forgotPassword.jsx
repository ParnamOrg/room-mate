import React, { useState } from "react";
import axios from "axios";
import { csrfToken } from '../../config/variables';

const forgotPassword = () => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async () => {
        try {
            const response = await axios.post('/api/v1/users/password/new', {
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
                // show success msg
            }

        } catch (error) {
          console.error('Login failed:', error.response?.data || error.message);
        }

        setEmail('')
    };

    return (
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    	    <div className="jumbotron jumbotron-fluid bg-transparent" style={{marginTop: -250}}>
    	      <div className="container secondary-color">
                <form>
        	        <h1 className="display-5 fw-bold">Forgot Password?</h1>
        	        <p className="lead small-font" style={{fontWeight: 400, width: 400}}>
                        Enter your email below, you will receive an email with instructions on how to reset your password in a few minutes. You can also set a new password if you've never set one before.
        	        </p>
                    <p className="lead small-font fw-bold" style={{fontWeight: 400}}>
        	          Email Address
        	        </p>
                    <input className="input-text fw-bold small-font" placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
        	        <button type="button" onClick={handlePasswordReset}
        	          className="btn btn-lg d-block mt-4 fw-bold small-font input-text d-flex align-items-center justify-content-center button-style"
        	        >
        	          Start Recovery
        	        </button>
                </form>
    	      </div>
    	    </div>
	    </div>
    )
}

export default forgotPassword;
