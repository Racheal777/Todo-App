import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Navigate, useNavigate} from "react-router-dom";



export default function Login() {
  //state for the user input
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ error , setError ] = useState('')
  const [ emailError, setEmailError] = useState('')
  const [ email2Error, setEmail2Error] = useState('')
  const [ passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()
  //function for saving the data
  //using the spread operator to get access to each object and assigning the value
  //to the field that matches the name
  const addUser = async (e) => {
    try {
      e.preventDefault();
      if(email === ''){
       return setEmailError("Please enter email")
      }else if(password === ''){
       return setPasswordError("Please enter password")
      }
      setLoading(true);
      const firstu = await axios.post("/api/users/login", {
        email,
       password,
      },
      //adding credentials to enable it set the cookie from the server
      // { withCredentials: true}
      );

      const res = firstu.data;
      setEmail("");
      setPassword("");
      setLoading(false);
      console.log(res)
      //if user is found, navigate the user to the todo app
      if(res){
        navigate('/todo')
        window.localStorage.setItem('userId',JSON.stringify(res._id))
        
      }

      
      // console.log(res);
    } catch (error) {
      if(error.message.includes("401")){
        setError("Email or password does not exist")
      }
      console.log(error);
    }
  };
    // console.log(email, password);

  // useEffect(() => {
  //   console.log("user is loading");
  // }, [loading]);

  return (
    <div>
      <section className="form-body">
        <form onSubmit={addUser}>
        

          <div className="title">
            <p>Welcome back </p>
            <h2>Login</h2>
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
             {!email && <span> {emailError} </span>}
             
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
            {!password && <span> {passwordError} </span>}
          </div>

          <button type="submit" onClick={addUser}>
            Login
          </button>

          <p>
            Forgot password ? <NavLink to="/forgotpassword">Click here</NavLink>
          </p>
          <p>
            Dont have an account <NavLink to="/register">Register</NavLink>
          </p>

        </form>
      </section>
    </div>
  );
}
