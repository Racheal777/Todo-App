import React, { useState, useEffect, useParams } from "react";
import axios from "axios";
import Successful from "../components/successful";
import Success from "../components/success";


import { Navigate, useNavigate} from "react-router-dom";

export default function PasswordReset() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [ newpassword, setNewpassword ] = useState('')
    const [ confirmnewpassword, setConfirmNewpassword ] = useState('')
    
    const [ success, setSuccess ] = useState('')
    const [ passwordError, setPasswordError] = useState('')
    const [ CpasswordError, setCPasswordError] = useState('')
    const [ newpassworderror, setNewpassworderror ] = useState("");
    const [ error, setError ] = useState('')
  
  const navigate = useNavigate()
  //function for saving the data
  //using the spread operator to get access to each object and assigning the value
  //to the field that matches the name
  //change password
  const passwordChange = async (e) =>{
    e.preventDefault()
    try {
      if(newpassword === password){
        setNewpassworderror("cannot change new password with old")
      }else if(password = ""){
        setPasswordError("password required")
      }else if(newpassword = ""){
        setNewpassworderror("newpassword required")
        // console.log("newpassword required")
      }else if(confirmnewpassword = ""){
        setError("password required")
        // console.log("password required")
      }
      if(confirmnewpassword === newpassword){
        const pass = await axios.put(`/api/users/reset/${JSON.parse(localStorage.getItem('userId'))}`,{
          email: email,
          password,
          newpassword
        })
        if(pass.data){
          setSuccess('Password changed successfully')

          //setting timeout
          setTimeout(() => {
             navigate("/");
          }, 4000)
          
        }
        console.log(pass.data)
        
      }else{
        setError("password do not match")
        console.log("password do not match")
      }
      

    } catch (error) {
      console.log(error)
    }
    
  }
  return (success ? (
    <Success/>
    ):
    <div>
      <section className="form-body">
        <form onSubmit={passwordChange}>
        

          <div className="title">
            <p>Welcome back </p>
            <h2>Reset Password</h2>
          </div>
          <div className="full">
          {error && <span> {error} </span> } 
          </div>
         

          <div className="full">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="******@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
             {/* {!email && <span> {emailError} </span>} */}
             
          </div>

          <div className="full">
            <label>Old Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!password && <span> {passwordError} </span>}
          </div>

          <div className="full">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={newpassword}
              placeholder="*********"
              onChange={(e) => setNewpassword(e.target.value)}
            />
           <span> {newpassworderror} </span>
          </div>

          <div className="full">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="password"
              value={confirmnewpassword}
              placeholder="*********"
              onChange={(e) => setConfirmNewpassword(e.target.value)}
            />
             <span>{error}</span>
          </div>

          <button type="submit" onClick={passwordChange}>
            Reset Password
          </button>

          
        </form>
      </section>
    </div>
  );
}
