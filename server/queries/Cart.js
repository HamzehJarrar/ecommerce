class Cart {
  constructor() {
    // In-memory storage (use Redis in production)
    this.carts = new Map();
  }

  // Get cart by session ID
  async findBySessionId(sessionId) {
    return this.carts.get(sessionId) || { items: [], total: 0 };
  }

  // Add item to cart
  async addItem(sessionId, item) {
    let cart = await this.findBySessionId(sessionId);
    
    const existingItem = cart.items.find(i => i.productId === item.productId);
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      cart.items.push({
        productId: item.productId,
        name: item.name,
        nameAr: item.nameAr,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
      });
    }

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    this.carts.set(sessionId, cart);
    return cart;
  }

  // Update item quantity
  async updateItemQuantity(sessionId, productId, quantity) {
    let cart = await this.findBySessionId(sessionId);
    
    const item = cart.items.find(i => i.productId === parseInt(productId));
    
    if (!item) {
      throw new Error('Item not found in cart');
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId !== parseInt(productId));
    } else {
      item.quantity = quantity;
    }

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    this.carts.set(sessionId, cart);
    return cart;
  }

  // Remove item from cart
  async removeItem(sessionId, productId) {
    let cart = await this.findBySessionId(sessionId);
    
    cart.items = cart.items.filter(i => i.productId !== parseInt(productId));

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    this.carts.set(sessionId, cart);
    return cart;
  }

  // Clear entire cart
  async clear(sessionId) {
    this.carts.delete(sessionId);
    return { items: [], total: 0 };
  }

  // Get cart item count
  async getItemCount(sessionId) {
    const cart = await this.findBySessionId(sessionId);
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

module.exports = new Cart();
