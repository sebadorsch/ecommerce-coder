import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true, index: true},
  thumbnail: { type: String, required: false },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
  status: { type: Boolean, default: false },
  category: { type: String, required: true, index: true}
});

productSchema.plugin(mongoosePaginate)

export const productModel = model(productCollection, productSchema);