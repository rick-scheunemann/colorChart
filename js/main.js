import * as ui from './ui.js';
import GridChart from './classes/GridChart.js';

// init with default form values
const gridChart = new GridChart(ui.formData());

// event listeners
ui.title.addEventListener('input', (event) => {
  gridChart.setTitle(event.target.value);
});

ui.sizes.forEach((el) => {
  el.addEventListener('input', () => {
    gridChart.update(ui.formData());
    ui.update(gridChart.ui());
  });
});

ui.inkCheckBoxes.forEach((el) => {
  el.addEventListener('change', (event) => {
    ui.toggleInk(event);
    gridChart.update(ui.formData());
    ui.update(gridChart.ui());
  });
});

ui.inkRowBtns.forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.toggleInkRadio(event);
    gridChart.update(ui.formData());
    ui.update(gridChart.ui());
  });
});

ui.inkColumnBtns.forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.toggleInkRadio(event);
    gridChart.update(ui.formData());
    ui.update(gridChart.ui());
  });
});

ui.inkPageBtns.forEach((el) => {
  el.addEventListener('input', (event) => {
    ui.toggleInkRadio(event);
    gridChart.update(ui.formData());
    ui.update(gridChart.ui());
  });
});

ui.inkPagesFields.forEach((el) => {
  el.addEventListener('input', ui.updateSlider);
});

ui.inkSliders.forEach((el) => {
  el.addEventListener('input', ui.setSlider);
});

ui.form.addEventListener('submit', (event) => {
  event.preventDefault();
}, false);
