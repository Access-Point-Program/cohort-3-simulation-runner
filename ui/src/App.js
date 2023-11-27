// App.js

import "./App.css";
import React from "react";
import SideBar from "./Components/Sidebar";
import Simulation from "./pages/Simulation";
import "./App.css"; // Import your CSS file for styling

function App() {
  return (
    <div className="app-container">
      <SideBar data-testid="sidebar" />
      <div className="content-container">
        <Simulation data-testid="simulation" />
      </div>
    </div>
  );
}

export default App;
