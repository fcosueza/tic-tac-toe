import React from "react";
import { useState } from "react";
import calculateWinner from "./CalculateWinner";
import Board from "./Board";
import InfoPanel from "./InfoPanel";
import "./Game.css";

const Game = props => {
  const ROW_SIZE = 3;

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([
    { squares: Array(ROW_SIZE * ROW_SIZE).fill(null), lastMove: [0, 0] }
  ]);

  const winner = calculateWinner(history[stepNumber].squares);
  const winnerLine = winner ? winner.lines.slice() : [];
  const maxMoves = ROW_SIZE * ROW_SIZE;

  let status;

  if (winner) {
    status = `Winner: ${winner.winner}`;
  } else if (maxMoves === stepNumber) {
    status = `Draw Game: Everybody Wins ;)`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i) {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();
    const coords = [Math.trunc(i / 3) + 1, (i % 3) + 1];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setHistory(historySlice.concat([{ squares: squares, lastMove: coords }]));
    setStepNumber(historySlice.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  return (
    <div className="game">
      <Board
        squares={history[stepNumber].squares}
        onClick={handleClick}
        winner={winnerLine}
        size={ROW_SIZE}
      />
      <InfoPanel history={history} status={status} stepNumber={stepNumber} jumpTo={jumpTo} />
    </div>
  );
};

export default Game;
