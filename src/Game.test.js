import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Game from "./Game";

describe("Game", () => {
  it("Should render properly all components", () => {
    const rowSize = 3;
    const nextPlayer = "Next Player: X";
    const moveListText = "Go to game start";
    const sortButtonText = "Sort Move List";

    render(<Game />);

    expect(screen.getAllByRole("button").length).toBe(rowSize * rowSize + 2);
    expect(screen.queryByText(nextPlayer)).toBeInTheDocument();
    expect(screen.queryByText(moveListText)).toBeInTheDocument();
    expect(screen.queryByText(sortButtonText)).toBeInTheDocument();
  });
});
