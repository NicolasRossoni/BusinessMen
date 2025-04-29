const API_URL = 'http://localhost:4000/api/items';

export async function fetchItems() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function updateItem(id, nome) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });
  return res.json();
}
