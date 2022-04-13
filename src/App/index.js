import React from "react";

import Tasks from "../components/Tasks";
import NavBar from "../components/NavBar";

import "./index.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Tasks />
    </React.Fragment>
  );
}

export default App;