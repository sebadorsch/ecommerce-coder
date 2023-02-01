import { Schema, model } from "mongoose"

const cartCollection = "carts"

const cartSchema = new Schema({
  products: [{
      product_id: String,
      quantity: Number
    }],
})

export const cartModel = model(cartCollection, cartSchema)