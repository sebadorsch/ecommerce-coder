import { productModel } from "../models/products.model.js";

class ProductDao {
  async getProducts() {
    return productModel.find();
  }

  async getProductById(id) {
    return productModel.findById(id);
  }

  async createProduct(product) {
    return productModel.create(product);
  }

  async updateProduct(id, product) {
    return productModel.findByIdAndUpdate(id, product, {new: true});
  }

  async deleteProduct(id) {
    return productModel.findByIdAndDelete(id);
  }
}

export default new ProductDao()