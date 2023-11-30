import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Dropdown } from "react-bootstrap";
import "./settings.css";

import { useSelector, useDispatch } from 'react-redux'
import { updateLayout, updateRuleset, updateMaxIterations } from '../store/settingsSlice';
import { useGetRuleSetsQuery } from '../store/ruleSetsSlice';

function Settings() {
  // Hooks
  const dispatch = useDispatch()
  const layoutId = useSelector((state) => state.settings.layoutId);
  const rulesetId = useSelector((state) => state.settings.rulesetId);
  const maxIterations = useSelector((state) => state.settings.maxIterations);
  // Question: should we handle a possible error here?
  const { data: rulesets = [], error, isLoading } = useGetRuleSetsQuery();

  // Event Handlers 
  const onSelectLayout = (selectedOption) => dispatch(updateLayout(selectedOption.value));
  const onSelectRuleset = (selectedOption) => dispatch(updateRuleset(selectedOption.value));
  const onChangeMaxIterations = (e) => dispatch(updateMaxIterations(e.target.value));

  // Data Transformations
  const rulesetOptions = rulesets.map((ruleset) => ({ value: ruleset.id, label: ruleset.name }));
  const layoutOptions = [];
  const selectedLayoutOption = layoutOptions.find(({ value }) => value === layoutId);
  const selectedRulesetOption = rulesetOptions.find(({ value }) => value === rulesetId)

  // View
  return (
    <Form className="settings-form">
      <h3 className="settings-title">Settings</h3>

      <div className="settings-divider"></div>

      <Select
        className="settings-select"
        value={selectedLayoutOption}
        onChange={onSelectLayout}
        options={layoutOptions}
      />
      <div className="settings-divider"></div>
      <Select
        className="settings-select"
        value={selectedRulesetOption}
        onChange={onSelectRuleset}
        options={rulesetOptions}
        // Question why are we disabling this select when it's loading or an error?
        isDisabled={isLoading || error}
        isLoading={isLoading}
      />
      <div className="settings-divider"></div>
      <Form.Group controlId="maxIt" className="settings-maxIt">
        <Form.Control
          required
          name="maxIt"
          type="number"
          onChange={onChangeMaxIterations}
          value={maxIterations}
        />
        <Form.Control.Feedback type="invalid">Check!</Form.Control.Feedback>
      </Form.Group>
      <div className="settings-runButton">
        {/* STOP AND ASK BEFORE YOU IMPLEMENT THIS!! Story #46 */}
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
    </Form >
  );
}

export default Settings;