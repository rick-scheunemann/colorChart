class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = undefined;
    this.prepareGrid();
  }

  prepareGrid() {
    this.grid = [
      ...Array(this.rows),
    ].map((row, i) => [...Array(this.columns)].map((cell, j) => new Cell(i, j)));

    this.configureCells();
  }

  configureCells() {
    this.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        console.log(i, j);

        cell.defineNeighbors(
          this.get([i - 1], [j]), // north
          this.get([i + 1], [j]), // south
          this.get([i], [j + 1]), // east
          this.get([i], [j - 1]), // west
        );
      });
    });

    console.log(this.grid);
  }

  get(x, y) {
    if (x < 0 || x >= this.columns) { return null; }
    if (y < 0 || y >= this.rows) { return null; }
    return this.grid[y][x];
  }

  getRandom() {
    const y = nU.getRandomIntMaxEnclusive(0, this.rows);
    const x = nU.getRandomIntMaxEnclusive(0, this.grid[y].length);
    return this.get(y, x);
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

  eachCell(func) {
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        func(cell);
      });
    });
  }
}

export default Grid;
