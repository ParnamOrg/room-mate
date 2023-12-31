import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { currentDomainUrl, csrfToken} from '../../config/variables';
import Cookies from 'js-cookie';
import ErrorAlert from "./errorAlert";
import { useNavigate } from "react-router-dom";

const loginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertOpacity, setAlertOpacity] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
      try {
          const response = await axios.post(`${currentDomainUrl}/api/v1/users/sign_in`, {
              user: {
                  email: email,
                  password: password,
              }
          },
          {
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
              },
          }
          );

          if (response.data.logged_in){
              Cookies.set('authorization_token', `Bearer ${response.data.user.token}`);
              setAlertOpacity(1);
              setAlertMessage(response.data.messages);

              navigate(0);
          }


      } catch (error) {
        setAlertOpacity(1);

        setAlertMessage(error.response?.data.messages);
        setEmail('');
        setPassword('');
        setIsErrorMessage(true);
      }

      setTimeout(() => {
        setAlertOpacity('');
      }, 3000);
    };

  return(
    <div className="d-flex align-items-center justify-content-center">
      <ErrorAlert message={alertMessage} class={alertOpacity ? 'show-component' : 'fade-component'} onclick={() => {setAlertOpacity('')}} color={isErrorMessage ? '#DF3F32' : '#07bc0c'} />
      <div className="jumbotron jumbotron-fluid bg-transparent mt-5">
        <div className="container secondary-color">
          <form>
              <h1 className="display-4 fw-bold">Sign In</h1>
              <p className="lead small-font" style={{fontWeight: 400}}>
                Enter your account details
              </p>
              <p className="lead small-font fw-bold" style={{fontWeight: 400}}>
                Email Address
              </p>
              <input className="input-text fw-bold small-font" placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
              <p className="lead small-font fw-bold mt-3" style={{fontWeight: 400}}>
                Password
              </p>
              <input className="input-text fw-bold small-font" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className="d-flex justify-content-between">
                  <div className="mt-4 d-flex">
                      <input className="form-checkbox" type="checkbox" />
                      <label className="small-font fw-bold">
                          Remember me
                      </label>
                  </div>
                  <button type="button" onClick={() => navigate('users/password/new')}
                    className="btn small-font fw-bold recover-password mt-3"
                  >
                    Recover Password
                  </button>
              </div>
              <button type="button" onClick={handleLogin}
                className="btn btn-lg d-block mt-4 fw-bold small-font input-text d-flex align-items-center justify-content-center button-style"
              >
                Sign In
              </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default loginForm;
