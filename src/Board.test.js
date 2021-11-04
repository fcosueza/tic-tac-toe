import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "./Board";

describe("Board", () => {
  const size = 3;
  const squares = Array(size * size).fill(null);
  const winner = [1, 2, 4];

  it("Should render a board with the proper size", () => {
    render(<Board size={size} winner={winner} squares={squares} />);

    expect(screen.getAllByRole("button").length).toEqual(size * size);
  });

  it("Should call fn when an element is clicked", async () => {});
});
