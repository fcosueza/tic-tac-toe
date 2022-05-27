import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoPanel from ".";

describe("InfoPanel", () => {
  const status = "Next Player: X";
  const board = Array(3 * 3).fill(null);
  const history = [{ squares: board, lastMove: [0, 0] }];
  const sortText = "Sort Move List";
  const stepNumber = 0;
  const jumpToMock = jest.fn();

  it("Should render properly the buttons and status", () => {
    const buttonText = "Go to game start";

    render(<InfoPanel history={history} status={status} step={stepNumber} jumpTo={jumpToMock} />);

    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
    expect(screen.getByText(sortText)).toBeInTheDocument();
  });

  it("Should add a new button for every new move in history", () => {
    const nextMove = [{ squares: board[3], lastMove: [2, 1] }];
    const newHistory = history.concat(nextMove);
    const newMoveText = "Go to move #1 (2,1)";

    render(
      <InfoPanel history={newHistory} status={status} step={stepNumber + 1} jumpTo={jumpToMock} />
    );

    const moveList = screen.getAllByRole("list")[0];

    expect(within(moveList).getAllByRole("button").length).toBe(2);
    expect(within(moveList).queryByText(newMoveText)).toBeInTheDocument();
  });

  it("Should sort move list when sort button is clicked", async () => {
    const nextMove = [{ squares: board[3], lastMove: [2, 1] }];
    const newHistory = history.concat(nextMove);
    const newMoveHTML = "<b>Go to move #1 (2,1)</b>";

    render(
      <InfoPanel history={newHistory} status={status} step={stepNumber + 1} jumpTo={jumpToMock} />
    );

    const moveList = screen.getAllByRole("list")[0];

    userEvent.click(screen.queryByText(sortText) as HTMLElement);

    await waitFor(() =>
      expect(within(moveList).queryAllByRole("button")[0].innerHTML).toBe(newMoveHTML)
    );
  });

  it("Should call fn when a button in the move list is clicked", async () => {
    const buttonText = "Go to game start";
    const stepNumber = 0;

    render(<InfoPanel history={history} status={status} step={stepNumber} jumpTo={jumpToMock} />);

    userEvent.click(screen.getByText(buttonText));

    await waitFor(() => expect(jumpToMock).toBeCalledTimes(1));
  });
});
