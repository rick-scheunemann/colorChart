import Grid from './Grid.js';

class GridChart {
  #title = 'Grid Chart';

  #margin = 0.5; // page margins

  #minPadding = 0.5;

  #spacing = 0.375; // space between swatches

  #gridSize = [0, 0]; // [x, y]

  #inkData = {
    rowInk: '',
    colInk: '',

  };

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
    console.log('GridChart.update data arg:\n', data);
    this.#gridSize = this.calcGridSize(data.pgWidth, data.pgHeight, data.swatchWidth);

    const pageCount = data.pageInk ? data.pageInk.stepTotal : 1;

    // populate grids
    this.prepareGrids(pageCount);

    // populate colors on grids or do on create?

    console.log('GridChart.update this.grids:\n', this.grids);
  }

  setTitle(text) {
    this.#title = text;
  }

  calcGridSize(width, height, swatchWidth) {
    const gridMaxW = width - (2 * this.#margin + 2 * this.#minPadding);
    const gridMaxH = height - (2 * this.#margin + 2 * this.#minPadding);
    return [
      Math.floor((gridMaxH + this.#spacing) / (swatchWidth + this.#spacing)),
      Math.floor((gridMaxW + this.#spacing) / (swatchWidth + this.#spacing)),
    ];
  }

  ui() { // format info for ui update
    return {
      gridSize: this.#gridSize,
      inkLimits: [
        {
          minDown: 1,
          maxDown: 2,
          minUp: 1,
          maxUp: 2,
        },
      ],
      ink1stepMin: '',
      ink1stepMax: '',
      ink1startPosition: '',
    };
  }
}

export default GridChart;
