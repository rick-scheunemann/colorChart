import * as ui from './ui.js';

const toggleInk = (event) => {
  const { id, checked } = event.target;
  const nameField = document.querySelector(`#${id}_Name`);
  nameField.disabled = !checked;

  const startValField = document.querySelector(`#${id}_Value`);
  startValField.disabled = !checked;
  if (!checked && startValField.value !== 0) { startValField.value = 0; }

  const stepPercentField = document.querySelector(`#${id}_Step`);
  stepPercentField.disabled = !checked;

  const stepDownField = document.querySelector(`#${id}_Down`);
  stepDownField.disabled = !checked;
  if (!checked && stepDownField.value !== 0) { stepDownField.value = 0; }

  const stepUpField = document.querySelector(`#${id}_Up`);
  stepUpField.disabled = !checked;
  if (!checked && stepUpField.value !== 0) { stepUpField.value = 0; }
};

// const updateName = (event) => {
//   const { id, value } = event.target;
//   const startLabel = document.querySelector(`#${id.slice(0, 4)}_sLabel`);
//   startLabel.innerHTML = value;
// };

const updateStepLimits = (columns, rows) => {
  const rowLimit = (rows - 1) / 2;
  if (!Number.isInteger(rowLimit)) {
    ui.inkRow.up.max = Math.floor(rowLimit);
    ui.inkRow.down.max = Math.ceil(rowLimit);
  } else {
    ui.inkRow.up.max = rowLimit;
    ui.inkRow.down.max = rowLimit;
  }
  const columnLimit = (columns - 1) / 2;
  if (!Number.isInteger(columnLimit)) {
    ui.inkColumn.up.max = Math.floor(columnLimit);
    ui.inkColumn.down.max = Math.ceil(columnLimit);
  } else {
    ui.inkColumn.up.max = columnLimit;
    ui.inkColumn.down.max = columnLimit;
  }
};

const updateSize = () => {
  const pageW = ui.sizes[0].value;
  const pageH = ui.sizes[1].value;
  const swatchW = ui.sizes[2].value; // swatches are square

  console.log(`${pageW}, ${pageH}, ${swatchW}`);

  // calc max up & down on page size using swatch size
  const margin = 0.125;
  const chartW = pageW - 1;
  const chartH = pageH - 1;

  const columns = chartW / (swatchW + margin);
  const rows = chartH / (swatchW + margin);

  // updateStepLimits(columns, rows);
};

export {
  toggleInk,
  // updateName,
  updateSize,
};
