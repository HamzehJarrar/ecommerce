import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    nameAr: { type: String, required: true },
    icon: { type: String, default: '📦' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
