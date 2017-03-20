import $ from './dom';
import http from './http';
import notify from './notify';
import time from './time';

loadSortBy('title');

function loadSortBy(sortBy) {
  $.id('boxes').innerHTML = null;
  http.get('users')
    .then((res) => {
      const sortedRes = res.sort((current, prev) => current[sortBy] > prev[sortBy]);
      sortedRes.forEach((person) => {
        const row = addRow(person, 'boxes');
        $.name('button', row)[0].addEventListener('click', (e) => {
          deleteItem(e.target.id);
        });
      });
      notify.ok('Lista cargada correctamente');
    })
    .catch((error) =>
      notify.error(error)
    );
}

$.id('sort').addEventListener('change', (ev) => {
  loadSortBy(ev.target.value);
});

$.id('add-element').addEventListener('click', (ev) => {
  ev.preventDefault();
  const body = {
    title: $.id('title').value,
    date: new Date().toISOString(),
    description: $.id('description').value,
  };
  http.post('users', body)
    .then((person) => {
      const row = addRow(person, 'boxes');
      $.name('button', row)[0].addEventListener('click', (e) => {
        deleteItem(e.target.id);
      });
      notify.ok('Elemento añadido correctamente');
      $.id('title').value = '';
      $.id('description').value = '';
      $.toggleDisplay('add-section');
    })
    .catch((error) =>
      notify.error(error)
    );
});

$.id('add-new').addEventListener('click', () => {
  $.toggleDisplay('add-section');
});

function addRow(data, element) {
  const parent = $.id(element);
  const child = $.createElement('div', 'box row-distribute-items');
  child.appendChild($.createElement('div', 'box__title', '', data.title));
  child.appendChild($.createElement('div', 'box__desc', '', data.description));
  child.appendChild($.createElement('div', 'box__date', '', `${ time.getDate(data.date) } ${ time.getTime(data.date) }`));
  child.appendChild($.createElement('button', 'box__button', data.id, '×'));
  parent.appendChild(child);
  return child;
}

function deleteItem(itemId) {
  http.delete('users', itemId)
    .then(() => {
      $.id(itemId).parentElement.remove();
      notify.ok('Elemento eliminado correctamente');
    })
    .catch((error) =>
      notify.error(error)
    );
}
