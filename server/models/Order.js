import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [orderItemSchema],
    shippingAddress: mongoose.Schema.Types.Mixed,
    billingAddress: mongoose.Schema.Types.Mixed,
    paymentMethod: String,
    totalAmount: Number,
    status: { type: String, default: 'pending' },
  },
  { timestamps: true },
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
