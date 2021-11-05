import "@testing-library/jest-dom";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
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
});
