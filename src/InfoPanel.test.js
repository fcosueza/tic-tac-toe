import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoPanel from "./InfoPanel";

describe("InfoPanel", () => {
  const status = "Next Player: X";
  const board = Array(3 * 3).fill(null);
  const history = [{ squares: board, lastMove: [0, 0] }];
  const sortText = "Sort Move List";
  const stepNumber = 0;

  it("Should render properly the buttons and status", () => {
    const buttonText = "Go to game start";

    render(<InfoPanel history={history} status={status} stepNumber={stepNumber} />);

    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
    expect(screen.getByText(sortText)).toBeInTheDocument();
  });

  it("Should add a new button for every new move in history", () => {
    const nextMove = [{ squares: board[3], lastMove: [2, 1] }];
    const updatedHistory = history.concat(nextMove);
    const newMoveText = "Go to move #1 (2,1)";

    render(<InfoPanel history={updatedHistory} status={status} stepNumber={stepNumber + 1} />);

    const moveList = screen.getAllByRole("list")[0];

    expect(within(moveList).getAllByRole("button").length).toBe(2);
    expect(within(moveList).queryByText(newMoveText)).toBeInTheDocument();
  });

  it("Should sort move list when sort button is clicked", async () => {
    const nextMove = [{ squares: board[3], lastMove: [2, 1] }];
    const updatedHistory = history.concat(nextMove);
    const newMoveHTML = "<b>Go to move #1 (2,1)</b>";

    render(<InfoPanel history={updatedHistory} status={status} stepNumber={stepNumber + 1} />);

    const moveList = screen.getAllByRole("list")[0];

    userEvent.click(screen.queryByText(sortText));

    await waitFor(() =>
      expect(within(moveList).queryAllByRole("button")[0].innerHTML).toBe(newMoveHTML)
    );
  });

  it("Should call fn when a button in the move list is clicked", async () => {
    const jumpToMock = jest.fn();
    const buttonText = "Go to game start";

    render(
      <InfoPanel history={history} status={status} stepNumber={stepNumber} jumpTo={jumpToMock} />
    );

    userEvent.click(screen.getByText(buttonText));

    await waitFor(() => expect(jumpToMock).toBeCalledTimes(1));
  });
});
