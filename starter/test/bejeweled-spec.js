const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");
const Screen = require("../class/screen");

describe ('Bejeweled', function () {

  // Add tests for setting up a basic board
  let grid;

  function checkFilled(grid)
  {
    let gridFilled = true;
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 0; col < grid[row].length; col++)
      {
        if (!Bejeweled.emojis.includes(grid[row][col]))
        {
          gridFilled = false;
        }
      }
    }
    return gridFilled;
  }

  it("creates a grid with random emojis", () => {

    grid = Bejeweled.createGrid(9, 9);

    expect(checkFilled(grid)).to.be.true;
  });

  context("clears all matches", () => {

    it("should clear all matches on call of clearAllMatches(grid)", () => {
      grid = [[Bejeweled.emojis[3], Bejeweled.emojis[2], Bejeweled.emojis[0], Bejeweled.emojis[3]],
              [Bejeweled.emojis[0], Bejeweled.emojis[0], Bejeweled.emojis[0], Bejeweled.emojis[3]],
              [Bejeweled.emojis[0], Bejeweled.emojis[2], Bejeweled.emojis[0], Bejeweled.emojis[3]],
              [Bejeweled.emojis[0], Bejeweled.emojis[0], Bejeweled.emojis[1], Bejeweled.emojis[3]]];
      Bejeweled.clearAllMatches(grid);
      expect(grid).to.deep.equal([[Bejeweled.emojis[3], Bejeweled.emojis[2], "  ", "  "],
                                  ["  ", "  ", "  ", "  "],
                                  ["  ", Bejeweled.emojis[2], "  ", "  "],
                                  ["  ", Bejeweled.emojis[0], Bejeweled.emojis[1], "  "]]);
    });

    it("should drop all current emojis on call of dropEmojis", () => {
      grid = [[Bejeweled.emojis[3], Bejeweled.emojis[2], "  ", "  "],
              ["  ", "  ", "  ", "  "],
              ["  ", Bejeweled.emojis[2], "  ", "  "],
              ["  ", Bejeweled.emojis[0], Bejeweled.emojis[1], "  "]];
      Bejeweled.dropEmojis(grid);
      expect(grid).to.deep.equal([["  ", "  ", "  ", "  "],
                                  ["  ", Bejeweled.emojis[2], "  ", "  "],
                                  ["  ", Bejeweled.emojis[2], "  ", "  "],
                                  [Bejeweled.emojis[3], Bejeweled.emojis[0], Bejeweled.emojis[1], "  "]]);
    });

    it("should refill the grid with random emojis on call of refillGrid", () => {
      grid = [["  ", "  ", "  ", "  "],
              ["  ", Bejeweled.emojis[2], "  ", "  "],
              ["  ", Bejeweled.emojis[2], "  ", "  "],
              [Bejeweled.emojis[3], Bejeweled.emojis[0], Bejeweled.emojis[1], "  "]];
      Bejeweled.refillGrid(grid);
      expect(checkFilled(grid)).to.be.true;
    });
  });

  // Add tests for a valid swap that matches 3
  context("recognizes a valid swap", () => {
    beforeEach(() => {
      grid = [[Bejeweled.emojis[0], Bejeweled.emojis[0], Bejeweled.emojis[1], Bejeweled.emojis[2]],
              [Bejeweled.emojis[3], Bejeweled.emojis[2], Bejeweled.emojis[0], Bejeweled.emojis[3]],
              [Bejeweled.emojis[3], Bejeweled.emojis[2], Bejeweled.emojis[0], Bejeweled.emojis[3]],
              [Bejeweled.emojis[0], Bejeweled.emojis[0], Bejeweled.emojis[1], Bejeweled.emojis[2]]];
    });

    it("should accept a valid swap", () => {
      expect(Bejeweled.trySwap(grid, {row: 0, col: 2}, {row: 1, col: 2})).to.be.true;
      expect(Bejeweled.trySwap(grid, {row: 0, col: 1}, {row: 0, col: 2})).to.be.true;
    });


    it("should reject an invalid swap", () => {
      expect(Bejeweled.trySwap(grid, {row: 0, col: 0}, {row: 1, col: 1})).to.be.false;
    });

    it("should reject a valid swap creating no match", () => {
      expect(Bejeweled.trySwap(grid, {row: 0, col: 0}, {row: 0, col: 0})).to.be.false;
    });
  });

  // Add tests to check if there are no possible valid moves

  it ("should be able to detect no valid moves", () => {
    grid = [[Bejeweled.emojis[0], Bejeweled.emojis[1], Bejeweled.emojis[2], Bejeweled.emojis[3]],
            [Bejeweled.emojis[4], Bejeweled.emojis[5], Bejeweled.emojis[0], Bejeweled.emojis[1]],
            [Bejeweled.emojis[2], Bejeweled.emojis[3], Bejeweled.emojis[4], Bejeweled.emojis[5]],
            [Bejeweled.emojis[0], Bejeweled.emojis[1], Bejeweled.emojis[2], Bejeweled.emojis[3]]];
    expect(Bejeweled.anyMoves(grid)).to.equal(false);
    grid = [[Bejeweled.emojis[0], Bejeweled.emojis[1], Bejeweled.emojis[2], Bejeweled.emojis[3]],
            [Bejeweled.emojis[0], Bejeweled.emojis[5], Bejeweled.emojis[0], Bejeweled.emojis[1]],
            [Bejeweled.emojis[2], Bejeweled.emojis[3], Bejeweled.emojis[4], Bejeweled.emojis[5]],
            [Bejeweled.emojis[0], Bejeweled.emojis[1], Bejeweled.emojis[2], Bejeweled.emojis[3]]];
    expect(Bejeweled.anyMoves(grid)).to.equal(true);
  });
});
