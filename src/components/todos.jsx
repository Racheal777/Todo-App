import React from 'react'
import Todo from './todo'

function Todos( {tasks, deleteTodo, update}) {
    // console.log(tasks)


  return (
      <div>
          {
              tasks.length  ? (
                tasks.map((todo, i) => (
                    <div key={i}>
      
                          <Todo duty = {todo} del= {deleteTodo} update = {update}/>
                    </div>
                    
                ))
              ) : <p className='not'>Nothing to do yet</p>
          
          }
      </div>
    
  )
}

export default Todos