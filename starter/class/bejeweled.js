const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    this.emojis = ["🥝", "🍓", "🥥", "🍇", "🍊", "🍋"];

    console.log(this.emojis[0]);
    console.log(this.emojis[0].length);
    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);
    Screen.addCommand('w', 'move cursor up', this.cursor.up);
    Screen.addCommand('a', 'move cursor left', this.cursor.left);
    Screen.addCommand('s', 'move cursor down', this.cursor.down);
    Screen.addCommand('d', 'move cursor right', this.cursor.right);
    Screen.addCommand('e', 'select jewel', this.cursor.select);

    // Initialize this
    this.grid = this.createGrid(8, 8);

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
        Screen.setGrid(i, j, currentEmoji);
      }
    }
    return initialGrid;
  }

  static trySwap(grid, first, second)
  {
    // create at temporary grid to try out swap
    let tempGrid = this.grid.slice();
    let tempEmoji = tempGrid[first.row][first.col];
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

    let verticalMatches = Bejeweled.checkForVertical(grid);
    if (verticalMatches)
    {
      allMatches = allMatches.concat(verticalMatches);
    }

    if (horizontalMatches || verticalMatches)
    {
      return allMatches;
    }

    return false;

  }

  static checkForHorizontal(grid)
  {
    let horizontalMatches = [];
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 2; col < grid.length; col++)
      {
        if (grid[row][col] === grid[row][col - 1] &&
            grid[row][col - 1] === grid[row][col - 2])
        {
          horizontalMatches.push([{row: row, col: col - 2},
                                  {row: row, col: col - 1},
                                  {row: row, col: col}]);
        }
      }
    }
    if (horizontalMatches.length === 0)
    {
      return false;
    }
    console.log(horizontalMatches);
    return horizontalMatches;
  }

  static checkForVertical(grid)
  {
    return false;
  }

}

module.exports = Bejeweled;
