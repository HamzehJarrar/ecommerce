import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);

export function toPublicUser(doc) {
  if (!doc) return null;
  const o = doc.toObject ? doc.toObject() : doc;
  const { password: _p, ...rest } = o;
  return rest;
}
