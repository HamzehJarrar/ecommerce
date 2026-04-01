const users = [];

function findByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

function findById(id) {
  return users.find((u) => u.id === id) || null;
}

function create({ email, password, name, phone }) {
  const user = {
    id: Date.now().toString(),
    email,
    name,
    phone,
    password,
    createdAt: new Date(),
  };
  users.push(user);
  return user;
}

function stripPassword(user) {
  if (!user) return null;
  const { password: _, ...rest } = user;
  return rest;
}

module.exports = {
  findByEmail,
  findById,
  create,
  stripPassword,
};
