import { productModel } from "../models/products.model.js";

class ProductDao {
  async getProducts(params) {
    // Consultar lo de la query especifica
    // const {query} = params

    const {limit, page, sort, category} = params

    const options = {
      limit: limit,
      page:page
    }

    const filter = {}
    if (category)
      filter['category'] = category

    if (sort) options['sort'] = { price: sort }

    return await productModel.paginate(filter, options)

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