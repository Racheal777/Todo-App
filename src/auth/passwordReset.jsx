import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
    const [userEmail, setUserEmail ] = useState('')
  
  const navigate = useNavigate()
  const { resetToken } = useParams()

  //grabing the token

  

  
  //function for saving the data
  //using the spread operator to get access to each object and assigning the value
  //to the field that matches the name
  //change password
  const passwordChange = async (e) =>{
    e.preventDefault()
    try {
      
     if(newpassword === ""){
        setNewpassworderror("newpassword required")
        
      }else if(confirmnewpassword === ""){
        setError("password required")
        
      }
      if(confirmnewpassword === newpassword){
        console.log('checking')
        const pass = await axios.put(`/api/users/resetpassword/${resetToken}`,{
         newpassword
        })
        if(pass.data){
          setSuccess('Password changed successfully')

          //setting timeout
          setTimeout(() => {
             navigate("/");
          }, 4000)
          
        }
        // console.log(pass.data)
        
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
            {/* <p>Welcome back </p> */}
            <h2>Reset Password</h2>
          </div>
          <div className="full">
          {error && <span> {error} </span> } 
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
