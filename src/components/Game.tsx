import { useState } from "react";
import calculateWinner from "./CalculateWinner";
import Board from "./Board";
import InfoPanel from "./InfoPanel";
import styles from "./Game.module.css";

const Game = (props: any): JSX.Element => {
  const ROW_SIZE = 3;

  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([
    { squares: Array(ROW_SIZE * ROW_SIZE).fill(null), lastMove: [0, 0] },
  ]);

  const winner = calculateWinner(history[step].squares);
  const winnerLine = winner ? winner.lines.slice() : [];
  const maxMoves = ROW_SIZE * ROW_SIZE;

  let status;

  if (winner) {
    status = `Winner: ${winner.winner}`;
  } else if (maxMoves === step) {
    status = `Draw Game: Everybody Wins ;)`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i: number) {
    const historySlice = history.slice(0, step + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();
    const coords = [Math.trunc(i / 3) + 1, (i % 3) + 1];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setHistory(historySlice.concat([{ squares: squares, lastMove: coords }]));
    setStep(historySlice.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step: number) {
    setStep(step);
    setXIsNext(step % 2 === 0);
  }

  return (
    <div className={styles.game}>
      <Board
        squares={history[step].squares}
        onClick={handleClick}
        winner={winnerLine}
        size={ROW_SIZE}
      />
      <InfoPanel history={history} status={status} step={step} jumpTo={jumpTo} />
    </div>
  );
};

export default Game;
