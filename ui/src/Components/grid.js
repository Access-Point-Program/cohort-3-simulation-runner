import React from "react";
import { useSelector } from "react-redux";
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


  function ispath(){



  }
  function coloringBook(cellValue) {
    switch (cellValue) {
      case 0:
        return "cell-white";
      case 1:
        return "cell-grey";
      case 2:
        return "cell-green";
      case 3:
        return "cell-red";
      default:
        return "cell-white";
    }
  }

  const gridJSX = maze.map((row, rowIndex) => (
    <div key={rowIndex} className="maze-row">
      {row.map((cell, columnIndex) => (
        <div key={columnIndex} className={`cell ${coloringBook(cell)}`} />
      ))}
    </div>
  ));

  return <div className="maze container">{gridJSX}</div>;
}

export default Grid;


// To indefinty if row is path if cell's Row & Column exhist in the moves array

// moves.find rows == rows  & columb == coluns