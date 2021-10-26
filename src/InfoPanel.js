import React from "react";
import { useState } from "react";

const InfoPanel = props => {
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const history = props.history;
  const status = props.status;
  const stepNumber = props.stepNumber;

  const moves = history.map((step, moveIndex) => {
    const moveDescription = moveIndex
      ? `Go to move #${moveIndex} (${step.lastMove})`
      : "Go to game start";

    return (
      <li key={moveIndex}>
        <button onClick={() => props.jumpTo(moveIndex)}>
          {moveIndex === stepNumber ? <b>{moveDescription}</b> : moveDescription}
        </button>
      </li>
    );
  });

  return (
    <div className="game-info">
      <div className="status">{status}</div>
      <ol>{ascendingOrder ? moves : moves.reverse()}</ol>
      <ul>
        <button className="button" onClick={() => setAscendingOrder(!ascendingOrder)}>
          Sort Move List
        </button>
      </ul>
    </div>
  );
};

export default InfoPanel;