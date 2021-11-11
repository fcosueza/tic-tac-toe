import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Square from "./Square";

describe("Square", () => {
  it("Should render a square properly", () => {
    render(<Square />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should render a square with the proper inner text", () => {
    const value = "X";

    render(<Square value={value} />);

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("Should render a square with the proper CSS classes", () => {
    render(<Square highlight={true} />);

    expect(screen.getByRole("button")).toHaveClass("square highlight");
  });

  it("Should call handler function when clicked", async () => {
    const handlerMock = jest.fn();

    render(<Square onClick={handlerMock} />);

    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handlerMock).toBeCalled());
  });
});
