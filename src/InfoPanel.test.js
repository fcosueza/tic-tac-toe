import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoPanel from "./InfoPanel";

describe("InfoPanel", () => {
  const status = "Next Player: X";
  const board = Array(3 * 3).fill(null);
  const history = [{ squares: board, lastMove: [0, 0] }];

  it("Should render properly the buttons and status", () => {
    const buttonText = "Go to game start";
    const sortText = "Sort Move List";
    const stepNumber = 0;

    render(<InfoPanel history={history} status={status} stepNumber={stepNumber} />);

    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
    expect(screen.getByText(sortText)).toBeInTheDocument();
  });
});
