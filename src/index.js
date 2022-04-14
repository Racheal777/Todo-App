import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './form.css'
import App from './App';
import Login from './components/login';
import Signup from './components/signup';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
  <Routes>
  <Route path='/' element={<Login/>}></Route>
<Route path='/todo' element={<App />}></Route>
<Route path='/register' element={<Signup />}></Route>
  </Routes>

    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
