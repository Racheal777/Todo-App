import axios from "axios";
import React, { useState } from "react";
import { Navigate, NavLink,  useNavigate} from "react-router-dom";



const Signup = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ confirmPassword, setconfirmPassword ] = useState("");
  const [ error, setError ] = useState('')
  const [ emailError, setEmailError] = useState('')
  const [ email2Error, setEmail2Error] = useState('')
  const [ passwordError, setPasswordError] = useState('')
  
  
  let navigate = useNavigate();
  //function for saving the data
  const addUser = async (e) => {
    try {
      e.preventDefault();

      if(email === ''){
        setEmailError("Please enter email")
      }else if(password === ''){
        setPasswordError("Please enter password")
      }else if(confirmPassword === ''){
        setError("Please confirm your password")
      }else if(password.length < 7){
        setPasswordError('password must be more than 7')
      }
    else if(password === confirmPassword){
      const firstu = await axios.post("/api/users/save", {
        username,
        email,
        password,
     },
     // {withCredentials: true}
     );

     setEmail("");
     setPassword('')
     setUsername('')
     setconfirmPassword('')
     const res = firstu.data

     //if user is saved navigate to the todo page
     if(res.user){
       navigate('/')   
     }
     console.log(res)
    //  if(res === "Email already exist"){
    //    setEmailError(res)
    //  };
    }else{
      setError("password do not match")
      console.log('password do not match')
    }
      //making a request to the api with axios for saving user data
      

    } catch (error) {
      if(error.message.includes("409")){
        setEmail2Error("Email already taken")
      }
      console.log(error);
    }
  };

  // console.log(email, password, username);
  return (
    <div>
      <section className="form-body">
        <form onSubmit={addUser}>
          <div className="title">
            <h2>Register</h2>
          </div>

          <div className="full">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
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
            {!email && <span> {emailError} </span>}
            {email2Error && <span> {email2Error} </span> } 
          </div>

          <div className="full">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span> {passwordError} </span>
             
          </div>

          <div className="full">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="*********"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
           
           <span> {error} </span>
          </div>

          <button
            type="submit"
            // disabled={!email && !password && !username && !confirmPassword}
            onClick={addUser}
          >
            Create Account
          </button>

          <p>
            Have an account <NavLink to="/">Login</NavLink>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Signup;
