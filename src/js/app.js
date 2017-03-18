fetchURL().then((json) => {
  const table = document.getElementById('table');
  json.forEach((person) => {
    const tr = createElement('table-row');
    tr.appendChild(createElement('table-cell', person.name));
    tr.appendChild(createElement('table-cell', person.age));
    const y = tr.appendChild(createElement('table-cell', 'Delete', 'button', person.id));
    table.appendChild(tr);

    y.addEventListener('click', (e) => {
      deleteItem(e.target.id);
    });
  });
  notify('got');
})
.catch((error) => notify(`Error: ${ error }`, 'error'));

function deleteItem(userId) {
  fetchURL('DELETE', userId)
    .then(() => {
      document.getElementById(userId).parentElement.remove();
      notify('deleted');
    })
    .catch((error) => notify(`Error: ${ error }`, 'error'));
}

document.getElementById('add-element').addEventListener('click', () => {
  const body = JSON.stringify({
    name: document.getElementById('user').value,
    age: document.getElementById('age').value,
  });
  fetchURL('POST', '', body).then((person) => {
    const table = document.getElementById('table');
    const tr = createElement('table-row');
    tr.appendChild(createElement('table-cell', person.name));
    tr.appendChild(createElement('table-cell', person.age));
    const y = tr.appendChild(createElement('table-cell', 'Delete', 'button', person.id));
    table.appendChild(tr);

    y.addEventListener('click', (e) => {
      deleteItem(e.target.id);
    });
    notify('added');
  });
});

function notify(msg, type = 'ok') {
  const feedback = document.querySelector('#feedback');
  feedback.innerHTML = msg;
  feedback.classList.remove('feedback-animation');
  feedback.classList.remove('feedback-ok');
  feedback.classList.remove('feedback-error');
  void feedback.offsetWidth; // reflow
  feedback.classList.add('feedback-animation');
  feedback.classList.add(`feedback-${ type }`);
}

function createElement(className = null, innerHTML = null, tagName = 'div', idName = null) {
  const el = document.createElement(tagName);
  el.className = className;
  el.innerHTML = innerHTML;
  el.id = idName;
  return el;
}

function fetchURL(method = 'GET', userId = '', body = null) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  return fetch(`http://localhost:3001/users/${ userId }`, { method, body, headers })
    .then((res) => res.json());
}
