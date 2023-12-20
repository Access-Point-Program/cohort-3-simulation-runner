import React from "react";
import SideBar from "./Components/Sidebar";
import Grid from "./Components/grid";
import Legend from "./Components/Legend";
import Settings from "./Components/Settings"
import "./App.css"; // Import your CSS file for styling

function App() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="content-container">
        <div className="content-container">
          <Legend />
          <Grid data={{}} />
        </div>

        <div className="settings-container">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default App;
