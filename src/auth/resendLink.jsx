import React, { useState, useEffect } from "react";
import axios from "axios";
import Successful from "../components/successful";
import VerifiedEmail from "./verifiedEmail";
import {
  Row,
  Col,
  Container,
  Form,
  FormControl,
  Button,
  Carousel,
  Modal,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const ResendLink = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  //function
  const resendLink = async (e) => {
    try {
      e.preventDefault();
      if (email === "") {
        return setEmailError("Please enter email");
      }
      setLoading(true);
      const checkEmail = await axios.get(`/api/users/resend-link`,{
          email
      });

      console.log(checkEmail);
      if (checkEmail.data) {
        setSuccess("Link has been sent to your mail");
      }
      setEmail("");

      // setTimeout(() => {
      //   navigate("/");
      // }, 4000)
      setLoading(false);
    } catch (error) {
      if (error.message.includes("401")) {
        setError("Email or password does not exist");
      }
      console.log(error);
    }
  };
  return success ? (
    <VerifiedEmail />
  ) : (
    <div>
      <Container fluid>
        <Row className="formz">
          <Col xs={12} md={5}>
            <section className="form-body">
              <form onSubmit={resendLink}>
                <div className="title">
                  <h2> Resend Link</h2>
                </div>
                <div className="full">{error && <span> {error} </span>}</div>

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

                <button type="submit" onClick={resendLink}>
                  Send
                </button>
              </form>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResendLink;
