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
      this.selected = null;
    }
  }
}


module.exports = Cursor;
