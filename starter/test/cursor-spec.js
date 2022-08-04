const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");
const Bejeweled = require("../class/bejeweled")

describe ('Cursor', function () {

  let cursor;

  beforeEach(function() {
    cursor = new Cursor(3, 3);
  });


  it('initializes for a 3x3 grid', function () {
    expect(cursor.row).to.equal(0);
    expect(cursor.col).to.equal(0);
  });

  it('correctly processes down inputs', function () {

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);
  });

  it('correctly processes up inputs', function () {

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  it('processes right inputs', function () {

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);
  });

  it('processes left inputs', function () {

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  context("gem selection - center", () => {

    beforeEach(() => {
      cursor.row = 1;
      cursor.col = 1;
    })

    it ("process a selection", () => {

      expect(cursor.select()).to.deep.equal({row: 1, col: 1});
    });

    it ("returns adjoining values", () =>
    {
      expect(cursor.getAdjoining()).to.deep.equal([{row: 0, col: 1}, {row: 1, col: 0}, {row: 1, col: 2}, {row: 2, col: 1}]);
    });

    it ("only permits movement to adjoining squares after selection", () => {
      cursor.select();
      cursor.left();
      expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);
      cursor.up();
      expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);
    });
  });

  it("returns only adjoining values on the board", () => {
    cursor.row = 0;
    cursor.col = 0;
    expect(cursor.getAdjoining()).to.deep.equal([{row: 0, col: 1}, {row: 1, col: 0}]);
  });

  context("should swap valid pieces", () => {
    let game = new Bejeweled();
    swapSpy = chai.spy.on(game, "swap");
    let grid = game.grid;
    grid = [[game.emojis[0], game.emojis[0], game.emojis[1], game.emojis[2]],
            [game.emojis[3], game.emojis[2], game.emojis[0], game.emojis[3]],
            [game.emojis[3], game.emojis[2], game.emojis[0], game.emojis[3]],
            [game.emojis[0], game.emojis[0], game.emojis[1], game.emojis[2]]];

    game.cursor.row = 1;
    game.cursor.col = 2;
    game.cursor.select();
    game.cursor.up();
    game.cursor.select();
    expect(swapSpy).to.have.been.called;
  })


});
