import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Dropdown } from "react-bootstrap";
import "./settings.css";
import { Provider } from "react-redux";
import Button from "react-bootstrap/Button";
//const rootElement = document.getElementById('root') root for styling i think

import { useSelector, useDispatch } from "react-redux";
import {
  updateLayout,
  updateRuleset,
  updateMaxIterations,
} from "../store/settingsSlice";
import {
  startSimulation,
  stopSimulation,
  setSimulationResults,
} from "../store/simulationSlice";
import { useGetRuleSetsQuery } from "../store/ruleSetsSlice";
import { useGetLayOutsQuery } from "../store/layOutsSlice";

function Settings() {
  // Hooks
  const dispatch = useDispatch();
  const layoutId = useSelector((state) => state.settings.layoutId);
  const rulesetId = useSelector((state) => state.settings.rulesetId);
  const maxIterations = useSelector((state) => state.settings.maxIterations);
  // Question: should we handle a possible error here?
  const { data: rulesets = [], error, isLoading } = useGetRuleSetsQuery();
  const isSimulationRunning = useSelector(
    (state) => state.simulation.isRunning
  );
  const simulationResults = useSelector((state) => state.simulation.results);

  // Event Handlers
  const onSelectLayout = (selectedOption) =>
    dispatch(updateLayout(selectedOption.value));
  const onSelectRuleset = (selectedOption) =>
    dispatch(updateRuleset(selectedOption.value));
  const onChangeMaxIterations = (e) =>
    dispatch(updateMaxIterations(e.target.value));

    
  const onStartSimulation = async () => {
    dispatch(startSimulation());
    const results = await runSimulation(layouts, rulesets, maxIterations);
    dispatch(setSimulationResults(results));
    dispatch(stopSimulation());
  };
  // Data Transformations
  const rulesetOptions = rulesets.map((ruleset) => ({
    value: ruleset.id,
    label: ruleset.name,
  }));
  const layoutOptions = [];
  const selectedLayoutOption = layoutOptions.find(
    ({ value }) => value === layoutId
  );
  const selectedRulesetOption = rulesetOptions.find(
    ({ value }) => value === rulesetId
  );

  // View
  return (
    <Form className="settings-form">
      <Form.Label className="settings-title">Settings</Form.Label>

      <div className="settings-divider"></div>

      <Select
        className="settings-select"
        value={selectedLayoutOption}
        onChange={onSelectLayout}
        options={layoutOptions}
        placeholder="Layout"
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
        placeholder="Ruleset"
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
        <button
          type="button"
          className="settings-button"
          onClick={onStartSimulation} 
          disabled={isSimulationRunning}
        >
          {isSimulationRunning ? "Running..." : "Run Simulation"}
        </button>
      </div>
    </Form>
  );
}

export default Settings;
