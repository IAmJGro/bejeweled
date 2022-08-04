const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe ('Bejeweled', function () {

  // Add tests for setting up a basic board
  let grid;
  let game;

  beforeEach(() => {
    game = new Bejeweled();
    grid = game.grid;
  });

  it("creates a grid with random emojis", () => {

    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 0; col < grid[row].length; col++)
      {
        expect(game.emojis.includes(grid[row][col])).to.be.true;
      }
    }
  });

  // Add tests for a valid swap that matches 3

  context("recognizes a valid swap", () => {
    beforeEach(() => {
      grid = [[game.emojis[0], game.emojis[0], game.emojis[1], game.emojis[2]],
              [game.emojis[3], game.emojis[2], game.emojis[0], game.emojis[3]],
              [game.emojis[3], game.emojis[2], game.emojis[0], game.emojis[3]],
              [game.emojis[0], game.emojis[0], game.emojis[1], game.emojis[2]]];
    });

    it("should accept a valid swap creating a horizontal match", () => {
      expect(game.trySwap({row: 0, col: 2}, {row: 1, col: 2})).to.be.true;
      game.swap({row: 0, col: 2}, {row: 1, col: 2});
      expect(game.clearMatches()).to.be.greaterThan(0);
      expect(game.emojis.includes(grid[0][0])).to.be.true;
    });

    it("should accept a valid swap creating a vertical match", () => {
      expect(game.trySwap({row: 0, col: 1}, {row: 0, col: 2})).to.be.true;
      game.swap({row: 0, col: 2}, {row: 1, col: 2});
      expect(game.clearMatches()).to.be.greaterThan(0);
      expect(game.emojis.includes(grid[0][2])).to.be.true;
    });


    it("should reject an invalid swap", () => {
      expect(game.trySwap({row: 0, col: 0}, {row: 1, col: 1})).to.be.false;
    });

    it("should reject an valid swap creating no match", () => {
      expect(game.trySwap({row: 0, col: 0}, {row: 0, col: 0})).to.be.false;
    });

  });

  it ("should create combos", () => {
    grid = [[game.emojis[0], game.emojis[0], game.emojis[1], game.emojis[2]],
            [game.emojis[3], game.emojis[0], game.emojis[0], game.emojis[1]],
            [game.emojis[1], game.emojis[1], game.emojis[2], game.emojis[0]],
            [game.emojis[0], game.emojis[0], game.emojis[1], game.emojis[2]]];

    expect(game.trySwap({row: 2, col: 2}, {row: 3, col: 2})).to.be.true;
    game.swap({row: 2, col: 2}, {row: 3, col: 2});
    expect(game.clearMatches()).to.be.greaterThan(1);
    expect(game.emojis.includes(grid[0][2])).to.be.true;
  });

  // Add tests to check if there are no possible valid moves
  it ("should be able to detect no valid moves", () => {
    grid = [[game.emojis[0], game.emojis[1], game.emojis[2], game.emojis[3]],
            [game.emojis[4], game.emojis[5], game.emojis[0], game.emojis[1]],
            [game.emojis[2], game.emojis[3], game.emojis[4], game.emojis[5]],
            [game.emojis[0], game.emojis[1], game.emojis[2], game.emojis[3]]];
    expect(game.anyMoves()).to.equal(false);
  });

});
