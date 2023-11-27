import React, { useState, useEffect } from "react";
import "./Grid.css";

function Grid({ data }) {
  const [maze, setMaze] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    if (data && data.matrix) {
      setMaze(data.matrix);
    }
  }, [data]);

  function getColor(cellValue) {
    switch (cellValue) {
      case 0:
        return "white"; // Plain (white)
      case 1:
        return "rgba(110, 110, 113, 0.371)"; // Walls (faded grey)
      case 2:
        return "black"; // Robot current position (black)
      case 3:
        return "rgb(187, 202, 187)"; // Path color (light green)
      case 4:
        return "rgb(255, 157, 158)"; // End Goal (light red)
      case 5:
        return "green"; // Robot starting Position (dark green)
      default:
        return "white"; // Default color
    }
  }

  const gridJSX = maze.map((row, rowIndex) => (
    <div key={rowIndex} className="maze-row">
      {row.map((cell, columnIndex) => (
        <div
          key={columnIndex}
          className="cell"
          style={{ backgroundColor: getColor(cell) }}
        />
      ))}
    </div>
  ));

  return (
    <div className="maze" data-testid="grid">
      {gridJSX}
    </div>
  );
}

export default Grid;
