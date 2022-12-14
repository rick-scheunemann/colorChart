import * as util from './utilities/ui_utilities.js';

const form = document.querySelector('form');
const title = document.querySelector('#Title');
const gridTxt = document.querySelector('#gridLayout');
const output = document.querySelector('#output');
const preview = document.querySelector('#svg-preview');
const printContent = document.querySelector('#print-content');

const toggleInk = (event) => {
  const { id, checked } = event.target;
  util.setInkDisabled(id.slice(3, 4), !checked);
  util.updatePreviewColor();
};

const toggleInkRadio = (event) => {
  console.log('ui.toggleInkRadio event arg', event);
  util.selectThisRadio(event.target);
  util.updateStaticInks();
};

const updateColor = (event) => {
  console.log('ui.updateColor event arg', event);
  const id = event.target.name.slice(0, 4);
  const val = event.target.value;
  const brightness = `${100 - val}%`;
  document.querySelector(`#${id}_Start`).style.setProperty('--slider-brightness', brightness);
  util.updatePreviewColor();
};

const updateSlider = (event) => {
  console.log('ui.updateSlider event arg', event);
  const pageCount = event.target.value;
  const id = event.target.name.slice(3, 4);
  util.setSliderValues(id, pageCount);
};

const setSlider = (event) => {
  console.log('ui.setSlider event arg', event);
  const id = event.target.name.slice(0, 4);
  const down = document.querySelector(`#${id}_Down`);
  const up = document.querySelector(`#${id}_Up`);
  const val = event.target.valueAsNumber;
  down.innerHTML = val;
  up.innerHTML = event.target.max - val;
};

const formData = () => {
  console.log('ui.formData Arr from form:', Array.from(new FormData(form)));

  const d = Array.from(new FormData(form)).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
  const dataObj = {
    title: d.Title,
    pgHeight: parseFloat(d.PageHeight),
    pgWidth: parseFloat(d.PageWidth),
    swatchWidth: parseFloat(d.SwatchWidth),
    rowInk: undefined,
    colInk: undefined,
    pageInk: undefined,
    staticInks: [],
    backAll: d.BackAll === 'on' ? d.BackAll_Name : false,
  };
  const row = parseInt(d.Row, 10);
  const col = parseInt(d.Column, 10);
  const pg = parseInt(d.Page, 10);
  let i; let thisInk;
  for (i = 1; i < 7; i += 1) {
    if (d[`Ink${i}`]) {
      thisInk = {
        name: d[`Ink${i}_Name`],
        id: i,
        startValue: parseFloat(d[`Ink${i}_Value`], 10),
        startLocation: parseInt(d[`Ink${i}_Start`], 10),
        stepPercent: parseFloat(d[`Ink${i}_Step`], 10),
      };
      if (i === row) {
        dataObj.rowInk = thisInk;
      } else if (i === col) {
        dataObj.colInk = thisInk;
      } else if (i === pg) {
        thisInk.pages = parseInt(d[`Ink${i}_Pages`], 10);
        dataObj.pageInk = thisInk;
      } else {
        dataObj.staticInks.push(thisInk);
      }
    }
  }

  return dataObj;
};

const updateForGridChange = (data) => {
  // update ui to work with new grid size
  console.log('ui.update data arg:\n', data);

  [util.gridSize.width, util.gridSize.height] = data.gridSize;

  // grid layout
  gridTxt.innerHTML = `Grid Swatch Layout: ${util.gridSize.width}x${util.gridSize.height}`;
  // rowInk, increments over rows
  util.setSliderValues(data.rowInk.id, data.gridSize[1]);
  // colInk, increments over columns
  util.setSliderValues(data.colInk.id, data.gridSize[0]);
};

const previewChart = (data) => {
  const previewHTML = [];
  data.previews.forEach((p, i) => {
    previewHTML.push(`<button id="btn_save_${i}" class="previewSave">${p}<span>&#8681;</span></button>`);
  });
  preview.innerHTML = previewHTML.join('');

  const options = {
    render: 'download',
    pageWidth: `${data.pgWidth}in`,
    pageHeight: `${data.pgHeight}in`,
    pageMargin: `${data.margin}in`,
  };

  data.previews.forEach((p, i) => {
    document.querySelector(`#btn_save_${i}`).addEventListener('click', () => {
      options.filename = `${data.title}-${i + 1}`;
      const divToPrint = `GridPage-${i}`;
      console.log('divToPrint: ', divToPrint);
      // eslint-disable-next-line no-undef
      xepOnline.Formatter.Format(divToPrint, options);
    });
  });

  printContent.innerHTML = data.toPrint;
  output.className = 'show';
};

export {
  form,
  title,
  toggleInk,
  toggleInkRadio,
  updateColor,
  updateSlider,
  setSlider,
  formData,
  updateForGridChange,
  previewChart,
};
