import React from "react";
import "../styles/Task.css";

function Task(props) {
  return (
    <article className="task">
      <div className="task-header">
        <input type="text" />
      </div>
      <div className="task-content">
        <span className="task-text" role="textbox" contentEditable></span>
      </div>
      <div className="task-footer">
        <span className="task-date">
          Created At: {new Date().toDateString()}
        </span>
        <button className="btn btn-submit">Submit</button>
      </div>
    </article>
  );
}

export default Task;
