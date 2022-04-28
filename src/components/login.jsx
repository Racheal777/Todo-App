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

  const navigate = useNavigate()
  //function for saving the data
  //using the spread operator to get access to each object and assigning the value
  //to the field that matches the name
  const addUser = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      const firstu = await axios.post("http://localhost:7070/api/users/login", {
        email,
       password,
      },
      //adding credentials to enable it set the cookie from the server
      { withCredentials: true});

      const res = firstu.data;
      setEmail("");
      setPassword("");
      setLoading(false);
      console.log(res)
      //if user is found, navigate the user to the todo app
      if(res){
        navigate('/todo')
        window.localStorage.setItem('userId',JSON.stringify(res._id))
        window.localStorage.setItem('name', JSON.stringify(res.username))
      }

      
      console.log(res);
    } catch (error) {
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="******@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
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
          </div>

          <button type="submit" onClick={addUser}>
            Login
          </button>

          <p>
            Dont have an account <NavLink to="/register">Register</NavLink>
          </p>
        </form>
      </section>
    </div>
  );
}
