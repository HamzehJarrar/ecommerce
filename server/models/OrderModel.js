const orders = [];
let orderIdCounter = 1000;

function create(payload) {
  const order = {
    id: orderIdCounter++,
    userId: payload.userId,
    items: payload.items,
    shippingAddress: payload.shippingAddress,
    billingAddress: payload.billingAddress,
    paymentMethod: payload.paymentMethod,
    totalAmount: payload.totalAmount,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  orders.push(order);
  return order;
}

function findById(orderId) {
  return orders.find((o) => o.id === orderId) || null;
}

function findByUserId(userId) {
  return orders
    .filter((o) => o.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

function updateStatus(orderId, status) {
  const order = findById(orderId);
  if (!order) return null;
  order.status = status;
  order.updatedAt = new Date();
  return order;
}

module.exports = {
  create,
  findById,
  findByUserId,
  updateStatus,
};
