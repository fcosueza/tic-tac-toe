import React from "react";
import { useState } from "react";
import calculateWinner from "./CalculateWinner";
import Board from "./Board";
import InfoPanel from "./InfoPanel";
import "./Game.css";

const Game = props => {
  const [size, setSize] = useState(9);
  const [stepNumber, setStepNumber] = useState(0);
  const [maxMoves, setMaxMoves] = useState(size);
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([{ squares: Array(this.size).fill(null), lastMove: [0, 0] }]);

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

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  let winnerLine = [];

  if (winner) {
    status = `Winner: ${winner.winner}`;
    winnerLine = winner.lines.slice();
  } else if (maxMoves === stepNumber) {
    status = `Draw Game: Everybody Wins ;)`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <Board squares={current.squares} onClick={handleClick} winner={winnerLine} />
      <InfoPanel history={history} status={status} stepNumber={stepNumber} jumpTo={jumpTo} />
    </div>
  );
};

export default Game;
