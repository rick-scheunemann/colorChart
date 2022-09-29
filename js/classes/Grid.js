import Swatch from './Swatch.js';

class Grid {
  constructor(gridSize, page) {
    [this.columns, this.rows] = gridSize;
    this.page = page;
    this.grid = undefined;
    this.prepareGrid();
  }

  prepareGrid() {
    this.grid = [
      ...Array(this.rows),
    ].map((row, i) => [...Array(this.columns)].map((swatch, j) => new Swatch(i, j)));
  }

  colorSwatches(inks) {
    console.log('Grid.colorSwatches inks arg:\n', inks);

    this.grid.forEach((row) => {
      row.forEach((swatch) => {
        swatch.setColorValues(inks, this.page);
      });
    });
    console.log('grid', this.page, '\n', this.grid);
  }

  get(x, y) {
    if (x < 0 || x >= this.columns) { return null; }
    if (y < 0 || y >= this.rows) { return null; }
    return this.grid[y][x];
  }

  size() {
    return this.rows * this.columns;
  }
}

export default Grid;
