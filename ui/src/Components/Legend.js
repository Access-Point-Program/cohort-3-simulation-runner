import React from "react";
import { Form } from 'react-bootstrap';
import './Legend.css'; // Import the CSS file

function Legend() {
  return (
    <Form className="legend-container">
      <Form.Label className="legend-title">Simulation</Form.Label>
      <Form.Label className="legend-subtitle">Legend</Form.Label>

      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-color-block open-color"></div>
          <Form.Text className="legend-text">Open</Form.Text>
        </div>
        <div className="legend-item">
          <div className="legend-color-block walls-color"></div>
          <Form.Text className="legend-text">Walls</Form.Text>
        </div>
        <div className="legend-item">
          <div className="legend-color-block robot-color"></div>
          <Form.Text className="legend-text">Robot</Form.Text>
        </div>
        <div className="legend-item">
          <div className="legend-color-block end-color"></div>
          <Form.Text className="legend-text">End</Form.Text>
        </div>
      </div>

      <Form.Label className="legend-subtitle moves-subtitle">Moves</Form.Label>
    </Form>
  );
}

export default Legend;
