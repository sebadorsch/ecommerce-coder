import { cartModel } from "../models/carts.models.js";
import _ from "lodash";
import {productModel} from "../models/products.model.js";

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

    const hasProduct = !!cart.products.find(e => e.product_id === pid)

    if(!hasProduct){
      const newProduct = {
        product_id: pid,
        quantity: 1
      }

      cart.products.push(newProduct)

      return cartModel.findByIdAndUpdate(cid, cart, {new: true});
    }
    else{

      const product = cart.products.find(e => e.product_id === pid)

      const res = await cartModel.updateOne(
        {"products.product_id": pid,},
        {"products.$.quantity": product.quantity + 1}
      )

      return res.acknowledged
        ? cartModel.findById(cid)
        : false
    }
  }

  async deleteProductById(id) {
    return cartModel.findByIdAndDelete(id);
  }

  async deleteProducts() {
    return cartModel.deleteMany();
  }
}

export default new CartDao()