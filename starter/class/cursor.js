const Bejeweled = require("./bejeweled");
const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

    this.selected = null;

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up = () => {
    // move up if not in first row
    this.resetBackgroundColor();
    if (this.row > 0 &&
        (this.selected === null ||
          this.row > this.selected.row - 1 && this.col === this.selected.col))
    {
      this.row--;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  down = () => {
    // move down if not in final row
    this.resetBackgroundColor();
    if (this.row < this.numRows - 1 &&
        (this.selected === null ||
          this.row < this.selected.row + 1 && this.col === this.selected.col))
    {
      this.row++;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  left = () => {
    // move left if not in first column
    this.resetBackgroundColor();
    if (this.col > 0 &&
        (this.selected === null ||
          this.col > this.selected.col - 1 && this.row === this.selected.row))
    {
      this.col--;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  right = () => {
   // move right if not in final column
   this.resetBackgroundColor();
   if (this.col < this.numCols - 1 &&
       (this.selected === null ||
        this.col < this.selected.col + 1 && this.row === this.selected.row))
   {
     this.col++;
   }
   this.setBackgroundColor();
   Screen.render();
  }

  select = () => {
    if (this.selected === null)
    {
      this.selected = {row: this.row, col: this.col};
    }
    else
    {
      let adjoining = this.getAdjoining();
      for (let i = 0; i < adjoining.length; i++)
      {
        if (adjoining[i].row === this.row && adjoining[i].col === this.col)
        {
          Bejeweled.trySwap(grid);
        }
      }
    }
  }

  getAdjoining = () =>
  {
    let adjoiningSpaces = [];
    //push space above if on board
    if (this.row > 0)
    {
      adjoiningSpaces.push({row: this.row - 1, col: this.col});
    }
    //push space on left if on board
    if (this.col > 0)
    {
      adjoiningSpaces.push({row: this.row, col: this.col - 1});
    }
    //push space on right if on board
    if (this.row < this.numRows - 1)
    {
      adjoiningSpaces.push({row: this.row + 1, col: this.col})
    }
    //push space below if on board
    if (this.col < this.numCols - 1)
    {
      adjoiningSpaces.push({row: this.row, col: this.col + 1})
    }
    console.log(adjoiningSpaces);
    return adjoiningSpaces;

  }

}


module.exports = Cursor;
