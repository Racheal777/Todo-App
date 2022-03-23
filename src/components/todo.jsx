
import React, { useState } from 'react'
import "../App.css"

function Todo( {duty, del, update,} ) {
    const [check, setCheck] = useState(false)

    // const checking = () => {
    //     setCheck(true)
        
        
    // }

    // console.log(setCheck)
  return (


    <div>
        <div className='todo'>

        <div className='check' style={!check ? {textDecoration : "none"} 
        :{textDecorationLine: 'line-through', textDecorationStyle: 'solid', backgroundColor:"gray",  }
         }>
           
         {/* {!check? duty.status === "Done" : duty.status === "doing"} */}
           
         
            <input type="checkbox" name='Check' checked= {check}
             onChange={() => setCheck(!check)} onClick={() => update(duty.id)}/>


            <p className='pp'>{duty.todo}</p>
        </div>
        
        
        


        <div className='btn'>
          <p className='pending'>{duty.status}</p>
        {/* <button className='pending' onClick={() => update(duty.id)}>{duty.status}</button> */}
        <button className='delete' onClick={() => del(duty.id)}>Delete</button>
        </div>
       
        </div>

        
         
    </div>
  )
}

export default Todo