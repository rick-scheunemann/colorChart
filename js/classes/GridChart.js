import Grid from './Grid.js';

class GridChart {
  constructor(formData) {
    this.title = 'Grid Chart';
    this.leftLabel = '';
    this.topLabel = '';
    this.pageLabel = '';
    this.inkTxt = '';
    this.margin = 0.5; // page margins
    this.minPadding = 0.25;
    this.swatchWidth = 0.625;
    this.spacing = 0.375; // space between swatches
    this.gridSize = [0, 0]; // [width, height]
    this.gridCount = 3;
    this.backAll = '';
    this.inkData = undefined;
    this.grids = [];
    this.updateSize(formData);
  }

  populateGrids(data) {
    console.log('GridChart.populateGrids data arg:\n', data);

    this.title = data.title;

    this.gridCount = data.pageInk ? data.pageInk.pages : 1;
    this.grids = [
      ...Array(this.gridCount),
    ].map((el, i) => new Grid(this.gridSize, i));

    this.formatInkData(data);
    this.grids.forEach((grid) => {
      grid.colorSwatches(this.inkData);
    });
  }

  updateSize(data) {
    console.log('GridChart.updateSize data arg:\n', data);
    this.gridSize = this.calcGridSize(data.pgWidth, data.pgHeight, data.swatchWidth);
    this.pgWidth = data.pgWidth;
    this.pgHeight = data.pgHeight;
    this.swatchWidth = data.swatchWidth;

    console.log('grid updated to', this.gridSize);

    const nData = {
      rowInk: data.rowInk,
      colInk: data.colInk,
      gridSize: this.gridSize,
    };

    return nData;
  }

  calcGridSize(width, height, swatchWidth) {
    this.gridW = width - (2 * this.margin + 2 * this.minPadding);
    this.gridH = height - (2 * this.margin + 2 * this.minPadding);
    return [
      Math.floor((this.gridW + this.spacing) / (swatchWidth + this.spacing)),
      Math.floor((this.gridH + this.spacing) / (swatchWidth + this.spacing)),
    ];
  }

  formatInkData(data) {
    this.inkData = [];
    this.leftLabel = '';
    this.topLabel = '';
    const inkTextArr = [];

    this.backAll = data.backAll;

    if (data.rowInk) {
      this.inkData.push({
        name: data.rowInk.name,
        order: data.rowInk.id,
        value: data.rowInk.startValue - (data.rowInk.startLocation * data.rowInk.stepPercent),
        hStep: data.rowInk.stepPercent,
        vStep: 0,
        pgStep: 0,
      });
      this.leftLabel = `${data.rowInk.name} %`;
    }
    if (data.colInk) {
      this.inkData.push({
        name: data.colInk.name,
        order: data.colInk.id,
        value: data.colInk.startValue - (data.colInk.startLocation * data.colInk.stepPercent),
        hStep: 0,
        vStep: data.colInk.stepPercent,
        pgStep: 0,
      });
      this.topLabel = `${data.colInk.name} %`;
    }
    if (data.pageInk) {
      this.inkData.push({
        name: data.pageInk.name,
        order: data.pageInk.id,
        value:
          data.pageInk.startValue - (data.pageInk.startLocation * data.pageInk.stepPercent),
        hStep: 0,
        vStep: 0,
        pgStep: data.pageInk.stepPercent,
      });
      this.pageLabel = data.pageInk.name;
    }

    let i;
    for (i = 0; i < data.staticInks.length; i += 1) {
      this.inkData.push({
        name: data.staticInks[i].name,
        order: data.staticInks[i].id,
        value: data.staticInks[i].startValue,
        hStep: 0,
        vStep: 0,
        pgStep: 0,
      });
      inkTextArr.unshift(`${data.staticInks[i].name}: ${data.staticInks[i].startValue}%`);
    }
    this.inkTxt = inkTextArr.join(' | ');

    this.inkData.sort((a, b) => a.order - b.order);
  }

