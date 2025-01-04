import {model, Schema} from 'mongoose';

const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = model('Category', CategorySchema);