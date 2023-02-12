const {
  PORT,
  PRODUCTS_URL,
  CARTS_URL,
  DB_URL,
  APP_URL
} = process.env;

const port = PORT || 8080

const Constants = {
  port: port,
  productsUrl: PRODUCTS_URL || 'src/models/Products.json',
  cartsUrl: CARTS_URL || 'src/models/Carts.json',
  dbUrl: DB_URL || 'mongodb://localhost:27017/ecommerce',
  appUrl: APP_URL || `http://localhost:${port}`
};

export default Constants