import Grid from './Grid.js';

class GridChart {
  #title = 'Grid Chart';

  #margin = 0.5; // page margins

  #minPadding = 0.5;

  #spacing = 0.375; // space between swatches

  #gridSize = [0, 0];// [x, y]

  constructor(formData) {
    this.grids = [];
    this.update(formData);
  }

  prepareGrids(gridCount) {
    this.grids = [
      ...Array(gridCount),
    ].map(() => new Grid(this.#gridSize));
  }

  update(data) {
    console.log(data);
    this.#gridSize = this.calcGridSize(data.pgWidth, data.pgHeight, data.swatchWidth);

    // evaluate inks
    let rowInk; let colInk;
    if (this.#gridSize[0] > this.#gridSize[1]) { // horizontal grid
      [rowInk, colInk] = data.inks;
    } else { // vertical grid
      [colInk, rowInk] = data.inks;
    }
    const pageInk = data.inks[3];
    const staticInks = data.inks.slice(3);

    const pageCount = pageInk ? pageInk.stepTotal : 1;

    // create grids
    this.prepareGrids(pageCount);

    // populate colors on grids

    console.log(this.grids);
  }

  setTitle(text) {
    this.#title = text;
  }

  calcGridSize(width, height, swatchWidth) {
    const gridMaxW = width - (2 * this.#margin + 2 * this.#minPadding);
    const gridMaxH = height - (2 * this.#margin + 2 * this.#minPadding);
    return [
      Math.floor((gridMaxW + this.#spacing) / (swatchWidth + this.#spacing)),
      Math.floor((gridMaxH + this.#spacing) / (swatchWidth + this.#spacing)),
    ];
  }

  ui() { // format info for ui update
    return {
      gridSize: this.#gridSize,
    };
  }
}

export default GridChart;
