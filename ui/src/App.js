import "./App.css";
import React, { useState } from "react";
import Grid from "../Components/grid";
import Legend from "../Components/Legend";
import Settings from "../Components/settings";
import "./Simulation.css";
import React from "react";
import SideBar from "./Components/Sidebar";
import Simulation from "./pages/Simulation";
import "./App.css"; // Import your CSS file for styling

function App() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="content-container">
        <Simulation />
      </div>
    </div>
  );
}

function Simulation() {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedRuleset, setSelectedRuleset] = useState(null);

  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);
  };

  const handleRulesetChange = (ruleset) => {
    setSelectedRuleset(ruleset);
  };

  return (
    <div>
      <h1>Simulation Page</h1>

      <div className="content-container">
        <Legend />
        <Grid data={selectedLayout} />
      </div>

      <div className="settings-container">
        <Settings
          layout={{}}
          onSelect={handleLayoutChange}
          ruleset={{}}
        />

      </div>
    </div>
  );
}


export default App;
