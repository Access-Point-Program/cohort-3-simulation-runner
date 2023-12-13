import React from "react";
import { Form } from 'react-bootstrap';
import './Legend.css'; // Import the CSS file

function Legend() {
  return (
    <Form className="legend-form">
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
      <Form>
        <Form.Label className="legend-subtitle moves-subtitle">Moves</Form.Label>
        <Form.Label className="legend-title move1-subtitle">1 Move Forward</Form.Label>
        <Form.Label className="legend-title move2-subtitle">2 Turn Right</Form.Label>
        <Form.Label className="legend-title move3-subtitle">3 Move Forward</Form.Label>
        <Form.Label className="legend-title move4-subtitle">4 Move Forward</Form.Label>
        <Form.Label className="legend-title move5-subtitle">5 Right Left</Form.Label>
        <Form.Label className="legend-title move6-subtitle">6 Move Forward</Form.Label>
        <Form.Label className="legend-title move7-subtitle">7 Turn Right</Form.Label>
      </Form>
    </Form>
  );
}

export default Legend;
