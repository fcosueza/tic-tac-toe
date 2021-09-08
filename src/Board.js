import React from "react";
import Square from "./Square";
import "./Board.css";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        classes={this.props.winner.includes(i) ? "square highlight" : "square"}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  renderBoard(size = 3) {
    let board = [];

    for (let i = 0; i < size; i++) {
      let innerContent = [];

      for (let j = 0; j < size; j++) {
        innerContent.push(this.renderSquare(j + size * i));
      }

      board.push(
        <div key={i} className="board-row">
          {innerContent}
        </div>
      );
    }

    return board;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

export default Board;
