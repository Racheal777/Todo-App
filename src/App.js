import React, { useState, useEffect } from "react";
import axios from "axios";
import Todos from "./components/todos";
import "./App.css";
import Success from "./components/success";
import { Navigate, useNavigate } from "react-router-dom";
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

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [input, setInput] = useState("");

  const [todos, setTodos] = useState([]);

  const [done, setDone] = useState(0);
  const [loading, setLoading] = useState(false);

  //reset password
  const [user, setUser] = useState("");
  const [Emailuser, setEmailUser] = useState("");

  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmNewpassword] = useState("");

  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [CpasswordError, setCPasswordError] = useState("");
  const [newpassworderror, setNewpassworderror] = useState("");
  const [error, setError] = useState("");
  const [confirmerror, setConfirmError] = useState("");

  let navigate = useNavigate();

  //adding a new todo to the list
  const addTodo = async (event) => {
    try {
      event.preventDefault();
      //using axios to post

      setLoading(true);
      // console.log(loading)
      const add = await axios.post(
        `/savetodo/${JSON.parse(localStorage.getItem("id"))}`,
        {
          todo: input,
          // id: JSON.parse(localStorage.getItem('userId'))
        }
      );

      setInput("");

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //delete a todo
  //using the loading in the useeffect to allow it function apply to the delete
  // when loading is true whilst deleting
  //clear the deleted item if its false, when item gets deleted
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      const deleteATodo = await axios.delete(
        `/deletetodo/${id}`
        // { withCredentials: true }
      );
      // console.log(deleteATodo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Update by first fetching one todo,
  //then we check it status and update accordingly
  const update = async (id) => {
    try {
      setLoading(true);
      const getOne = await axios.get(`/gettodo/${id}`);
      const { data } = getOne;

      // setLoading(false)
      if (data.status === "pending") {
        let updated = await axios.put(
          `/updatetodo/${data._id}`,
          {
            status: "done",
          }
          // { withCredentials: true }
        );
        // setLoading(true)
      } else {
        let updat = await axios.put(
          `/updatetodo/${data._id}`,
          {
            status: "pending",
          }
          // { withCredentials: true }
        );
        console.log(updat);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //fetching all todos
  useEffect(() => {
    const fetching = async () => {
      const getTodos = await axios.get(
        `/api/users/oneuser/${JSON.parse(localStorage.getItem("id"))}`
      );
      const { data } = getTodos;
      // const res = getTodos.data
      // console.log(data)
      setTodos(data.user.todos);
      setUser(data.user.username);
      setEmailUser(data.user.email);
    };
    fetching();
    // console.log(loading)
  }, [loading]);

  const logout = async () => {
    try {
      const logg = await axios.get("/api/users/loggingout", {
        withCredentials: true,
      });

      console.log(logg);
      //navigating to homepage after looging out
      if (logg.data) {
        navigate("/");
        localStorage.removeItem("userId");
        localStorage.removeItem("id");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //change password
  const passwordChange = async (e) => {
    e.preventDefault();
    try {
      if (newpassword === password) {
        setNewpassworderror("cannot change new password with old");
      } else if (password === "") {
        setPasswordError("password required");
      } else if (newpassword === "") {
        setNewpassworderror("newpassword required");
        // console.log("newpassword required")
      } else if (confirmnewpassword === "") {
        setError("password required");
        // console.log("password required")
      }
      if (confirmnewpassword === newpassword) {
        console.log(typeof JSON.parse(localStorage.getItem("id")));
        console.log(JSON.parse(localStorage.getItem("id")));
        const pass = await axios.put(
          `/api/users/reset/${JSON.parse(localStorage.getItem("id"))}`,
          {
            email: Emailuser,
            password,
            newpassword,
          }
        );
        if (pass.data) {
          setSuccess("Password changed successfully");

          //setting timeout
          setTimeout(() => {
            navigate("/");
            localStorage.removeItem("userId");
            localStorage.removeItem("id");
          }, 4000);
        }
        console.log(pass.data);
        handleClose();
      } else {
        setError("password do not match");
        console.log("password do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // logout()

  //function to check the length of the todos
  //using filter to filter through the status
  //using useEffect to re render the function anytime a task is added
  const getDone = (arg) => {
    const finish = todos.filter((todo) => {
      return todo.status === arg;
    });

    setDone(finish.length);
    // getDone('Done')
    // console.log(done)
  };

  useEffect(() => {
    getDone("done");
    // console.log(done)
  }, [todos, done]);

  return success ? (
    <Success />
  ) : (
    <Container fluid>
      <Row className="mains">
        <div className="todoCard">
          <Col>
            <div className="logout">
              <Button variant="primary" onClick={logout}>
                Logout
              </Button>

              <>
                <Button variant="primary" onClick={handleShow}>
                  Change password
                </Button>

                <>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={passwordChange}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            value={Emailuser}
                            placeholder="name@example.com"
                            autoFocus
                            onChange={(e) => setEmailUser(Emailuser)}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Old Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={password}
                            autoFocus
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span> {passwordError} </span>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={newpassword}
                            autoFocus
                            onChange={(e) => setNewpassword(e.target.value)}
                          />
                          <span> {newpassworderror} </span>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={confirmnewpassword}
                            autoFocus
                            onChange={(e) =>
                              setConfirmNewpassword(e.target.value)
                            }
                          />
                          <span>{error}</span>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={passwordChange}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </>
            </div>
          </Col>
          <Col>
            <h2>To-do App</h2>

            <p>
              Welcome <strong> {user} </strong>
            </p>

            <div className="main">
              <form onSubmit={addTodo} className="form">
                <input
                  type="text"
                  placeholder="add a todo ...."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <button type="submit" disabled={!input} onClick={addTodo}>
                  Add a todo
                </button>
              </form>

              {loading && <div style={{ color: "red" }}>Please wait ....</div>}
            </div>
          </Col>

          <Col>
            {todos.length > 0 && (
              <p>
                <span>
                  {done} {done > 1 ? "tasks" : "task"} completed of{" "}
                  {todos.length}
                </span>
              </p>
            )}

            <Todos tasks={todos} deleteTodo={deleteTodo} update={update} />
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default App;
