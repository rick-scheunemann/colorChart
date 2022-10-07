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

  generateHTML(chart) {
    const yOff = 0;

    const gridArr = [];

    // const gridX = (chart.pgWidth - (chart.margin * 2)
    //       - (chart.swatchWidth * chart.gridSize[0]
    //       + chart.spacing * (chart.gridSize[0] - 1)))
    //       / 2;
    // let x = gridX;
    // let y = (chart.pgHeight - (chart.margin * 2)
    //   - (chart.swatchWidth * chart.gridSize[1]
    //   + chart.spacing * (chart.gridSize[1] - 1)))
    //   / 2;
    // this.grid.forEach((row) => {
    //   row.forEach((swatch) => {
    //     gridArr.push(swatch.generateHTML(x, y + yOff, chart.swatchWidth));
    //     x += chart.swatchWidth + chart.spacing;
    //   });
    //   x = gridX;
    //   y += chart.swatchWidth + chart.spacing;
    // });

    gridArr.push(`<div class="grid-container" style="width:${(chart.swatchWidth + chart.spacing) * chart.gridSize[0]}in">`);

    this.grid.forEach((row) => {
      row.forEach((swatch) => {
        gridArr.push(swatch.generateHTML(chart.spacing, chart.swatchWidth));
      });
    });
    gridArr.push('</div>');

    return gridArr.join('');
  }

  generateSVG(chart, yOffset, toPrint) {
    const yOff = yOffset || 0;

    const gridArr = [];

    const gridX = (chart.pgWidth
          - (chart.swatchWidth * chart.gridSize[0]
          + chart.spacing * (chart.gridSize[0] - 1)))
          / 2;
    let x = gridX;
    let y = (chart.pgHeight
      - (chart.swatchWidth * chart.gridSize[1]
      + chart.spacing * (chart.gridSize[1] - 1)))
      / 2;
    this.grid.forEach((row) => {
      row.forEach((swatch) => {
        gridArr.push(swatch.generateSVG(x, y + yOff, chart.swatchWidth, toPrint));
        x += chart.swatchWidth + chart.spacing;
      });
      x = gridX;
      y += chart.swatchWidth + chart.spacing;
    });

    return gridArr.join('');
  }
}

export default Grid;
