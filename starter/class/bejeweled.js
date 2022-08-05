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
    Screen.setMessage(`Current score: ${Bejeweled.score}`);
    Bejeweled.updateDisplayGrid(this.grid);
  }

  select = () => {
    if (this.cursor.selected != null)
    {
      Bejeweled.swap(this.grid, this.cursor.selected, {row: this.cursor.row, col: this.cursor.col});
    }
    this.cursor.select();
  }

  static emojis = ["🥝", "🍓", "🥥", "🍇", "🍊", "🍋"];

  static score = 0;

  static combo = 1;

  static updateDisplayGrid(grid)
  {
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 0; col < grid[row].length; col++)
      {
        Screen.setGrid(row, col, grid[row][col]);
      }
    }
    Screen.setMessage(`Current score: ${Bejeweled.score}\nCurrent combo: ${Bejeweled.combo}`);
    Screen.render();
  }

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
        let currentEmoji = Bejeweled.getRandomEmoji();
        initialGrid[i].push(currentEmoji);
        Screen.setGrid(i, j, currentEmoji);
      }
    }
    Bejeweled.sleep(200, initialGrid);
    Bejeweled.refreshGrid(initialGrid);
    return initialGrid;
  }

  static getRandomEmoji()
  {
    let emojiNumber = Math.floor(Math.random() * 6);
    return Bejeweled.emojis[emojiNumber];

  }

  static refreshGrid(grid) {
    Bejeweled.combo = 1;
    while (Bejeweled.checkForAnyMatches(grid))
    {
      Bejeweled.clearAllMatches(grid, Bejeweled.combo);
      Bejeweled.sleep(200, grid);
      Bejeweled.dropEmojis(grid);
      Bejeweled.sleep(200, grid);
      Bejeweled.refillGrid(grid);
      Bejeweled.sleep(200, grid);
      Bejeweled.combo++;
    }
    // adjust combo to display without combo increase where checkForAnyMatches failed
    Bejeweled.combo--;
  }

  static clearAllMatches(grid, combo)
  {
    let allMatches = Bejeweled.getAllMatches(grid);
    for (let i = 0; i < allMatches.length; i++)
    {
      grid[allMatches[i].row][allMatches[i].col] = "  ";
    }
    Bejeweled.score += allMatches.length * combo;
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

  static dropEmojis(grid)
  {
    for(let col = 0; col < grid[0].length; col++)
    {
      // go up from bottom and drop all items
      let dropDistance = 0; // to store how far to drop
      for(let row = grid.length - 1; row >= 0; row--)
      {
        if (grid[row][col] === "  ")
        {
          dropDistance++;// increase drop distance for each blank
        }
        else if (dropDistance > 0)
        {
          // drop by # of blanks so far
          grid[row + dropDistance][col] = grid[row][col];
          grid[row][col] = "  ";
        }
      }
    }
  }

  static refillGrid(grid)
  {
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 0; col < grid[row].length; col++)
      {
        if(grid[row][col] === "  ")
        {
          grid[row][col] = Bejeweled.getRandomEmoji();
        }
      }
    }
  }

  static trySwap(grid, first, second)
  {
    // create at temporary grid to try out swap
    let tempGrid = Bejeweled.createTempGrid(grid);
    let tempEmoji = tempGrid[first.row][first.col];
    tempGrid[first.row][first.col] = tempGrid[second.row][second.col];
    tempGrid[second.row][second.col] = tempEmoji;
    return Bejeweled.checkForAnyMatches(tempGrid);
  }

  static swap(grid, first, second)
  {
    let attempt = Bejeweled.trySwap(grid, first, second)
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
    Bejeweled.refreshGrid(grid);
    Bejeweled.updateDisplayGrid(grid);
  }

  static createTempGrid(grid) {
    let tempGrid = [];
    for(let i = 0; i < grid.length; i++)
    {
      tempGrid.push(grid[i].slice());
    }
    return tempGrid;
  }



  static checkForAnyMatches(grid) {
    let horizontalMatches = Bejeweled.checkForHorizontal(grid);

    let verticalMatches = Bejeweled.checkForVertical(grid);

    if (horizontalMatches || verticalMatches)
    {
      return true;
    }

    return false;

  }

  static checkForHorizontal(grid)
  {
    let horizontalMatches = false;
    for (let row = 0; row < grid.length; row++)
    {
      for (let col = 2; col < grid[row].length; col++)
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
    let verticalMatches = false;
    for (let col = 0; col < grid[0].length; col++)
    {
      for (let row = 2; row < grid.length; row++)
      {
        if (grid[row][col] === grid[row - 1][col] &&
            grid[row - 1][col] === grid[row - 2][col])
        {
          verticalMatches = true;
        }
      }
    }
    return verticalMatches;
  }

  static sleep(milliseconds, grid)
  {
    Bejeweled.updateDisplayGrid(grid);
    const startDate = Date.now();
    let currentDate;
    do {
      currentDate = Date.now();
    } while(currentDate - milliseconds < startDate)
  }
}

module.exports = Bejeweled;
