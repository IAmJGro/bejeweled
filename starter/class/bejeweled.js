const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    this.emojis = ["🥝", "🍓", "🥥", "🍇", "🍊", "🍋"];

    // Initialize this
    this.grid = this.createGrid(8, 8);

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  createGrid(rows, cols)
  {
    let initialGrid = [];
    for(let i = 0; i < rows; i++)
    {
      // push an empty array for each row
      initialGrid.push([]);
      for(let j = 0; j < cols; j++)
      {
        // push a random emoji for each col
        let emojiNumber = Math.floor(Math.random() * 6);
        let currentEmoji = this.emojis[emojiNumber];
        initialGrid[i].push(currentEmoji);
      }
    }
    return initialGrid;
  }

  trySwap(first, second)
  {
    // create at temporary grid to try out swap
    let tempGrid = this.grid.slice();
    let tempEmoji = tempGird[first.row][first.col];
    tempGrid[first.row][first.col] = tempGrid[second.row][second.col];
    tempGrid[second.row][second.col] = tempEmoji;
    return Bejeweled.checkForMatches(tempGrid);
  }

  static checkForMatches(grid) {
    let allMatches = [];

    let horizontalMatches = Bejeweled.checkForHorizontal(grid);
    if (horizontalMatches)
    {
      allMatches = allMatches.concat(horizontalMatches);
    }

    let verticalMatches = Bejeweled.checkForHorizontal(grid);
    if (horizontalMatches)
    {
      allMatches = allMatches.concat(horizontalMatches);
    }

    if (horizontalMatches || verticalMatches)
    {
      return allMatches;
    }

    return false;

  }

  static checkForHorizontal(grid)
  {
    return false;
  }

  static checkForVertical(grid)
  {
    return false;
  }

}

module.exports = Bejeweled;
