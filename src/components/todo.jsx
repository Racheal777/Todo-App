
import React, { useState, useEffect } from 'react'
import "../App.css"

function Todo( {duty, del, update,} ) {
    const [check, setCheck] = useState(false)

    const checking = () => {
        if(check === false){
          setCheck(true)
        }else{
          setCheck(false)
        }
        
        
    }

    // console.log(setCheck)
    useEffect(() =>{
      // console.log(check);
    }, [check])
  return (


    <div>
        <div className='todo'>

        <div className='check' style={duty.status ==='done' || check? {textDecoration: "line-through"}: {textDecoration: "none"}}>
           
         {/* {!check? duty.status === "Done" : duty.status === "doing"} */}
           
         
            <input type="checkbox" name='Check' checked= {check}
             onChange={() => checking(duty._id)} onClick={() => update(duty._id)}/>


            <p className='pp'>{duty.todo}</p>
        </div>
        
        
        


        <div className='btn'>
          <p className='pending'>{duty.status}</p>
        {/* <button className='pending' onClick={() => update(duty.id)}>{duty.status}</button> */}
        <button className='delete' onClick={() => del(duty._id)}>Delete</button>
        </div>
       
        </div>

        
         
    </div>
  )
}

export default Todo