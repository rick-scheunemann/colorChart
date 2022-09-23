// Select DOM elements to work with
const form = document.querySelector('form');
const title = document.querySelector('#Title');
const inkCheckBoxes = document.querySelectorAll('.inkCheckBox');
const sizes = document.querySelectorAll('.size');

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

  let radBtn = document.querySelector(`#Prime_${id}`);
  radBtn.disabled = !checked;
  radBtn = document.querySelector(`#Second_${id}`);
  radBtn.disabled = !checked;
  radBtn = document.querySelector(`#Page_${id}`);
  radBtn.disabled = !checked;
};

const formData = () => {
  console.log(Array.from(new FormData(form)));

  const d = Array.from(new FormData(form)).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
  const dataObj = {
    title: d.Title,
    pgHeight: parseFloat(d.PageHeight),
    pgWidth: parseFloat(d.PageWidth),
    swatchWidth: parseFloat(d.SwatchWidth),
    inks: [],
    primeInk: d.Primary,
    secondaryInk: d.Secondary,
    tertiaryInk: d.Tertiary,
    backAll: d.BackAll === 'on' ? d.BackAll_Name : false,
  };
  let i;
  for (i = 1; i < 7; i += 1) {
    if (d[`Ink${i}`]) {
      const stepUp = parseInt(d[`Ink${i}_Up`], 10);
      const stepDown = parseInt(d[`Ink${i}_Down`], 10);
      dataObj.inks.push({
        name: d[`Ink${i}_Name`],
        id: i,
        value: parseInt(d[`Ink${i}_Value`], 10),
        stepSize: parseInt(d[`Ink${i}_Step`], 10),
        stepUp,
        stepDown,
        stepTotal: stepDown + 1 + stepUp,
      });
    }
  }
  dataObj.inks.sort((a, b) => b.stepTotal - a.stepTotal);

  return dataObj;
};

const update = (gridData) => {
  // set ink info

};

// const updateSize = () => {
//   const pageW = sizes[0].value;
//   const pageH = sizes[1].value;
//   const swatchW = sizes[2].value; // swatches are square

//   console.log(`${pageW}, ${pageH}, ${swatchW}`);

//   // calc max up & down on page size using swatch size
//   const margin = 0.125;
//   const chartW = pageW - 1;
//   const chartH = pageH - 1;

//   const columns = chartW / (swatchW + margin);
//   const rows = chartH / (swatchW + margin);

//   // updateStepLimits(columns, rows);
// };

export {
  form,
  title,
  inkCheckBoxes,
  sizes,
  //
  toggleInk,
  formData,
  update,
  // updateSize,
};
