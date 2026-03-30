async function parseResponse(res) {
  const text = await res.text();
  let json = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || res.statusText);
  }
  if (!res.ok) {
    throw new Error(json.message || res.statusText);
  }
  return json;
}

export async function apiGet(path) {
  const res = await fetch(`/api${path}`);
  const json = await parseResponse(res);
  return json.data !== undefined ? json.data : json;
}

export async function apiPost(path, body) {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const json = await parseResponse(res);
  return json.data !== undefined ? json.data : json;
}
