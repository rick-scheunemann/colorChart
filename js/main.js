import * as ui from './ui.js';
import GridChart from './classes/GridChart.js';

// init with default form values
const gridChart = new GridChart(ui.formData());

// event listeners
ui.inkCheckBoxes.forEach((el) => {
  el.addEventListener('change', (event) => {
    ui.toggleInk(event);
    gridChart.update(ui.formData());
    ui.update(gridChart.ui());
  });
});

ui.title.addEventListener('input', (event) => {
  gridChart.setTitle(event.target.value);
});

ui.sizes.forEach((el) => {
  el.addEventListener('input', () => {
    gridChart.update(ui.formData());
    ui.update(gridChart.ui());
  });
});

ui.form.addEventListener('submit', (event) => {
  event.preventDefault();
}, false);
