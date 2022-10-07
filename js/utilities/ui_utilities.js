/* eslint-disable no-param-reassign */

const gridSize = {
  width: 6,
  height: 9,
};

const getElements = (i) => ({
  Checkbox: document.querySelector(`#Ink${i}`),
  Name: document.querySelector(`#Ink${i}_Name`),
  Value: document.querySelector(`#Ink${i}_Value`),
  Column: document.querySelector(`#Column_Ink${i}`),
  Row: document.querySelector(`#Row_Ink${i}`),
  Page: document.querySelector(`#Page_Ink${i}`),
  Step: document.querySelector(`#Ink${i}_Step`),
  Down: document.querySelector(`#Ink${i}_Down`),
  Start: document.querySelector(`#Ink${i}_Start`),
  Up: document.querySelector(`#Ink${i}_Up`),
  PgInput: document.querySelector(`#Ink${i}_PgInput`),
  Pages: document.querySelector(`#Ink${i}_Pages`),
});

const inkUI = {
  1: getElements(1),
  2: getElements(2),
  3: getElements(3),
  4: getElements(4),
  5: getElements(5),
  6: getElements(6),
};

const previewRect = document.querySelector('#rectangle');

const setInkDisabled = (id, bool) => {
  inkUI[id].Name.disabled = bool;
  inkUI[id].Value.disabled = bool;
  inkUI[id].Step.disabled = bool;
  inkUI[id].Start.disabled = bool;
  inkUI[id].Row.disabled = bool;
  inkUI[id].Column.disabled = bool;
  inkUI[id].Page.disabled = bool;
};

const cmykToRgb = (vals) => {
  console.log(vals);
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
  const cmyk = ['Cyan', 'Magenta', 'Yellow', 'Black'];
  const vals = {};
  let i; let name;
  for (i = 1; i < 7; i += 1) {
    if (inkUI[i].Checkbox.checked) {
      name = inkUI[i].Name.value;
      if (!cmyk.includes(name)) {
        previewRect.style.setProperty('background', 'none');
        return;
      }
      vals[name] = parseInt(inkUI[i].Value.value, 10);
    }
  }
  previewRect.style.setProperty('background', cmykToRgb(vals));
};

const setSliderValues = (id, steps) => {
  console.log('setSliderValues:', id, steps);
  const curSliderValue = inkUI[id].Start.value;
  if (curSliderValue >= steps) {
    inkUI[id].Start.value = steps - 1;
    inkUI[id].Start.max = steps - 1;
    inkUI[id].Down.innerHTML = inkUI[id].Start.value;
    inkUI[id].Up.innerHTML = '0';
  } else {
    inkUI[id].Start.max = steps - 1;
    inkUI[id].Down.innerHTML = curSliderValue;
    inkUI[id].Up.innerHTML = inkUI[id].Start.max - curSliderValue;
  }
};

// type indicates how ink value is incremented
// example: 'Row' ink is incremented with each new row
const radioTypes = ['Row', 'Column', 'Page'];

const shiftCurrentRadio = (type, id) => {
  inkUI[id][type].checked = true;
  if (type === 'Page') {
    document.querySelector('.show').className = 'hide';
    inkUI[id].PgInput.className = 'show';
  }
};

const setFirstAvailable = (el) => {
  const type = el.name;
  const toExclude = radioTypes.filter((t) => t !== type);
  let i;
  for (i = 1; i < 5; i += 1) {
    if (!inkUI[i][toExclude[0]].checked && !inkUI[i][toExclude[1]].checked) {
      shiftCurrentRadio(type, i);
      setSliderValues(i, parseInt(inkUI[el.value].Start.max, 10) + 1);
      break;
    }
  }
};

// selects clicked radio, shifts other radio selections and updates sliders as needed
// TODO handle selecting ink that previously had disabled slider...
const selectThisRadio = (el) => {
  const { name, value } = el;
  if (name === 'Column') { // value increments over columns (width)
    if (inkUI[value].Row.checked) {
      setFirstAvailable(inkUI[value].Row);
    }
    if (inkUI[value].Page.checked) {
      setFirstAvailable(inkUI[value].Page);
    }
    setSliderValues(value, gridSize.width);
  } else if (name === 'Row') { // value increments over rows (height)
    if (inkUI[value].Column.checked) {
      setFirstAvailable(inkUI[value].Column);
    }
    if (inkUI[value].Page.checked) {
      setFirstAvailable(inkUI[value].Page);
    }
    setSliderValues(value, gridSize.height);
  } else if (name === 'Page') {
    if (inkUI[value].Column.checked) {
      setFirstAvailable(inkUI[value].Column);
    }
    if (inkUI[value].Row.checked) {
      setFirstAvailable(inkUI[value].Row);
    }
    document.querySelector('.show').className = 'hide';
    inkUI[value].PgInput.className = 'show';
    setSliderValues(value, inkUI[value].Pages.value);
  }
};

const updateStaticInks = () => {
  let i;
  for (i = 1; i < 5; i += 1) {
    if (!inkUI[i].Column.checked && !inkUI[i].Row.checked && !inkUI[i].Page.checked) {
      setSliderValues(i, 0);
    }
  }
};

export {
  gridSize,
  cmykToRgb,
  setInkDisabled,
  selectThisRadio,
  setSliderValues,
  updatePreviewColor,
  updateStaticInks,
};
