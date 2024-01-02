import React from "react";
import { useSelector } from "react-redux";

const MoveList = () => {
    /*
  const simulationState = useSelector((state) => state.simulation);

  if (!simulationState) {
    console.error("Simulation state is undefined");
    return <div>Error: Simulation state is undefined</div>;
  }

  const { action, moves } = simulationState;

  if (!action || !moves || !Array.isArray(moves)) {
    console.error("Invalid simulation state structure", simulationState);
    return <div>Error: Invalid simulation state structure</div>;
  }*/
  const moves = useSelector((state) => state.simulation.moves);

  const renderAction = (action) => {
    switch(action) {
        case 'FORWARD':
            return <span>Move Forward</span>
        case 'LEFT':
            return <span>Turn Left</span>
        case 'RIGHT':
            return <span>Turn Right</span>
    }
  }

  return (
    <div>
      <div>Moves:</div>
      <ol>
        {moves.map((move, index) => (
          <li key={index}>{renderAction(move.action)}</li>
        ))}
      </ol>
    </div>
  );
};

export default MoveList;
