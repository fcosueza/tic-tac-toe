import React from "react";
import Square from "./Square";
import "./Board.css";

const Board = props => {
  function renderSquare(i) {
    return (
      <Square
        classes={props.winner.includes(i) ? "square highlight" : "square"}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        key={i}
      />
    );
  }

  function renderBoard(size = 3) {
    let board = [];

    for (let i = 0; i < size; i++) {
      let innerContent = [];

      for (let j = 0; j < size; j++) {
        innerContent.push(renderSquare(j + size * i));
      }

      board.push(
        <div key={i} className="board-row">
          {innerContent}
        </div>
      );
    }

    return board;
  }

  return <div>{renderBoard()}</div>;
};

export default Board;
