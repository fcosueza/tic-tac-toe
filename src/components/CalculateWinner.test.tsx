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

    expect(calculateWinner(squares)!.winner).toBe(playerSymbol);
  });

  it("Should return and array with the corresponding winningLines", () => {
    const firstIndex = 0;
    const secondIndex = 1;
    const thirdIndex = 2;

    squares[firstIndex] = squares[secondIndex] = squares[thirdIndex] = playerSymbol;

    const winnerResult = calculateWinner(squares)!.lines;

    expect(winnerResult[0]).toBe(firstIndex);
    expect(winnerResult[1]).toBe(secondIndex);
    expect(winnerResult[2]).toBe(thirdIndex);
  });
});
