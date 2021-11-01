import calculateWinner from "./CalculateWinner";

describe("CalculateWinner", () => {
  const size = 3;
  const playerSymbol = "X";
  const squares = Array(size * size).fill(null);

  it("Should return null if there is no winner", () => {
    expect(calculateWinner(squares)).toBeNull();
  });

  it("Should return the proper winner player", () => {
    squares[0] = squares[1] = squares[2] = playerSymbol;

    expect(calculateWinner(squares).winner).toBe(playerSymbol);
  });
});
