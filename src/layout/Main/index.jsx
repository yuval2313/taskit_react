import React from "react";

import NavBar from "containers/NavBar";
import Tasks from "containers/Tasks";

function Main() {
  return (
    <React.Fragment>
      <NavBar />
      <Tasks />
    </React.Fragment>
  );
}

export default Main;