  generateHTML() {
    const htmlData = {
      title: this.title,
      pgWidth: this.pgWidth,
      pgHeight: this.pgHeight,
      margin: this.margin,
    };

    // generate svg previews
    const previewArr = [];

    this.grids.forEach((g, i) => {
      const pvArr = [];
      pvArr.push(`<svg id="svgPreview-${i}" version="1.1" y="${i * (this.pgHeight / 4)}in" width="${this.pgWidth / 4}in" height="${this.pgHeight / 4}in" viewBox="0 0 ${this.pgWidth} ${this.pgHeight}" xmlns="http://www.w3.org/2000/svg">`);
      // if (this.backAll) {
      pvArr.push(`<rect x="0" y="0" width="${this.pgWidth}" height="${this.pgHeight}" fill="white"></rect>`); // fill always will preview white
      // }
      pvArr.push(`<text x="${1}" y="${0.25}" fill="black" class="heavy">${this.title}</text>`);
      pvArr.push(g.generateSVG(this));
      pvArr.push('</svg>');
      previewArr.push(pvArr.join(''));
    });

    htmlData.previews = previewArr;

    // generate html with print properties, for conversion to pdf by css2pdf
    const dblMargin = 2 * this.margin;
    const gridDivW = this.pgWidth - dblMargin;
    const gridDivH = this.pgHeight - dblMargin;
    const allDivH = (this.pgHeight * this.gridCount) - dblMargin;
    const htmlArr = [`<div id="allGrids" style="width:${gridDivW}in; height: ${allDivH}in;">`];
    const gridArr = [];
    this.grids.forEach((g, i) => {
      const chartArr = [];
      chartArr.push(`<div id="GridPage-${i}" class="grid-page" style="width:${gridDivW}in; height:${gridDivH}in;" fostyle="overprint: true;">`);
      // if (this.backAll) {
      //  chartArr.push('<div class="backAll" style="width:100%; height:100%; background-color:white" ');
      //  chartArr.push(`fostyle="color: rgb-icc(255,255,0, #SpotColor,'${this.backAll}',1.0, #CMYK,.5,0,1,0);"></div>`);
      // }
      chartArr.push(g.generateHTML(this));
      chartArr.push('</div>');
      gridArr.push(chartArr.join(''));
    });

    htmlArr.push(gridArr.join(`<div class="gridSpacer" style="min-height:${dblMargin}in"></div>`));

    htmlArr.push('</div');

    htmlData.toPrint = htmlArr.join('');

    return htmlData;
  }

  // generateSVG() {
  //   const svgs = { title: this.title };

  //   // generate previews
  //   const previewArr = [];

  //   this.grids.forEach((g, i) => {
  //     const pvArr = [];
  //     pvArr.push(`<svg id="svgPreview-${i}" version="1.1" y="${i * (this.pgHeight / 4)}in" width="${this.pgWidth / 4}in" height="${this.pgHeight / 4}in" viewBox="0 0 ${this.pgWidth} ${this.pgHeight}" xmlns="http://www.w3.org/2000/svg">`);
  //     // if (this.backAll) {
  //     pvArr.push(`<rect x="0" y="0" width="${this.pgWidth}" height="${this.pgHeight}" fill="white"></rect>`); // fill always will preview white
  //     // }
  //     pvArr.push(`<text x="${1}" y="${0.25}" fill="black" class="heavy">${this.title}</text>`);
  //     pvArr.push(g.generateSVG(this));
  //     pvArr.push('</svg>');
  //     previewArr.push(pvArr.join(''));
  //   });

  //   svgs.previews = previewArr;

  //   // generate svgs with print properties
  //   // multiple svgs:
  //   const svgArr = [];
  //   this.grids.forEach((g, i) => {
  //     const chartArr = [];
  //     chartArr.push(`<svg id="GridPage-${i}" version="1.1" y="${i * this.pgHeight}in" width="${this.pgWidth}in" height="${this.pgHeight}in" viewBox="0 0 ${this.pgWidth} ${this.pgHeight}" xmlns="http://www.w3.org/2000/svg">`);
  //     // if (this.backAll) {
  //     const fostyle = 'rgb-icc(255,255,0, #CMYK,0,0,0,0)';
  //     chartArr.push(`<rect x="0" y="0" width="${this.pgWidth}" height="${this.pgHeight}" fill="${fostyle}"></rect>`);
  //     // }
  //     chartArr.push(`<text x="${1}" y="${0.25}" fill="black" class="heavy">${this.title}</text>`);
  //     chartArr.push(g.generateSVG(this, 0, true));
  //     chartArr.push('</svg>');
  //     svgArr.push(chartArr.join(''));
  //   });

  //   // single svg with all charts:
  //   svgArr.push(`<svg id="GridPage-all" version="1.1" width="${this.pgWidth}in" height="${this.pgHeight * this.gridCount}in" viewBox="0 0 ${this.pgWidth} ${this.pgHeight * this.gridCount}" xmlns="http://www.w3.org/2000/svg">`);
  //   // if (this.backAll) {
  //   const fostyle = `color: rgb-icc(255,255,0, #SpotColor,'${this.backAll}',1.0, #CMYK,0,0,0,0);`;
  //   svgArr.push(`<rect x="0" y="0" width="${this.pgWidth}" height="${this.pgHeight * this.gridCount}" fostyle="${fostyle}"></rect>`);
  //   // }
  //   let yOffset = 0;
  //   this.grids.forEach((g) => {
  //     const chartArr = [];
  //     chartArr.push(`<text x="${1}" y="${0.5 + yOffset}" fill="black" class="heavy">${this.title}</text>`);
  //     chartArr.push(g.generateSVG(this, yOffset, true));
  //     svgArr.push(chartArr.join(''));
  //     yOffset += this.pgHeight;
  //   });
  //   svgArr.push('</svg>');

  //   svgs.toPrint = svgArr.join('');

  //   return svgs;
  // }
}

export default GridChart;
