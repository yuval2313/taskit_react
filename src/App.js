import React from "react";

import Tasks from "./components/Tasks";
import NavBar from "./components/NavBar";

import "./styles/App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Tasks />
      </main>
    </React.Fragment>
  );
}

export default App;
