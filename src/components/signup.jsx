import axios from "axios";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";

const Signup = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ confirmPassword, setconfirmPassword ] = useState("");
  

  //function for saving the data
  const addUser = async (e) => {
    try {
      e.preventDefault();
    

      const firstu = await axios.post("http://localhost:7070/api/users/save", {
        username: username,
        email: email,
        password: password,
      });

      setEmail("");
      setPassword('')
      setUsername('')
      const res = firstu.data

      if(res.user){
          <Navigate to="/todo"></Navigate>
      }
      console.log(res.user);

    } catch (error) {
      console.log(error);
    }
  };

  console.log(email, password, username);
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

          <div className="full">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="*********"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!email && !password && !username}
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
