import Grid from './Grid.js';

class GridChart {
  #title = 'Grid Chart';

  #leftLabel;

  #topLabel;

  #inkTxt;

  #margin = 0.5; // page margins

  #minPadding = 0.5;

  #spacing = 0.375; // space between swatches

  #gridSize = [0, 0]; // [width, height]

  #grids;

  #gridCount;

  #inkData;

  constructor(formData) {
    this.#grids = [];
    this.updateSize(formData);
  }

  populateGrids(data) {
    console.log('GridChart.populateGrids data arg:\n', data);

    this.#title = data.title;

    this.#gridCount = data.pageInk ? data.pageInk.pages : 1;
    this.#grids = [
      ...Array(this.#gridCount),
    ].map((el, i) => new Grid(this.#gridSize, i));

    this.formatInkData(data);
    this.#grids.forEach((grid) => {
      grid.colorSwatches(this.#inkData);
    });
  }

  updateSize(data) {
    console.log('GridChart.updateSize data arg:\n', data);
    this.#gridSize = this.calcGridSize(data.pgWidth, data.pgHeight, data.swatchWidth);

    console.log('grid updated to', this.#gridSize);

    const nData = {
      rowInk: data.rowInk,
      colInk: data.colInk,
      gridSize: this.#gridSize,
    };

    return nData;
  }

  calcGridSize(width, height, swatchWidth) {
    const gridMaxW = width - (2 * this.#margin + 2 * this.#minPadding);
    const gridMaxH = height - (2 * this.#margin + 2 * this.#minPadding);
    return [
      Math.floor((gridMaxW + this.#spacing) / (swatchWidth + this.#spacing)),
      Math.floor((gridMaxH + this.#spacing) / (swatchWidth + this.#spacing)),
    ];
  }

  formatInkData(data) {
    this.#inkData = [];
    this.#leftLabel = '';
    this.#topLabel = '';
    const inkTextArr = [];

    if (data.backAll) {
      this.#inkData.push({
        name: data.backAll,
        order: 0,
        value: 100,
        hStep: 0,
        vStep: 0,
        pgStep: 0,
      });
      inkTextArr.unshift(data.backAll);
    }

    if (data.rowInk) {
      this.#inkData.push({
        name: data.rowInk.name,
        order: data.rowInk.id,
        value: data.rowInk.startValue - (data.rowInk.startLocation * data.rowInk.stepPercent),
        hStep: data.rowInk.stepPercent,
        vStep: 0,
        pgStep: 0,
      });
      this.#leftLabel = data.rowInk.name;
    }
    if (data.colInk) {
      this.#inkData.push({
        name: data.colInk.name,
        order: data.colInk.id,
        value: data.colInk.startValue - (data.colInk.startLocation * data.colInk.stepPercent),
        hStep: 0,
        vStep: data.colInk.stepPercent,
        pgStep: 0,
      });
      this.#topLabel = data.colInk.name;
    }

    let i;
    for (i = 0; i < data.staticInks.length; i += 1) {
      this.#inkData.push({
        name: data.staticInks[i].name,
        order: data.staticInks[i].id,
        value:
        data.staticInks[i].startValue,
        hStep: 0,
        vStep: 0,
        pgStep: 0,
      });
      inkTextArr.unshift(data.staticInks[i].name);
    }
    if (data.pageInk) {
      this.#inkData.push({
        name: data.pageInk.name,
        order: data.pageInk.id,
        value:
          data.pageInk.startValue - (data.pageInk.startLocation * data.pageInk.stepPercent),
        hStep: 0,
        vStep: 0,
        pgStep: data.pageInk.stepPercent,
      });
      inkTextArr.unshift(data.pageInk.name); // page ink always 1st in text list
    }
    this.#inkData.sort((a, b) => a.order - b.order);
    this.#inkTxt = inkTextArr.join(' | ');
  }
}

export default GridChart;
