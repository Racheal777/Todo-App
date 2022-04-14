import React, { useState, useEffect } from "react";
import axios from "axios";
import Todos from "./components/todos";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [statuss, setStatuss] = useState("pending");
  const [todos, setTodos] = useState([]);
  const [number, setNumber] = useState(0);
  const [done, setDone] = useState(0);
  const [loading, setLoading] = useState(false);
  

  //adding a new todo to the list
  const addTodo = async (event) => {
    try {
      event.preventDefault();
      //using axios to post

      setLoading(true);
      // console.log(loading)
      const add = await axios.post("http://localhost:7070/savetodo", {
        todo: input,
      });

      setInput("");

      setLoading(false);
      // console.log(loading)

      // const res = add.data;
      // console.log(res);
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
        `http://localhost:7070/deletetodo/${id}`
      );

      // console.log(deleteATodo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Update
  const update = async (id) => {
    try {
      setLoading(true)
      const getOne = await axios.get(`http://localhost:7070/gettodo/${id}`)
      const {data} = getOne
      console.log(data)

      // setLoading(false)
      if(getOne.data.status === "pending"){
        let updated = await axios.put(`http://localhost:7070/updatetodo/${getOne.data._id}`,{
          
          status: 'done'
        })


        // setLoading(true)  
      }else{
        let updated = await axios.put(`http://localhost:7070/updatetodo/${data._id}`,{
          
          status: 'pending'}) 
          console.log(updated)
      }


      setLoading(false)
       
    } catch (error) {
      console.log(error)
      
    }
    
  }

  useEffect(() => {
    const fetching = async () => {
      const getTodos = await axios.get("http://localhost:7070/gettodo");

      // console.log(getTodos);

      const { data } = getTodos;

      setTodos(data);
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
      <h2>To-do App</h2>

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
      {/* <p>{empty}</p> */}
    </div>
  );
}

export default App;
