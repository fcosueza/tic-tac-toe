import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Board from "./Board";

const size = 3;
const squares = Array(size * size).fill(null);
const winner = [1, 2, 4];

describe("Board", () => {
  it("Should render a board with the proper size", () => {
    render(<Board size={size} winner={winner} squares={squares} />);

    expect(screen.getAllByRole("button").length).toEqual(size * size);
  });
});
