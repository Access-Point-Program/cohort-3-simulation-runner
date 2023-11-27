import React, { useState } from "react";
import Grid from "../Components/grid";
import Legend from "../Components/Legend";
import Layouts from "../Data/Layouts.json";
import Rulesets from "../Data/Rulesets.json";
import Settings from "../Components/Settings";
import "./Simulation.css";

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
    <div data-testid="simulation">
      <h1>Simulation Page</h1>

      <div className="content-container">
        <Legend />
        <Grid data={selectedLayout} />
      </div>

      <div className="settings-container">
        <Settings
          layout={Layouts}
          onSelect={handleLayoutChange}
          ruleset={Rulesets}
        />
      </div>
    </div>
  );
}

export default Simulation;
