import React from "react";
import calculateWinner from "./CalculateWinner";
import Board from "./Board";
import InfoPanel from "./InfoPanel";
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.size = 9;
    this.state = {
      history: [{ squares: Array(this.size).fill(null), lastMove: [0, 0] }],
      stepNumber: 0,
      maxMoves: this.size,
      xIsNext: true
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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    let winnerLine = [];

    if (winner) {
      status = `Winner: ${winner.winner}`;
      winnerLine = winner.lines.slice();
    } else if (this.state.maxMoves === this.state.stepNumber) {
      status = `Draw Game: Everybody Wins ;)`;
    } else {
      status = `Next Player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <Board squares={current.squares} onClick={i => this.handleClick(i)} winner={winnerLine} />
        <InfoPanel
          history={this.state.history}
          status={status}
          stepNumber={this.state.stepNumber}
          jumpTo={() => this.jumpTo()}
        />
      </div>
    );
  }
}

export default Game;
