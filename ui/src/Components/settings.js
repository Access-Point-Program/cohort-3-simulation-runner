import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Dropdown } from 'react-bootstrap'; // Add Dropdown from react-bootstrap
import "./settings.css";

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
    <Form className="settings-form">
      <h3 className="settings-title">Settings</h3>
      
      <div className="settings-divider"></div> 

      <Select
        className="settings-select"
        value={selectedLayout}
        onChange={handleLayoutSelection}
        options={layoutOptions}
      />

      <div className="settings-divider"></div> 
    
      <Select
        className="settings-select"
        value={selectedRuleset}
        onChange={(selectedOption) => setSelectedRuleset(selectedOption)}
        options={rulesetOptions}
      />

      <div className="settings-divider"></div> 

      <Form.Group controlId="maxIt" className="settings-maxIt">
        <Form.Control
          required
          name="maxIt"
          type="number"
          placeholder="Max Iteration"
        />
        
        <Form.Control.Feedback type="invalid">Check!</Form.Control.Feedback>
      </Form.Group>

      <div className="settings-runButton">
        <button type="button" className="settings-button">Run Simulation</button>
      </div>

      {/* Additional dropdown */}
      <div className="dropdown">
        <a className="btn text-light" href="#" onClick={(e) => this.handleOption(e)}>Open dropdown</a>
        <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
          <a className="dropdown-item" href="#">Edit</a>
          <a className="dropdown-item" href="#">Delete</a>
        </div>
      </div>
    </Form>
  );  
}

export default Settings;
