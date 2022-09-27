import * as util from './utilities/ui_utilities.js';

// Select DOM elements to work with
const form = document.querySelector('form');
const title = document.querySelector('#Title');
const inkCheckBoxes = document.querySelectorAll('.inkCheckBox');
const inkRowBtns = document.querySelectorAll("input[name='Row']");
const inkColumnBtns = document.querySelectorAll("input[name='Column']");
const inkPageBtns = document.querySelectorAll("input[name='Page']");
const inkPagesFields = document.querySelectorAll('.inkPages');
const inkSliders = document.querySelectorAll('.inkSlider');

const sizes = document.querySelectorAll('.size');

const toggleInk = (event) => {
  const { id, checked } = event.target;
  util.setDisabledByID(`${id}_Name`, !checked);
  util.setDisabledByID(`${id}_Value`, !checked);
  util.setDisabledByID(`${id}_Step`, !checked);
  util.setDisabledByID(`${id}_Start`, !checked);
  util.setDisabledByID(`Row_${id}`, !checked);
  util.setDisabledByID(`Column_${id}`, !checked);
  util.setDisabledByID(`Page_${id}`, !checked);
};

const toggleInkRadio = (event) => {
  console.log('ui.toggleInkRadio event arg', event);
  util.selectThisRadio(event.target);
};

const updateSlider = (event) => {
  console.log('ui.updateSlider event arg', event);
  const pageCount = event.target.value;
  const id = event.target.name.slice(0, 4);
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
        startValue: parseInt(d[`Ink${i}_Value`], 10),
        startLocation: parseInt(d[`Ink${i}_Start`], 10),
        stepPercent: parseInt(d[`Ink${i}_Step`], 10),
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

const update = (data) => {
  console.log('ui.update data arg:\n', data);
  // set ink info
};

export {
  form,
  title,
  inkCheckBoxes,
  inkRowBtns,
  inkColumnBtns,
  inkPageBtns,
  inkPagesFields,
  inkSliders,
  sizes,
  //
  toggleInk,
  toggleInkRadio,
  updateSlider,
  setSlider,
  formData,
  update,
  // updateSize,
};
