/* eslint-disable no-param-reassign */

const gridSize = {
  width: 6,
  height: 9,
};

const setDisabledByID = (id, bool) => {
  document.querySelector(`#${id}`).disabled = bool;
};

const cmykToRgb = (vals) => {
  const c = vals.Cyan ? vals.Cyan * 0.01 : 0;
  const m = vals.Magenta ? vals.Magenta * 0.01 : 0;
  const y = vals.Yellow ? vals.Yellow * 0.01 : 0;
  const k = vals.Black ? vals.Black * 0.01 : 0;
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return `rgb(${r}, ${g}, ${b})`;
};

const updatePreviewColor = () => {
  const rect = document.querySelector('#rectangle');
  const cmyk = ['Cyan', 'Magenta', 'Yellow', 'Black'];
  const vals = {};
  let i; let name;
  for (i = 1; i < 7; i += 1) {
    if (document.querySelector(`#Ink${i}`).checked) {
      name = document.querySelector(`#Ink${i}_Name`).value;
      if (!cmyk.includes(name)) {
        rect.style.setProperty('background', 'none');
        return;
      }
      vals[name] = parseInt(document.querySelector(`#Ink${i}_Value`).value, 10);
    }
  }
  rect.style.setProperty('background', cmykToRgb(vals));
};

const setSliderValues = (id, steps) => {
  console.log('setSliderValues:', id, steps);
  const el = document.querySelector(`#${id}_Start`);
  const curSliderValue = el.value;
  if (curSliderValue >= steps) {
    el.value = steps - 1;
    el.max = steps - 1;
    document.querySelector(`#${id}_Down`).innerHTML = el.value;
    document.querySelector(`#${id}_Up`).innerHTML = '0';
  } else {
    el.max = steps - 1;
    document.querySelector(`#${id}_Down`).innerHTML = curSliderValue;
    document.querySelector(`#${id}_Up`).innerHTML = el.max - curSliderValue;
  }
};

// type indicates how ink value is incremented
// example: 'Row' ink is incremented with each new row
const radioTypes = ['Row', 'Column', 'Page'];

const shiftCurrentRadio = (type, value) => {
  const newEl = document.querySelector(`#${type}_Ink${value}`);
  newEl.checked = true;
  if (type === 'Page') {
    document.querySelector('.show').className = 'hide';
    document.querySelector(`#Ink${value}_PgInput`).className = 'show';
  }
};

const setFirstAvailable = (el) => {
  const type = el.name;
  const toExclude = radioTypes.filter((t) => t !== type);
  const id = `Ink${el.value}`;
  let i;
  for (i = 1; i < 7; i += 1) {
    if (!document.querySelector(`#${toExclude[0]}_Ink${i}`).checked
      && !document.querySelector(`#${toExclude[1]}_Ink${i}`).checked) {
      shiftCurrentRadio(type, i);
      setSliderValues(`Ink${i}`, parseInt(document.querySelector(`#${id}_Start`).max, 10) + 1);
      break;
    }
  }
};

// selects clicked radio, shifts other radio selections and updates sliders as needed
// TODO handle selecting ink that previously had disabled slider...
const selectThisRadio = (el) => {
  const { name, value } = el;
  if (name === 'Column') { // value increments over columns (width)
    const row = document.querySelector(`#Row_Ink${value}`);
    const pg = document.querySelector(`#Page_Ink${value}`);
    if (row.checked) {
      setFirstAvailable(row);
    }
    if (pg.checked) {
      setFirstAvailable(pg);
    }
    setSliderValues(`Ink${value}`, gridSize.width);
  } else if (name === 'Row') { // value increments over rows (height)
    const col = document.querySelector(`#Column_Ink${value}`);
    const pg = document.querySelector(`#Page_Ink${value}`);
    if (col.checked) {
      setFirstAvailable(col);
    }
    if (pg.checked) {
      setFirstAvailable(pg);
    }
    setSliderValues(`Ink${value}`, gridSize.height);
  } else if (name === 'Page') {
    const col = document.querySelector(`#Column_Ink${value}`);
    const row = document.querySelector(`#Row_Ink${value}`);
    if (col.checked) {
      setFirstAvailable(col);
    }
    if (row.checked) {
      setFirstAvailable(row);
    }
    document.querySelector('.show').className = 'hide';
    document.querySelector(`#Ink${value}_PgInput`).className = 'show';
    setSliderValues(`Ink${value}`, document.querySelector(`#Ink${value}_Pages`).value);
  }
};

const setRadioDisabledByID = (id, bool) => {
  const el = document.querySelector(`#${id}`);
  el.disabled = bool;
  const n = el.name;
  if (bool && el.checked) {
    setFirstAvailable(n);
  }
};

export {
  gridSize,
  setDisabledByID,
  setRadioDisabledByID,
  selectThisRadio,
  setSliderValues,
  updatePreviewColor,
};
