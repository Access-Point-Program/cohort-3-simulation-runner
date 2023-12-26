import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./settings.css";

import { useSelector, useDispatch } from 'react-redux'
import { updateLayout, updateRuleset, updateMaxIterations } from '../store/settingsSlice';
import { useGetRuleSetsQuery } from '../store/ruleSetsSlice';
import { useGetLayoutsQuery } from '../store/layOutsSlice';
import { runSimulation } from '../store/simulationSlice';

function Settings() {
  // Hooks
  const dispatch = useDispatch()
  const layoutId = useSelector((state) => state.settings.layoutId);
  const rulesetId = useSelector((state) => state.settings.rulesetId);
  const maxIterations = useSelector((state) => state.settings.maxIterations);
  const { data: rulesets = [], error: rulesetsError, isLoading: rulesetsLoading } = useGetRuleSetsQuery();
  const { data: layouts = [], error: layoutsError, isLoading: layoutsLoading } = useGetLayoutsQuery();

  // Event Handlers 
  const onSelectLayout = (selectedOption) => dispatch(updateLayout(selectedOption.value));
  const onSelectRuleset = (selectedOption) => dispatch(updateRuleset(selectedOption.value));
  const onChangeMaxIterations = (e) => dispatch(updateMaxIterations(e.target.value));
  const onRunSimulationClick = () => {
    dispatch(runSimulation({ rulesetId, layoutId }))
      // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
      .unwrap()
      .then((resultsToSave) => {
        // Save Results to the simulation API
      });
  };

  // Data Transformations
  const rulesetOptions = rulesets.map((ruleset) => ({ value: ruleset.id, label: ruleset.name }));
  const layoutOptions = layouts.map((layout) => ({ value: layout.layout_id, label: layout.name }));;
  const selectedLayoutOption = layoutOptions.find(({ value }) => value === layoutId);
  const selectedRulesetOption = rulesetOptions.find(({ value }) => value === rulesetId);
  const canRunSimulation = layoutId !== null && rulesetId !== null;

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
        isDisabled={layoutsLoading || layoutsError}
        isLoading={layoutsLoading}
        placeholder="Layout"
      />
      <div className="settings-divider"></div>
      <Select
        className="settings-select"
        value={selectedRulesetOption}
        onChange={onSelectRuleset}
        options={rulesetOptions}
        isDisabled={rulesetsLoading || rulesetsError}
        isLoading={rulesetsLoading}
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
          className="btn btn-primary"
          disabled={!canRunSimulation}
          onClick={onRunSimulationClick}>
            Run Simulation
        </button>
      </div>
    </Form >
  );
}

export default Settings;