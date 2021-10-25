import React from "react";
import Square from "./Square";
import "./Board.css";

const Board = props => {
  function renderBoard(size = 3) {
    let board = [];

    for (let i = 0; i < size; i++) {
      let innerContent = [];

      for (let j = 0; j < size; j++) {
        let squareIndex = j + size * i;

        innerContent.push(
          <Square
            classes={props.winner.includes(squareIndex) ? "square highlight" : "square"}
            value={props.squares[squareIndex]}
            onClick={() => props.onClick(squareIndex)}
            id={i}
          />
        );
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
