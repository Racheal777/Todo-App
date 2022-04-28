import React, { useState, useEffect } from "react";
import axios from "axios";
import Todos from "./components/todos";
import "./App.css";
import { Navigate, useNavigate } from "react-router-dom";

function App() {
  const [ input, setInput ] = useState("");
  
  const [ todos, setTodos ] = useState([]);
  
  const [ done, setDone ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  let navigate = useNavigate();

  //adding a new todo to the list
  const addTodo = async (event) => {
    try {
      event.preventDefault();
      //using axios to post

      setLoading(true);
      // console.log(loading)
      const add = await axios.post(`http://localhost:7070/savetodo/${JSON.parse(localStorage.getItem('userId'))}`, {
        todo: input,
        // id: JSON.parse(localStorage.getItem('userId'))
      });

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
        `http://localhost:7070/deletetodo/${id}`,
        { withCredentials: true }  
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
      const getOne = await axios.get(`http://localhost:7070/gettodo/${id}`);
      const { data } = getOne;

      // setLoading(false)
      if (data.status === "pending") {
        let updated = await axios.put(
          `http://localhost:7070/updatetodo/${data._id}`,
          {
            status: "done",
          },
          { withCredentials: true }
        );
        // setLoading(true)
      } else {
        let updat = await axios.put(
          `http://localhost:7070/updatetodo/${data._id}`,
          {
            status: "pending",
          },
          { withCredentials: true }
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
      const getTodos = await axios.get(`http://localhost:7070/api/users/oneuser/${JSON.parse(localStorage.getItem('userId'))}`);
      const { data } = getTodos;
      // const res = getTodos.data
      console.log(data)
      setTodos(data.user.todos);
    };
    fetching();
    // console.log(loading)
  }, [loading]);

  // const addTodo =(e) => {
  //   e.preventDefault()
  //    const todo = {
  //      id: todos.length + 1,
  //      todo: input,
  //      status: status
  //    }

  //     setTodos([...todos, todo])
  //     setInput('')
  //   // todos.push(todo)

  // }
  // console.log()

  //deleting a todo list with a filter method
  // const deleteTodo = (id) => {
  //   const remained = todos.filter((todo) => todo.id !== id);
  //   setTodos([...remained]);
  // };

  //updating the status of the task by mapping through it
  //later we use spread operator to allow us edit the items in the object
  //toggling between done or pending with tenary operator
  // const update = (id) => {
  //   const mapped = todos.map((item) => {
  //     return item.id === id
  //       ? { ...item, status: item.status === status ? "Done" : status }
  //       : { ...item };
  //   });

  //   setTodos([...mapped]);
  // };

  const logout = async () => {
    try {
      const logg = await axios.get(
        "http://localhost:7070/api/users/loggingout",
        { withCredentials: true }
      );

      console.log(logg);
      //navigating to homepage after looging out
      if (logg.data) {
        navigate("/");
        localStorage.removeItem("userId")
        localStorage.removeItem("name")
      }
    } catch (error) {
      console.log(error.message);
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

  return (
    <div className="todoCard">
      <div className="logout">
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>

      <h2>To-do App</h2>
    <p>Welcome <strong>{JSON.parse(localStorage.getItem("name"))}</strong></p>
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

      {todos.length > 0 && (
        <p>
          <span>
            {done} {done > 1 ? "tasks" : "task"} completed of {todos.length}
          </span>
        </p>
      )}

      <Todos tasks={todos} deleteTodo={deleteTodo} update={update} />
      
    </div>
  );
}

export default App;
