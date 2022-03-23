import React, { useState, useEffect } from 'react'
import Todos from './components/todos'
import "./App.css"

function App() {
  const [input, setInput] = useState('')
  const [empty, setEmpty] = useState('Nothing to do yet')
  const [status, setStatus] = useState('doing')
  const [todos, setTodos] = useState([])
  const [number, setNumber] = useState(0)
  const [done, setDone] = useState(0)


  //adding a new todo to the list
  const addTodo =(e) => {
    e.preventDefault()
     const todo = {
       id: todos.length + 1,
       todo: input,
       status: status
     }

      setTodos([...todos, todo])
      setInput('')
    // todos.push(todo)

    
  }
  // console.log()


  //deleting a todo list with a filter method
  const deleteTodo = (id) =>{
    const remained = todos.filter((todo) => todo.id !== id)
    setTodos([...remained])

  
   
  }

  // const deleteTask = (id) => {
  //   const remainedList = todos.filter(todo => todo.id !== id)
  //   setTodos([...remainedList])
  // }

  

  //updating the status of the task by mapping through it
  //later we use spread operator to allow us edit the items in the object
  //toggling between done or pending with tenary operator
  const update = (id) => {
    const mapped = todos.map(item => {
      return item.id === id ? {...item, status: item.status === status? 'Done' : status}: {...item}
    })

    setTodos([...mapped])
  }

  

  //function to check the length of the todos
  //using filter to filter through the status
  //using useEffect to re render the function anytime a task is added
  const getDone = (arg) =>{
    const finish = todos.filter(todo => {
      return todo.status === arg
    })

    setDone(finish.length)
    // getDone('Done')
    // console.log(done)
  }

  useEffect(() => {
    getDone("Done")
    console.log(done)
  },[todos, done]);


  return (



    <div className='todoCard'>
      <h2>To-do App</h2>
    <div className='main'>
      <form onSubmit={addTodo}>
        <input type='text' placeholder='add a todo ....' value={input} onChange={(e) => setInput(e.target.value)}/>

        <button type='submit' disabled= {!input}>Add a todo</button>
      </form>


    </div>
{todos.length  > 0 && (

  <p><span>{done}  {done > 1 ? 'tasks' : "task"}  completed of {todos.length}</span></p>
)}
    
    <Todos tasks = {todos} deleteTodo = {deleteTodo} update = {update}/>
    {/* <p>{empty}</p> */}

    </div>
  )
}

export default App