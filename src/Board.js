import React from "react";
import Square from "./Square";
import "./Board.css";

const Board = ({ size = 3, winner, squares, onClick }) => {
  let board = [];

  for (let i = 0; i < size; i++) {
    let squareRow = [];

    for (let j = 0; j < size; j++) {
      let squareIndex = j + size * i;

      squareRow.push(
        <Square
          classes={winner.includes(squareIndex) ? "square highlight" : "square"}
          value={squares[squareIndex]}
          onClick={() => onClick(squareIndex)}
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

  return <div role="grid">{board}</div>;
};

export default Board;
