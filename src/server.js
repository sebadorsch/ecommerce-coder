import express from 'express'
import __dirname from './dirname.js'
import mongoose from 'mongoose'
import productsRoutes from './routes/products.routes.js'
import Constants from './Constants.js';
const PORT = Constants.port

const app = express()

mongoose.set('strictQuery', true);
mongoose.connect(Constants.dbUrl, (error) => {
  if (error) {
    console.log(error);
  }
  else {

    console.log(`Connected to MongoDB, ${Constants.dbUrl}`);
  }
})

app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRoutes);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))