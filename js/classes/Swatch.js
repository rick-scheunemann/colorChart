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
}

export default Swatch;
