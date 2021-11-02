import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoPanel from "./InfoPanel";

describe("Infopanel", () => {
  const history = [{ squares: Array(3 * 3).fill(null), lastMove: [0, 0] }];
  const status = "Next Player: X";

  it("Should render properly the buttons and status", () => {
    const buttonText = "Go to game start";
    const sortText = "Sort Move List";

    render(<InfoPanel history={history} status={status} stepNumber={0} />);

    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
    expect(screen.getByText(sortText)).toBeInTheDocument();
  });
});
