import React from "react";
import { useSelector } from "react-redux";
import "./Grid.css";

function Grid() {
  const grid = useSelector((state) => state.simulation.grid);
  const succeeded = useSelector((state) => state.simulation.succeeded);
  const moves = useSelector((state) => state.simulation.moves); // Assuming moves is available in the redux state

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

  function isPath(row, column) {
    console.table(moves);
    return moves.some((move) => move.row === row && move.column === column);
  }

  function coloringBook(cellValue, row, column) {
    switch (cellValue) {
      case 1:
        return "cell-grey";
      case 2:
        return "cell-green";
      case 3:
        return "cell-red";
      default:
        if (isPath(row, column)) {
          if (succeeded) {
            return "cell-light-green";
          }
          return "cell-barbie-pink";
        }
        return "cell-white";
    }
  }

  const gridJSX = maze.map((row, rowIndex) => (
    <div key={rowIndex} className="maze-row">
      {row.map((cell, columnIndex) => (
        <div
          key={columnIndex}
          className={`cell ${coloringBook(cell, rowIndex, columnIndex)}`}
        />
      ))}
    </div>
  ));

  return <div className="maze container">{gridJSX}</div>;
}

export default Grid;
