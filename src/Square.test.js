import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Square from "./Square";

describe("Square", () => {
  it("Should render a square properly", () => {
    render(<Square />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
