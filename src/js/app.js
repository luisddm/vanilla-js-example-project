import $ from './dom';
import http from './http';
import notify from './notify';

http.get('users').then((res) => {
  res.forEach((person) => {
    addRow(person);
  });
  notify.ok('got');
}).catch((error) => notify.error(`Error: ${ error }`));

function addRow(item) {
  const parent = $.id('table');
  const child = $.createElement('tr', 'table-row');
  child.appendChild($.createElement('tr', 'table-cell', '', item.name));
  child.appendChild($.createElement('tr', 'table-cell', '', item.age));
  const deleteButton = child.appendChild($.createElement('button', 'table-cell', item.id, 'Delete'));
  parent.appendChild(child);

  deleteButton.addEventListener('click', (e) => {
    deleteItem(e.target.id);
  });
}

function deleteItem(itemId) {
  http.delete('users', itemId)
    .then(() => {
      $.id(itemId).parentElement.remove();
      notify.ok('deleted');
    }).catch((error) => notify.error(`Error: ${ error }`));
}

$.id('add-element').addEventListener('click', () => {
  const body = {
    name: $.id('user').value,
    age: $.id('age').value,
  };
  http.post('users', body).then((person) => {
    addRow(person);
    notify.ok('added');
  }).catch((error) => notify.error(`Error: ${ error }`));
});
