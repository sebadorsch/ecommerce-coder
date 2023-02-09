import { cartModel } from "../models/carts.models.js";
import _ from "lodash";
import { productModel } from "../models/products.model.js";

class CartDao {
  async getCarts(limit=0) {
      if(limit > 0)
        return cartModel.find().limit(limit)
      else
        return cartModel.find()
  }

  async getCartById(cid) {
    return cartModel.findById(cid);
  }

  async getCartProducts(cid) {
    const cart = await cartModel.findById(cid)
    return cart.products
  }

  async createCart(cart) {
    return cartModel.create(cart);
  }

  async updateCart(cid, pid) {
    let cart = await cartModel.findById(cid)
    if (_.isEmpty(cart))
      return false

    const product = await productModel.findById(pid)
    if (_.isEmpty(product))
      return false

    const hasProduct = !!cart.products.find(e => e.id === pid)

    if(!hasProduct){

      cart.products.push(product)

      return cartModel.findByIdAndUpdate(cid, cart, {new: true});
    }
    else{

      const product = cart.products.find(e => e.id === pid)

      const res = await cartModel.findOneAndUpdate(
        {
          _id: cid,
          products: { $elemMatch: { _id: pid } }
        },
        {
          $set: {
            "products.$.quantity": product.quantity + 1
          },
        },
        { new: true, safe: true, upsert: true })

      return res ? res : false
    }
  }

  async deleteProductById(cid, pid) {
    const cart = await cartModel.findById(cid)
    console.log("cart:", cart)

    const updatedCart = await cartModel.findOneAndDelete(
      cid,
      { $pull: { "products.$._id": pid } }
    )

    cartModel.updateOne({ id: cid }, {
      $pullAll: {
        products: [{_id: pid}],
      },
    });



    console.log("updatedCart:", updatedCart)
  }

}

export default new CartDao()