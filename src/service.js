export function fetchAddStock(symbol, quantity) {
  return fetch('/api/stock', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ symbol, quantity }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchDeleteStock(symbol) {
  return fetch(`/api/stock/${symbol}`, {
    method: 'DELETE',
  })
  .catch(() => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(error => Promise.reject({ error }))
      .then(err => Promise.reject(err));
  });
}

export function fetchUpdateStock(symbol, quantity) {
  return fetch(`/api/stock/${symbol}`, {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ quantity }),
  })
  .catch(() => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(error => Promise.reject({ error }))
      .then(err => Promise.reject(err));
  });
}

export function fetchPortfolio() {
  return fetch('/api/portfolio')
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}