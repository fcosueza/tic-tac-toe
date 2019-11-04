import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoard(size = 3) {
    let board = [];

    for (let i = 0; i < size; i++) {
      let innerContent = [];

      for (let j = 0; j < size; j++)
        innerContent.push(this.renderSquare(j + size * i));

      board.push(<div className="board-row">{innerContent}</div>);
    }

    return board;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.size = 9;
    this.state = {
      history: [{ squares: Array(this.size).fill(null), lastMove: [0, 0] }],
      stepNumber: 0,
      maxMoves: this.size,
      xIsNext: true,
      ascending: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const coords = [Math.trunc(i / 3) + 1, (i % 3) + 1];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares, lastMove: coords }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  sortMoveList() {
    this.setState({
      ascending: !this.state.ascending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const ascending = this.state.ascending;

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${step.lastMove})`
        : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner.slice(0, 1)}`;
    } else if (this.state.maxMoves === this.state.stepNumber) {
      status = `Draw Game: Everybody Wins ;)`;
    } else {
      status = `Next Player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{ascending ? moves : moves.reverse()}</ol>
          <ul>
            <button onClick={() => this.sortMoveList()}>Sort Move List</button>
          </ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }

  return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));
