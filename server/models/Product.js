import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    /** تسمية التصنيف المعروضة على البطاقة (عربي) */
    categoryLabel: { type: String, required: true },
    discountPercent: { type: Number, default: 0 },
    originalPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    currency: { type: String, default: 'SAR' },
    image: { type: String, required: true },
    specs: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    limitedTimeOffer: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
