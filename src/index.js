import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './form.css'
import App from './App';
import Login from './components/login';
import PasswordReset from './auth/passwordReset';
import Signup from './components/signup';
import Forgotpassword from './auth/forgotPassword';
import VerifiedEmail from './auth/verifiedEmail';
import ResendLink from './auth/resendLink';

import reportWebVitals from './reportWebVitals';
import EmailVerifiedd from './auth/EmailVerified';
import {BrowserRouter, Routes, Route} from 'react-router-dom'



//axios making the api default
axios.defaults.baseURL = "http://localhost:7070"
axios.defaults.withCredentials = true

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
  <Routes>
  <Route path='/' element={<Login/>}></Route>
<Route path='/todo' element={<App />}></Route>
<Route path='/register' element={<Signup />}></Route>
<Route path='/forgotpassword' element={<Forgotpassword />}></Route>
<Route path='/reset-password/:resetToken' element={<PasswordReset/>}></Route>
<Route path='/verify-email/:id/:token' element={<EmailVerifiedd/>}></Route>
<Route path='/resend-link' element={<ResendLink/>}></Route>
  </Routes>

    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
