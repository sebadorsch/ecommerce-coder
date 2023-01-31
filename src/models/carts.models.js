import { Schema, model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: { type: String },
        quantity: { type: Number }
      }
    ],
    default: []
  }
});

export const cartModel = model(cartCollection, cartSchema);