import { Schema, model } from "mongoose";

const productCollection = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
  status: { type: Boolean, default: false },
  category: { type: String, required: true }
});

export const productModel = model(productCollection, productSchema);