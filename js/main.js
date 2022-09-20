import * as ui from './ui.js';
import * as listener from './listeners.js';
import Grid from './classes/Grid.js';

// TODO generate ui rather than use html

// event listeners
ui.checkBoxes.forEach((e) => {
  e.addEventListener('change', listener.toggleInk);
});

ui.inkNames.forEach((e) => {
  e.addEventListener('input', listener.updateName);
});

ui.sizes.forEach((e) => {
  e.addEventListener('input', listener.updateSize);
});

ui.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(ui.form);
  const fd = Array.from(data).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});

  const theGrid = new Grid(3, 3);

  // generate grid

  // log
  let logOutput = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(fd)) {
    logOutput = `${logOutput}${key}: ${value}\r`;
  }
  ui.log.innerText = logOutput;
}, false);
