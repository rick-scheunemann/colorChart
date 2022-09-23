import Swatch from './Swatch.js';

class Grid {
  constructor(gridSize) {
    [this.rows, this.columns] = gridSize;
    this.grid = undefined;
    this.prepareGrid();

    console.log(this.rows);
  }

  prepareGrid() {
    this.grid = [
      ...Array(this.rows),
    ].map((row, i) => [...Array(this.columns)].map((swatch, j) => new Swatch(i, j)));
  }

  colorSwatches() {
    this.grid.forEach((row, i) => {
      row.forEach((swatch, j) => {
        console.log(i, j);

        // swatch.defineNeighbors(
        //   this.get([i - 1], [j]), // north
        //   this.get([i + 1], [j]), // south
        //   this.get([i], [j + 1]), // east
        //   this.get([i], [j - 1]), // west
        // );
      });
    });

    console.log(this.grid);
  }

  get(x, y) {
    if (x < 0 || x >= this.columns) { return null; }
    if (y < 0 || y >= this.rows) { return null; }
    return this.grid[y][x];
  }

  size() {
    return this.rows * this.columns;
  }

  // iterators:
  eachRow(func) {
    this.grid.forEach((row) => {
      func(row);
    });
  }

  eachswatch(func) {
    this.grid.forEach((row) => {
      row.forEach((swatch) => {
        func(swatch);
      });
    });
  }
}

export default Grid;
