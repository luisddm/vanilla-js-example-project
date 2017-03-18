export default function (method = 'GET', userId = '', body = null) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  return fetch(`http://localhost:3001/users/${ userId }`, { method, body, headers })
    .then((res) => res.json());
}
