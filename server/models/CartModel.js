const carts = new Map();

function recalcTotal(cart) {
  cart.total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}

export function getCart(sessionId) {
  if (!carts.has(sessionId)) {
    carts.set(sessionId, { items: [], total: 0 });
  }
  return carts.get(sessionId);
}

export function addItem(sessionId, { productId, quantity = 1, price, name }) {
  const cart = getCart(sessionId);
  const pid = String(productId);
  const existing = cart.items.find((item) => String(item.productId) === pid);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId: pid, quantity, price, name });
  }
  recalcTotal(cart);
  carts.set(sessionId, cart);
  return cart;
}

export function updateItemQuantity(sessionId, productId, quantity) {
  const cart = carts.get(sessionId);
  if (!cart) return null;

  const pid = String(productId);
  const item = cart.items.find((i) => String(i.productId) === pid);
  if (!item) return null;

  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => String(i.productId) !== pid);
  } else {
    item.quantity = quantity;
  }
  recalcTotal(cart);
  carts.set(sessionId, cart);
  return cart;
}

export function removeItem(sessionId, productId) {
  const cart = carts.get(sessionId);
  if (!cart) return null;

  const pid = String(productId);
  cart.items = cart.items.filter((i) => String(i.productId) !== pid);
  recalcTotal(cart);
  carts.set(sessionId, cart);
  return cart;
}

export function clear(sessionId) {
  carts.delete(sessionId);
}
