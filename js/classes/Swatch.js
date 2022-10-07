// import * as util from '../utilities/ui_utilities.js';

class Swatch {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.inkValues = [];
  }

  setColorValues(inks, page) {
    let i; let value;
    for (i = 0; i < inks.length; i += 1) {
      value = inks[i].value
        + this.row * inks[i].vStep
        + this.column * inks[i].hStep
        + page * inks[i].pgStep;
      if (value > 100) { value = 100; }
      if (value < 0) { value = 0; }
      this.inkValues.push([inks[i].name, value]);
    }
  }

  generateHTML(spacing, width) {
    const cmyk = this.evalCMYK();

    const fostyle = `"background-color: rgb-icc(255,255,0, #CMYK,${cmyk.Cyan},${cmyk.Magenta},${cmyk.Yellow},${cmyk.Black});"`;
    // return `<rect x="${x}" y="${y}" width="${width}" height="${width}" fill="${fostyle}"></rect>`;
    return `<div class="swatch" style="width:${width}in; height:${width}in; margin:${spacing / 2}in;" fostyle=${fostyle}>&nbsp;</div>`;

    // console.log(this.inkValues);
    // const swatchArr = [];
    // this.inkValues.forEach((i) => {
    //   swatchArr.push(`<div style="position:absolute; top:${y}in; left:${x}in; min-width:${width}in; min-height:${width}in; background-color:blue;" `);
    //   swatchArr.push(`fostyle="background-color: rgb-icc(255,255,0, #SpotColor,'${i[0]}',${i[1] * 0.01}, #CMYK,0,0.8,0.5,0);"></div>`);
    // });

    // return swatchArr.join('');
  }

  generateSVG(x, y, width, toPrint) {
    // console.log(this.inkValues);

    const cmyk = this.evalCMYK();

    // if toPrint setup spots, else rgb preview
    if (toPrint) {
      const fostyle = `"background-color: rgb-icc(255,255,0, #CMYK,${cmyk.Cyan},${cmyk.Magenta},${cmyk.Yellow},${cmyk.Black});"`;
      return `<rect x="${x}" y="${y}" width="${width}" height="${width}" fill="${fostyle}"></rect>`;
    }

    const r = 255 * (1 - cmyk.Cyan) * (1 - cmyk.Black);
    const g = 255 * (1 - cmyk.Magenta) * (1 - cmyk.Black);
    const b = 255 * (1 - cmyk.Yellow) * (1 - cmyk.Black);
    const rgbPreview = `rgb(${r}, ${g}, ${b})`;

    return `<rect x="${x}" y="${y}" width="${width}" height="${width}" fill="${rgbPreview}"></rect>`;
  }

  evalCMYK() {
    // evaluate CMYK & spots
    const cmyk = {};
    // const notCMYK = [];
    this.inkValues.forEach((c) => {
      if (this.cmykNames.includes(c[0])) {
        ({ 1: cmyk[c[0]] } = c); // destructuring
      } // else {
      //  notCMYK.push(c);
      // }
    });

    // ensure cmyk defined, convert to decimal
    cmyk.Cyan = cmyk.Cyan * 0.01 || 0;
    cmyk.Magenta = cmyk.Magenta * 0.01 || 0;
    cmyk.Yellow = cmyk.Yellow * 0.01 || 0;
    cmyk.Black = cmyk.Black * 0.01 || 0;

    // if using spots, add % of black to represent spots in preview
    // if (notCMYK.length > 0) {
    //   const b = 100 - cmyk.Black;
    //   const max = b / 6;
    //   notCMYK.forEach((s) => {
    //     cmyk.Black += s[1] * 0.01 * max;
    //   });
    // }

    return cmyk;
  }

  // rgbFill(cmyk) {
  //   const r = 255 * (1 - cmyk.Cyan) * (1 - cmyk.Black);
  //   const g = 255 * (1 - cmyk.Magenta) * (1 - cmyk.Black);
  //   const b = 255 * (1 - cmyk.Yellow) * (1 - cmyk.Black);
  //   const rgbPreview = `rgb(${r}, ${g}, ${b})`;
  //   return rgbPreview;
  // }

  // printSwatch(x, y, width) {
  //   const fostyle = `"background-color: rgb-icc(255,255,0, #CMYK,${},${},${},${});"`
  //   return `<rect x="${x}" y="${y}" width="${width}" height="${width}" fill="${fostyle}"></rect>`;
  // }

  cmykNames = ['Cyan', 'Magenta', 'Yellow', 'Black'];
}

export default Swatch;
