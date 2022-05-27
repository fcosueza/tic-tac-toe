import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from ".";

describe("Board", () => {
  const size = 4;
  const defaultSize = 3;
  const squares = Array(size * size).fill(null);
  const winner = [1, 2, 4];
  const handleMock = jest.fn();

  it("Should render a board with the proper size", () => {
    render(<Board size={size} winner={winner} squares={squares} onClick={handleMock} />);

    expect(screen.getAllByRole("button").length).toEqual(size * size);
  });

  it("Should render a board with default size if not specified", () => {
    render(<Board winner={winner} squares={squares} onClick={handleMock} />);

    expect(screen.getAllByRole("button").length).toEqual(defaultSize * defaultSize);
  });

  it("Should call fn when an element is clicked", async () => {
    render(<Board size={size} winner={winner} squares={squares} onClick={handleMock} />);

    userEvent.click(screen.getAllByRole("button")[1]);

    await waitFor(() => expect(handleMock).toBeCalledTimes(1));
  });
});
