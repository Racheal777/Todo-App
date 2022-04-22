import React, { useState, useEffect } from "react";
import "../App.css";

function Todo({ duty, del, update }) {
  const [ check, setCheck ] = useState(false);

  // console.log(setCheck)
  useEffect(() => {
    // console.log(check);
  }, [check]);
  return (
    <div>
      <div className="todo">
        <div
          className="check"
          style={
            duty.status === "done" || check
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          <input
            type="checkbox"
            name="Check"
            checked={check}
            onChange={() => setCheck(!check)}
          />

          <p className="pp" onClick={() => update(duty._id)}>
            {duty.todo}
          </p>
        </div>

        <div className="btn">
          <p className="pending">{duty.status}</p>
          {/* <button className='pending' onClick={() => update(duty.id)}>{duty.status}</button> */}
          <button className="delete" onClick={() => del(duty._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
