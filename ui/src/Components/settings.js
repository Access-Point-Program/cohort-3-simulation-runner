import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

function Settings({ layout, onSelect, ruleset }) {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [layoutOptions, setLayoutOptions] = useState([]);
  const [selectedRuleset, setSelectedRuleset] = useState(null);
  const [rulesetOptions, setRulesetOptions] = useState([]);

  useEffect(() => {
    // Map layout options
    const options = Object.keys(layout).map((key) => ({
      value: key,
      label: layout[key].name,
    }));
    setLayoutOptions(options);

    // If there are options and selectedLayout is not set, set the first option as default
    if (options.length > 0 && !selectedLayout) {
      setSelectedLayout(options[0]);
      onSelect(layout[options[0].value]);
    }
  }, [layout, onSelect, selectedLayout]);

  useEffect(() => {
    // Map ruleset options
    const options2 = Object.keys(ruleset).map((key) => ({
      value: key,
      label: ruleset[key].name,
    }));
    setRulesetOptions(options2);
  }, [ruleset]);

  const handleLayoutSelection = (selectedOption) => {
    setSelectedLayout(selectedOption);
    onSelect(layout[selectedOption.value]);
  };

  console.log(selectedLayout);
  console.log(selectedRuleset);

  return (
    <div>
      <h2>Settings</h2>
      <Select
        value={selectedLayout}
        onChange={handleLayoutSelection}
        options={layoutOptions}
      />

      {/* Assuming you want to display ruleset options as well */}
      <Select
        value={selectedRuleset}
        onChange={(selectedOption) => setSelectedRuleset(selectedOption)}
        options={rulesetOptions}
      />

      <Form.Group controlId="maxIt">
        <Form.Control
          required
          name="maxIt"
          type="number"
          placeholder="Max Iteration"
        />
        <Form.Control.Feedback type="invalid">Check!</Form.Control.Feedback>
      </Form.Group>
      <div className="runButton">
        <button type="button">Run Simulation</button>
      </div>
    </div>
  );
}

export default Settings;
