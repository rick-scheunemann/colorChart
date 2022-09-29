import * as ui from './ui.js';
import GridChart from './classes/GridChart.js';

const gridChart = new GridChart(ui.formData());

// event listeners

ui.title.addEventListener('input', () => {
  ui.form.reportValidity();
});

document.querySelectorAll('.size').forEach((el) => {
  el.addEventListener('input', () => {
    ui.form.reportValidity();
    ui.updateForGridChange(gridChart.updateSize(ui.formData()));
  });
});

document.querySelector('#BackAll').addEventListener('change', (event) => {
  document.querySelector('#BackAll_Name').disabled = !event.target.checked;
});

document.querySelectorAll('.inkValue').forEach((el) => {
  ui.form.reportValidity();
  el.addEventListener('input', ui.updateColor);
});

document.querySelectorAll('.inkCheckBox').forEach((el) => {
  el.addEventListener('change', (event) => {
    ui.form.reportValidity();
    ui.toggleInk(event);
  });
});

document.querySelectorAll("input[name='Row']").forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.form.reportValidity();
    ui.toggleInkRadio(event);
  });
});

document.querySelectorAll("input[name='Column']").forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.form.reportValidity();
    ui.toggleInkRadio(event);
  });
});

document.querySelectorAll("input[name='Page']").forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.form.reportValidity();
    ui.toggleInkRadio(event);
  });
});

document.querySelectorAll('.inkPages').forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.form.reportValidity();
    ui.updateSlider(event);
  });
});

document.querySelectorAll('.inkSlider').forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.form.reportValidity();
    ui.setSlider(event);
  });
});

ui.form.addEventListener('submit', (event) => {
  event.preventDefault();
  gridChart.populateGrids(ui.formData());
  console.log(gridChart);
}, false);
