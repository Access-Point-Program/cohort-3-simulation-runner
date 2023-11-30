import React, { useState } from "react";
import Grid from "../Components/grid";
import Legend from "../Components/Legend";
import Settings from "../Components/settings";
// Fix settings
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
    <div>

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

export default Simulation;
