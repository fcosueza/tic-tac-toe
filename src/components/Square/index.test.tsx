import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Square from ".";

describe("Square", () => {
  let highlight = false;
  let value = "X";

  const handleMock = jest.fn();

  it("Should render a square properly", () => {
    render(<Square highlight={highlight} value={value} onClick={handleMock} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should render a square with the proper inner text", () => {
    const value = "X";

    render(<Square highlight={highlight} value={value} onClick={handleMock} />);

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("Should render a square with the proper CSS classes", () => {
    highlight = true;

    render(<Square highlight={highlight} value={value} onClick={handleMock} />);

    expect(screen.getByRole("button")).toHaveClass("square highlight");
  });

  it("Should call handler function when clicked", async () => {
    render(<Square highlight={highlight} value={value} onClick={handleMock} />);

    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handleMock).toBeCalled());
  });
});
