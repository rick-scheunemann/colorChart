/* eslint-disable no-param-reassign */

const setDisabledByID = (id, bool) => {
  document.querySelector(`#${id}`).disabled = bool;
};

const radioTypes = ['Row', 'Column', 'Page'];

const shiftCurrentRadio = (type, value) => {
  const newEl = document.querySelector(`#${type}_Ink${value}`);
  newEl.checked = true;
  if (type === 'Page') {
    document.querySelector('.show').className = 'hide';
    document.querySelector(`#Ink${value}_PgInput`).className = 'show';
  }

  // TODO set new page values... or reset current sliders... or set on ui.update?
};

const setFirstAvailable = (el) => {
  const type = el.name;
  const toExclude = radioTypes.filter((t) => t !== type);
  let i;
  for (i = 1; i < 7; i += 1) {
    if (!document.querySelector(`#${toExclude[0]}_Ink${i}`).checked
      && !document.querySelector(`#${toExclude[1]}_Ink${i}`).checked) {
      shiftCurrentRadio(type, i);
      break;
    }
  }
};

const selectThisRadio = (el) => {
  const { name, value } = el;
  el.checked = true;
  if (name === 'Row') {
    const col = document.querySelector(`#Column_Ink${value}`);
    const pg = document.querySelector(`#Page_Ink${value}`);
    if (col.checked) {
      setFirstAvailable(col);
    }
    if (pg.checked) {
      setFirstAvailable(pg);
    }
  } else if (name === 'Column') {
    const row = document.querySelector(`#Row_Ink${value}`);
    const pg = document.querySelector(`#Page_Ink${value}`);
    if (row.checked) {
      setFirstAvailable(row);
    }
    if (pg.checked) {
      setFirstAvailable(pg);
    }
  } else if (name === 'Page') {
    const row = document.querySelector(`#Row_Ink${value}`);
    const col = document.querySelector(`#Column_Ink${value}`);
    if (row.checked) {
      setFirstAvailable(row);
    }
    if (col.checked) {
      setFirstAvailable(col);
    }
    document.querySelector('.show').className = 'hide';
    document.querySelector(`#Ink${value}_PgInput`).className = 'show';
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

const setSliderValues = (id, pageCount) => {
  const el = document.querySelector(`#${id}_Start`);
  const curPagesValue = el.value;
  if (curPagesValue >= pageCount) {
    el.value = pageCount - 1;
    el.max = pageCount - 1;
    document.querySelector(`#${id}_Down`).innerHTML = el.value;
    document.querySelector(`#${id}_Up`).innerHTML = '0';
  } else {
    el.max = pageCount - 1;
    document.querySelector(`#${id}_Down`).innerHTML = curPagesValue;
    document.querySelector(`#${id}_Up`).innerHTML = el.max - curPagesValue;
  }
};

export {
  setDisabledByID,
  setRadioDisabledByID,
  selectThisRadio,
  setSliderValues,
};
