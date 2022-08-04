const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);
    Screen.addCommand('w', 'move cursor up', this.cursor.up);
    Screen.addCommand('a', 'move cursor left', this.cursor.left);
    Screen.addCommand('s', 'move cursor down', this.cursor.down);
    Screen.addCommand('d', 'move cursor right', this.cursor.right);
    Screen.addCommand('e', 'select jewel', this.select);

    // Initialize this
    this.grid = Bejeweled.createGrid(8, 8);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  select = () => {
    if (this.cursor.selected != null)
    {
      Bejeweled.swap(this.grid, this.cursor.selected, {row: this.cursor.row, col: this.cursor.col});
    }
    this.cursor.select();
  }

  static emojis = ["🥝", "🍓", "🥥", "🍇", "🍊", "🍋"];


  static createGrid(rows, cols)
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
        let currentEmoji = Bejeweled.emojis[emojiNumber];
        initialGrid[i].push(currentEmoji);
        Screen.setGrid(i, j, currentEmoji);
      }
    }
    return initialGrid;
  }

  static refreshGrid(grid) {
    Bejeweled.clearAllMatches(grid);
  }


  static clearAllMatches(grid)
  {
    let allMatches = Bejeweled.getAllMatches(grid);
    for (let i = 0; i < allMatches.length; i++)
    {
      grid[allMatches[i].row][allMatches[i].col] = " ";
    }
  }

  static getAllMatches(grid) {
    let allMatches = [];

    // get all horizontal matches

    for (let row = 0; row < grid.length; row++)
    {
      let currentEmoji = grid[row][0];
      let numInARow = 1;
      for (let col = 1; col < grid[row].length; col++)
      {
        // determine # in a row
        let testEmoji = grid[row][col];
        if (currentEmoji === testEmoji)
        {
          numInARow++;
        }
        else
        {
          currentEmoji = testEmoji;
          numInARow = 1;
        }
        // push if there are 3 or more in a row
        if (numInARow === 3)
        {
          for (let i = 0; i < 3; i++)
          {
            allMatches.push({row: row, col: col - i});
          }
        }
        // will have already pushed prior ones if > 3
        if (numInARow > 3)
        {
          allMatches.push({row: row, col: col});
        }
      }
    }

    // get all vertical matches
    for (let col = 0; col < grid[0].length; col++)
    {
      let currentEmoji = grid[0][col];
      let numInARow = 1;
      for (let row = 1; row < grid.length; row++)
      {
        // determine # in a row
        let testEmoji = grid[row][col];
        if (currentEmoji === testEmoji)
        {
          numInARow++;
        }
        else
        {
          currentEmoji = testEmoji;
          numInARow = 1;
        }
        // push if there are 3 or more in a row
        if (numInARow === 3)
        {
          for (let i = 0; i < 3; i++)
          {
            allMatches.push({row: row - i, col: col});
          }
        }
        // will have already pushed prior ones if > 3
        if (numInARow > 3)
        {
          allMatches.push({row: row, col: col});
        }
      }
    }

    return allMatches;
  }

  static trySwap(tempGrid, first, second)
  {
    debugger;
    // create at temporary grid to try out swap
    let tempEmoji = tempGrid[first.row][first.col];
    tempGrid[first.row][first.col] = tempGrid[second.row][second.col];
    tempGrid[second.row][second.col] = tempEmoji;
    return Bejeweled.checkForAnyMatches(tempGrid);
  }

  static swap(grid, first, second)
  {
    let tempGrid = Bejeweled.createTempGrid(grid);
    let attempt = Bejeweled.trySwap(tempGrid, first, second)
    if (attempt)
    {
      // swap the two
      let firstEmoji = grid[first.row][first.col];
      let secondEmoji = grid[second.row][second.col];
      grid[first.row][first.col] = secondEmoji;
      grid[second.row][second.col] = firstEmoji;

      //Screen.setMessage(`firstEmoji: ${testEmoji1} ${tempFirstEmoji} ${first.row} ${first.col} \nsecondEmoji: ${testEmoji2} ${tempSecondEmoji} ${second.row} ${second.col}`);
      // update screen
      Screen.setGrid(first.row, first.col, secondEmoji);
      Screen.setGrid(second.row, second.col, firstEmoji);
      Screen.render();
    }
  }

  static createTempGrid(grid) {
    let tempGrid = [];
    for(let i = 0; i < grid.length; i++)
    {
      tempGrid.push(grid[i].slice);
    }
    return tempGrid;
  }



  static checkForAnyMatches(grid) {
    let horizontalMatches = Bejeweled.checkForHorizontal(grid);

    return horizontalMatches;
    // let verticalMatches = Bejeweled.checkForVertical(grid);

    // if (horizontalMatches || verticalMatches)
    // {
    //   return true;
    // }

    // return false;

  }

  static checkForHorizontal(grid)
  {
    let horizontalMatches = false;
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 2; col < grid.length; col++)
      {
        if (grid[row][col] === grid[row][col - 1] &&
            grid[row][col - 1] === grid[row][col - 2])
        {
          horizontalMatches = true;
        }
      }
    }
    return horizontalMatches;
  }

  static checkForVertical(grid)
  {
    return false;
  }

}

module.exports = Bejeweled;
