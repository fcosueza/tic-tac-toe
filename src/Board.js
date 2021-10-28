import React from "react";
import Square from "./Square";
import "./Board.css";

const Board = props => {
  const rowSize = props.size;
  const winner = props.winner;
  const squares = props.squares;

  let board = [];

  for (let i = 0; i < rowSize; i++) {
    let squareRow = [];

    for (let j = 0; j < rowSize; j++) {
      let squareIndex = j + rowSize * i;

      squareRow.push(
        <Square
          classes={winner.includes(squareIndex) ? "square highlight" : "square"}
          value={squares[squareIndex]}
          onClick={() => props.onClick(squareIndex)}
          key={squareIndex}
        />
      );
    }

    board.push(
      <div key={i} className="board-row">
        {squareRow}
      </div>
    );
  }

  return <div>{board}</div>;
};

export default Board;
