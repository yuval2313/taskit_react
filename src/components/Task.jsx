import React from "react";
import "../styles/Task.css";
import "@fortawesome/fontawesome-free/css/all.css";

function Task(props) {
  return (
    <article className="task">
      <div className="task-header">
        <span className="task-title" role="textbox" contentEditable></span>
        <i className="far fa-times-circle"></i>
      </div>
      <hr className="separator" />
      <div className="task-content">
        <span className="task-text" role="textbox" contentEditable></span>
        <span className="task-date muted">
          Edited: {`${new Date().getHours()}:${new Date().getMinutes()}`}
        </span>
      </div>
      {/* <hr className="separator" /> */}
      <div className="task-footer">
        <i className="far fa-bell"></i>
        <button className="btn btn-submit">Submit</button>
      </div>
    </article>
  );
}

export default Task;
