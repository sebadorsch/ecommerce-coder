const {
  PORT,
  PRODUCTS_URL,
  CARTS_URL,
  DB_URL
} = process.env;

const Constants = {
  port: PORT || 8080,
  productsUrl: PRODUCTS_URL || 'src/models/Products.json',
  cartsUrl: CARTS_URL || 'src/models/Carts.json',
  dbUrl: DB_URL || 'mongodb://localhost:27017/ecommerce'
};

export default Constants