import { Schema, model } from "mongoose"

const cartCollection = "carts"

const cartSchema = new Schema({
  products: [
    {
      product: {type: Schema.Types.ObjectId, ref: 'products', required: true,},
      quantity: {type: Number, default: 1},
    }]
}, {timestamps: true})

export const cartModel = model(cartCollection, cartSchema)