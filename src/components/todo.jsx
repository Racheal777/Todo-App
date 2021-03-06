import React, { useState, useEffect } from "react";
import "../App.css";

function Todo({ duty, del, update }) {
  const [ check, setCheck ] = useState(false);

  // console.log(setCheck)
  // useEffect(() => {
  //   console.log(check);
  // }, [check]);
  return (
    <div>
      <div className="todo" 
          style={
            duty.status === "done" || check
              ? { backgroundColor: "grey" }
              : { textDecoration: "none" }
          }>
            {/* {duty.status ==="done" && setCheck(!check)} */}
        <div className="check">
          <input
            type="checkbox"
            name="Check"
            checked={check}
            onChange={() => update(duty._id)} 
            
          />

          <p className="pp" onClick={() => update(duty._id)}>
            {duty.todo}
          </p>
        </div>

        <div className="btn">
          <p className="pending">{duty.status}</p>
          
          <button className="delete" onClick={() => del(duty._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
