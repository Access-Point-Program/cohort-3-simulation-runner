import React from "react";
import { useSelector } from 'react-redux'
import "./Grid.css";

function Grid() {
  const grid = useSelector((state) => state.simulation.grid);
  const maze = grid ?? [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const gridJSX = maze.map((row, rowIndex) => (
    <div key={rowIndex} className="maze-row">
      {row.map((cell, columnIndex) => (
        /* TODO if row and column appear in moves list then change class to cell-4  */
        <div
          key={columnIndex}
          className={`cell cell-${cell}`}
        />
      ))}
    </div>
  ));

  return (
    <div className="maze container">
      {gridJSX}
    </div>
  );
}

export default Grid;
