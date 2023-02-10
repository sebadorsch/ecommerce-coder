import {cartModel} from "../models/carts.models.js";
import _ from "lodash";
import {productModel} from "../models/products.model.js";
import _ProductDao from "../dao/products.dao.js"

class CartDao {
  async getCarts() {
    return cartModel.find()
  }

  async getCartById(cid) {
    return cartModel.findById(cid);
  }

  async getCartProducts(cid) {
    const cart = await cartModel.findById(cid)
    return cart ? cart.products : false
  }

  async createCart(cart) {
    return cartModel.create(cart);
  }

  async updateCart(cid, pid, quantity=undefined) {
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

      return cartModel.findOneAndUpdate(
        {
          _id: cid,
          products: {$elemMatch: {_id: pid}}
        },
        {
          $set: {
            "products.$.quantity": !!quantity ? quantity : product.quantity + 1
          },
        },
        {new: true, safe: true, upsert: true})
    }
  }

  async updateCartProducts(cid, products=undefined) {
    // Debera actualizar el carrito con un arreglo de productos con el formato especificado arriba
    // Si el producto ya existe le aumento la cantidad en uno o reemplazo todos los productos que hay
    // por la nueva lista de productos?
    if (products){
       await products.map(async e => {
         const product = await _ProductDao.getProductById(e.id)

         if (product){
           await this.updateCart(cid, product.id, e.quantity ? e.quantity : undefined)
         }
      })

      // Como hago para que el return espere el resultado del mapeo anterior?
      return cartModel.findById(cid)
    }
    else
      return false
  }

  async deleteProductById(cid, pid) {

    return cartModel.updateOne(
      {_id: cid},
      {
        "$pull":
          {"products": {_id: pid}}
      },
      {safe: true, multi: true});

  }

  async deleteCartById(cid) {
    return cartModel.findByIdAndDelete(cid);
  }

  async deleteAllProducts(cid) {
    return cartModel.findByIdAndUpdate(
      {_id: cid},
      {$set: {products: []}}
    )
  }

}

export default new CartDao()