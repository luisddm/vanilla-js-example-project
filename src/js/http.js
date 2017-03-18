const HOST = 'http://localhost:3001';

const http = {
  get(entity) {
    return fetch(`${ HOST }/${ entity }`, {
      method: 'GET',
    }).then((res) => res.json());
  },

  post(entity, body) {
    return fetch(`${ HOST }/${ entity }`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },

  delete(entity, id) {
    return fetch(`${ HOST }/${ entity }/${ id }`, {
      method: 'DELETE',
    }).then((res) => res.json());
  },
};

export default http;
