import { cartModel } from "../models/carts.models.js";

class CartDao {
  async getCarts(limit=0) {
      if(limit > 0)
        return cartModel.find().limit(limit)
      else
        return cartModel.find()
  }

  async getCartById(id) {
    return cartModel.findById(id);
  }

  async createCart(cart) {
    return cartModel.create(cart);
  }

  async updateCart(cid, pid) {
    const cart = await cartModel.findById(cid)
    console.log(cart.products.includes(pid))
      // ? cart.products.find('product' === pid).update
      // :
      
    return cartModel.findByIdAndUpdate(cid, {product: pid, quantity: 1}, {new: true});
  }

  async deleteProduct(id) {
    return cartModel.findByIdAndDelete(id);
  }
}

export default new CartDao()