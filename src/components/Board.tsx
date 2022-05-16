import React from "react";
import Square from "./Square";
import styles from "./Board.module.css";

interface Props {
  size: number;
  winner: number[];
  squares: string[];
  onClick: (index: number) => void;
}

const Board = ({ size = 3, winner, squares, onClick }: Props) => {
  let board: JSX.Element[] = [];

  for (let i = 0; i < size; i++) {
    let squareRow: JSX.Element[] = [];

    for (let j = 0; j < size; j++) {
      let squareIndex: number = j + size * i;

      squareRow.push(
        <Square
          highlight={winner.includes(squareIndex)}
          value={squares[squareIndex]}
          onClick={() => onClick(squareIndex)}
          key={squareIndex}
        />
      );
    }

    board.push(
      <div key={i} className={styles.boardRow}>
        {squareRow}
      </div>
    );
  }

  return <div role="grid">{board}</div>;
};

export default Board;
