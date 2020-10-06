const URL = 'http://localhost:5000/users';

const headers = {
  'Content-Type': 'application/json'
};

const list = async () => {
  const response = await fetch(URL, headers);
  return await response.json();
};

const get = async (email) => {
  const response = await fetch(`${URL}/${email}`);
  return await response.json();
};

const getArticles = async (id) => {
  const response = await fetch(`${URL}/${id}/articles`);
  return await response.json();
};

const post = async (params) => {
  const response = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(params),
    headers
  });
  return await response.json();
};

const update = async (id, params) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers
  });
  return await response.json();
};

const remove = async (id) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers
  });
  return await response.json();
};

export { list, get, getArticles, post, update, remove };
