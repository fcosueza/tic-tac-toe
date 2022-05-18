import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

describe("Game", () => {
  it("Should render properly all components", () => {
    const boardSize = 9;
    const infoListSize = 2;
    const nextPlayer = "Next Player: X";
    const moveListText = "Go to game start";
    const sortButtonText = "Sort Move List";

    render(<Game />);

    const board = screen.getByRole("grid");
    const info = screen.getByRole("status");

    expect(within(board).getAllByRole("button").length).toBe(boardSize);
    expect(within(info).getAllByRole("button").length).toBe(infoListSize);

    expect(screen.queryByText(nextPlayer)).toBeInTheDocument();
    expect(screen.queryByText(moveListText)).toBeInTheDocument();
    expect(screen.queryByText(sortButtonText)).toBeInTheDocument();
  });

  it("Should update info panel state after clicking on a square", async () => {
    const nextPlayerMsg = "Next Player: O";

    render(<Game />);

    const board = screen.getByRole("grid");
    const info = screen.getByRole("status");
    const moveList = within(info).getAllByRole("list")[0];

    userEvent.click(within(board).getAllByRole("button")[0]);

    await waitFor(() => {
      expect(within(info).queryByText(nextPlayerMsg)).toBeInTheDocument();
      expect(within(moveList).getAllByRole("button").length).toBe(2);
    });
  });

  it("Should return to the specific board state if any move history button is clicked", async () => {
    const historyButtonText = "Go to move #1 (1,1)";
    const playerText = "X";

    render(<Game />);

    const board = screen.getByRole("grid");
    const info = screen.getByRole("status");

    userEvent.click(within(board).getAllByRole("button")[0]);
    userEvent.click(within(board).getAllByRole("button")[1]);
    userEvent.click(within(board).getAllByRole("button")[2]);

    await waitFor(() => expect(within(board).queryAllByText(playerText).length).toBe(2));

    userEvent.click(within(info).getByText(historyButtonText));

    await waitFor(() => expect(within(board).queryAllByText(playerText).length).toBe(1));
  });

  it("Should end the game and stablish a winner if the conditions meets", async () => {
    const winnerText = "Winner: X";

    render(<Game />);

    const board = screen.getByRole("grid");
    const info = screen.getByRole("status");

    userEvent.click(within(board).getAllByRole("button")[0]);
    userEvent.click(within(board).getAllByRole("button")[1]);
    userEvent.click(within(board).getAllByRole("button")[4]);
    userEvent.click(within(board).getAllByRole("button")[2]);
    userEvent.click(within(board).getAllByRole("button")[8]);

    await waitFor(() => expect(within(info).queryByText(winnerText)).toBeInTheDocument());
  });

  it("Should end the game a show a draw msg if every square is clicked and there is no winner", async () => {
    const drawText = "Draw Game: Everybody Wins ;)";

    render(<Game />);

    const board = screen.getByRole("grid");
    const info = screen.getByRole("status");

    userEvent.click(within(board).getAllByRole("button")[0]);
    userEvent.click(within(board).getAllByRole("button")[1]);
    userEvent.click(within(board).getAllByRole("button")[2]);
    userEvent.click(within(board).getAllByRole("button")[4]);
    userEvent.click(within(board).getAllByRole("button")[3]);
    userEvent.click(within(board).getAllByRole("button")[5]);
    userEvent.click(within(board).getAllByRole("button")[7]);
    userEvent.click(within(board).getAllByRole("button")[6]);
    userEvent.click(within(board).getAllByRole("button")[8]);

    await waitFor(() => expect(within(info).queryByText(drawText)).toBeInTheDocument());
  });

  it("Should do nothing if you click in a previously clicked square", async () => {
    const winnerText = "Winner: X";

    render(<Game />);

    const board = screen.getByRole("grid");
    const info = screen.getByRole("status");

    userEvent.click(within(board).getAllByRole("button")[0]);
    userEvent.click(within(board).getAllByRole("button")[1]);
    userEvent.click(within(board).getAllByRole("button")[1]);

    await waitFor(() => expect(within(info).queryByText(winnerText)).not.toBeInTheDocument());
  });
});
